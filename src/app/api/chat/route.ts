import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const session_id = searchParams.get('session_id');
    const user_message = searchParams.get('user_message');
    const document_path = searchParams.get('document_path');

    // Check for missing parameters and provide specific error messages
    const missingParams = [];
    if (!session_id) missingParams.push('session_id');
    if (!user_message) missingParams.push('user_message');
    if (!document_path) missingParams.push('document_path');

    if (missingParams.length > 0) {
      return NextResponse.json(
        { 
          error: 'Missing required parameters', 
          missingParams,
          message: `The following parameters are required but missing: ${missingParams.join(', ')}`
        },
        { status: 400 }
      );
    }

    const apiUrl = 'https://3438ywb1da.execute-api.us-east-1.amazonaws.com/ai_tutor_chatbot';
    
    // Create URLSearchParams with non-null values
    // We can safely use type assertions here because we've already checked for null values
    const params = new URLSearchParams();
    params.append('session_id', session_id as string);
    params.append('user_message', user_message as string);
    params.append('document_path', document_path as string);

    console.log(`Making API request to: ${apiUrl}?${params.toString()}`);

    const response = await fetch(`${apiUrl}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error: ${response.status} - ${errorText}`);
      throw new Error(`API responded with status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}