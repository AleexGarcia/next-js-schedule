import { NextResponse } from "next/server";


export async function GET() {
    const response = new NextResponse();
   
    response.cookies.set('token', '', {
        httpOnly: true,
        path: '/',
        expires: new Date(0)
    }) 
    return response;
}
