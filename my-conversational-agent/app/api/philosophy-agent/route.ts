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
    
    // Define the Professor Brusseau agent ID
    const philosophyAgentId = '4zwbCZeF4TmrbziMbdaT';
    
    // Get the specific voice ID to use
    const voiceId = process.env.PROFESSOR_VOICE_ID || '2k1RrkiAltTGNFiT6rL1';
    
    console.log(`Using Philosophy agent ID: ${philosophyAgentId} and voice ID: ${voiceId}`);
    
    // For authenticated agents, get a signed URL
    console.log('Fetching signed URL for Professor Brusseau agent from ElevenLabs API');

    // Voice stability parameters
    const queryParams = new URLSearchParams({
      agent_id: philosophyAgentId,
      voice_id: voiceId,
      stability: '0.95',
      similarity_boost: '0.75', // Lower similarity boost for more natural philosophical discussion
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
            stability: 0.95,
            similarity_boost: 0.75,
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
    
    console.log('Successfully obtained signed URL for philosophy agent');
    
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