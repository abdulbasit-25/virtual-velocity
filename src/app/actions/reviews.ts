"use server";

import { supabaseServer } from "@/lib/supabaseServer";

export interface ReviewSubmission {
  author: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
  metric?: string;
}

export interface ReviewRecord {
  id: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
  metric: string;
}

export async function submitReviewAction(data: ReviewSubmission) {
  const { author, role, company, rating, quote, metric } = data;

  if (
    typeof author !== "string" ||
    typeof quote !== "string" ||
    !author.trim() ||
    !quote.trim() ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5
  ) {
    return {
      success: false,
      message: "Please provide your name, review text, and a valid star rating.",
    };
  }

  if (rating < 4) {
    return {
      success: false,
      message: "Only reviews rated four or five stars can currently be submitted.",
    };
  }

  if (!supabaseServer) {
    console.warn("Review submission is unavailable because Supabase is not configured.");
    return {
      success: false,
      message: "Review submission is not configured yet. Please use the contact page.",
    };
  }

  try {
    const { error } = await supabaseServer.from("reviews").insert([
      {
        author: author.trim(),
        role: typeof role === "string" && role.trim() ? role.trim() : "Client",
        company:
          typeof company === "string" && company.trim()
            ? company.trim()
            : "Client Partner",
        rating,
        quote: quote.trim(),
        metric:
          typeof metric === "string" && metric.trim()
            ? metric.trim()
            : `${rating}.0 Rating`,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Supabase review submission failed:", error.message);
      return {
        success: false,
        message: "Your review could not be saved. Please try again later.",
      };
    }

    return {
      success: true,
      message: "Thank you! Your review has been submitted.",
    };
  } catch (error: unknown) {
    console.error("Server-side review submission error:", error);
    return {
      success: false,
      message: "Your review could not be saved. Please try again later.",
    };
  }
}

export async function fetchReviewsAction(): Promise<ReviewRecord[]> {
  if (!supabaseServer) {
    console.warn("Client reviews are unavailable because Supabase is not configured.");
    return [];
  }

  try {
    const { data, error } = await supabaseServer
      .from("reviews")
      .select("*")
      .gte("rating", 4)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching client reviews from Supabase:", error.message);
      return [];
    }
    if (!data || data.length === 0) return [];

    return data.map((item) => ({
      id: String(item.id),
      author: item.author,
      role: item.role,
      company: item.company,
      rating: item.rating,
      quote: item.quote,
      metric: item.metric || "5.0 Rating",
    }));
  } catch (error: unknown) {
    console.error("Error fetching reviews from Supabase server:", error);
    return [];
  }
}
