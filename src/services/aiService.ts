import axios from 'axios';

const API_URL = 'https://api-endpoint.upstage.ai'; // Replace with UPSTAGE API URL
const API_KEY = ''; // Add your API key here

// Function to request AI response
export const getAIResponse = async (
  message: string,
  documentContext: string
) => {
  try {
    const response = await axios.post(
      `${API_URL}/chat`,
      {
        message,
        context: documentContext,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error occurred during AI API call:', error);
    throw error;
  }
};