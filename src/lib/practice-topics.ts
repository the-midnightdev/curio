import type { PracticeCategory, PracticeTopic } from "./types";

export const practiceCategories: PracticeCategory[] = [
  { slug: "history-culture", name: "History & Culture" },
  { slug: "society", name: "Society" },
  { slug: "geography-environment", name: "Geography & Environment" },
  { slug: "government-rights", name: "Government & Rights" },
  { slug: "economy", name: "Economy" },
  { slug: "science-technology", name: "Science & Technology" },
  { slug: "world-affairs", name: "World Affairs" },
  { slug: "ethics-decisions", name: "Ethics & Decisions" },
  { slug: "psychology-mind", name: "Psychology & Mind" },
];

export const practiceTopics: PracticeTopic[] = [
  { id: "presentism", title: "Presentism", summary: "Judging the past only through today’s assumptions can hide what choices looked like at the time.", category: "history-culture" },
  { id: "primary-sources", title: "Primary and secondary sources", summary: "Evidence created during an event differs from later interpretation—and both require scrutiny.", category: "history-culture" },
  { id: "cultural-heritage", title: "Who owns cultural heritage?", summary: "Objects, monuments, and traditions can carry competing claims about identity, memory, and ownership.", category: "history-culture" },
  { id: "historical-contingency", title: "Historical contingency", summary: "History was not inevitable; small events and decisions can redirect much larger outcomes.", category: "history-culture", articleSlug: "the-year-the-sun-went-dim" },
  { id: "path-dependence", title: "Path dependence", summary: "Choices made long ago can lock institutions and technologies into patterns that remain costly to change.", category: "history-culture" },

  { id: "social-norms", title: "Social norms", summary: "Unwritten expectations coordinate behaviour, but they can also preserve practices nobody openly chose.", category: "society", articleSlug: "why-rituals-still-work" },
  { id: "pluralistic-ignorance", title: "Pluralistic ignorance", summary: "A group can privately reject a norm while each person mistakenly believes everyone else accepts it.", category: "society" },
  { id: "demographic-dividend", title: "The demographic dividend", summary: "A large working-age population can accelerate development, but only when health, education, and jobs keep pace.", category: "society" },
  { id: "social-mobility", title: "Social mobility", summary: "How much should a person’s opportunities depend on the family and circumstances into which they were born?", category: "society" },
  { id: "social-identity", title: "Social identity", summary: "Belonging to groups shapes how people see themselves, interpret events, and respond to outsiders.", category: "society" },
  { id: "group-polarisation", title: "Group polarisation", summary: "Discussion among like-minded people can move the whole group toward a more extreme position.", category: "society" },

  { id: "map-distortion", title: "Every map distorts", summary: "Flattening a globe forces trade-offs between area, shape, distance, and direction.", category: "geography-environment", articleSlug: "why-maps-must-distort" },
  { id: "tragedy-commons", title: "The tragedy of the commons", summary: "Individual incentives can collectively exhaust a shared resource unless people coordinate.", category: "geography-environment" },
  { id: "urban-heat", title: "The urban heat-island effect", summary: "Built-up areas retain more heat than nearby rural land, making city design a public-health issue.", category: "geography-environment" },
  { id: "water-stress", title: "Water stress", summary: "Water scarcity is shaped not only by rainfall, but also by infrastructure, farming, pricing, and political choices.", category: "geography-environment" },
  { id: "carbon-budget", title: "The carbon budget", summary: "Because warming depends on cumulative emissions, every additional tonne of carbon reduces the room left for future emissions.", category: "geography-environment" },
  { id: "biodiversity-resilience", title: "Biodiversity and resilience", summary: "Diverse ecosystems are often better able to absorb disruption and continue providing essential services.", category: "geography-environment" },

  { id: "rule-of-law", title: "The rule of law", summary: "Public power should be constrained by known laws that apply to rulers as well as citizens.", category: "government-rights" },
  { id: "separation-powers", title: "Separation of powers", summary: "Dividing authority between institutions can prevent abuse, but it can also slow collective action.", category: "government-rights" },
  { id: "liberty-security", title: "Liberty versus security", summary: "When, if ever, should individual freedoms be limited to protect the wider public?", category: "government-rights" },
  { id: "federalism", title: "Federalism", summary: "Sharing authority between national and regional governments balances unity with local difference.", category: "government-rights" },
  { id: "public-goods", title: "Public goods", summary: "Some benefits are difficult to exclude people from and are not depleted by sharing, making collective funding necessary.", category: "government-rights" },
  { id: "digital-privacy", title: "Digital privacy", summary: "Personal data can reveal behaviour, relationships, and vulnerabilities even when each individual detail seems harmless.", category: "government-rights" },

  { id: "opportunity-cost", title: "Opportunity cost", summary: "The real cost of a choice includes the best alternative that must be given up.", category: "economy" },
  { id: "inflation", title: "Why inflation changes behaviour", summary: "Rising prices reshape saving, spending, wages, debt, and trust—not merely the cost of shopping.", category: "economy" },
  { id: "externalities", title: "Externalities", summary: "Some costs and benefits fall on people who were not part of the original transaction.", category: "economy" },
  { id: "comparative-advantage", title: "Comparative advantage", summary: "Cooperation can benefit both sides when each specialises in what it gives up least to produce.", category: "economy" },
  { id: "compound-interest", title: "Compound interest", summary: "Returns and debts grow on their previous growth, so small differences in time and rates can produce large outcomes.", category: "economy" },
  { id: "diversification", title: "Diversification", summary: "Spreading exposure across different risks can reduce the damage caused by any single failure.", category: "economy" },

  { id: "correlation-causation", title: "Correlation is not causation", summary: "Two things moving together does not establish that one caused the other.", category: "science-technology" },
  { id: "falsifiability", title: "Falsifiability", summary: "A scientific claim must risk being wrong by allowing evidence that could count against it.", category: "science-technology" },
  { id: "algorithmic-bias", title: "Algorithmic bias", summary: "Automated systems can reproduce social inequalities when their data, goals, or deployment contain hidden assumptions.", category: "science-technology" },
  { id: "feedback-loops", title: "Feedback loops", summary: "Some effects reinforce the process that created them, while others push a system back toward balance.", category: "science-technology" },
  { id: "ai-hallucinations", title: "Why AI hallucinates", summary: "Generative systems predict plausible patterns rather than verify truth, so confident answers can still be fabricated.", category: "science-technology" },
  { id: "source-verification", title: "Source verification", summary: "A claim becomes more trustworthy when its origin, evidence, context, and independent confirmation can be checked.", category: "science-technology" },

  { id: "sovereignty", title: "Sovereignty", summary: "States claim authority within their borders, yet trade, climate, migration, and technology routinely cross them.", category: "world-affairs" },
  { id: "soft-power", title: "Soft power", summary: "Countries influence others through culture, values, and attraction as well as money or military force.", category: "world-affairs" },
  { id: "multipolarity", title: "A multipolar world", summary: "What changes when global influence is distributed among several major powers instead of one or two?", category: "world-affairs" },
  { id: "refugee-asylum", title: "Refugees and asylum", summary: "What responsibilities do states have toward people forced to flee danger across borders?", category: "world-affairs" },
  { id: "collective-action", title: "Collective-action problems", summary: "Everyone may benefit from cooperation even when each participant has an incentive to avoid contributing.", category: "world-affairs" },
  { id: "international-institutions", title: "Why international institutions matter", summary: "Shared rules and organisations help states coordinate, exchange information, and manage disputes without a world government.", category: "world-affairs" },

  { id: "veil-ignorance", title: "The veil of ignorance", summary: "What rules would you choose if you did not know which position in society you would occupy?", category: "ethics-decisions" },
  { id: "conflict-interest", title: "Conflict of interest", summary: "Good decisions require recognising when personal incentives could distort a public or professional duty.", category: "ethics-decisions" },
  { id: "means-ends", title: "Do good ends justify bad means?", summary: "A desirable outcome does not automatically settle whether the method used to reach it was acceptable.", category: "ethics-decisions" },
  { id: "moral-luck", title: "Moral luck", summary: "Should people be judged differently when outcomes beyond their control change the consequences of similar choices?", category: "ethics-decisions" },
  { id: "precautionary-principle", title: "The precautionary principle", summary: "When potential harm is serious and uncertain, lack of complete evidence may not justify waiting to act.", category: "ethics-decisions" },

  { id: "confirmation-bias", title: "Confirmation bias", summary: "We tend to seek, notice, and remember evidence that supports what we already believe.", category: "psychology-mind" },
  { id: "cognitive-dissonance", title: "Cognitive dissonance", summary: "When actions and beliefs conflict, people often change the story they tell themselves before changing their behaviour.", category: "psychology-mind" },
  { id: "memory-reconstruction", title: "Memory is reconstruction", summary: "Remembering is an active rebuild rather than a perfect playback, so confidence and accuracy can diverge.", category: "psychology-mind", articleSlug: "why-do-we-remember-things-that-never-happened" },
  { id: "spotlight-effect", title: "The spotlight effect", summary: "We usually overestimate how much other people notice our appearance, mistakes, and awkward moments.", category: "psychology-mind", articleSlug: "the-spotlight-that-isnt-on-you" },
  { id: "emotion-regulation", title: "Emotion regulation", summary: "People can influence which emotions they have, when they arise, and how those emotions are experienced or expressed.", category: "psychology-mind" },
  { id: "motivated-reasoning", title: "Motivated reasoning", summary: "People often evaluate evidence in ways that protect a preferred belief, identity, or desired conclusion.", category: "psychology-mind" },
];
