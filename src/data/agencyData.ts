export interface Project {
  id: string;
  number: string;
  title: string;
  client: string;
  category: string;
  industry: string;
  year: string;
  image: string;
  videoUrl?: string | null;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  services: string[];
  liveUrl?: string;
  layoutType?: "right-large" | "left-large" | "full-width" | "asymmetric";
}

export const AGENCY_METRICS = {
  establishedYear: 2026,
  teamExperienceYears: 7,
  campaignsManaged: { target: 140, display: "140+" },
  ownedAudience: { target: 2.95, display: "2.95M+" },
  averageRoas: { target: 4.8, display: "4.8x" },
} as const;

export interface Service {
  id: string;
  number: string;
  title: string;
  category: "PRACTICAL" | "EXPERIMENTAL" | "STRATEGIC" | "CREATIVE" | "TECHNICAL";
  shortDescription: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  previewImage?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  metric: string;
  year?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string[];
}

export interface Founder {
  name: string;
  role: string;
  experience: string;
  image: string;
  bio: string;
  vision: string;
  bioParagraphs?: string[];
  communities: { name: string; followers: string }[];
}

export const FOUNDER: Founder = {
  name: "Tauseef Alam",
  role: "Founder & Creative Director",
  experience: "Almost 12 Years",
  image: "/Profile.webp",
  bio: "Tauseef Alam is a digital media and marketing professional with almost 12 years of experience in the industry.\n\nAs the founder of Virtual Velocity, his experience goes beyond traditional digital marketing. He has built and managed some of the most recognized digital communities in the region, including Rawalpindians, Islamabad Insider, and Sirf Chai platforms that have collectively grown to nearly a million followers.\n\nFrom building digital communities and growing brands to content, social media, marketing, strategy, and everything in between, Tauseef brings hands-on experience across the digital landscape.",
  vision: "His vision for Virtual Velocity is simple: create work that gets noticed, builds brands, and actually moves businesses forward.",
  bioParagraphs: [
    "Tauseef Alam is a digital media and marketing professional with almost 12 years of experience in the industry.",
    "As the founder of Virtual Velocity, his experience goes beyond traditional digital marketing. He has built and managed some of the most recognized digital communities in the region, including Rawalpindians, Islamabad Insider, and Sirf Chai platforms that have collectively grown to nearly a million followers.",
    "From building digital communities and growing brands to content, social media, marketing, strategy, and everything in between, Tauseef brings hands-on experience across the digital landscape.",
  ],
  communities: [
    { name: "Rawalpindians", followers: "450K+" },
    { name: "Islamabad Insider", followers: "380K+" },
    { name: "Sirf Chai", followers: "200K+" },
  ],
};

export const AGENCY_INFO = {
  name: "VIRTUAL VELOCITY",
  tagline: "A Creative House Built for Brands That Want to Move Forward",
  subTagline: `${AGENCY_METRICS.teamExperienceYears}+ years of team experience transforming ambitious brands through distinct visual identities, high-impact digital campaigns, and data-driven performance marketing.`,
  founder: FOUNDER,
  offices: [
    {
      city: "UNITED STATES",
      address: "United States",
      phone: "+1 (417) 897-5749",
      email: "admin@thevirtualvelocity.com",
      businessEmail: "info@thevirtualvelocity.com",
      timezone: "America/New_York",
    },
    {
      city: "ISLAMABAD, PAKISTAN",
      address: "Islamabad, Pakistan",
      phone: "+92 332 529 6693",
      email: "admin@thevirtualvelocity.com",
      businessEmail: "info@thevirtualvelocity.com",
      timezone: "Asia/Karachi",
    },
    {
      city: "BIRMINGHAM, UK",
      address: "Birmingham, UK",
      phone: "+44 7756 557500",
      email: "admin@thevirtualvelocity.com",
      businessEmail: "info@thevirtualvelocity.com",
      timezone: "Europe/London",
    },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: "the-salt-line",
    number: "01",
    title: "THE SALT LINE — ORGANIC GROWTH & COMMUNITY",
    client: "The Salt Line (F9 Park, Islamabad)",
    category: "ORGANIC SOCIAL & VIRAL CONTENT",
    industry: "HOSPITALITY & DINING",
    year: "2026",
    image: "https://res.cloudinary.com/nudghwmz/image/upload/f_auto,q_auto,w_1200/v1790186939/1.png",
    videoUrl: null,
    description: "Transformed an F9 Park restaurant with no digital audience into a packed cultural hotspot by spotlighting weekend Qawwali nights—scaling to 1.3M+ reach with zero paid ads.",
    challenge: "When The Salt Line came to us in November, that's all it had: soul. No followers, no content, no story told online yet. Just a fine-dine space in F9 Park with the Margalla Hills as its view, Turkish and desi food, and weekend Qawwali nights waiting to be discovered.",
    solution: "Shifted away from generic food promotions to build an authentic content engine around the live Qawwali experience, on-ground weekend video coverage, trend-led TikTok & Instagram reels, and organic storytelling.",
    results: [
      "1.3M+ Organic Accounts Reached (+104%)",
      "0 → 9,341+ Instagram Followers (+78%)",
      "183.3K+ TikTok Likes Built Organically",
      "$0 Paid Ad Spend Required",
    ],
    services: [
      "Organic Content Strategy",
      "On-Ground Event Coverage",
      "Trend-Led Reels & TikTok",
      "Viral Community Building",
    ],
    liveUrl: "/the-salt-line",
    layoutType: "right-large",
  },
  {
    id: "cresto-pizza",
    number: "02",
    title: "CRESTO PIZZA — BRAND IDENTITY & PACKAGING",
    client: "Cresto Pizza Artisans",
    category: "BRAND IDENTITY & PACKAGING DESIGN",
    industry: "FOOD & BEVERAGE",
    year: "2025",
    image: "https://res.cloudinary.com/nudghwmz/image/upload/f_auto,q_auto,w_1200/v1790005642/Artboard_1.png",
    videoUrl: null,
    description: "Complete visual identity system, bespoke steam-vented packaging architecture, 3D storefront signage, and launch campaigns crafted for a modern artisanal pizzeria.",
    challenge: "Establishing an iconic visual identity and standout unboxing experience in a saturated fast-casual pizza market.",
    solution: "Designed an end-to-end culinary brand system combining 48-hour fermented dough messaging, steam-vented custom pizza cartons, 3D architectural signage, and launch social creative.",
    results: [
      "+320% In-Store Brand Recall",
      "12+ Custom Packaging Assets Engineered",
      "Turnkey 3D Architectural Signage System",
      "Viral Unboxing & Food Reel Traction",
    ],
    services: [
      "Brand Identity Design",
      "Packaging Engineering",
      "3D Architectural Signage",
      "Social Launch Creative",
    ],
    liveUrl: "/branding",
    layoutType: "left-large",
  },
  {
    id: "nexus-ecommerce",
    number: "03",
    title: "NEXUS E-COMMERCE GROWTH & PPC",
    client: "Nexus Global Retail",
    category: "PERFORMANCE MARKETING & CRO",
    industry: "RETAIL & E-COMMERCE",
    year: "2026",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=75&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-shopping-app-on-a-smartphone-43093-large.mp4",
    description: "Omnichannel digital marketing campaign across Google Shopping, Meta Ads, and email marketing funnels that expanded active customer reach.",
    challenge: "Nexus faced rising customer acquisition costs (CAC) and declining ROAS across paid search and social channels.",
    solution: "We restructured their Google Search & Shopping campaigns, implemented hyper-targeted Meta retargeting, and optimized checkout conversion funnels.",
    results: ["+185% Increase in Customer Conversion Rate", "4.6x Average ROAS on Paid Search", "$14.2M Generated in Q1 Campaign Sales"],
    services: ["Google Ads PPC", "Meta Paid Social", "Conversion Rate Optimization (CRO)", "Klaviyo Email Funnels"],
    layoutType: "right-large",
  },
  {
    id: "vertex-fintech",
    number: "04",
    title: "VERTEX FINTECH SEO & CONTENT CAMPAIGN",
    client: "Vertex Capital",
    category: "TECHNICAL SEO & B2B MARKETING",
    industry: "FINANCIAL INFRASTRUCTURE",
    year: "2025",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=75&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-financial-charts-on-a-digital-tablet-41221-large.mp4",
    description: "Enterprise search engine optimization strategy and thought leadership content hub that scaled organic monthly traffic from 15,000 to 450,000 visitors.",
    challenge: "Vertex faced fierce ad competition and low organic keyword visibility for high-intent B2B commercial banking terms.",
    solution: "We executed comprehensive technical SEO audits, structured rich search schema markup, and published authority content clusters.",
    results: ["+2,900% Organic Search Traffic Growth", "#1 Ranking for 42 Commercial Banking Terms", "3.4x Growth in Qualified Inbound B2B Leads"],
    services: ["Technical SEO Audits", "Keyword Strategy & Content Hubs", "B2B Lead Generation"],
    layoutType: "left-large",
  },
  {
    id: "zenith-health",
    number: "05",
    title: "ZENITH HEALTHCARE PATIENT ACQUISITION",
    client: "Zenith Health Systems",
    category: "PPC & PAID SOCIAL CAMPAIGNS",
    industry: "HEALTHCARE & MEDTECH",
    year: "2025",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=75&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-doctor-using-a-digital-tablet-in-a-hospital-41551-large.mp4",
    description: "Multi-channel Google Search PPC, Meta Paid Social, and patient onboarding funnel optimization that reduced customer acquisition cost (CAC) by 42%.",
    challenge: "High cost-per-lead on Google Search and inefficient patient intake forms led to substantial drop-offs in clinic appointments.",
    solution: "Designed high-converting landing page strategies alongside hyper-targeted Search, YouTube, and Paid Social campaigns.",
    results: ["-42% Reduction in Patient Acquisition Cost", "+310% Increase in Online Patient Appointments", "4.8x Return on Ad Spend (ROAS)"],
    services: ["Google Search Ads", "Meta Paid Social", "Landing Page Copywriting", "Conversion Rate Optimization (CRO)"],
    layoutType: "full-width",
  },
  {
    id: "solaris-ev",
    number: "06",
    title: "SOLARIS EV BRAND LAUNCH & INFLUENCER CAMPAIGN",
    client: "Solaris Motors",
    category: "BRAND STRATEGY & DIGITAL CAMPAIGNS",
    industry: "AUTOMOTIVE & HIGH-TECH",
    year: "2026",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=75&w=800&auto=format&fit=crop",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-electric-car-charging-42861-large.mp4",
    description: "Global digital marketing launch strategy combining cinematic YouTube video ads, tech creator partnerships, and targeted social campaigns.",
    challenge: "Solaris required a high-impact global launch campaign to generate automotive pre-orders ahead of production.",
    solution: "Authored multi-channel video ad creative, coordinated automotive influencer activations, and managed targeted lead campaigns.",
    results: ["1.8M Unique Campaign Sessions", "14 Minute Average Dwell Time", "$48M in Online Vehicle Pre-Orders"],
    services: ["Global Brand Strategy", "Social Video Marketing", "Influencer Partnerships", "Lead Generation Funnels"],
    layoutType: "asymmetric",
  },
];

export const SERVICES: Service[] = [
  {
    id: "branding",
    number: "01",
    title: "BRANDING & VISUAL IDENTITY",
    category: "STRATEGIC",
    shortDescription: "Brand identity, logo design, visual guidelines, and brand positioning for global companies.",
    description: "Create a distinctive brand identity that resonates with your target audience and differentiates you from competitors.",
    deliverables: ["Brand Identity System", "Logo Design", "Visual Guidelines", "Brand Positioning Strategy"],
    techStack: ["Adobe Creative Suite", "Figma", "Canva"],
    previewImage: "/services/01  Digital Strategy.webp",
  },
  {
    id: "digital-marketing",
    number: "02",
    title: "DIGITAL MARKETING SERVICES",
    category: "PRACTICAL",
    shortDescription: "Full-service digital marketing company in Pakistan & Islamabad delivering multi-channel growth.",
    description: "Virtual Velocity is a premier digital marketing agency in Pakistan and Islamabad providing end-to-end digital marketing services, social media management, brand expansion, and data-backed digital campaigns.",
    deliverables: [
      "Digital Marketing Agency Pakistan Strategy",
      "Digital Marketing Agency Islamabad Growth",
      "Digital Marketing Company Operations",
      "Social Media Campaign Management",
    ],
    techStack: ["Meta Business Suite", "Hootsuite", "Google Analytics 4", "Semrush"],
    previewImage: "/services/02 Social Media.webp",
  },
  {
    id: "bpo-outsourcing",
    number: "03",
    title: "BPO & OUTSOURCING SERVICES",
    category: "PRACTICAL",
    shortDescription: "BPO services Pakistan, customer support outsourcing, customer service outsourcing, & call center outsourcing.",
    description: "Scale your business operations efficiently with leading BPO services in Pakistan. We provide customer service outsourcing, customer support outsourcing, call center outsourcing Pakistan, business outsourcing services, and dedicated remote teams.",
    deliverables: [
      "BPO Services Pakistan Management",
      "Customer Service Outsourcing Solutions",
      "Customer Support Outsourcing Teams",
      "Call Center Outsourcing Pakistan Setup",
      "Business Outsourcing Services",
    ],
    techStack: ["Zendesk", "HubSpot CRM", "Twilio", "RingCentral", "Intercom"],
    previewImage: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=75&w=800&auto=format&fit=crop",
  },
  {
    id: "hospitality-marketing",
    number: "04",
    title: "HOSPITALITY & HOTEL MARKETING",
    category: "STRATEGIC",
    shortDescription: "Hospitality marketing agency providing hotel marketing, hotel social media, hotel advertising & hotel SEO.",
    description: "Maximize direct bookings and occupancy rates. Dedicated hospitality marketing agency delivering hotel marketing agency campaigns, hotel social media marketing, hospitality digital marketing, hotel advertising agency ads, and hotel SEO services.",
    deliverables: [
      "Hospitality Marketing Agency Strategy",
      "Hotel Marketing Agency Growth",
      "Hotel Social Media Marketing Campaigns",
      "Hospitality Digital Marketing Systems",
      "Hotel Advertising Agency Campaigns",
      "Hotel SEO Services & Direct Booking Optimization",
    ],
    techStack: ["Meta Ads Manager", "Google Hotel Ads", "TripAdvisor Ads", "Semrush"],
    previewImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=75&w=800&auto=format&fit=crop",
  },
  {
    id: "restaurant-marketing",
    number: "05",
    title: "RESTAURANT MARKETING & LEAD GENERATION",
    category: "CREATIVE",
    shortDescription: "Restaurant marketing agency offering restaurant digital marketing, restaurant SEO, & lead generation.",
    description: "Fill tables and drive online orders. Recognized restaurant marketing agency offering restaurant digital marketing, restaurant social media marketing, restaurant advertising agency creative, restaurant marketing services, restaurant SEO services, and restaurant lead generation.",
    deliverables: [
      "Restaurant Marketing Agency Execution",
      "Restaurant Digital Marketing Funnels",
      "Restaurant Social Media Marketing & Reels",
      "Restaurant Advertising Agency Campaigns",
      "Restaurant Marketing Services",
      "Restaurant SEO Services & Maps Ranking",
      "Restaurant Lead Generation Engine",
    ],
    techStack: ["Instagram Reels", "TikTok Business", "Google Local Pack SEO", "Meta Lead Ads"],
    previewImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=75&w=800&auto=format&fit=crop",
  },
  {
    id: "performance-marketing",
    number: "06",
    title: "PERFORMANCE MARKETING & PAID ADS",
    category: "EXPERIMENTAL",
    shortDescription: "Performance marketing agency, paid advertising agency, Meta ads agency, & Google ads agency.",
    description: "High-ROAS growth campaigns. Leading performance marketing agency providing performance marketing services, paid advertising agency solutions, Meta ads agency campaigns, Google ads agency management, and lead generation agency systems.",
    deliverables: [
      "Performance Marketing Agency Strategy",
      "Performance Marketing Services",
      "Paid Advertising Agency Funnels",
      "Meta Ads Agency Campaigns",
      "Google Ads Agency PPC",
      "Lead Generation Agency Systems",
    ],
    techStack: ["Google Ads", "Meta Ads Manager", "TikTok Ads Manager", "Klaviyo", "Looker Studio"],
    previewImage: "/services/03  Paid Ads.webp",
  },
  {
    id: "seo",
    number: "07",
    title: "SEARCH ENGINE OPTIMIZATION (SEO)",
    category: "PRACTICAL",
    shortDescription: "Technical SEO, keyword research, hotel SEO services, restaurant SEO services, & content hub strategy.",
    description: "Dominate search engine rankings across Google with technical SEO audits, schema markup, and commercial keyword strategies tailored for Pakistan and international markets.",
    deliverables: ["Technical SEO Audit", "Keyword Research & Strategy", "Hotel & Restaurant SEO Services", "Google Schema Structuring"],
    techStack: ["Google Search Console", "Ahrefs", "Semrush", "Screaming Frog"],
    previewImage: "/services/06 SEO & Digital.webp",
  },
  {
    id: "shopify-store",
    number: "08",
    title: "SHOPIFY STORE & E-COMMERCE DEVELOPMENT",
    category: "TECHNICAL",
    shortDescription: "Custom Shopify store design, development, and conversion rate optimization.",
    description: "Build high-converting e-commerce stores tailored to your brand and customer experience goals.",
    deliverables: ["Store Design", "Development", "Payment Setup", "Optimization"],
    techStack: ["Shopify", "Liquid", "HTML/CSS", "JavaScript"],
    previewImage: "https://images.unsplash.com/photo-1763872011479-aa293bf083a8?q=75&w=800&auto=format&fit=crop",
  },
  {
    id: "influencer-marketing",
    number: "09",
    title: "INFLUENCER MARKETING & PROPRIETARY MEDIA",
    category: "STRATEGIC",
    shortDescription: "Influencer partnerships, campaign management, and proprietary channel activations (Rawalpindians, Islamabad Insider, Sirf Chai).",
    description: `Amplify your brand reach through direct access to ${AGENCY_METRICS.ownedAudience.display} local consumers on our proprietary media network and targeted creator partnerships.`,
    deliverables: ["Proprietary Channel Activations", "Influencer Strategy", "Campaign Tracking", "ROI Analysis"],
    techStack: ["Rawalpindians Network", "Islamabad Insider", "Sirf Chai", "Social Blade"],
    previewImage: "/services/05  Influencer & PR_.webp",
  },
  {
    id: "software-development",
    number: "10",
    title: "SOFTWARE & WEB APP DEVELOPMENT",
    category: "TECHNICAL",
    shortDescription: "Custom web applications, Next.js architecture, and cloud software solutions.",
    description: "Develop custom software solutions to streamline business operations and deliver modern web applications.",
    deliverables: ["Requirement Analysis", "UI/UX Design", "Next.js Development", "Cloud Deployment"],
    techStack: ["React", "Next.js", "Node.js", "TypeScript", "TailwindCSS"],
    previewImage: "/services/software-coding.webp",
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "AUDIT & STRATEGY",
    subtitle: "Analyzing your search position, ad performance, target audience, and competitors.",
    description: "Analyzing your search position, ad performance, target audience, and competitors.",
    deliverables: ["Competitor Ad Breakdown", "Technical SEO Audit", "Campaign Growth Roadmap"],
  },
  {
    number: "02",
    title: "CAMPAIGN ARCHITECTURE",
    subtitle: "Designing high-converting ad copy, landing pages, keyword structures, and audience segments.",
    description: "Designing high-converting ad copy, landing pages, keyword structures, and audience segments.",
    deliverables: ["High-Converting Ad Copy", "Audience Targeting Matrix", "Landing Page Wireframes"],
  },
  {
    number: "03",
    title: "EXECUTION & LAUNCH",
    subtitle: "Deploying Google Ads, Paid Social campaigns, technical SEO updates, and email automation flows.",
    description: "Deploying Google Ads, Paid Social campaigns, technical SEO updates, and email automation flows.",
    deliverables: ["Live Google Search & Meta Ads", "Technical SEO Implementation", "Klaviyo Email Sequences"],
  },
  {
    number: "04",
    title: "OPTIMIZATION & SCALING",
    subtitle: "Rigorous A/B testing of headlines, bid adjustments, landing page CRO, and ROAS scaling.",
    description: "Rigorous A/B testing of headlines, bid adjustments, landing page CRO, and ROAS scaling.",
    deliverables: ["Negative Keyword Filtering", "A/B Test Results", "ROAS Scaling Adjustments"],
  },
  {
    number: "05",
    title: "REPORTING & GROWTH",
    subtitle: "Transparent monthly analytics reporting detailing CPL, CAC, ROAS, and revenue growth.",
    description: "Transparent monthly analytics reporting detailing CPL, CAC, ROAS, and revenue growth.",
    deliverables: ["Looker Studio Dashboard", "Monthly Strategy Calls", "Quarterly Scaling Plans"],
  },
];

export const CAPABILITIES = [
  {
    number: "01",
    title: "SEARCH ENGINE OPTIMIZATION (SEO)",
    category: "ORGANIC",
    description: "Technical SEO Audits, Schema Structuring, Keyword Research, and Content Hubs.",
    desc: "Technical SEO Audits, Schema Structuring, Keyword Research, and Content Hubs.",
    tags: ["SEO Audits", "Google Schema", "Keyword Strategy", "Content Hubs"],
  },
  {
    number: "02",
    title: "PPC & PAID SEARCH (SEM)",
    category: "PAID MEDIA",
    description: "Google Search Ads, Shopping, Performance Max, and YouTube Ads.",
    desc: "Google Search Ads, Shopping, Performance Max, and YouTube Ads.",
    tags: ["Google Ads", "Performance Max", "Shopping Ads", "YouTube Ads"],
  },
  {
    number: "03",
    title: "PAID SOCIAL & CONTENT",
    category: "SOCIAL",
    description: "Meta Ads (Instagram/Facebook), TikTok Ads, LinkedIn Campaigns, and Video Reels.",
    desc: "Meta Ads (Instagram/Facebook), TikTok Ads, LinkedIn Campaigns, and Video Reels.",
    tags: ["Meta Ads", "TikTok Ads", "Reel Production", "LinkedIn Ads"],
  },
  {
    number: "04",
    title: "CONVERSION RATE OPTIMIZATION (CRO)",
    category: "CONVERSION",
    description: "A/B Testing, High-Converting Landing Page Copy, Heatmap Analysis, and Funnels.",
    desc: "A/B Testing, High-Converting Landing Page Copy, Heatmap Analysis, and Funnels.",
    tags: ["A/B Testing", "Landing Page Copy", "Heatmap Audits", "Funnels"],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote: "VIRTUAL VELOCITY completely transformed our e-commerce marketing strategy. Our conversion rate surged by 185% in the first 90 days across Google Shopping and Meta Ads.",
    author: "MARCUS CHEN",
    role: "VP OF MARKETING",
    company: "NEXUS GLOBAL RETAIL",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    metric: "+185% CONVERSION RATE",
    year: "2026",
  },
  {
    id: "t2",
    quote: "Their Technical SEO and Content team scaled our B2B fintech organic search traffic from 15k to 450k monthly visitors. They deliver tangible ROI and transparent reporting.",
    author: "SARAH JENNINGS",
    role: "CHIEF MARKETING OFFICER",
    company: "VERTEX CAPITAL",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
    metric: "450K MONTHLY VISITORS",
    year: "2025",
  },
  {
    id: "t3",
    quote: "The global digital launch campaign VIRTUAL VELOCITY executed for Solaris generated $48M in pre-orders. Their video ad creation and influencer strategy were flawless.",
    author: "DAVID KAISER",
    role: "HEAD OF BRAND MARKETING",
    company: "SOLARIS MOTORS",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    metric: "$48M PRE-ORDERS GENERATED",
    year: "2026",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "scaling-ecommerce-conversion-rates-2026",
    title: "10 Proven Marketing Strategies to Scale E-Commerce Conversion Rates in 2026",
    excerpt: "Discover how Google Shopping optimization, personalized retargeting, and frictionless checkout funnels double online sales.",
    category: "E-COMMERCE & MARKETING",
    date: "AUG 24, 2026",
    readTime: "6 MIN READ",
    author: {
      name: "MARCUS CHEN",
      role: "HEAD OF MARKETING",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    },
    content: [
      "E-commerce conversion optimization is no longer just about changing button colors. In 2026, consumer attention demands hyper-targeted ads and frictionless landing page messaging.",
      "By pairing Google Shopping ads with hyper-personalized Meta retargeting, online retailers can capture high-intent buyers at key stages in the purchase funnel.",
      "Mobile checkout friction remains the single largest cause of cart abandonment. Implementing targeted SMS reminders and one-click payment callouts increases conversion rates by up to 45%.",
    ],
  },
  {
    slug: "technical-seo-b2b-growth-guide",
    title: "The Ultimate Technical SEO & Search Marketing Guide for Enterprise B2B SaaS",
    excerpt: "How search schema data, Core Web Vitals audits, and authority topic clusters drive 300%+ organic lead growth.",
    category: "SEO & MARKETING",
    date: "AUG 18, 2026",
    readTime: "8 MIN READ",
    author: {
      name: "SARAH JENNINGS",
      role: "SEO DIRECTOR",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    },
    content: [
      "Search Engine Optimization has evolved beyond basic keyword stuffing. Modern search engines prioritize topical authority, technical site health, and verified schema markup.",
      "To dominate commercial search intent, B2B companies must structure their content into authoritative pillar clusters supported by granular technical case studies.",
    ],
  },
  {
    slug: "webgl-3d-web-experiences-future",
    title: "Why High-Impact Brand Storytelling & Video Content Drive Modern Campaigns",
    excerpt: "Visual storytelling and interactive brand experiences boost user dwell time by 400% while driving record campaign conversions.",
    category: "BRAND MARKETING",
    date: "AUG 12, 2026",
    readTime: "5 MIN READ",
    author: {
      name: "KAI HARADA",
      role: "CREATIVE DIRECTOR",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
    content: [
      "Interactive digital brand experiences allow consumers to connect deeply with product stories directly in their browser.",
      "With high-fidelity video creative optimized for mobile feeds, brands can establish lasting emotional resonance.",
    ],
  },
];

export const STATS = [
  { label: "CAMPAIGNS MANAGED", value: AGENCY_METRICS.campaignsManaged.display, note: "Google, Meta & SEO", detail: "Executed across United States & international markets" },
  { label: "AVERAGE ROAS GENERATED", value: AGENCY_METRICS.averageRoas.display, note: "Across PPC & Social", detail: "Measured across Google & Meta campaigns" },
  { label: "ORGANIC TRAFFIC GROWTH", value: "320%", note: "Client Average", detail: "Technical SEO & content hub scaling" },
  { label: "CLIENT RETENTION RATE", value: "98%", note: "Long-Term Partnerships", detail: "Multi-year retainers & strategy support" },
];
