// /app/api/gemini/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            throw new Error("GEMINI_API_KEY is not defined");
        }

        const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: prompt }],
                        },
                    ],
                }),
            }
        );

        const result = await geminiRes.json();

        return NextResponse.json(result);
    } catch (e: unknown) {
        const error = e instanceof Error ? e : new Error(String(e));

        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
