"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Quote,
  Star,
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  Award,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { SectionHeader } from "@/components/sections/home/primitives";
import { loadGsap } from "@/lib/gsapClient";
import {
  submitReviewAction,
  fetchReviewsAction,
  ReviewRecord,
} from "@/app/actions/reviews";

const AUTO_ROTATE_INTERVAL = 4000; // 4 seconds per review

export const EditorialTestimonials = () => {
  const [reviewsList, setReviewsList] = useState<ReviewRecord[]>([]);
  const [isLoadingDb, setIsLoadingDb] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPausedHover, setIsPausedHover] = useState(false);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  // Form State
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [quote, setQuote] = useState("");
  const [metric, setMetric] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);

  // Fetch reviews strictly from Supabase Database
  const loadReviewsFromDb = useCallback(async () => {
    setIsLoadingDb(true);
    const dbData = await fetchReviewsAction();
    setReviewsList(dbData);
    setIsLoadingDb(false);
  }, []);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      void loadReviewsFromDb();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [loadReviewsFromDb]);

  const normalizedActiveIdx = reviewsList.length === 0
    ? 0
    : ((activeIdx % reviewsList.length) + reviewsList.length) % reviewsList.length;

  const handleNext = useCallback(() => {
    if (reviewsList.length === 0) return;
    setActiveIdx((prev) => (prev + 1) % reviewsList.length);
  }, [reviewsList.length]);

  const handlePrev = useCallback(() => {
    if (reviewsList.length === 0) return;
    setActiveIdx((prev) => (prev - 1 + reviewsList.length) % reviewsList.length);
  }, [reviewsList.length]);

  // Timer effect for auto-changing reviews
  useEffect(() => {
    if (!isPlaying || isPausedHover || reduceMotion || reviewsList.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, AUTO_ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPlaying, isPausedHover, reduceMotion, handleNext, reviewsList.length]);

  useEffect(() => {
    if (reduceMotion) return;
    const el = sectionRef.current;
    if (!el) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const { gsap } = await loadGsap();
      if (cancelled || !sectionRef.current) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          ".gsap-testimonial-header",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }, sectionRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduceMotion]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    const res = await submitReviewAction({
      author,
      role,
      company,
      rating,
      quote,
      metric,
    });

    setIsSubmitting(false);
    setFeedback(res);

    if (res.success) {
      setAuthor("");
      setRole("");
      setCompany("");
      setQuote("");
      setMetric("");
      setRating(5);
      // Re-fetch database reviews live
      const freshData = await fetchReviewsAction();
      setReviewsList(freshData);
      setActiveIdx(0);
    }
  };

  const current = reviewsList[normalizedActiveIdx];
  const averageRating = reviewsList.length
    ? reviewsList.reduce((sum, review) => sum + review.rating, 0) / reviewsList.length
    : 0;

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setIsPausedHover(true)}
      onMouseLeave={() => setIsPausedHover(false)}
      className="py-12 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 bg-zinc-100 text-zinc-900 relative border-t border-zinc-200 select-none font-outfit"
    >
      <div className="max-w-[1700px] mx-auto space-y-10 sm:space-y-14">
        {/* Header Bar */}
        <SectionHeader
          eyebrow={<><Award aria-hidden="true" className="h-3.5 w-3.5" /> Client reviews &amp; endorsements</>}
          index="09"
          title={<>Client <span className="text-[#00A29F]">reviews.</span></>}
          className="gsap-testimonial-header"
          aside={
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-1 rounded-full border border-zinc-300 bg-zinc-200/60 px-3.5 py-1.5 text-amber-500 sm:px-4 sm:py-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                      i < Math.round(averageRating)
                        ? "fill-current"
                        : "fill-none text-zinc-400"
                    }`}
                  />
                ))}
                <span className="ml-1.5 text-xs font-outfit font-extrabold text-zinc-900 sm:ml-2">
                  {isLoadingDb
                    ? "Loading reviews"
                    : reviewsList.length
                      ? `${averageRating.toFixed(1)} rating · ${reviewsList.length} reviews`
                      : "No reviews yet"}
                </span>
              </div>

              {reviewsList.length > 1 && (
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex min-h-11 items-center gap-2 rounded-full border border-zinc-400 px-3.5 py-2 text-xs font-outfit font-extrabold transition-all duration-300 hover:bg-zinc-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A29F] focus-visible:ring-offset-2"
                  aria-label={isPlaying ? "Pause review rotation" : "Play review rotation"}
                >
                  {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  <span>{isPlaying ? (isPausedHover ? "PAUSED (HOVER)" : "AUTO-TIMER ON") : "AUTO-TIMER OFF"}</span>
                </button>
              )}
            </div>
          }
        />

        {/* 2-Column Split Layout with Vertical Divider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          
          {/* LEFT COLUMN: Database Client Reviews Showcase */}
          <div className="lg:col-span-7 flex flex-col justify-between min-h-[380px] space-y-8 lg:border-r lg:border-zinc-300 lg:pr-8 xl:pr-12">
            {isLoadingDb ? (
              <div
                role="status"
                aria-label="Loading client reviews"
                className="space-y-4 py-6"
              >
                <span className="sr-only">Loading client reviews</span>
                {[0, 1, 2].map((item) => (
                  <div
                    key={item}
                    aria-hidden="true"
                    className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-5"
                  >
                    <div className="h-3 w-24 rounded bg-zinc-200" />
                    <div className="mt-4 h-4 w-full rounded bg-zinc-200" />
                    <div className="mt-2 h-4 w-4/5 rounded bg-zinc-200" />
                    <div className="mt-5 h-3 w-32 rounded bg-zinc-200" />
                  </div>
                ))}
              </div>
            ) : reviewsList.length === 0 ? (
              <div className="p-8 sm:p-12 rounded-3xl bg-white border border-zinc-300 text-center space-y-4">
                <Quote className="w-10 h-10 text-emerald-600 mx-auto" />
                <p className="text-xl sm:text-2xl font-outfit font-black uppercase text-zinc-900">
                  No Client Reviews Stored Yet
                </p>
                <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto">
                  Submit a review using the form on the right to have your client feedback stored live in our database.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                    className="space-y-5"
                  >
                    <div className="flex items-center justify-between">
                      <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(current.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>

                    <blockquote className="text-lg sm:text-2xl lg:text-3xl font-lora font-normal leading-snug tracking-tight text-zinc-900 italic">
                      &ldquo;{current.quote}&rdquo;
                    </blockquote>

                    <div className="pt-4 border-t border-zinc-300">
                      <span className="font-outfit font-black text-base sm:text-lg uppercase text-zinc-900 block">
                        {current.author}
                      </span>
                      <span className="text-xs font-outfit font-bold text-zinc-700 block uppercase">
                        {current.role} • {current.company}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Impact Metric Badge */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-zinc-300 shadow-xs flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">
                      IMPACT METRIC
                    </span>
                    <span className="text-xl sm:text-2xl font-outfit font-black text-emerald-600 uppercase">
                      {current.metric}
                    </span>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                </div>
              </div>
            )}

            {/* Carousel Controls */}
            {reviewsList.length > 0 && (
              <div className="flex items-center justify-between pt-4 border-t border-zinc-300">
                <div className="flex items-center gap-2">
                  {reviewsList.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIdx(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === normalizedActiveIdx ? "w-8 bg-emerald-600" : "w-2 bg-zinc-300 hover:bg-zinc-500"
                      }`}
                      aria-label={`Go to review ${idx + 1}`}
                    />
                  ))}
                </div>

                {reviewsList.length > 1 && (
                  <div className="flex items-center gap-3">
                    <Magnetic strength={0.2}>
                      <button
                        onClick={handlePrev}
                        className="p-3 rounded-full border border-zinc-400 bg-white hover:bg-zinc-900 hover:text-white transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center shadow-xs cursor-pointer"
                        aria-label="Previous review"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                    </Magnetic>
                    <Magnetic strength={0.2}>
                      <button
                        onClick={handleNext}
                        className="p-3 rounded-full border border-zinc-400 bg-white hover:bg-zinc-900 hover:text-white transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center shadow-xs cursor-pointer"
                        aria-label="Next review"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Magnetic>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Clean Review Submission Form */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-300 shadow-md space-y-5 font-outfit">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>CLIENT FEEDBACK</span>
              </div>
            </div>

            <button
              type="button"
              aria-expanded={isReviewFormOpen}
              aria-controls="review-submission-form"
              onClick={() => setIsReviewFormOpen((open) => !open)}
              className="flex min-h-12 w-full items-center justify-between gap-4 rounded-xl border border-zinc-200 px-4 py-3 text-left font-outfit text-xl font-extrabold uppercase text-zinc-950 transition-colors hover:border-[#00A29F]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A29F] focus-visible:ring-offset-2 sm:text-2xl"
            >
              <span>Leave a <span className="text-[#006766]">review</span></span>
              <span aria-hidden="true" className="text-sm font-bold text-[#006766]">
                {isReviewFormOpen ? "−" : "+"}
              </span>
            </button>

            {/* Post-submission Feedback Notification */}
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-2xl border flex items-start gap-3 text-xs font-semibold ${
                  feedback.success
                    ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                    : "bg-rose-50 border-rose-300 text-rose-900"
                }`}
                role={feedback.success ? "status" : "alert"}
                aria-live="polite"
              >
                {feedback.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                )}
                <span>{feedback.message}</span>
              </motion.div>
            )}

            {/* Form */}
            {isReviewFormOpen && (
            <form id="review-submission-form" onSubmit={handleSubmit} className="space-y-4">
              {/* Star Rating Picker */}
              <div className="space-y-1.5">
                <label id="review-rating-label" className="block text-xs font-bold uppercase text-zinc-700 tracking-wider">
                  YOUR RATING *
                </label>
                  <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((starVal) => {
                    const activeRating = hoverRating !== null ? hoverRating : rating;
                    const isFilled = starVal <= activeRating;
                    return (
                      <button
                        key={starVal}
                        type="button"
                        onClick={() => setRating(starVal)}
                        onMouseEnter={() => setHoverRating(starVal)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 text-amber-400 hover:scale-105 transition-transform duration-200 cursor-pointer"
                        aria-label={`Rate ${starVal} stars`}
                        aria-pressed={rating === starVal}
                      >
                        <Star
                          className={`w-6 h-6 ${
                            isFilled ? "fill-current text-amber-400" : "text-zinc-300"
                          }`}
                        />
                      </button>
                    );
                  })}
                  <span className="ml-2 text-xs font-bold text-zinc-950">
                    {rating}.0 STARS
                  </span>
                </div>
              </div>

              {/* Two Column Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="review-author" className="block text-xs font-bold uppercase text-zinc-700 tracking-wider mb-1">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    id="review-author"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3.5 py-3 text-base sm:text-sm rounded-xl border border-zinc-300 font-medium text-zinc-900 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 transition-all font-outfit"
                  />
                </div>
                <div>
                  <label htmlFor="review-role" className="block text-xs font-bold uppercase text-zinc-700 tracking-wider mb-1">
                    ROLE / TITLE
                  </label>
                  <input
                    type="text"
                    id="review-role"
                    placeholder="e.g. Head of Growth"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-3 text-base sm:text-sm rounded-xl border border-zinc-300 font-medium text-zinc-900 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 transition-all font-outfit"
                  />
                </div>
              </div>

              {/* Company & Metric */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="review-company" className="block text-xs font-bold uppercase text-zinc-700 tracking-wider mb-1">
                    COMPANY / BRAND
                  </label>
                  <input
                    type="text"
                    id="review-company"
                    placeholder="e.g. Nexus Retail"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3.5 py-3 text-base sm:text-sm rounded-xl border border-zinc-300 font-medium text-zinc-900 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 transition-all font-outfit"
                  />
                </div>
                <div>
                  <label htmlFor="review-metric" className="block text-xs font-bold uppercase text-zinc-700 tracking-wider mb-1">
                    IMPACT METRIC
                  </label>
                  <input
                    type="text"
                    id="review-metric"
                    placeholder="e.g. +310% Revenue"
                    value={metric}
                    onChange={(e) => setMetric(e.target.value)}
                    className="w-full px-3.5 py-3 text-base sm:text-sm rounded-xl border border-zinc-300 font-medium text-zinc-900 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 transition-all font-outfit"
                  />
                </div>
              </div>

              {/* Review Quote Text */}
              <div>
                <label htmlFor="review-quote" className="block text-xs font-bold uppercase text-zinc-700 tracking-wider mb-1">
                  YOUR REVIEW *
                </label>
                <textarea
                  required
                  id="review-quote"
                  rows={3}
                  placeholder="Share your experience working with Virtual Velocity..."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full px-3.5 py-3 text-base sm:text-sm rounded-xl border border-zinc-300 font-medium text-zinc-900 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 transition-all resize-none font-outfit"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 min-h-[44px] font-outfit"
              >
                {isSubmitting ? (
                  <span>SUBMITTING...</span>
                ) : (
                  <>
                    <span>SUBMIT REVIEW</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
