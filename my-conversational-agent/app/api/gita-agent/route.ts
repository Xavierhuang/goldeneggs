import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Read API key from environment variables
    const apiKey = process.env.ELEVENLABS_API_KEY;
    
    if (!apiKey) {
      console.error('API key not found in environment variables');
      return NextResponse.json(
        { error: 'API key not found in environment variables', success: false },
        { status: 500 }
      );
    }
    
    // Define the Bhagavad Gita agent ID
    const gitaAgentId = 'agent_01jvapcndrenvafjk4rm4n4xqq';
    
    // Get the specific voice ID to use
    const voiceId = process.env.GITA_VOICE_ID || '2k1RrkiAltTGNFiT6rL1';
    
    console.log(`Using Bhagavad Gita agent ID: ${gitaAgentId} and voice ID: ${voiceId}`);
    
    // For authenticated agents, get a signed URL
    console.log('Fetching signed URL for Bhagavad Gita agent from ElevenLabs API');

    // Voice stability parameters
    const queryParams = new URLSearchParams({
      agent_id: gitaAgentId,
      voice_id: voiceId,
      stability: '0.85',
      similarity_boost: '0.85', // Higher similarity for more consistent spiritual guidance
      consistency: 'high'
    }).toString();

    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?${queryParams}`, 
      {
        method: 'GET',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          'xi-voice-settings': JSON.stringify({
            stability: 0.85,
            similarity_boost: 0.85,
            use_speaker_boost: true
          })
        }
      }
    );
    
    if (!response.ok) {
      console.error('ElevenLabs API error:', {
        status: response.status,
        statusText: response.statusText
      });
      return NextResponse.json(
        { 
          error: `Failed to fetch signed URL: ${response.statusText}`,
          statusCode: response.status,
          success: false 
        },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    if (!data || !data.signed_url) {
      console.error('No signed URL returned from ElevenLabs API');
      return NextResponse.json(
        { 
          error: 'No signed URL returned from API', 
          success: false 
        },
        { status: 500 }
      );
    }
    
    console.log('Successfully obtained signed URL for Bhagavad Gita agent');
    
    return NextResponse.json({
      signedUrl: data.signed_url,
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