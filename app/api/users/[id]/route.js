// /app/api/users/[id]/route.js

import { prisma } from '@/lib/client/prisma';
import { NextResponse } from 'next/server';


export async function GET(request, { params }) {
  const { id } = await params;
console.log("user id api", id);

  try {
    // Fetch the user account data from the database using the provided user ID
    const user = await prisma.account.findUnique({
      where: { userId: Number(id) },
    });

    // Check if user exists
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Return the user data in the response
    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}