import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "./lib/isValidPassword";

export async function middleware(req:NextRequest){
    if(await isAuthenticated(req) === false){
        return new NextResponse("UnAuthorized", {
            status: 401,
            headers: { "WWW-Authenticate":"Basic"},
        });
    }
}

async function isAuthenticated(req:NextRequest){
    const authHeader = req.headers.get("Authorization") || req.headers.get("authorization");

    if (authHeader == null) return false;

    const [user, password] = Buffer.from(authHeader.split(" ")[1], "base64").toString().split(":");
    const result = user === process.env.ADMIN_USERNAME && (await isValidPassword(password, process.env.HASHED_ADMIN_PASSWORD as string))
    return result;
}

export const config = {
    matcher:"/admin/:path*",
}