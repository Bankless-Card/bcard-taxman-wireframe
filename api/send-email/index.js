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
  console.log('Handler started');
  console.log('Request method:', req.method);
  console.log('Request headers:', req.headers);
  
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('Request body:', req.body);
  const { userEmail, summaryData, csvData } = req.body;

  try {
    console.log('Attempting to send email to:', userEmail);
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
    console.log('Mailjet API response:', data);

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
