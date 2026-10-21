import type { Metadata } from "next";
import { BLOG_POSTS } from "@/data/agencyData";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { SITE_URL, SOCIAL_IMAGE } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const BLOG_METADATA_TITLES: Record<string, string> = {
  "scaling-ecommerce-conversion-rates-2026":
    "E-Commerce Conversion Tips for 2026 | Virtual Velocity",
  "technical-seo-b2b-growth-guide":
    "Technical SEO for B2B SaaS | Virtual Velocity",
  "webgl-3d-web-experiences-future":
    "Brand Storytelling & Video Marketing | Virtual Velocity",
};

const BLOG_METADATA_DESCRIPTIONS: Record<string, string> = {
  "scaling-ecommerce-conversion-rates-2026":
    "Explore Google Shopping, personalized retargeting, and checkout improvements as strategies for e-commerce conversion growth, with guidance for online retailers.",
  "technical-seo-b2b-growth-guide":
    "Learn how technical SEO, structured data, Core Web Vitals, and topic clusters support organic growth for B2B SaaS websites and search marketing teams.",
  "webgl-3d-web-experiences-future":
    "Explore visual storytelling, video content, and interactive brand experiences, and how these formats support modern digital marketing campaigns and engagement.",
};

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found", robots: { index: false, follow: false } };
  }

  const metadataTitle = BLOG_METADATA_TITLES[post.slug] ?? post.title;
  const metadataDescription = BLOG_METADATA_DESCRIPTIONS[post.slug] ?? post.excerpt;

  return {
    title: { absolute: metadataTitle },
    description: metadataDescription,
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      url: `${SITE_URL}/blog/${post.slug}`,
      title: metadataTitle,
      description: metadataDescription,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      tags: [post.category],
      images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: `Virtual Velocity article: ${post.title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: metadataTitle,
      description: metadataDescription,
      images: [{ url: SOCIAL_IMAGE, alt: `Virtual Velocity article: ${post.title}` }],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Virtual Velocity",
      url: SITE_URL,
    },
    mainEntityOfPage: postUrl,
    image: `${SITE_URL}${SOCIAL_IMAGE}`,
  };

  return (
    <SmoothScrollProvider>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-white text-zinc-900 relative font-outfit">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <CustomCursor />
        <Navigation />

        <article className="pt-20 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-8 lg:px-12 max-w-[70ch] mx-auto space-y-10 sm:space-y-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-outfit font-extrabold text-zinc-700 hover:text-zinc-900 transition-colors uppercase tracking-widest min-h-[44px] py-2 px-3 -ml-3 rounded-lg hover:bg-zinc-100"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-600" />
            <span>BACK TO JOURNAL</span>
          </Link>

          <div className="space-y-6 border-b border-zinc-200 pb-10 sm:pb-12">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-outfit text-zinc-700">
              <span className="text-emerald-700 font-extrabold uppercase bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                {post.category}
              </span>
              <span className="text-zinc-500">• {post.date}</span>
              <span className="text-zinc-500">• {post.readTime}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[3.5rem] font-outfit font-black text-zinc-900 uppercase tracking-tight leading-[1.05] break-words">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 pt-4 border-t border-zinc-100">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                loading="lazy"
                decoding="async"
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/20"
              />
              <div>
                <span className="text-zinc-900 font-outfit font-bold uppercase text-sm sm:text-base block">
                  {post.author.name}
                </span>
                <span className="text-xs font-outfit text-zinc-600">{post.author.role}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8 text-base sm:text-lg lg:text-xl text-zinc-700 font-light leading-relaxed break-words">
            {post.content.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">{paragraph}</p>
            ))}
          </div>

          {/* Previous / Next Article Navigation */}
          <div className="pt-12 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="p-5 rounded-2xl border border-zinc-200 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all flex flex-col justify-between group min-h-[90px]"
              >
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 group-hover:text-emerald-600">
                  &larr; Previous Article
                </span>
                <span className="text-sm font-outfit font-bold text-zinc-800 line-clamp-2 mt-1">
                  {prevPost.title}
                </span>
              </Link>
            ) : <div />}

            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="p-5 rounded-2xl border border-zinc-200 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all flex flex-col justify-between group min-h-[90px] text-right"
              >
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 group-hover:text-emerald-600">
                  Next Article &rarr;
                </span>
                <span className="text-sm font-outfit font-bold text-zinc-800 line-clamp-2 mt-1">
                  {nextPost.title}
                </span>
              </Link>
            ) : <div />}
          </div>
        </article>

        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
