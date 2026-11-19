import OpenAI from "openai";

export interface GroundedLlmReplyInput {
  openaiKey: string;
  model: string;
  businessName: string;
  question: string;
  faqQuestion?: string;
  faqAnswer?: string;
}

// Optional LLM grounding. The model is instructed to answer only from the
// approved FAQ context. Returns null when the LLM is unavailable or fails —
// callers must fall back to the deterministic FAQ answer and never fabricate.
export async function generateGroundedReply(input: GroundedLlmReplyInput): Promise<string | null> {
  try {
    const client = new OpenAI({ apiKey: input.openaiKey });
    const completion = await client.chat.completions.create({
      model: input.model,
      temperature: 0,
      max_tokens: 250,
      messages: [
        {
          role: "system",
          content:
            "You are a customer support assistant for a small business. Answer ONLY from the approved business FAQ context provided. If the context does not cover the question, respond: I don't have that information available. Do not invent prices, policies, services, availability, or facts. Be concise.",
        },
        {
          role: "user",
          content: `Business name: ${input.businessName}\nApproved FAQ context: Q: ${input.faqQuestion ?? ""}\nA: ${input.faqAnswer ?? ""}\nCustomer question: ${input.question}`,
        },
      ],
    });
    const content = completion?.choices?.[0]?.message?.content;
    if (typeof content !== "string") return null;
    const reply = content.trim();
    return reply.length > 0 ? reply : null;
  } catch {
    return null;
  }
}
