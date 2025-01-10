import fetch from 'node-fetch';

// Test script for send-email API
const testEmail = async () => {
  try {
    console.log('Sending test email...');
    const response = await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        userEmail: 'almithani@gmail.com',
        summaryData: '<h1>Test Email</h1><p>This is a test email from the local development environment.</p>',
        csvData: Buffer.from('test,data\n1,2').toString('base64')
      })
    });

    const responseText = await response.text();
    console.log('Status:', response.status);
    console.log('Raw response:', responseText);

    try {
      const data = JSON.parse(responseText);
      console.log('Parsed response:', data);
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', parseError);
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

testEmail();
