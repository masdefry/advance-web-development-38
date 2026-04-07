import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // const data = req?.body

  return NextResponse.json({
    status: 200,
    message: 'Successfull',
  });
}

export async function POST(request: Request) {
  const data = await request?.json();
  console.log(data);

  return NextResponse.json({
    status: 201, 
    message: 'Successfull'
  })
}
