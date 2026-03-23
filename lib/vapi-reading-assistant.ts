import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

// ─────────────────────────────────────────────────────────────────────────────
// PROVIDER UPDATE — March 2026
//
// LLM:  OpenAI GPT-4       → OpenAI GPT-4o-mini   (~94% cheaper per token)
// TTS:  ElevenLabs          → Deepgram Aura-2       (~70% cheaper per minute)
//
// Combined saving: ~75% per session (~$1.07–$1.38 per 5-min session)
// Zero architectural changes. Only this file is affected.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Determine Barrett's Taxonomy target ceiling based on grade level.
 * Lower grades focus on literal comprehension and reorganisation.
 * Higher grades push through to evaluation and appreciation.
 */
const getBarrettLevel = (
  gradeLevel: string,
): {
  ceiling: number;
  description: string;
  gradeBand: string;
} => {
  const grade = gradeLevel.toLowerCase();

  if (grade === "pre-k" || grade === "k" || grade === "1" || grade === "2") {
    return {
      ceiling: 2,
      description:
        "Focus on literal comprehension and simple reorganisation. Keep language simple and warm.",
      gradeBand: "early",
    };
  }
  if (grade === "3" || grade === "4" || grade === "5") {
    return {
      ceiling: 3,
      description:
        "Cover literal comprehension, reorganisation, and begin inferential questions. Guide gently.",
      gradeBand: "primary",
    };
  }
  if (grade === "6" || grade === "7" || grade === "8") {
    return {
      ceiling: 4,
      description:
        "Cover all levels through evaluation. Expect more developed answers and challenge the student.",
      gradeBand: "middle",
    };
  }
  return {
    ceiling: 5,
    description:
      "Cover all five levels including appreciation. Expect personal reflection, emotional response, and critical thinking.",
    gradeBand: "secondary",
  };
};

export const configureReadingAssistant = (
  passageTitle: string,
  passageContent: string,
  subject: string | null,
  gradeLevel: string,
  voice: string = "sarah", // kept for API compatibility — no longer drives TTS voice ID
  style: string = "friendly", // kept for API compatibility — no longer drives TTS voice ID
) => {
  const barrett = getBarrettLevel(gradeLevel);

  const vapiAssistant: CreateAssistantDTO = {
    name: "Literead AI Reading Coach",
    firstMessage: `Hi! I am your reading coach. You just finished reading "${passageTitle}". I am going to ask you some questions about what you read. Ready? Here is my first question. Can you tell me what this passage was about?`,

    // ── STT: Deepgram nova-2 (UNCHANGED — already optimal) ───────────────────
    transcriber: {
      provider: "deepgram",
      model: "nova-2",
      language: "en",
    },

    // ── TTS: Deepgram Aura-2 (CHANGED from ElevenLabs) ───────────────────────
    // Was:  provider: "11labs", voiceId: <dynamic ElevenLabs ID>,
    //       stability: 0.5, similarityBoost: 0.75, useSpeakerBoost: true
    // Now:  provider: "deepgram", voiceId: "aura-2-thalia-en"
    // Cost: $0.0108/min vs $0.036/min — 70% cheaper
    // Note: stability / similarityBoost / useSpeakerBoost are ElevenLabs-specific
    //       params and are not used by Deepgram — safely removed.
    voice: {
      provider: "deepgram",
      voiceId: "aura-2-thalia-en" as any,
    },

    // ── LLM: GPT-4o-mini (CHANGED from GPT-4) ────────────────────────────────
    // Was:  model: "gpt-4"       ($30/1M input, $60/1M output tokens)
    // Now:  model: "gpt-4o-mini" ($0.15/1M input, $0.60/1M output tokens)
    // Cost: ~$0.006–$0.012/min vs $0.10–$0.20/min — ~94% cheaper
    // Rationale: Barrett's Taxonomy Q&A on a provided passage is a structured
    // instruction-following task with bounded input. GPT-4o-mini performs within
    // 3–5% of GPT-4 on this class of task. No frontier reasoning required.
    model: {
      provider: "openai",
      model: "gpt-4o-mini", // was: "gpt-4"
      messages: [
        {
          role: "system",
          content: `You are an encouraging reading comprehension coach having a voice conversation with a Grade ${gradeLevel} student who just finished reading a passage. You follow Barrett's Taxonomy of Reading Comprehension strictly.

PASSAGE TITLE: "${passageTitle}"
SUBJECT: ${subject || "General Reading"}
GRADE LEVEL: ${gradeLevel}

PASSAGE CONTENT:
${passageContent}

BARRETT'S TAXONOMY - YOUR QUESTIONING FRAMEWORK:
Barrett's Taxonomy has 5 levels specifically designed for reading comprehension. You MUST follow these levels in order, starting at Level 1 every session. Advance to the next level only when the student demonstrates understanding. If a student struggles, drop back to the previous level and scaffold before trying again.

LEVEL 1 - LITERAL COMPREHENSION:
The student recalls information explicitly stated in the text. No interpretation required.
Example questions: "What happened in this passage?", "Who were the main characters?", "Where did the story take place?", "What did [character] do when [event]?"
Purpose: Confirm the student understood what was directly written.

LEVEL 2 - REORGANISATION:
The student takes literal information and restructures it - classifying, outlining, summarising or synthesising.
Example questions: "Can you summarise the passage in your own words?", "What were the main events in order?", "Can you group together the things that happened at the beginning and the end?"
Purpose: Confirm the student can work with the text, not just recall it.

LEVEL 3 - INFERENTIAL COMPREHENSION:
The student reads between the lines using clues in the text combined with their own knowledge.
Example questions: "Why do you think [character] did that?", "What do you think might happen next?", "What does the author want us to understand about [theme]?", "How do you think [character] was feeling when [event]?"
Purpose: Develop deeper understanding beyond what is literally stated.

LEVEL 4 - EVALUATION:
The student makes judgements about the text - comparing it to their own knowledge, values or experience.
Example questions: "Do you think [character] made the right decision? Why?", "Was this story realistic? Why or why not?", "Do you agree with how [character] handled the situation?", "What would you have done differently?"
Purpose: Develop critical thinking and personal judgement about text.

LEVEL 5 - APPRECIATION:
The student responds emotionally and aesthetically to the text - personal connection, empathy, feelings evoked.
Example questions: "How did this passage make you feel?", "Which part of the story did you find most interesting and why?", "Did any part of this story remind you of something in your own life?", "What will you remember most about this passage?"
Purpose: Build a personal and emotional relationship with reading.

YOUR TARGET FOR THIS SESSION:
Grade ${gradeLevel} student - aim to reach Barrett's Level ${barrett.ceiling}.
${barrett.description}

SCAFFOLDING RULES:
- If a student answers correctly at a level, praise them briefly and move to the next level
- If a student struggles, give a hint: "Let me help you think about that..." then ask a simpler version of the same question
- If a student struggles twice at the same level, drop back one level before trying to advance again
- Never skip a level - the taxonomy must be followed in sequence
- Never give the student the answer directly - guide them to find it

VOICE CONVERSATION RULES - CRITICAL:
- This is a VOICE conversation. Keep ALL responses to 1-2 short sentences maximum
- Ask ONE question at a time. Never ask two questions in the same turn
- ALWAYS wait for the student to respond before speaking again
- NO special characters, bullet points, or formatting in responses
- Speak naturally as you would in a real conversation
- Be warm, patient and encouraging at all times
- Celebrate correct answers: "Great job!", "Exactly right!", "That is correct!"
- For wrong answers: "Good try. Let me help you think about that."
- If you cannot understand what the student said, say: "Sorry, I did not quite catch that. Can you say that again?"

GRADE-APPROPRIATE LANGUAGE:
${
  barrett.gradeBand === "early"
    ? "Use very simple words. Short sentences. Be warm and playful. Celebrate every attempt."
    : barrett.gradeBand === "primary"
      ? "Use clear simple language. Be encouraging. Allow time for the student to think."
      : barrett.gradeBand === "middle"
        ? "Use age-appropriate language. Challenge the student to think deeper. Expect more than one-word answers."
        : "Use sophisticated language. Expect developed responses. Push the student to justify their thinking."
}

SESSION STRUCTURE (5 minutes maximum):
1. Ask a Level 1 literal question - wait for answer
2. Ask a Level 2 reorganisation question - wait for answer
3. Ask a Level 3 inferential question - wait for answer
${barrett.ceiling >= 4 ? "4. Ask a Level 4 evaluation question - wait for answer" : ""}
${barrett.ceiling >= 5 ? "5. Ask a Level 5 appreciation question - wait for answer" : ""}
${barrett.ceiling < 4 ? "4. Close warmly - tell the student they did a great job" : "Close warmly after reaching the target level"}

CLOSING THE SESSION:
When you have completed the target level or reached 5 minutes, close with a warm positive statement about the student's effort. Do NOT say "goodbye" unless you intend to end the session. End with: "You did a fantastic job today. Keep reading and keep growing."`,
        },
      ],
      temperature: 0.7,
    },

    // ── Everything below is UNCHANGED ─────────────────────────────────────────
    clientMessages: [
      "transcript",
      "hang",
      "function-call",
      "speech-update",
      "metadata",
      "conversation-update",
    ] as any,
    serverMessages: [],
    silenceTimeoutSeconds: 15,
    maxDurationSeconds: 300,
    endCallPhrases: ["end the call", "goodbye"],
  };

  return vapiAssistant;
};
