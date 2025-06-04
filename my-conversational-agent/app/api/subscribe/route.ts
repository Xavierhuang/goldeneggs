import { NextResponse } from 'next/server';
import { addSubscriber, addEmailSignup } from '@/app/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    let passwordHash = null;
    if (password && password.length > 0) {
      passwordHash = await bcrypt.hash(password, 10);
    }

    // Store in SQLite database
    const result = addSubscriber(email, passwordHash);
    
    if (!result.success) {
      if (result.error === 'Email already subscribed') {
        // Return a special flag for frontend to treat as login
        return NextResponse.json(
          { message: 'Email already registered', alreadyRegistered: true },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully subscribed!', id: result.id, alreadyRegistered: false },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}

// --- NEW: Newsletter signup route ---
// Place this at the bottom of the file for now (will move to its own file if needed)
// export async function POST_NEWSLETTER(request: Request) {
//   try {
//     const { email } = await request.json();
//     if (!email) {
//       return NextResponse.json(
//         { error: 'Email is required' },
//         { status: 400 }
//       );
//     }
//     // Basic email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return NextResponse.json(
//         { error: 'Invalid email format' },
//         { status: 400 }
//       );
//     }
//     // Store in email_signups table
//     const result = addEmailSignup(email);
//     if (!result.success) {
//       if (result.error === 'Email already signed up') {
//         return NextResponse.json(
//           { message: 'Email already signed up', alreadySignedUp: true },
//           { status: 200 }
//         );
//       }
//       return NextResponse.json(
//         { error: result.error },
//         { status: 400 }
//       );
//     }
//     return NextResponse.json(
//       { message: 'Successfully signed up for newsletter!', id: result.id, alreadySignedUp: false },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Newsletter signup error:', error);
//     return NextResponse.json(
//       { error: 'Failed to process newsletter signup' },
//       { status: 500 }
//     );
//   }
// } 