import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Get the request body
    const body = await request.json();
    
    // Forward the request to the AI tutor API
    const response = await fetch('https://3438ywb1da.execute-api.us-east-1.amazonaws.com/ai_tutor_upload_document', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    // Get the response data
    const data = await response.json();
    
    // Return the response with appropriate status code
    return NextResponse.json(data, { status: response.statusCode });
  } catch (error) {
    console.error('Error in upload proxy:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
} 