import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { voices } from "@/constants";

/**
 * Configure Vapi assistant for reading comprehension coaching
 * The AI will ask questions about the passage the student just read
 */
export const configureReadingAssistant = (
  passageTitle: string,
  passageContent: string,
  subject: string | null,
  gradeLevel: string,
  voice: string = "sarah",
  style: string = "friendly"
) => {
  // Get voice ID (default to sarah if not found)
  const voiceId =
    voices[voice as keyof typeof voices]?.[
      style as keyof (typeof voices)[keyof typeof voices]
    ] || "sarah";

  const vapiAssistant: CreateAssistantDTO = {
    name: "Reading Comprehension Coach",
    firstMessage: `Hi! I'm your reading coach. I see you finished reading "${passageTitle}". Let me ask you some questions about what you read. First question: What was this story about?`,
    transcriber: {
      provider: "deepgram",
      model: "nova-2",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.5,
      similarityBoost: 0.75,
      speed: 0.9, // Slightly slower for kids
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an encouraging reading comprehension coach having a voice conversation with a ${gradeLevel} grade student who just finished reading a passage.

PASSAGE TITLE: "${passageTitle}"
SUBJECT: ${subject || "General Reading"}

PASSAGE CONTENT:
${passageContent}

YOUR ROLE:
- Ask thoughtful comprehension questions about the passage
- Help the student understand main ideas, details, and themes
- Be encouraging and patient - WAIT for student responses
- Adapt to the student's ${gradeLevel} grade level
- Keep responses SHORT (1-2 sentences max) - this is voice conversation
- If student struggles, guide them with hints rather than giving answers
- DO NOT end the conversation prematurely - continue asking questions

CONVERSATION FLOW (5 minutes total):
1. Start by asking what the passage was about (main idea) - WAIT for answer
2. Ask about specific details they remember - WAIT for answer
3. Ask about vocabulary or challenging words - WAIT for answer
4. Ask inference/prediction questions ("Why do you think...", "What might happen next...") - WAIT for answer
5. End by asking what they learned or what they thought was interesting - WAIT for answer

IMPORTANT:
- Keep style ${style}
- NO special characters in responses (this is voice-only)
- ALWAYS wait for student to respond before asking next question
- If student gives brief answers, ask follow-up questions
- Celebrate correct answers: "Great job!", "Exactly!", "That's right!"
- For incorrect answers: "Hmm, let me help you think about that..."
- Continue for 5 minutes or 5-7 question exchanges, then wrap up positively
- DO NOT say "goodbye" or end phrases unless conversation is truly complete
`,
        },
      ],
      temperature: 0.7,
    },
    clientMessages: ["transcript"] as any, // Vapi SDK type issue workaround
    serverMessages: [],
    // Extended timeouts for natural conversation
    silenceTimeoutSeconds: 15, // Wait 15s for user response
    maxDurationSeconds: 300, // 5 minutes max
    // Only explicit end phrases to prevent accidental endings
    endCallPhrases: ["goodbye", "end the call"],
  };

  return vapiAssistant;
};
