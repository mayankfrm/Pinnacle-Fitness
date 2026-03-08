import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { prompt, userContext } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("Gemini API Key detected:", apiKey ? "Yes (starts with " + apiKey.substring(0, 4) + ")" : "No");

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return NextResponse.json({ error: "Missing API Key" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const fullPrompt = `You are a professional fitness coach for the Pinnacle app. 
    User context: ${JSON.stringify(userContext)}.
    Task: ${prompt}
    Keep the response concise (max 2 sentences) and highly motivating.`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (err: any) {
    console.error("Gemini Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
