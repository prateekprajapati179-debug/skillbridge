import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ProgressUpdate {
  userId: string;
  action: "complete-lesson" | "earn-badge" | "update-progress";
  lessonId?: string;
  badgeName?: string;
  points?: number;
  progress?: Record<string, any>;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { userId, action, lessonId, badgeName, points, progress } = await req.json() as ProgressUpdate;

    if (!userId || !action) {
      return new Response(
        JSON.stringify({ error: "User ID and action required" }),
        { status: 400, headers: corsHeaders }
      );
    }

    let result: any = {};

    if (action === "complete-lesson") {
      result = {
        success: true,
        message: `Lesson ${lessonId} completed`,
        pointsEarned: points || 10,
        newTotal: 450 + (points || 10),
        badge: lessonId === "lesson-10" ? "Milestone Master" : null,
      };
    } else if (action === "earn-badge") {
      result = {
        success: true,
        message: `Badge '${badgeName}' earned!`,
        badge: badgeName,
        bonusPoints: 25,
        nextBadge: "System Design Expert (50 more points)",
      };
    } else if (action === "update-progress") {
      result = {
        success: true,
        message: "Progress updated",
        updated: {
          ...progress,
          lastUpdated: new Date().toISOString(),
        },
      };
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid action" }),
        { status: 400, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
});
