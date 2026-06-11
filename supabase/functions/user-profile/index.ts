import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface UserProfile {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  preferences?: Record<string, any>;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { userId, action, profileData } = await req.json();

    if (!userId) {
      return new Response(
        JSON.stringify({ error: "User ID required" }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (action === "get") {
      // Fetch user profile
      const userProfile = getMockUserProfile(userId);
      return new Response(
        JSON.stringify({
          success: true,
          profile: userProfile,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else if (action === "update") {
      // Update user profile
      return new Response(
        JSON.stringify({
          success: true,
          message: "Profile updated successfully",
          profile: { ...profileData, updatedAt: new Date().toISOString() },
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid action" }),
        { status: 400, headers: corsHeaders }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
});

function getMockUserProfile(userId: string): UserProfile {
  return {
    id: userId,
    email: "student@example.com",
    username: "CodeMaster",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    preferences: {
      theme: "dark",
      notifications: true,
      language: "en",
      publicProfile: true,
    },
  };
}
