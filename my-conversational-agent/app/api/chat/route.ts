import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { messages } = await request.json();

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
    }),
  });

  const data = await response.json();
  return NextResponse.json({ text: data.choices[0].message.content });
} 