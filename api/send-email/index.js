import { Buffer } from 'buffer';

// For local development
const allowCors = fn => async (req, res) => {
  console.log('Incoming request:', req.method, req.url);
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = async (req, res) => {
  
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userEmail, summaryData, csvData } = req.body;

  try {
    // First, add contact to Mailjet list
    const contactResponse = await fetch('https://api.mailjet.com/v3/REST/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${process.env.VITE_MAILJET_API_KEY}:${process.env.VITE_MAILJET_SECRET_KEY}`).toString('base64')
      },
      body: JSON.stringify({
        Email: userEmail,
        IsExcludedFromCampaigns: false,
        Name: userEmail.split('@')[0] // Use part before @ as name
      })
    });

    const contactData = await contactResponse.json();
    
    if (!contactResponse.ok && contactResponse.status !== 409) { // 409 means contact already exists
      console.error('Failed to add contact:', contactData);
    }

    // If contact was added or already exists, add them to a specific list
    const listId = '10506847'; // Replace with your actual list ID
    const manageContactResponse = await fetch(`https://api.mailjet.com/v3/REST/contactslist/${listId}/managecontact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${process.env.VITE_MAILJET_API_KEY}:${process.env.VITE_MAILJET_SECRET_KEY}`).toString('base64')
      },
      body: JSON.stringify({
        Email: userEmail,
        Action: "addforce"
      })
    });

    const manageContactData = await manageContactResponse.json();
    
    if (!manageContactResponse.ok) {
      console.error('Failed to add contact to list:', manageContactData);
    }

    // Now send the email
    const response = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${process.env.VITE_MAILJET_API_KEY}:${process.env.VITE_MAILJET_SECRET_KEY}`).toString('base64')
      },
      body: JSON.stringify({
        Messages: [
          {
            From: {
              Email: "support@getbcard.io",
              Name: "BCard TaxMan"
            },
            To: [
              {
                Email: userEmail,
                Name: userEmail
              }
            ],
            Subject: "💳 BCard TaxMan Report 💸",
            HTMLPart: summaryData,
            Attachments: [
              {
                ContentType: "text/csv",
                Filename: "TaxManSummary.csv",
                Base64Content: csvData
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Mailjet API error:', data);
      throw new Error(data.message || 'Failed to send email');
    }

    console.log('Email sent successfully');
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
};

export default allowCors(handler);
