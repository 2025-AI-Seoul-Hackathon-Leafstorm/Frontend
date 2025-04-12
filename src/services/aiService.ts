import axios from 'axios';

const API_URL = 'https://api-endpoint.upstage.ai'; // UPSTAGE API URL로 변경 필요
const API_KEY = ''; // API 키 추가 필요

// AI 응답 요청 함수
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
    console.error('AI API 호출 중 오류 발생:', error);
    throw error;
  }
};