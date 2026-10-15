"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CheckCircle2, Minus, Plus } from "lucide-react";
import { AGENCY_METRICS } from "@/data/agencyData";
import { SectionHeader } from "@/components/sections/home/primitives";

const FAQS = [
  {
    id: "faq-1",
    q: "Why is Virtual Velocity the leading Digital Marketing Agency in Pakistan and Islamabad?",
    a: `Virtual Velocity is a full-service Digital Marketing Agency in Pakistan and Islamabad providing end-to-end Digital Marketing Services, Google Ads PPC, Meta Ads Agency campaigns, Technical SEO, and proprietary media reach across ${AGENCY_METRICS.ownedAudience.display} active regional consumers.`,
  },
  {
    id: "faq-2",
    q: "What BPO Services and Call Center Outsourcing solutions do you offer in Pakistan?",
    a: "As a premier Outsourcing Company Pakistan, we deliver complete Business Outsourcing Services including BPO Services Pakistan, Customer Service Outsourcing, Customer Support Outsourcing, and Call Center Outsourcing Pakistan with dedicated multilingual teams.",
  },
  {
    id: "faq-3",
    q: "How does your Hospitality Marketing Agency boost hotel bookings and direct revenue?",
    a: "Our Hospitality Marketing Agency provides targeted Hotel Marketing Agency solutions, Hotel Social Media Marketing, Hospitality Digital Marketing, Hotel Advertising Agency campaigns, and Hotel SEO Services designed to drive direct online bookings and maximize RevPAR.",
  },
  {
    id: "faq-4",
    q: "What Restaurant Marketing Services and Restaurant Lead Generation strategies do you deploy?",
    a: "We operate as a specialized Restaurant Marketing Agency providing Restaurant Digital Marketing, Restaurant Social Media Marketing, food brand reels, Restaurant Advertising Agency ads, Restaurant SEO Services for Google Maps, and high-converting Restaurant Lead Generation.",
  },
  {
    id: "faq-5",
    q: "Why partner with Virtual Velocity for Performance Marketing, Meta Ads & Google Ads Agency services?",
    a: "We are an elite Performance Marketing Agency, Meta Ads Agency, and Google Ads Agency. As a full-scale Lead Generation Agency & Paid Advertising Agency, we scale ROAS, lower customer acquisition costs, and maximize revenue velocity.",
  },
];

export const SEOTextSection = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");
  const reduceMotion = useReducedMotion();

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="home-section overflow-x-hidden border-t border-zinc-200 bg-zinc-50 px-4 text-zinc-900 sm:px-8 lg:px-12">
      <div className="home-container">
        <SectionHeader
          eyebrow="Frequently Asked Questions"
          index="08"
          title={<>Everything You Need to <span className="text-[#00A29F]">Know</span></>}
          description="Clear answers regarding our Digital Marketing, BPO &amp; Outsourcing, Hospitality, Restaurant Lead Generation, and Performance Advertising capabilities."
          className="mx-auto max-w-4xl text-center sm:flex-col sm:items-center"
        />

          <div className="mx-auto w-full max-w-4xl space-y-3">
            {FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen ? "border-emerald-500 shadow-md ring-1 ring-emerald-500/20" : "border-zinc-200 shadow-xs hover:border-zinc-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`${faq.id}-content`}
                    id={`${faq.id}-question`}
                    className="flex min-h-14 w-full cursor-pointer select-none items-center justify-between gap-4 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00A29F] sm:p-5"
                  >
                    <span className="text-sm sm:text-base font-bold text-zinc-900 uppercase flex items-center gap-2.5 leading-snug">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 transition-colors ${isOpen ? "text-emerald-600" : "text-zinc-400"}`} />
                      <span>{faq.q}</span>
                    </span>
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${isOpen ? "rotate-180 bg-emerald-50 text-emerald-600" : "bg-zinc-100 text-zinc-500"}`}>
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`${faq.id}-content`}
                        role="region"
                        aria-labelledby={`${faq.id}-question`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 text-xs sm:text-sm text-zinc-700 font-normal leading-relaxed pl-10 sm:pl-11 border-t border-zinc-100 text-left">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-3 text-center">
            <p className="text-sm font-semibold text-zinc-700">Still have questions?</p>
            <Link
              href="#contact"
              className="inline-flex min-h-11 items-center rounded-full border border-[#00A29F]/35 bg-white px-5 py-2 text-sm font-bold text-[#006766] transition-colors hover:bg-[#00A29F] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A29F] focus-visible:ring-offset-2"
            >
              Talk to us
            </Link>
          </div>
      </div>
    </section>
  );
};


