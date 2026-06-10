import "jsr:@supabase/functions-js/edge-runtime.d.ts";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY")!;

const SYSTEM_PROMPT = `You are an expert AI study mentor for Indian engineering students preparing for placements. You specialize in:

1. DSA & Coding Interviews - Help with algorithms, data structures, LeetCode problems
2. Career Guidance - Full Stack, Data Science, ML, Mobile Dev, DevOps career paths
3. Interview Prep - Company-specific tips for Google, Amazon, Microsoft, Flipkart, Zomato
4. Learning Resources - Recommend FREE resources (YouTube, Coursera audit, freeCodeCamp, etc.)
5. Resume & Projects - Tips for building impressive portfolios

Guidelines:
- Be friendly, encouraging, and practical
- Give specific, actionable advice
- Suggest free resources when asked about learning
- Keep responses concise but helpful (2-4 sentences for simple questions)
- For coding questions, explain the approach before giving code
- Mention relevant LeetCode problems when discussing DSA topics
- Consider the Indian engineering education context`;

const FALLBACK_RESPONSES = [
  "That's a great question! For DSA, I recommend starting with arrays and linked lists on LeetCode, then moving to trees and graphs. Consistency is key - even 2-3 problems daily makes a huge difference!",
  "For your career path, focus on building strong fundamentals first. Projects speak louder than certificates - build 2-3 solid projects that you can explain in interviews.",
  "Google interviews focus heavily on problem-solving. Practice system design for experienced roles, and DSA for freshers. The 'Coding Interview University' on GitHub is a fantastic free resource.",
  "For web development, the Odin Project is excellent and completely free. Build projects as you learn - a portfolio of real apps will impress recruiters more than any course certificate.",
];

export function createStreamResponse(text: string) {
  const encoder = new TextEncoder();
  const words = text.split(" ");

  return new ReadableStream({
    async start(controller) {
      let currentText = "";
      for (const word of words) {
        currentText += (currentText ? " " : "") + word;
        const chunk = `data: ${JSON.stringify({ choices: [{ delta: { content: currentText } }] })}\n\n`;
        controller.enqueue(encoder.encode(chunk));
        await new Promise((r) => setTimeout(r, 30));
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { message, history = [] } = await req.json();

    if (!GROQ_API_KEY) {
      const fallback = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
      return new Response(createStreamResponse(fallback), {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.slice(-6),
      { role: "user", content: message },
    ];

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        temperature: 0.7,
        max_tokens: 500,
        stream: true,
      }),
    });

    if (!res.ok) {
      throw new Error(`Groq API error: ${res.status}`);
    }

    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = res.body!.getReader();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");
            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6).trim();
                if (data === "[DONE]") {
                  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                } else {
                  controller.enqueue(encoder.encode(`${line}\n\n`));
                }
              }
            }
          }
        } finally {
          reader.releaseLock();
          controller.close();
        }
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    const fallback = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
    return new Response(createStreamResponse(fallback), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }
});
