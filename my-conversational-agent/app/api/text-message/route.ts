import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Get message from request body
    const body = await request.json();
    const { message } = body;
    
    if (!message) {
      return NextResponse.json(
        { error: 'No message provided', success: false },
        { status: 400 }
      );
    }

    // Read API key from environment variables
    const apiKey = process.env.ELEVENLABS_API_KEY;
    
    if (!apiKey) {
      console.error('API key not found in environment variables');
      return NextResponse.json(
        { error: 'API key not found in environment variables', success: false },
        { status: 500 }
      );
    }
    
    // Define the agent ID from environment variables
    const agentId = process.env.ELEVENLABS_AGENT_ID;
    
    if (!agentId) {
      console.error('Agent ID not found in environment variables');
      return NextResponse.json(
        { error: 'Agent ID not found in environment variables', success: false },
        { status: 500 }
      );
    }
    
    console.log(`Sending text message to agent ID: ${agentId}`);
    
    // Send message to ElevenLabs API
    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/agent/${agentId}/text`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message })
      }
    );
    
    // Check if the response is OK
    if (!response.ok) {
      console.error('ElevenLabs API error:', {
        status: response.status,
        statusText: response.statusText
      });
      return NextResponse.json(
        { 
          error: `Failed to send message: ${response.statusText}`,
          statusCode: response.status,
          success: false 
        },
        { status: response.status }
      );
    }
    
    // Parse the response data
    const data = await response.json();
    
    // Return the response from ElevenLabs
    return NextResponse.json({
      response: data,
      success: true
    });
  } catch (error) {
    console.error('General error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : String(error),
        success: false 
      },
      { status: 500 }
    );
  }
} 