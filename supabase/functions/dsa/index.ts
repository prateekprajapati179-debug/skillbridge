import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const DSA_QUESTIONS: Record<string, Array<{ id: number; title: string; difficulty: string; topic: string; leetcodeUrl: string }>> = {
  Google: [
    { id: 1, title: "Two Sum", difficulty: "Easy", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/two-sum/" },
    { id: 2, title: "Median of Two Sorted Arrays", difficulty: "Hard", topic: "Binary Search", leetcodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
    { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", topic: "Sliding Window", leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
    { id: 4, title: "Word Ladder", difficulty: "Hard", topic: "BFS/Graph", leetcodeUrl: "https://leetcode.com/problems/word-ladder/" },
    { id: 5, title: "LRU Cache", difficulty: "Medium", topic: "Design", leetcodeUrl: "https://leetcode.com/problems/lru-cache/" },
    { id: 6, title: "Trapping Rain Water", difficulty: "Hard", topic: "Two Pointers", leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/" },
    { id: 7, title: "Number of Islands", difficulty: "Medium", topic: "DFS/BFS", leetcodeUrl: "https://leetcode.com/problems/number-of-islands/" },
    { id: 8, title: "Maximum Subarray", difficulty: "Medium", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/" },
    { id: 9, title: "Valid Parentheses", difficulty: "Easy", topic: "Stack", leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/" },
    { id: 10, title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", topic: "Trees", leetcodeUrl: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" },
  ],
  Amazon: [
    { id: 1, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
    { id: 2, title: "Top K Frequent Elements", difficulty: "Medium", topic: "Heap", leetcodeUrl: "https://leetcode.com/problems/top-k-frequent-elements/" },
    { id: 3, title: "Merge Intervals", difficulty: "Medium", topic: "Sorting", leetcodeUrl: "https://leetcode.com/problems/merge-intervals/" },
    { id: 4, title: "Course Schedule", difficulty: "Medium", topic: "Topological Sort", leetcodeUrl: "https://leetcode.com/problems/course-schedule/" },
    { id: 5, title: "Copy List with Random Pointer", difficulty: "Medium", topic: "Linked List", leetcodeUrl: "https://leetcode.com/problems/copy-list-with-random-pointer/" },
    { id: 6, title: "Spiral Matrix", difficulty: "Medium", topic: "Matrix", leetcodeUrl: "https://leetcode.com/problems/spiral-matrix/" },
    { id: 7, title: "Sliding Window Maximum", difficulty: "Hard", topic: "Deque", leetcodeUrl: "https://leetcode.com/problems/sliding-window-maximum/" },
    { id: 8, title: "Minimum Path Sum", difficulty: "Medium", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/minimum-path-sum/" },
    { id: 9, title: "Palindrome Linked List", difficulty: "Easy", topic: "Linked List", leetcodeUrl: "https://leetcode.com/problems/palindrome-linked-list/" },
    { id: 10, title: "Robot Room Cleaner", difficulty: "Hard", topic: "DFS", leetcodeUrl: "https://leetcode.com/problems/robot-room-cleaner/" },
  ],
  Microsoft: [
    { id: 1, title: "Reverse Linked List", difficulty: "Easy", topic: "Linked List", leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/" },
    { id: 2, title: "Binary Tree Level Order Traversal", difficulty: "Medium", topic: "BFS", leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
    { id: 3, title: "Clone Graph", difficulty: "Medium", topic: "Graph", leetcodeUrl: "https://leetcode.com/problems/clone-graph/" },
    { id: 4, title: "Find Median from Data Stream", difficulty: "Hard", topic: "Heap", leetcodeUrl: "https://leetcode.com/problems/find-median-from-data-stream/" },
    { id: 5, title: "Implement Trie", difficulty: "Medium", topic: "Trie", leetcodeUrl: "https://leetcode.com/problems/implement-trie-prefix-tree/" },
    { id: 6, title: "Alien Dictionary", difficulty: "Hard", topic: "Topological Sort", leetcodeUrl: "https://leetcode.com/problems/alien-dictionary/" },
    { id: 7, title: "Coin Change", difficulty: "Medium", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/coin-change/" },
    { id: 8, title: "Product of Array Except Self", difficulty: "Medium", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self/" },
    { id: 9, title: "Missing Number", difficulty: "Easy", topic: "Math", leetcodeUrl: "https://leetcode.com/problems/missing-number/" },
    { id: 10, title: "Minimum Window Substring", difficulty: "Hard", topic: "Sliding Window", leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring/" },
  ],
  Flipkart: [
    { id: 1, title: "Search in Rotated Sorted Array", difficulty: "Medium", topic: "Binary Search", leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
    { id: 2, title: "Jump Game", difficulty: "Medium", topic: "Greedy", leetcodeUrl: "https://leetcode.com/problems/jump-game/" },
    { id: 3, title: "Word Search", difficulty: "Medium", topic: "Backtracking", leetcodeUrl: "https://leetcode.com/problems/word-search/" },
    { id: 4, title: "Kth Largest Element in Array", difficulty: "Medium", topic: "Heap", leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
    { id: 5, title: "Longest Palindromic Substring", difficulty: "Medium", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-substring/" },
    { id: 6, title: "Container With Most Water", difficulty: "Medium", topic: "Two Pointers", leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/" },
    { id: 7, title: "Decode Ways", difficulty: "Medium", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/decode-ways/" },
    { id: 8, title: "Rotate Image", difficulty: "Medium", topic: "Matrix", leetcodeUrl: "https://leetcode.com/problems/rotate-image/" },
    { id: 9, title: "Group Anagrams", difficulty: "Medium", topic: "Hashing", leetcodeUrl: "https://leetcode.com/problems/group-anagrams/" },
    { id: 10, title: "Set Matrix Zeroes", difficulty: "Medium", topic: "Matrix", leetcodeUrl: "https://leetcode.com/problems/set-matrix-zeroes/" },
  ],
  Zomato: [
    { id: 1, title: "Two Sum II", difficulty: "Easy", topic: "Two Pointers", leetcodeUrl: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
    { id: 2, title: "Maximum Product Subarray", difficulty: "Medium", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/maximum-product-subarray/" },
    { id: 3, title: "Find All Anagrams in a String", difficulty: "Medium", topic: "Sliding Window", leetcodeUrl: "https://leetcode.com/problems/find-all-anagrams-in-a-string/" },
    { id: 4, title: "Flatten Nested List Iterator", difficulty: "Medium", topic: "Stack", leetcodeUrl: "https://leetcode.com/problems/flatten-nested-list-iterator/" },
    { id: 5, title: "Min Stack", difficulty: "Easy", topic: "Stack", leetcodeUrl: "https://leetcode.com/problems/min-stack/" },
    { id: 6, title: "Subarray Sum Equals K", difficulty: "Medium", topic: "Prefix Sum", leetcodeUrl: "https://leetcode.com/problems/subarray-sum-equals-k/" },
    { id: 7, title: "Linked List Cycle", difficulty: "Easy", topic: "Linked List", leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle/" },
    { id: 8, title: "Meeting Rooms II", difficulty: "Medium", topic: "Intervals", leetcodeUrl: "https://leetcode.com/problems/meeting-rooms-ii/" },
    { id: 9, title: "Sort Colors", difficulty: "Medium", topic: "Two Pointers", leetcodeUrl: "https://leetcode.com/problems/sort-colors/" },
    { id: 10, title: "Longest Common Subsequence", difficulty: "Medium", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/longest-common-subsequence/" },
  ],
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { company } = await req.json();
    const questions = DSA_QUESTIONS[company] || DSA_QUESTIONS["Google"];

    return new Response(JSON.stringify({ questions }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
