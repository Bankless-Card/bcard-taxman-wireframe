export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userEmail, summaryData, csvData } = req.body;

  try {
    const response = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${process.env.MAILJET_API_KEY}:${process.env.MAILJET_SECRET_KEY}`).toString('base64')
      },
      body: JSON.stringify({
        Messages: [
          {
            From: {
              Email: "taxman@getbcard.io",
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
      throw new Error(data.message || 'Failed to send email');
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}
