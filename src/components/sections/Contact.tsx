"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Send,
  CheckCircle2,
  Check,
  Clock,
  ShieldCheck,
  ChevronDown,
  Globe,
  ArrowLeft,
  ArrowRight,
  Loader2,
} from "lucide-react";

const SERVICE_OPTIONS = [
  "Branding",
  "Social Media",
  "Photography",
  "Videography",
  "Shopify Store",
  "Influencer Marketing",
  "Search Engine Optimization",
  "Meta Advertising",
  "Google Advertising",
  "Software Development",
];

const BUDGET_OPTIONS = ["$5k - $15k", "$15k - $50k", "$50k - $100k", "$100k+"];

const HEAR_ABOUT_OPTIONS = [
  "Google Search",
  "TikTok",
  "Facebook",
  "Instagram",
  "Client Referral",
  "Clutch / Awwwards",
  "Other",
];

const REGIONAL_HUBS = [
  {
    flag: "🇺🇸",
    country: "United States",
    city: "Washington, D.C.",
    timezone: "America/New_York",
  },
  {
    flag: "🇬🇧",
    country: "United Kingdom",
    city: "London",
    timezone: "Europe/London",
  },
  {
    flag: "🇦🇪",
    country: "United Arab Emirates",
    city: "Abu Dhabi",
    timezone: "Asia/Dubai",
  },
  {
    flag: "🇵🇰",
    country: "Pakistan",
    city: "Islamabad",
    timezone: "Asia/Karachi",
  },
];

const inputCls =
  "w-full bg-white/70 backdrop-blur-xs border border-zinc-200/90 text-zinc-900 font-normal text-base sm:text-sm focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 rounded-xl px-3.5 sm:px-4 py-3 sm:py-3.5 placeholder:text-zinc-400 transition-all shadow-2xs";
const labelCls = "text-[13px] font-medium text-zinc-600 block tracking-normal";

/** Lower-case, letters and digits only, for loose matching. */
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/** Match titles from the Services page to the options in this form. */
function matchServices(requested: string[]) {
  const matched: string[] = [];
  const unmatched: string[] = [];
  requested.forEach((r) => {
    const n = norm(r);
    const hit = SERVICE_OPTIONS.find((o) => {
      const on = norm(o);
      return on === n || (n.length >= 4 && (on.includes(n) || n.includes(on)));
    });
    if (hit) {
      if (!matched.includes(hit)) matched.push(hit);
    } else {
      unmatched.push(r);
    }
  });
  return { matched, unmatched };
}

/** Live clock. Isolated so the ticking never re-renders the form. */
function HubClock({ timezone }: { timezone: string }) {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const opts: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    let fmt: Intl.DateTimeFormat;
    try {
      fmt = new Intl.DateTimeFormat("en-US", { ...opts, timeZone: timezone });
    } catch {
      fmt = new Intl.DateTimeFormat("en-US", opts);
    }
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timezone]);

  return <>{time}</>;
}

type ContactProps = {
  /**
   * Where to POST the brief as JSON. If omitted, the form only shows the
   * success screen and sends nothing (same as before).
   */
  endpoint?: string;
};

export const Contact = ({ endpoint }: ContactProps) => {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [step, setStep] = useState<1 | 2>(1);
  const [stepError, setStepError] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Google Advertising",
  ]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    designation: "",
    budget: "$15k - $50k",
    hearAbout: "Google Search",
    message: "",
    website: "", // honeypot: real people never see or fill this
  });

  // Prefill from /contact?services=A, B (sent by the Services page)
  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("services");
    if (!raw) return;
    const requested = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 12);
    if (!requested.length) return;

    const { matched, unmatched } = matchServices(requested);
    if (matched.length) setSelectedServices(matched);
    if (unmatched.length) {
      setFormData((f) =>
        f.message
          ? f
          : {
              ...f,
              message: `I'm interested in: ${unmatched.join(", ")}.\n\n`,
            },
      );
    }
  }, []);

  const toggleService = (service: string) => {
    setStepError("");
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const goToStep2 = () => {
    const email = formData.email.trim();
    if (!selectedServices.length) {
      setStepError("Please select at least one service to continue.");
      return;
    }
    if (!formData.name.trim() || !email) {
      setStepError("Please enter your full name and work email to continue.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStepError(
        "That work email doesn't look valid — please double-check it.",
      );
      return;
    }
    setStepError("");
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    if (formData.phone.replace(/\D/g, "").length < 7) {
      setStepError("Please enter a valid phone number.");
      return;
    }
    setStepError("");

    // Honeypot filled → pretend success, send nothing.
    if (formData.website) {
      setSubmitted(true);
      return;
    }

    if (!endpoint) {
      setSubmitted(true);
      return;
    }

    setStatus("sending");
    try {
      const { website: _hp, ...rest } = formData;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...rest, services: selectedServices }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("idle");
      setSubmitted(true);
    } catch {
      setStatus("error");
      setStepError(
        "Something went wrong sending your brief. Please try again.",
      );
    }
  };

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-12 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 max-w-[1700px] mx-auto border-t border-zinc-200 overflow-hidden bg-white selection:bg-zinc-900 selection:text-white"
    >
      <div className="absolute top-1/2 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-zinc-200/35 blur-[120px] sm:blur-[180px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-stretch">
        {/* Left column */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 sm:space-y-8">
          <div className="space-y-6">
            <motion.div {...reveal(0)} className="space-y-3">
              <span className="text-xs sm:text-sm font-outfit font-extrabold text-[#00A29F] uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00A29F] animate-pulse motion-reduce:animate-none" />
                INITIATE PARTNERSHIP
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-outfit font-black text-zinc-900 uppercase tracking-tight leading-tight">
                LET&apos;S ENGINEER YOUR{" "}
                <span className="text-[#00A29F]">NEXT LEAP</span>
              </h2>
              <p className="text-sm sm:text-base font-outfit text-zinc-600 font-normal leading-relaxed">
                Scale your brand across high-growth international markets. Fill
                out your campaign brief and our senior strategists will
                formulate an ROI roadmap within 12 hours.
              </p>
            </motion.div>

            <motion.div
              {...reveal(0.1)}
              className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3 sm:gap-4"
            >
              <div className="p-4 sm:p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-zinc-200/80 flex items-center gap-3.5 shadow-xs">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <span className="block text-xs sm:text-sm font-outfit font-black text-zinc-900 uppercase tracking-wider">
                    12-HOUR RESPONSE
                  </span>
                  <span className="text-[11px] sm:text-xs font-outfit font-medium text-zinc-700">
                    DIRECT PROPOSAL
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-zinc-200/80 flex items-center gap-3.5 shadow-xs">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <span className="block text-xs sm:text-sm font-outfit font-black text-zinc-900 uppercase tracking-wider">
                    NDA GUARANTEED
                  </span>
                  <span className="text-[11px] sm:text-xs font-outfit font-medium text-zinc-700">
                    CONFIDENTIALITY
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Form card */}
        <motion.div
          {...reveal(0.15)}
          className="lg:col-span-7 bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_20px_60px_-15px_rgba(0,162,159,0.12),0_8px_30px_rgba(0,0,0,0.04)] p-4 min-[420px]:p-6 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl relative flex flex-col justify-between text-zinc-900 overflow-hidden font-inter"
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-emerald-300/15 blur-3xl pointer-events-none" />

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 my-auto text-center space-y-4 relative z-10"
              role="status"
            >
              <motion.div
                initial={{ scale: reduce ? 1 : 0.4 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 14 }}
                className="mx-auto w-fit"
              >
                <CheckCircle2 className="w-14 h-14 text-emerald-600" />
              </motion.div>
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 uppercase tracking-tight">
                INQUIRY TRANSMITTED
              </h3>
              <p className="text-zinc-700 max-w-md mx-auto text-sm font-normal leading-relaxed">
                Thank you{" "}
                <span className="text-emerald-700 font-bold">
                  {formData.name}
                </span>
                . Our team has received your request and will respond within 12
                hours.
              </p>
              {selectedServices.length > 0 && (
                <ul className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                  {selectedServices.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStatus("idle");
                  setStepError("");
                  setStep(1);
                }}
                className="px-6 py-3 rounded-full border border-zinc-300 text-xs font-semibold text-zinc-900 bg-white/80 hover:bg-zinc-900 hover:text-white uppercase tracking-wide transition-all min-h-[44px] shadow-xs cursor-pointer"
              >
                SUBMIT ANOTHER REQUEST
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col justify-between space-y-6 sm:space-y-7 relative z-10"
            >
              {/* Honeypot */}
              <div
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
              >
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
              </div>

              {/* Progress */}
              <div className="pb-2 sm:pb-3 border-b border-zinc-200/70 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-4">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {[1, 2].map((s) => (
                      <div
                        key={s}
                        className="flex items-center gap-1.5 sm:gap-2.5"
                      >
                        <button
                          type="button"
                          onClick={() => (s === 1 ? setStep(1) : goToStep2())}
                          aria-label={`Go to step ${s}`}
                          aria-current={step === s ? "step" : undefined}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-semibold border transition-all cursor-pointer ${
                            step >= s
                              ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                              : "bg-white/60 border-zinc-400 text-zinc-700 hover:border-emerald-500 hover:text-emerald-600"
                          }`}
                        >
                          {step > s ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            String(s).padStart(2, "0")
                          )}
                        </button>
                        <span
                          className={`text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap ${
                            step === s ? "text-emerald-700" : "text-zinc-600"
                          }`}
                        >
                          {s === 1 ? "Services & Info" : "Campaign Brief"}
                        </span>
                        {s === 1 && (
                          <span className="hidden min-[420px]:inline-block w-4 sm:w-8 h-px bg-zinc-300 ml-1" />
                        )}
                      </div>
                    ))}
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full whitespace-nowrap">
                    STEP {step} OF 2
                  </span>
                </div>
                <div
                  className="h-1 w-full rounded-full bg-zinc-200/80 overflow-hidden"
                  aria-hidden="true"
                >
                  <motion.div
                    className="h-full bg-emerald-600 rounded-full"
                    animate={{ width: step === 1 ? "50%" : "100%" }}
                    transition={{
                      duration: reduce ? 0 : 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              </div>

              {step === 1 ? (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: reduce ? 0 : -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col space-y-5 sm:space-y-6"
                >
                  <fieldset className="space-y-2.5">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <legend className={labelCls}>
                        1. Services required *
                      </legend>
                      <span
                        className="text-[11px] text-zinc-600 font-medium"
                        aria-live="polite"
                      >
                        {selectedServices.length
                          ? `${selectedServices.length} selected`
                          : "Select all that apply"}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-2.5">
                      {SERVICE_OPTIONS.map((service) => {
                        const isSelected = selectedServices.includes(service);
                        return (
                          <button
                            type="button"
                            key={service}
                            onClick={() => toggleService(service)}
                            aria-pressed={isSelected}
                            className={`p-2.5 px-3 rounded-xl border text-left text-[13px] font-medium tracking-normal transition-all duration-200 flex items-center justify-between gap-1.5 min-h-[44px] cursor-pointer ${
                              isSelected
                                ? "bg-emerald-50/90 border-2 border-emerald-600 text-emerald-950 shadow-xs"
                                : "bg-white/70 border-zinc-200/90 text-zinc-800 hover:border-emerald-500/50 hover:bg-emerald-50/40 hover:text-zinc-900"
                            }`}
                          >
                            <span className="truncate">{service}</span>
                            <span
                              className={`w-4 h-4 rounded-xs border flex items-center justify-center flex-shrink-0 transition-colors ${
                                isSelected
                                  ? "bg-emerald-600 border-emerald-600 text-white"
                                  : "border-zinc-300 bg-white"
                              }`}
                            >
                              {isSelected && (
                                <Check className="w-3 h-3 text-white" />
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className={labelCls}>
                        Full name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        autoComplete="name"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={inputCls}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className={labelCls}>
                        Work email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="sarah@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {stepError && (
                    <p
                      role="alert"
                      className="text-[13px] font-medium text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-3.5 py-2.5"
                    >
                      {stepError}
                    </p>
                  )}

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={goToStep2}
                      className="w-full min-[420px]:w-auto inline-flex items-center justify-center gap-2 bg-zinc-950 hover:bg-emerald-600 text-white font-semibold text-xs px-6 sm:px-8 py-3.5 rounded-xl uppercase tracking-wide transition-all shadow-md shadow-zinc-950/10 active:scale-[0.98] cursor-pointer min-h-[46px] group"
                    >
                      <span>CONTINUE TO BRIEF</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: reduce ? 0 : 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col space-y-5 sm:space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-phone" className={labelCls}>
                        Phone number *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className={inputCls}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="contact-company" className={labelCls}>
                        Company name
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Nexus Retail"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className={inputCls}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="contact-title" className={labelCls}>
                        Job title
                      </label>
                      <input
                        id="contact-title"
                        type="text"
                        autoComplete="organization-title"
                        placeholder="VP of Marketing"
                        value={formData.designation}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            designation: e.target.value,
                          })
                        }
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <fieldset className="space-y-2.5">
                    <legend className={labelCls}>
                      2. Monthly ad budget range
                    </legend>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                      {BUDGET_OPTIONS.map((b) => (
                        <label
                          key={b}
                          className={`py-3 px-2.5 rounded-xl border text-center text-xs font-semibold uppercase tracking-normal cursor-pointer transition-all duration-200 min-h-[46px] flex items-center justify-center focus-within:ring-2 focus-within:ring-emerald-500/40 ${
                            formData.budget === b
                              ? "bg-zinc-900 border-2 border-zinc-900 text-white shadow-md scale-[1.01]"
                              : "bg-white/70 border-zinc-200/90 text-zinc-800 hover:border-emerald-500/50 hover:bg-emerald-50/40 hover:text-zinc-900"
                          }`}
                        >
                          <input
                            type="radio"
                            name="budget"
                            value={b}
                            checked={formData.budget === b}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                budget: e.target.value,
                              })
                            }
                            className="sr-only"
                          />
                          <span>{b}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-hear" className={labelCls}>
                      How did you hear about us?
                    </label>
                    <div className="relative">
                      <select
                        id="contact-hear"
                        value={formData.hearAbout}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hearAbout: e.target.value,
                          })
                        }
                        className="w-full appearance-none bg-white/70 border border-zinc-200/90 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-zinc-900 font-normal text-base sm:text-sm px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-xl cursor-pointer shadow-2xs transition-all outline-none min-h-[46px]"
                      >
                        {HEAR_ABOUT_OPTIONS.map((opt) => (
                          <option
                            key={opt}
                            value={opt}
                            className="bg-white text-zinc-950 font-normal py-2"
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className={labelCls}>
                      Campaign objectives &amp; goals *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      placeholder="Outline your targets, monthly ad budget, website URL..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className={`${inputCls} p-3.5 sm:p-4 resize-none`}
                    />
                  </div>

                  {stepError && (
                    <p
                      role="alert"
                      className="text-[13px] font-medium text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-3.5 py-2.5"
                    >
                      {stepError}
                    </p>
                  )}

                  <div className="pt-2 flex flex-col-reverse min-[420px]:flex-row items-stretch min-[420px]:items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setStepError("");
                        setStep(1);
                      }}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-zinc-300 bg-white/80 text-zinc-800 font-semibold text-xs uppercase tracking-wide hover:bg-zinc-100 hover:text-zinc-950 transition-all cursor-pointer min-h-[44px] group"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                      <span>BACK TO STEP 1</span>
                    </button>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 disabled:cursor-wait text-white font-semibold text-xs px-6 sm:px-7 py-3.5 rounded-xl uppercase tracking-wide transition-all shadow-md shadow-emerald-600/25 active:scale-[0.98] cursor-pointer min-h-[46px] group"
                    >
                      <span>
                        {status === "sending" ? "SENDING…" : "SUBMIT BRIEF"}
                      </span>
                      {status === "sending" ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          )}
        </motion.div>
      </div>

      {/* Regional hubs */}
      <motion.div
        {...reveal(0)}
        className="relative z-10 mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-zinc-200 space-y-4 sm:space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-outfit font-extrabold text-emerald-600 uppercase tracking-wider">
              REGIONAL OPERATIONAL HUBS
            </span>
          </div>
          <span className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse motion-reduce:animate-none" />
            ACTIVE STANDARD TIME &bull; REAL-TIME SYNC
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5">
          {REGIONAL_HUBS.map((hub) => (
            <div
              key={hub.city}
              className="py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-lg bg-zinc-50/90 border border-zinc-200/90 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <span
                  className="text-lg sm:text-xl flex-shrink-0 leading-none"
                  role="img"
                  aria-label={hub.country}
                >
                  {hub.flag}
                </span>
                <div className="min-w-0 flex-1">
                  <span className="font-outfit font-black text-zinc-950 text-xs sm:text-[13px] tracking-tight block leading-tight truncate">
                    {hub.country}
                  </span>
                  <div className="flex items-center justify-between gap-1.5 mt-0.5">
                    <span className="text-[10px] sm:text-[11px] font-outfit font-bold text-zinc-800 truncate">
                      {hub.city}
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold text-emerald-600 tabular-nums shrink-0 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse motion-reduce:animate-none" />
                      <HubClock timezone={hub.timezone} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
