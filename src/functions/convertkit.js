import axios from 'axios';
import { CONVERT_KIT_API_KEY, CONVERT_KIT_FORM_ID } from '../data' 

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
    api_key: CONVERT_KIT_API_KEY,
    tags: ['3763229'],
    fields: {
      walletaddress: walletaddress
    }
  };

  // Send email using ConvertKit API
  axios({
    method: 'post',
    url: `https://api.convertkit.com/v3/forms/${CONVERT_KIT_FORM_ID}/subscribe`,
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
