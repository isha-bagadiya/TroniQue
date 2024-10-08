import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { question, openai_api_key, data_type } = await request.json();

    console.log('Received POST request with data:', { question, data_type });

    const response = await fetch("http://34.231.214.248:5000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        openai_api_key,
        data_type,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to communicate with AI service");
    }

    const data = await response.json();
    return NextResponse.json({ answer: data.answer });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}