import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface LeaderboardEntry {
  id: string;
  userId: string;
  username: string;
  totalPoints: number;
  badgesCount: number;
  rank: number;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    // Get query parameters for filters
    const url = new URL(req.url);
    const limit = Number(url.searchParams.get("limit")) || 10;
    const offset = Number(url.searchParams.get("offset")) || 0;

    // Get leaderboard data
    const leaderboard = generateMockLeaderboard(limit, offset);

    return new Response(
      JSON.stringify({
        success: true,
        data: leaderboard,
        total: 100,
        limit,
        offset,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
});

function generateMockLeaderboard(limit: number, offset: number): LeaderboardEntry[] {
  const mockData: LeaderboardEntry[] = [
    { id: "1", userId: "user-1", username: "Sarah Chen", totalPoints: 2850, badgesCount: 12, rank: 1 },
    { id: "2", userId: "user-2", username: "Arjun Patel", totalPoints: 2720, badgesCount: 11, rank: 2 },
    { id: "3", userId: "user-3", username: "Priya Sharma", totalPoints: 2650, badgesCount: 10, rank: 3 },
    { id: "4", userId: "user-4", username: "Rahul Kumar", totalPoints: 2480, badgesCount: 9, rank: 4 },
    { id: "5", userId: "user-5", username: "Neha Gupta", totalPoints: 2350, badgesCount: 8, rank: 5 },
    { id: "6", userId: "user-6", username: "Aditya Singh", totalPoints: 2200, badgesCount: 7, rank: 6 },
    { id: "7", userId: "user-7", username: "Divya Nair", totalPoints: 2100, badgesCount: 6, rank: 7 },
    { id: "8", userId: "user-8", username: "Vikram Reddy", totalPoints: 1950, badgesCount: 5, rank: 8 },
    { id: "9", userId: "user-9", username: "Anjali Verma", totalPoints: 1800, badgesCount: 5, rank: 9 },
    { id: "10", userId: "user-10", username: "Rohan Malhotra", totalPoints: 1650, badgesCount: 4, rank: 10 },
    { id: "11", userId: "user-11", username: "Zara Khan", totalPoints: 1500, badgesCount: 3, rank: 11 },
    { id: "12", userId: "user-12", username: "Rajesh Negi", totalPoints: 1350, badgesCount: 3, rank: 12 },
    { id: "13", userId: "user-13", username: "Deepika Singh", totalPoints: 1200, badgesCount: 2, rank: 13 },
    { id: "14", userId: "user-14", username: "Ashok Yadav", totalPoints: 1050, badgesCount: 2, rank: 14 },
    { id: "15", userId: "user-15", username: "Bhavna Iyer", totalPoints: 950, badgesCount: 1, rank: 15 },
  ];

  return mockData.slice(offset, offset + limit);
}
