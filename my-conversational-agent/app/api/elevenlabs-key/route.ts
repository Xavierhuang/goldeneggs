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
    
    // Define the agent ID from environment variables
    const agentId = process.env.ELEVENLABS_AGENT_ID;
    
    if (!agentId) {
      console.error('Agent ID not found in environment variables');
      return NextResponse.json(
        { error: 'Agent ID not found in environment variables', success: false },
        { status: 500 }
      );
    }
    
    // Get the specific voice ID to use
    const voiceId = process.env.ELEVENLABS_VOICE_ID || '2k1RrkiAltTGNFiT6rL1';
    
    console.log(`Using agent ID: ${agentId} and voice ID: ${voiceId}`);
    
    // For authenticated agents, get a signed URL - with voice stability parameters
    console.log('Fetching signed URL from ElevenLabs API');

    // Voice stability parameters to prevent voice switching
    const queryParams = new URLSearchParams({
      agent_id: agentId,
      voice_id: voiceId, // Use the specific voice ID
      // These parameters help ensure voice consistency
      stability: '0.95',  // Higher stability = more consistent voice (increased from 0.8)
      similarity_boost: '1.0', // Maximum similarity
      consistency: 'high' // Request high consistency in the voice
    }).toString();

    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?${queryParams}`, 
      {
        method: 'GET',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          // Additional headers to request consistent voice
          'xi-voice-settings': JSON.stringify({
            stability: 0.95,
            similarity_boost: 1.0,
            use_speaker_boost: true
          })
        }
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
          error: `Failed to fetch signed URL: ${response.statusText}`,
          statusCode: response.status,
          success: false 
        },
        { status: response.status }
      );
    }
    
    // Parse the response data
    const data = await response.json();
    
    // Check if data is valid
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
    
    console.log('Successfully obtained signed URL');
    
    // Return success with signed URL only - no additional fields that might interfere
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