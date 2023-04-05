const axios = require('axios');

// Replace these with your ConvertKit API key and ConvertKit form ID
const API_KEY = 'XLzmLAWn9RcqmyHc57xV0g';
const FORM_ID = '5018315';

// Data to send in the email
const emailData = {
  email: 'test@example.com',
  api_key: API_KEY,
  tags: ['3763229']
};

// Send email using ConvertKit API
axios({
  method: 'post',
  url: `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: emailData
})
.then(response => {
  console.log('Email sent successfully:', response.data);
})
.catch(error => {
  console.error('Failed to send email:', error.response.data);
});
