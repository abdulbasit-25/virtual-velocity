import { CHAT_KNOWLEDGE } from "@/data/chatKnowledge";

export type ChatAction = {
  label: string;
  href: string;
  external?: boolean;
};

export type ChatReply = {
  text: string;
  actions?: ChatAction[];
};

const CONTACT_ACTIONS: ChatAction[] = [
  { label: "Start your brief", href: "/contact" },
  { label: "Email the team", href: "mailto:info@thevirtualvelocity.com", external: true },
];

const SERVICES_ACTION: ChatAction[] = [
  { label: "Explore services", href: "/services" },
];

const HANDOFF_ACTIONS: ChatAction[] = [
  { label: "Contact the team", href: "/contact" },
  { label: "Email info@thevirtualvelocity.com", href: "mailto:info@thevirtualvelocity.com", external: true },
];

type Intent =
  | "injection"
  | "off-topic"
  | "pricing"
  | "guarantee"
  | "human"
  | "location"
  | "audit"
  | "media"
  | "work"
  | "bpo"
  | "hospitality"
  | "restaurant"
  | "performance"
  | "development"
  | "seo"
  | "social"
  | "branding"
  | "services"
  | "unknown";

const includesAny = (text: string, terms: string[]) =>
  terms.some((term) => text.includes(term));

function detectLanguage(message: string): "en" | "ur" {
  if (/[\u0600-\u06ff]/u.test(message)) return "ur";
  const words = message.toLowerCase().match(/[a-z]+/g) ?? [];
  const romanUrduWords = new Set([
    "aap",
    "ap",
    "batao",
    "chahiye",
    "hai",
    "hain",
    "kaise",
    "karna",
    "karte",
    "kya",
    "kahan",
    "kitna",
    "kitne",
    "kiya",
    "hum",
    "mujhe",
    "qeemat",
  ]);
  return words.some((word) => romanUrduWords.has(word)) ? "ur" : "en";
}

function detectIntent(message: string): Intent {
  const text = message.toLowerCase();
  const urdu = /[\u0600-\u06ff]/u.test(message);

  if (
    includesAny(text, [
      "ignore previous",
      "ignore all",
      "system prompt",
      "show your prompt",
      "reveal your prompt",
      "developer instruction",
      "act as",
      "jailbreak",
      "اپنی ہدایات",
      "پرامپٹ",
    ])
  )
    return "injection";

  if (
    includesAny(text, [
      "write code",
      "python script",
      "write an essay",
      "write me a story",
      "homework",
      "recipe",
      "song lyrics",
      "مجھے کوڈ",
      "مضمون لکھ",
    ])
  )
    return "off-topic";

  if (
    includesAny(text, [
      "price",
      "pricing",
      "how much",
      "cost",
      "quote",
      "budget",
      "discount",
      "package",
      "qeemat",
      "kitna",
      "kitne",
      "قیمت",
      "کتنا",
      "اخراجات",
    ])
  )
    return "pricing";

  if (
    includesAny(text, [
      "guarantee",
      "guaranteed",
      "10x",
      "roas",
      "results",
      "promise",
      "گارنٹی",
      "نتائج",
    ])
  )
    return "guarantee";

  if (
    includesAny(text, [
      "human",
      "person",
      "talk to",
      "call you",
      "phone",
      "email",
      "team",
      "انسان",
      "ٹیم",
      "رابطہ",
    ])
  )
    return "human";

  if (
    includesAny(text, [
      "where",
      "located",
      "location",
      "office",
      "time zone",
      "timezone",
      "hours",
      "call time",
      "کہاں",
      "دفتر",
      "وقت",
    ])
  )
    return "location";

  if (
    includesAny(text, [
      "audit",
      "start a project",
      "start my",
      "get started",
      "hire",
      "brief",
      "nda",
      "نیا کام",
      "آڈٹ",
      "شروع",
    ])
  )
    return "audit";

  if (
    includesAny(text, [
      "owned media",
      "media network",
      "media kit",
      "rawalpindians",
      "islamabad insider",
      "sirf chai",
      "میڈیا",
    ])
  )
    return "media";

  if (
    includesAny(text, [
      "case study",
      "case studies",
      "portfolio",
      "your work",
      "projects",
      "cresto",
      "salt line",
      "کام کی مثال",
      "کیس اسٹڈی",
    ])
  )
    return "work";

  if (includesAny(text, ["bpo", "outsourc", "call center", "customer support", "customer service", "بی پی او"]))
    return "bpo";
  if (includesAny(text, ["hotel", "hospitality", "resort", "booking", "ہوٹل"]))
    return "hospitality";
  if (includesAny(text, ["restaurant", "restaurants", "food business", "cafe", "café", "dining", "ریسٹورنٹ"]))
    return "restaurant";
  if (includesAny(text, ["performance marketing", "google ads", "meta ads", "ppc", "paid ads", "advertising", "روزم"]))
    return "performance";
  if (includesAny(text, ["shopify", "website", "web app", "software", "development", "developer", "ویب سائٹ"]))
    return "development";
  if (includesAny(text, ["seo", "search engine", "technical seo"]))
    return "seo";
  if (includesAny(text, ["social media", "influencer", "photography", "videography", "reels", "creator"]))
    return "social";
  if (includesAny(text, ["brand", "branding", "identity", "logo", "creative", "packaging"]))
    return "branding";
  if (
    includesAny(text, [
      "service",
      "services",
      "what do you do",
      "what does virtual velocity",
      "offer",
      "خدمات",
      "سروس",
    ]) ||
    urdu
  )
    return "services";
  return "unknown";
}

function getEnglishReply(intent: Intent): ChatReply {
  switch (intent) {
    case "injection":
      return {
        text: "I can’t share internal instructions. I can help with questions about Virtual Velocity’s services, work, or how to get in touch.",
        actions: SERVICES_ACTION,
      };
    case "off-topic":
      return {
        text: "I’m here to answer questions about Virtual Velocity and working with the agency, so I can’t help write code or unrelated content. I can point you to our services or contact page.",
        actions: SERVICES_ACTION,
      };
    case "pricing":
      return {
        text: "Project pricing depends on the scope and requirements, so I can’t quote a price or package here. You can start with a Free Growth Audit and share your brief with the team.",
        actions: CONTACT_ACTIONS,
      };
    case "guarantee":
      return {
        text: "Marketing outcomes vary by business, market, and campaign; Virtual Velocity doesn’t guarantee a specific ROAS or result. The team can review your goals in a Free Growth Audit.",
        actions: CONTACT_ACTIONS,
      };
    case "human":
      return {
        text: `You can reach the team at ${CHAT_KNOWLEDGE.contacts.newBusinessEmail} or call one of the published office numbers. The website doesn’t list support hours.`,
        actions: HANDOFF_ACTIONS,
      };
    case "location":
      return {
        text: `The site lists offices in the United States, Islamabad, Pakistan, and Birmingham, UK. Its contact page also shows regional hubs in the US, UK, UAE, and Pakistan using the ${CHAT_KNOWLEDGE.hubs.map((hub) => hub.timezone).join(", ")} time zones. Published support hours aren’t listed.`,
        actions: HANDOFF_ACTIONS,
      };
    case "audit":
      return {
        text: `${CHAT_KNOWLEDGE.process.audit} The campaign brief has two steps, the site promises a reply within 12 hours, and it says an NDA is guaranteed.`,
        actions: CONTACT_ACTIONS,
      };
    case "media":
      return {
        text: `Virtual Velocity’s owned media channels include ${CHAT_KNOWLEDGE.media.channels.join(", ")}. You can explore the network and download its media kit from the owned media page.`,
        actions: [
          { label: "Owned media", href: CHAT_KNOWLEDGE.media.page },
          { label: "Download media kit", href: CHAT_KNOWLEDGE.media.kit },
        ],
      };
    case "work":
      return {
        text: `The work the team has confirmed for this assistant includes The Salt Line (hospitality and organic social) and Cresto Pizza (brand identity and packaging). I can’t verify other case studies or quote their results.`,
        actions: [
          { label: "The Salt Line", href: "/the-salt-line" },
          { label: "Branding", href: "/branding" },
          { label: "More work", href: "/#work" },
        ],
      };
    case "bpo":
      return {
        text: "Yes. BPO & Outsourcing Services include customer service and support outsourcing, call center outsourcing, business outsourcing, and dedicated remote teams.",
        actions: [{ label: "BPO services", href: "/services#bpo-outsourcing" }],
      };
    case "hospitality":
      return {
        text: "The hospitality and hotel offering includes hotel marketing, social media, advertising, SEO, and direct booking optimization. The Salt Line is a hospitality project in the published work.",
        actions: [
          { label: "Hospitality services", href: "/services#hospitality-marketing" },
          { label: "The Salt Line", href: "/the-salt-line" },
        ],
      };
    case "restaurant":
      return {
        text: "Restaurant services include digital and social marketing, food brand reels, advertising, SEO for Google Maps, and lead generation. The Salt Line is a hospitality project in the published work.",
        actions: [
          { label: "Restaurant services", href: "/services#restaurant-marketing" },
          { label: "The Salt Line", href: "/the-salt-line" },
        ],
      };
    case "performance":
      return {
        text: "Performance Marketing & Paid Ads includes Google Ads, Meta Ads, paid advertising, and lead generation. Results depend on each business and aren’t guaranteed.",
        actions: [{ label: "Performance marketing", href: "/services#performance-marketing" }],
      };
    case "development":
      return {
        text: "The site lists Shopify store and e-commerce development, plus software and web app development. The services page has the details for each.",
        actions: [
          { label: "Shopify & e-commerce", href: "/services#shopify-store" },
          { label: "Software & web apps", href: "/services#software-development" },
        ],
      };
    case "seo":
      return {
        text: "The SEO offering includes technical SEO audits, keyword research, schema structuring, and content strategy, including hotel and restaurant SEO.",
        actions: [{ label: "SEO services", href: "/services#seo" }],
      };
    case "social":
      return {
        text: "The site lists social media campaign management, influencer partnerships, proprietary media activations, and video reels. See the service details on the website.",
        actions: [
          { label: "Digital marketing", href: "/services#digital-marketing" },
          { label: "Influencer & owned media", href: "/services#influencer-marketing" },
        ],
      };
    case "branding":
      return {
        text: "Branding & Visual Identity covers brand identity systems, logo design, visual guidelines, and brand positioning. Cresto Pizza is a published identity and packaging project.",
        actions: [
          { label: "Branding services", href: "/services#branding" },
          { label: "Cresto Pizza work", href: "/branding" },
        ],
      };
    case "services":
      return {
        text: `Virtual Velocity works across strategy, creativity, technology, and digital growth. Services include ${CHAT_KNOWLEDGE.services.map((service) => service.title.toLowerCase()).join(", ")}.`,
        actions: SERVICES_ACTION,
      };
    default:
      return {
        text: "I don’t have that detail in the information available to me. The team can help via the contact page or at info@thevirtualvelocity.com.",
        actions: HANDOFF_ACTIONS,
      };
  }
}

function getUrduReply(intent: Intent): ChatReply {
  switch (intent) {
    case "injection":
      return {
        text: "میں اندرونی ہدایات شیئر نہیں کر سکتا۔ میں Virtual Velocity کی خدمات، کام، یا رابطے کے بارے میں مدد کر سکتا ہوں۔",
        actions: SERVICES_ACTION,
      };
    case "off-topic":
      return {
        text: "میں Virtual Velocity اور ایجنسی کے ساتھ کام کرنے سے متعلق سوالات میں مدد کے لیے ہوں، اس لیے کوڈ یا غیر متعلقہ مواد نہیں لکھ سکتا۔",
        actions: SERVICES_ACTION,
      };
    case "pricing":
      return {
        text: "قیمت کام کے دائرۂ کار اور ضروریات پر منحصر ہوتی ہے، اس لیے میں یہاں قیمت یا پیکج نہیں بتا سکتا۔ آپ مفت Growth Audit کے لیے اپنی تفصیل بھیج سکتے ہیں۔",
        actions: CONTACT_ACTIONS,
      };
    case "guarantee":
      return {
        text: "مارکیٹنگ کے نتائج کاروبار، مارکیٹ اور مہم کے مطابق مختلف ہوتے ہیں؛ کسی مخصوص ROAS یا نتیجے کی ضمانت نہیں دی جاتی۔ ٹیم مفت Growth Audit میں آپ کے اہداف دیکھ سکتی ہے۔",
        actions: CONTACT_ACTIONS,
      };
    case "human":
      return {
        text: `آپ ${CHAT_KNOWLEDGE.contacts.newBusinessEmail} پر ٹیم سے رابطہ کر سکتے ہیں یا ویب سائٹ پر درج فون نمبروں پر کال کر سکتے ہیں۔ ویب سائٹ پر رابطے کے اوقات درج نہیں ہیں۔`,
        actions: HANDOFF_ACTIONS,
      };
    case "location":
      return {
        text: "ویب سائٹ پر امریکہ، اسلام آباد، پاکستان، اور برمنگھم، برطانیہ کے دفاتر درج ہیں۔ رابطہ صفحے پر امریکہ، برطانیہ، متحدہ عرب امارات، اور پاکستان کے ٹائم زون بھی دکھائے گئے ہیں؛ دفتری اوقات درج نہیں ہیں۔",
        actions: HANDOFF_ACTIONS,
      };
    case "audit":
      return {
        text: "آپ رابطہ فارم کے ذریعے مفت Growth Audit شروع کر سکتے ہیں۔ مہم کا بریف دو مراحل پر مشتمل ہے، ویب سائٹ 12 گھنٹے میں جواب دینے کا وعدہ کرتی ہے، اور NDA کی ضمانت بتاتی ہے۔",
        actions: CONTACT_ACTIONS,
      };
    case "media":
      return {
        text: `ملکیتی میڈیا چینلز میں ${CHAT_KNOWLEDGE.media.channels.join(", ")} شامل ہیں۔ میڈیا نیٹ ورک اور میڈیا کٹ ویب سائٹ پر دیکھیں۔`,
        actions: [
          { label: "Owned media", href: CHAT_KNOWLEDGE.media.page },
          { label: "Download media kit", href: CHAT_KNOWLEDGE.media.kit },
        ],
      };
    case "work":
      return {
        text: "اس چیٹ کے لیے تصدیق شدہ کام میں The Salt Line (ہاسپیٹیلٹی اور آرگینک سوشل) اور Cresto Pizza (برانڈ شناخت اور پیکیجنگ) شامل ہیں۔ میں دیگر کیس اسٹڈیز یا ان کے نتائج کی تصدیق نہیں کر سکتا۔",
        actions: [
          { label: "The Salt Line", href: "/the-salt-line" },
          { label: "Branding", href: "/branding" },
        ],
      };
    case "bpo":
      return {
        text: "جی ہاں۔ BPO اور آؤٹ سورسنگ میں کسٹمر سروس و سپورٹ، کال سینٹر آؤٹ سورسنگ، بزنس آؤٹ سورسنگ، اور ریموٹ ٹیمیں شامل ہیں۔",
        actions: [{ label: "BPO services", href: "/services#bpo-outsourcing" }],
      };
    case "hospitality":
      return {
        text: "ہاسپیٹیلٹی خدمات میں ہوٹل مارکیٹنگ، سوشل میڈیا، اشتہارات، SEO، اور براہ راست بکنگ کی بہتری شامل ہے۔ The Salt Line ویب سائٹ پر موجود ہاسپیٹیلٹی کام ہے۔",
        actions: [
          { label: "Hospitality services", href: "/services#hospitality-marketing" },
          { label: "The Salt Line", href: "/the-salt-line" },
        ],
      };
    case "restaurant":
      return {
        text: "ریسٹورنٹ خدمات میں ڈیجیٹل اور سوشل مارکیٹنگ، فوڈ ریلز، اشتہارات، Google Maps کے لیے SEO، اور لیڈ جنریشن شامل ہیں۔",
        actions: [
          { label: "Restaurant services", href: "/services#restaurant-marketing" },
          { label: "The Salt Line", href: "/the-salt-line" },
        ],
      };
    case "performance":
      return {
        text: "پرفارمنس مارکیٹنگ میں Google Ads، Meta Ads، پیڈ ایڈورٹائزنگ، اور لیڈ جنریشن شامل ہیں۔ نتائج کی ضمانت نہیں دی جاتی۔",
        actions: [{ label: "Performance marketing", href: "/services#performance-marketing" }],
      };
    case "development":
      return {
        text: "ویب سائٹ پر Shopify اور ای کامرس ڈیولپمنٹ کے ساتھ سافٹ ویئر اور ویب ایپ ڈیولپمنٹ درج ہیں۔",
        actions: [
          { label: "Shopify & e-commerce", href: "/services#shopify-store" },
          { label: "Software & web apps", href: "/services#software-development" },
        ],
      };
    case "seo":
      return {
        text: "SEO خدمات میں ٹیکنیکل SEO آڈٹ، کی ورڈ ریسرچ، اسکیما، اور مواد کی حکمتِ عملی شامل ہیں۔",
        actions: [{ label: "SEO services", href: "/services#seo" }],
      };
    case "social":
      return {
        text: "ویب سائٹ پر سوشل میڈیا مہمات، انفلوئنسر پارٹنرشپس، ملکیتی میڈیا، اور ویڈیو ریلز درج ہیں۔",
        actions: [
          { label: "Digital marketing", href: "/services#digital-marketing" },
          { label: "Influencer & owned media", href: "/services#influencer-marketing" },
        ],
      };
    case "branding":
      return {
        text: "برانڈنگ میں برانڈ شناخت، لوگو، بصری رہنما اصول، اور برانڈ پوزیشننگ شامل ہیں۔ Cresto Pizza برانڈ شناخت اور پیکیجنگ کا شائع شدہ کام ہے۔",
        actions: [
          { label: "Branding services", href: "/services#branding" },
          { label: "Cresto Pizza work", href: "/branding" },
        ],
      };
    case "services":
      return {
        text: "Virtual Velocity حکمتِ عملی، تخلیق، ٹیکنالوجی، اور ڈیجیٹل ترقی کے شعبوں میں کام کرتی ہے۔ خدمات کی تفصیل ویب سائٹ پر موجود ہے۔",
        actions: SERVICES_ACTION,
      };
    default:
      return {
        text: "میرے پاس اس بارے میں مصدقہ تفصیل موجود نہیں۔ آپ رابطہ صفحے یا info@thevirtualvelocity.com کے ذریعے ٹیم سے پوچھ سکتے ہیں۔",
        actions: HANDOFF_ACTIONS,
      };
  }
}

export function getAssistantReply(message: string): ChatReply {
  const language = detectLanguage(message);
  const intent = detectIntent(message);
  return language === "ur" ? getUrduReply(intent) : getEnglishReply(intent);
}
