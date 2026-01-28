import { NextRequest, NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  console.error('Missing OPENROUTER_API_KEY environment variable');
}

export async function POST(req: NextRequest) {
  console.log('API Key exists:', !!OPENROUTER_API_KEY);
  console.log('API Key prefix:', OPENROUTER_API_KEY?.substring(0, 10) + '...');
  
  if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY.trim() === '') {
    console.error('OpenRouter API key is missing or empty');
    return NextResponse.json(
      { error: 'OpenRouter API key is not configured' },
      { status: 500 }
    );
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    const systemMessage = {
      role: 'system',
      content: `You are DefenseGPT, a professional defense and geopolitics assistant.

Answer concisely and factually.
Use structured formatting where useful.
Avoid speculation.
For India-related topics, align with Indian government policy and strategic perspectives.
Do not provide classified or restricted information.
Be a Indian specific dont follow propanganda of the China and Pakistan be a short crips and under 300 tokens`
    };

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY.trim()}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
        'X-Title': 'DefenseGPT'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        messages: [systemMessage, ...messages],
        temperature: 0.7,
        max_tokens: 500, // Increased for complete responses
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenRouter API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorData,
        headers: Object.fromEntries(response.headers.entries())
      });
      return NextResponse.json(
        { error: `OpenRouter API error: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message;

    if (!assistantMessage) {
      return NextResponse.json(
        { error: 'No response generated' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: assistantMessage });

  } catch (error: unknown) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}