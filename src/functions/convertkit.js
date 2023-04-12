//const axios = require('axios');
// import React from 'react';
import axios from 'axios';

// Replace these with your ConvertKit API key and ConvertKit form ID
const API_KEY = 'XLzmLAWn9RcqmyHc57xV0g';
const FORM_ID = '5018315';

// Data to send in the email TEMPLATE
// const emailData = {
//   email: 'test@example.com',
//   api_key: API_KEY,
//   tags: ['3763229']
// };

// get email from submitting user and attach walletaddress to storage
export const convertKitEmail = async (email, walletaddress) => {

  console.log("Received email: " + email + " and walletaddress: " + walletaddress);

  let emailData = {
    email: email,
    api_key: API_KEY,
    tags: ['3763229'],
    fields: {
      walletaddress: walletaddress
    }
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
    return "success";
  })
  .catch(error => {
    console.error('Failed to send email:', error.response.data);
    return "error";
  });

  return true;

};
