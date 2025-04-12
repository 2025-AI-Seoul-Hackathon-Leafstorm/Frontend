export async function POST(request) {
  try {
    const body = await request.json();

    const response = await fetch('https://3438ywb1da.execute-api.us-east-1.amazonaws.com/ai_tutor_upload_document', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in upload proxy:', error);
    return new Response(JSON.stringify({ error: 'Failed to upload file' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}