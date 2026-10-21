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
  {
    label: "Email the team",
    href: "mailto:adddemail@gmail.com",
    external: true,
  },
];

const SERVICES_ACTION: ChatAction[] = [
  { label: "Explore services", href: "/services" },
];

const HANDOFF_ACTIONS: ChatAction[] = [
  { label: "Start your brief", href: "/contact" },
  {
    label: "Email adddemail@gmail.com",
    href: "mailto:adddemail@gmail.com",
    external: true,
  },
  ...CHAT_KNOWLEDGE.contacts.phones.map((phone) => ({
    label: `${phone.label}: ${phone.number}`,
    href: phone.href,
    external: true,
  })),
];

const CONFIRMED_WORK = CHAT_KNOWLEDGE.caseStudies
  .map((project) => `${project.name} (${project.description})`)
  .join(" and ");

type Intent =
  | "injection"
  | "off-topic"
  | "harmful"
  | "identity"
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

function detectLanguage(message: string): "en" | "ur" | "roman-ur" {
  if (/[\u0600-\u06ff]/u.test(message)) return "ur";
  const words = message.toLowerCase().match(/[a-z]+/g) ?? [];
  const romanUrduWords = new Set([
    "aap",
    "ap",
    "batao",
    "chahiye",
    "hai",
    "hain",
    "kaha",
    "kaise",
    "karna",
    "karte",
    "kia",
    "kya",
    "kahan",
    "kon",
    "kitna",
    "kitne",
    "kiya",
    "hum",
    "mujhe",
    "qeemat",
  ]);
  return words.some((word) => romanUrduWords.has(word)) ? "roman-ur" : "en";
}

function detectIntent(message: string): Intent {
  const text = message.toLowerCase();

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
      "پائتھن",
      "مضمون لکھ",
    ])
  )
    return "off-topic";

  if (
    includesAny(text, [
      "harm someone",
      "hurt someone",
      "make a bomb",
      "make an explosive",
      "build a weapon",
      "harmful request",
      "کسی کو نقصان",
      "بم بنانا",
      "ہتھیار بنانا",
    ])
  )
    return "harmful";

  if (
    includesAny(text, [
      "who are you",
      "are you ai",
      "are you an ai",
      "are you a bot",
      "are you human",
      "tum kaun ho",
      "aap kaun",
      "aap kya ho",
      "آپ کون ہیں",
      "کیا آپ اے آئی",
      "کیا آپ انسان",
    ])
  )
    return "identity";

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
      "kahan",
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

  if (
    includesAny(text, [
      "bpo",
      "outsourc",
      "call center",
      "customer support",
      "customer service",
      "بی پی او",
    ])
  )
    return "bpo";
  if (includesAny(text, ["hotel", "hospitality", "resort", "booking", "ہوٹل"]))
    return "hospitality";
  if (
    includesAny(text, [
      "restaurant",
      "restaurants",
      "food business",
      "cafe",
      "café",
      "dining",
      "ریسٹورنٹ",
    ])
  )
    return "restaurant";
  if (
    includesAny(text, [
      "performance marketing",
      "google ads",
      "meta ads",
      "ppc",
      "paid ads",
      "advertising",
      "روزم",
    ])
  )
    return "performance";
  if (
    includesAny(text, [
      "artificial intelligence",
      "ai-driven",
      "ai driven",
      "growth analytics",
    ])
  )
    return "services";
  if (
    includesAny(text, [
      "shopify",
      "website",
      "web app",
      "software",
      "development",
      "developer",
      "ویب سائٹ",
    ])
  )
    return "development";
  if (includesAny(text, ["seo", "search engine", "technical seo"]))
    return "seo";
  if (
    includesAny(text, [
      "social media",
      "influencer",
      "photography",
      "videography",
      "reels",
      "creator",
    ])
  )
    return "social";
  if (
    includesAny(text, [
      "brand",
      "branding",
      "identity",
      "logo",
      "creative",
      "packaging",
    ])
  )
    return "branding";
  if (
    includesAny(text, [
      "service",
      "services",
      "what do you do",
      "what does virtual velocity",
      "kya karte",
      "kya kartay",
      "kya services",
      "kia services",
      "kaam karte",
      "kaam kartay",
      "who is virtual velocity",
      "about virtual velocity",
      "offer",
      "کیا کرتے",
      "کیا خدمات",
      "کون سی خدمات",
      "آپ کون ہیں",
      "خدمات",
      "سروس",
    ])
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
    case "harmful":
      return {
        text: "I can’t help with requests to harm someone. If you have a question about Virtual Velocity’s services or contacting the team, I can help with that.",
        actions: SERVICES_ACTION,
      };
    case "identity":
      return {
        text: "I’m Virtual Velocity’s AI assistant. I answer using information published on this site and can help you contact the team.",
        actions: HANDOFF_ACTIONS,
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
        text: `You can reach the team at ${CHAT_KNOWLEDGE.contacts.newBusinessEmail}, or call: ${CHAT_KNOWLEDGE.contacts.phones.map((phone) => `${phone.label} ${phone.number}`).join("; ")}. The website doesn’t list support hours.`,
        actions: HANDOFF_ACTIONS,
      };
    case "location":
      return {
        text: `The site lists offices in the United States, Islamabad, Pakistan, and Birmingham, UK. Its contact page also shows regional hubs in the US, UK, UAE, and Pakistan using the ${CHAT_KNOWLEDGE.hubs.map((hub) => hub.timezone).join(", ")} time zones. Call ${CHAT_KNOWLEDGE.contacts.phones.map((phone) => `${phone.label} ${phone.number}`).join("; ")}. Published support hours aren’t listed.`,
        actions: HANDOFF_ACTIONS,
      };
    case "audit":
      return {
        text: `${CHAT_KNOWLEDGE.process.audit} ${CHAT_KNOWLEDGE.process.form} ${CHAT_KNOWLEDGE.process.response} ${CHAT_KNOWLEDGE.process.nda}`,
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
        text: `The confirmed work includes ${CONFIRMED_WORK}. I can’t verify other case studies or quote their results.`,
        actions: [
          { label: "The Salt Line", href: "/the-salt-line" },
          { label: "Branding", href: "/branding" },
          { label: "More work", href: "/#work" },
        ],
      };
    case "bpo":
      return {
        text: `${CHAT_KNOWLEDGE.faq[1].answer} Business outsourcing is also listed on the services page.`,
        actions: [{ label: "BPO services", href: "/services#bpo-outsourcing" }],
      };
    case "hospitality":
      return {
        text: `${CHAT_KNOWLEDGE.faq[2].answer} ${CHAT_KNOWLEDGE.caseStudies[0].name} is a hospitality project in the published work.`,
        actions: [
          {
            label: "Hospitality services",
            href: "/services#hospitality-marketing",
          },
          { label: "The Salt Line", href: "/the-salt-line" },
        ],
      };
    case "restaurant":
      return {
        text: `${CHAT_KNOWLEDGE.faq[3].answer} ${CHAT_KNOWLEDGE.caseStudies[0].name} is a hospitality project in the published work.`,
        actions: [
          {
            label: "Restaurant services",
            href: "/services#restaurant-marketing",
          },
          { label: "The Salt Line", href: "/the-salt-line" },
        ],
      };
    case "performance":
      return {
        text: "Performance Marketing & Paid Ads includes Google Ads, Meta Ads, paid advertising, and lead generation. Results depend on each business and aren’t guaranteed.",
        actions: [
          {
            label: "Performance marketing",
            href: "/services#performance-marketing",
          },
        ],
      };
    case "development":
      return {
        text: "The site lists Shopify store and e-commerce development, plus software and web app development. The services page has the details for each.",
        actions: [
          { label: "Shopify & e-commerce", href: "/services#shopify-store" },
          {
            label: "Software & web apps",
            href: "/services#software-development",
          },
        ],
      };
    case "seo":
      return {
        text: "The site lists technical SEO audits, keyword research, schema structuring, content strategy, and conversion rate optimization, including hotel and restaurant SEO.",
        actions: [{ label: "SEO services", href: "/services#seo" }],
      };
    case "social":
      return {
        text: "The site lists social media campaign management, influencer partnerships, proprietary media activations, photography, and videography. See the service details on the website.",
        actions: [
          { label: "Digital marketing", href: "/services#digital-marketing" },
          {
            label: "Influencer & owned media",
            href: "/services#influencer-marketing",
          },
        ],
      };
    case "branding":
      return {
        text: "Branding & Visual Identity covers brand identity systems, logo design, visual guidelines, brand positioning, and creative direction. Cresto Pizza is a published identity and packaging project.",
        actions: [
          { label: "Branding services", href: "/services#branding" },
          { label: "Cresto Pizza work", href: "/branding" },
        ],
      };
    case "services":
      return {
        text: `${CHAT_KNOWLEDGE.faq[0].answer} Additional site-listed capabilities include ${CHAT_KNOWLEDGE.additionalCapabilities.join(", ").toLowerCase()}.`,
        actions: SERVICES_ACTION,
      };
    default:
      return {
        text: "I don’t have that detail in the information available to me. The team can help via the contact page or at adddemail@gmail.com.",
        actions: HANDOFF_ACTIONS,
      };
  }
}

function getRomanUrduReply(intent: Intent): ChatReply {
  switch (intent) {
    case "injection":
      return {
        text: "Main internal hidayaat share nahi kar sakta. Main Virtual Velocity ki services, kaam, ya rabtay ke tareeqon ke bare mein madad kar sakta hoon.",
        actions: SERVICES_ACTION,
      };
    case "off-topic":
      return {
        text: "Main Virtual Velocity aur agency ke saath kaam se mutaliq sawalon mein madad ke liye hoon, is liye code ya ghair mutaliq content nahi likh sakta.",
        actions: SERVICES_ACTION,
      };
    case "harmful":
      return {
        text: "Main kisi ko nuqsan pohanchane wali darkhwast mein madad nahi kar sakta. Virtual Velocity ki services ya team se rabtay ke bare mein sawal ho to madad kar sakta hoon.",
        actions: SERVICES_ACTION,
      };
    case "identity":
      return {
        text: "Main Virtual Velocity ka AI assistant hoon. Main website par di gayi maloomat se jawab deta hoon aur team se rabta karne mein madad kar sakta hoon.",
        actions: HANDOFF_ACTIONS,
      };
    case "pricing":
      return {
        text: "Project ki qeemat scope aur zarooriyat par depend karti hai, is liye main yahan rate ya package nahi bata sakta. Aap Free Growth Audit ke liye apna brief bhej sakte hain.",
        actions: CONTACT_ACTIONS,
      };
    case "guarantee":
      return {
        text: "Marketing ke results business, market aur campaign ke mutabiq mukhtalif hote hain; kisi khaas ROAS ya result ki guarantee nahi di jati. Team Free Growth Audit mein aap ke goals dekh sakti hai.",
        actions: CONTACT_ACTIONS,
      };
    case "human":
      return {
        text: `Aap ${CHAT_KNOWLEDGE.contacts.newBusinessEmail} par team se rabta kar sakte hain ya neeche diye gaye office numbers par call kar sakte hain: ${CHAT_KNOWLEDGE.contacts.phones.map((phone) => `${phone.label} ${phone.number}`).join("; ")}. Website par support hours nahi diye gaye.`,
        actions: HANDOFF_ACTIONS,
      };
    case "location":
      return {
        text: `Website par US, Islamabad, Pakistan aur Birmingham, UK ke offices listed hain. Contact page par US, UK, UAE aur Pakistan ke hubs/time zones bhi diye gaye hain. Support hours listed nahi hain. Call: ${CHAT_KNOWLEDGE.contacts.phones.map((phone) => `${phone.label} ${phone.number}`).join("; ")}.`,
        actions: HANDOFF_ACTIONS,
      };
    case "audit":
      return {
        text: `${CHAT_KNOWLEDGE.process.audit} ${CHAT_KNOWLEDGE.process.form} ${CHAT_KNOWLEDGE.process.response} ${CHAT_KNOWLEDGE.process.nda}`,
        actions: CONTACT_ACTIONS,
      };
    case "media":
      return {
        text: `Owned media channels mein ${CHAT_KNOWLEDGE.media.channels.join(", ")} shamil hain. Network aur media kit website par dekhein.`,
        actions: [
          { label: "Owned media", href: CHAT_KNOWLEDGE.media.page },
          { label: "Download media kit", href: CHAT_KNOWLEDGE.media.kit },
        ],
      };
    case "work":
      return {
        text: `Verified work mein ${CONFIRMED_WORK} shamil hain. Main doosre case studies ya unke results verify nahi kar sakta.`,
        actions: [
          { label: "The Salt Line", href: "/the-salt-line" },
          { label: "Branding", href: "/branding" },
        ],
      };
    case "bpo":
      return {
        text: `${CHAT_KNOWLEDGE.faq[1].answer} Business outsourcing bhi services page par listed hai.`,
        actions: [{ label: "BPO services", href: "/services#bpo-outsourcing" }],
      };
    case "hospitality":
      return {
        text: `${CHAT_KNOWLEDGE.faq[2].answer} ${CHAT_KNOWLEDGE.caseStudies[0].name} website par published hospitality work hai.`,
        actions: [
          {
            label: "Hospitality services",
            href: "/services#hospitality-marketing",
          },
          { label: "The Salt Line", href: "/the-salt-line" },
        ],
      };
    case "restaurant":
      return {
        text: `${CHAT_KNOWLEDGE.faq[3].answer} ${CHAT_KNOWLEDGE.caseStudies[0].name} published hospitality work hai.`,
        actions: [
          {
            label: "Restaurant services",
            href: "/services#restaurant-marketing",
          },
          { label: "The Salt Line", href: "/the-salt-line" },
        ],
      };
    case "performance":
      return {
        text: "Performance Marketing mein Google Ads, Meta Ads, paid advertising aur lead generation shamil hain. Results ki guarantee nahi di jati.",
        actions: [
          {
            label: "Performance marketing",
            href: "/services#performance-marketing",
          },
        ],
      };
    case "development":
      return {
        text: "Website par Shopify/e-commerce aur software/web app development services listed hain.",
        actions: [
          { label: "Shopify & e-commerce", href: "/services#shopify-store" },
          {
            label: "Software & web apps",
            href: "/services#software-development",
          },
        ],
      };
    case "seo":
      return {
        text: "SEO services mein technical audits, keyword research, schema, content strategy aur conversion rate optimization shamil hain.",
        actions: [{ label: "SEO services", href: "/services#seo" }],
      };
    case "social":
      return {
        text: "Website par social media campaigns, influencer partnerships, photography, videography aur owned media activations listed hain.",
        actions: [
          { label: "Digital marketing", href: "/services#digital-marketing" },
          {
            label: "Influencer & owned media",
            href: "/services#influencer-marketing",
          },
        ],
      };
    case "branding":
      return {
        text: "Branding mein brand identity, logo, visual guidelines, positioning aur creative direction shamil hain. Cresto Pizza identity aur packaging ka published project hai.",
        actions: [
          { label: "Branding services", href: "/services#branding" },
          { label: "Cresto Pizza work", href: "/branding" },
        ],
      };
    case "services":
      return {
        text: `${CHAT_KNOWLEDGE.faq[0].answer} Additional capabilities mein ${CHAT_KNOWLEDGE.additionalCapabilities.join(", ")} shamil hain.`,
        actions: SERVICES_ACTION,
      };
    default:
      return {
        text: "Mere paas is bare mein verified detail nahi. Aap contact page ya adddemail@gmail.com ke zariye team se pooch sakte hain.",
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
    case "harmful":
      return {
        text: "میں کسی کو نقصان پہنچانے کی درخواست میں مدد نہیں کر سکتا۔ Virtual Velocity کی خدمات یا ٹیم سے رابطے کے بارے میں سوال ہو تو مدد کر سکتا ہوں۔",
        actions: SERVICES_ACTION,
      };
    case "identity":
      return {
        text: "میں Virtual Velocity کا AI اسسٹنٹ ہوں۔ میں ویب سائٹ پر موجود معلومات سے جواب دیتا ہوں اور ٹیم سے رابطے میں مدد کر سکتا ہوں۔",
        actions: HANDOFF_ACTIONS,
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
        text: `${CHAT_KNOWLEDGE.process.audit} ${CHAT_KNOWLEDGE.process.form} ${CHAT_KNOWLEDGE.process.response} ${CHAT_KNOWLEDGE.process.nda}`,
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
        text: `تصدیق شدہ کام میں ${CONFIRMED_WORK} شامل ہیں۔ میں دیگر کیس اسٹڈیز یا ان کے نتائج کی تصدیق نہیں کر سکتا۔`,
        actions: [
          { label: "The Salt Line", href: "/the-salt-line" },
          { label: "Branding", href: "/branding" },
        ],
      };
    case "bpo":
      return {
        text: `${CHAT_KNOWLEDGE.faq[1].answer} بزنس آؤٹ سورسنگ بھی خدمات کے صفحے پر درج ہے۔`,
        actions: [{ label: "BPO services", href: "/services#bpo-outsourcing" }],
      };
    case "hospitality":
      return {
        text: `${CHAT_KNOWLEDGE.faq[2].answer} ${CHAT_KNOWLEDGE.caseStudies[0].name} ویب سائٹ پر موجود ہاسپیٹیلٹی کام ہے۔`,
        actions: [
          {
            label: "Hospitality services",
            href: "/services#hospitality-marketing",
          },
          { label: "The Salt Line", href: "/the-salt-line" },
        ],
      };
    case "restaurant":
      return {
        text: `${CHAT_KNOWLEDGE.faq[3].answer} ${CHAT_KNOWLEDGE.caseStudies[0].name} ویب سائٹ پر موجود ہاسپیٹیلٹی کام ہے۔`,
        actions: [
          {
            label: "Restaurant services",
            href: "/services#restaurant-marketing",
          },
          { label: "The Salt Line", href: "/the-salt-line" },
        ],
      };
    case "performance":
      return {
        text: "پرفارمنس مارکیٹنگ میں Google Ads، Meta Ads، پیڈ ایڈورٹائزنگ، اور لیڈ جنریشن شامل ہیں۔ نتائج کی ضمانت نہیں دی جاتی۔",
        actions: [
          {
            label: "Performance marketing",
            href: "/services#performance-marketing",
          },
        ],
      };
    case "development":
      return {
        text: "ویب سائٹ پر Shopify اور ای کامرس ڈیولپمنٹ کے ساتھ سافٹ ویئر اور ویب ایپ ڈیولپمنٹ درج ہیں۔",
        actions: [
          { label: "Shopify & e-commerce", href: "/services#shopify-store" },
          {
            label: "Software & web apps",
            href: "/services#software-development",
          },
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
          {
            label: "Influencer & owned media",
            href: "/services#influencer-marketing",
          },
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
        text: `${CHAT_KNOWLEDGE.faq[0].answer} اضافی صلاحیتوں میں ${CHAT_KNOWLEDGE.additionalCapabilities.join("، ")} شامل ہیں۔`,
        actions: SERVICES_ACTION,
      };
    default:
      return {
        text: "میرے پاس اس بارے میں مصدقہ تفصیل موجود نہیں۔ آپ رابطہ صفحے یا adddemail@gmail.com کے ذریعے ٹیم سے پوچھ سکتے ہیں۔",
        actions: HANDOFF_ACTIONS,
      };
  }
}

export function getAssistantReply(message: string): ChatReply {
  const language = detectLanguage(message);
  const intent = detectIntent(message);
  if (language === "ur") return getUrduReply(intent);
  if (language === "roman-ur") return getRomanUrduReply(intent);
  return getEnglishReply(intent);
}
