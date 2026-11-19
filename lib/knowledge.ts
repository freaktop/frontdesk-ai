export interface FaqLike {
  question: string;
  answer: string;
  category?: string | null;
}

export interface GroundedMatch {
  faq: FaqLike;
  score: number;
}

const STOPWORDS = new Set([
  "what", "how", "much", "does", "do", "you", "your", "we", "our", "the", "and", "are", "can",
  "could", "would", "should", "please", "tell", "about", "services", "service", "available",
]);

function contentTerms(question: string): string[] {
  const tokens = question.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 3);
  const terms = tokens.filter((t) => !STOPWORDS.has(t));
  return [...new Set(terms)];
}

// Deterministic, dependency-free grounded retrieval over approved FAQs.
// Higher score = better match. No LLM required for fallback answering.
export function findFaqMatch(faqs: FaqLike[], question: string): GroundedMatch | null {
  const q = question.toLowerCase().trim();
  const terms = contentTerms(q);
  if (terms.length === 0) return null;

  let best: GroundedMatch | null = null;
  for (const f of faqs) {
    const qLower = f.question.toLowerCase();
    const aLower = f.answer.toLowerCase();
    const hay = `${qLower} ${aLower} ${f.category ?? ""}`.toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (qLower.includes(t)) score += 10;
      else if (hay.includes(t)) score += 2;
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { faq: f, score };
    }
  }
  return best;
}

export const GROUNDING_SCORE_THRESHOLD = 5;
