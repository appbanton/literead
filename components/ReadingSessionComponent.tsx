"use client";

import { useState, useEffect, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundWaves from "@/constants/soundwaves.json";
import { vapi } from "@/lib/vapi.sdk";
import { configureReadingAssistant } from "@/lib/vapi-reading-assistant";

enum CallStatus {
  INACTIVE = "inactive",
  CONNECTING = "connecting",
  ACTIVE = "active",
  FINISHED = "finished",
}

interface ReadingSessionComponentProps {
  passageId: string;
  subject: string | null;
  topic: string;
  title: string;
  userName: string;
  userImage: string;
  voice: string;
  style: string;
  passageContent: string;
  passageTitle: string;
  gradeLevel: string;
  onSessionComplete: (
    transcript: SavedMessage[],
    durationSeconds: number
  ) => void; // Updated to pass transcript
}

export default function ReadingSessionComponent({
  passageId,
  subject,
  title,
  userName,
  userImage,
  voice,
  style,
  passageContent,
  passageTitle,
  gradeLevel,
  onSessionComplete,
}: ReadingSessionComponentProps) {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [callStartTime, setCallStartTime] = useState<number | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const hasStartedCall = useRef(false);

  useEffect(() => {
    if (lottieRef.current) {
      isSpeaking ? lottieRef.current.play() : lottieRef.current.stop();
    }
  }, [isSpeaking]);

  // Auto-start call when component mounts
  useEffect(() => {
    const startCall = async () => {
      if (!hasStartedCall.current && callStatus === CallStatus.INACTIVE) {
        hasStartedCall.current = true;
        await handleCall();
      }
    };
    startCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
      setCallStartTime(Date.now());
    };

    const onCallEnd = async () => {
      setCallStatus(CallStatus.FINISHED);

      // Calculate call duration
      const callDuration = callStartTime
        ? (Date.now() - callStartTime) / 1000
        : 0;

      console.log("📞 Call ended:");
      console.log("   - Duration:", callDuration, "seconds");
      console.log("   - Messages captured:", messages.length);
      console.log("   - Messages array:", messages);

      if (callDuration >= 30) {
        // Real session - count it and save transcript
        onSessionComplete(messages, Math.floor(callDuration));
      } else {
        // Failed immediately - don't count it
        console.warn(`Session failed after ${callDuration}s - not counting`);
        alert(
          "❌ Voice session failed to start. No session consumed. Please try again or contact support."
        );
      }
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage: SavedMessage = {
          role: message.role,
          content: message.transcript,
        };
        console.log("💬 New message captured:", newMessage);
        setMessages((prev) => {
          const updated = [...prev, newMessage];
          console.log("📝 Total messages now:", updated.length);
          return updated;
        });
      }
    };

    const onError = (error: Error) => console.error("Vapi error:", error);
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, [passageId, onSessionComplete, callStartTime]);

  const handleCall = async () => {
    // Check for Vapi token first
    if (!process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN) {
      alert(
        "❌ Voice AI not configured. Add NEXT_PUBLIC_VAPI_WEB_TOKEN to .env.local"
      );
      setCallStatus(CallStatus.INACTIVE);
      return;
    }

    setCallStatus(CallStatus.CONNECTING);

    try {
      const assistant = configureReadingAssistant(
        passageTitle,
        passageContent,
        subject,
        gradeLevel,
        voice,
        style
      );

      await vapi.start(assistant);
      console.log("✅ Vapi session started successfully");
    } catch (error) {
      console.error("❌ Failed to start Vapi session:", error);
      setCallStatus(CallStatus.INACTIVE);

      // Better error messages
      if (error instanceof Error) {
        if (error.message.includes("token") || error.message.includes("auth")) {
          alert(
            "❌ Invalid Vapi token. Check your NEXT_PUBLIC_VAPI_WEB_TOKEN in .env.local"
          );
        } else if (
          error.message.includes("credit") ||
          error.message.includes("limit")
        ) {
          alert(
            "❌ Vapi account has no credits. Add credits at vapi.ai or use a different token."
          );
        } else {
          alert(
            `❌ Voice AI failed: ${error.message}. Check browser console for details.`
          );
        }
      } else {
        alert(
          "❌ Voice AI failed to start. Check browser console for details."
        );
      }
    }
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const toggleMicrophone = () => {
    const currentlyMuted = vapi.isMuted();
    vapi.setMuted(!currentlyMuted);
    setIsMuted(!currentlyMuted);
  };

  return (
    <section className="flex flex-col gap-8 max-w-4xl mx-auto">
      {/* Simple Voice Status Card */}
      <div className="bg-white rounded-lg shadow-sm p-8 text-center border-2 border-gray-200">
        <div className="mb-6">
          {callStatus === CallStatus.INACTIVE && (
            <div className="text-gray-400 mb-4">
              <svg
                className="w-20 h-20 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </div>
          )}

          {callStatus === CallStatus.CONNECTING && (
            <div className="text-primary mb-4 animate-pulse">
              <svg
                className="w-20 h-20 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </div>
          )}

          {callStatus === CallStatus.ACTIVE && (
            <div className="relative mb-4">
              <Lottie
                lottieRef={lottieRef}
                animationData={soundWaves}
                autoplay={false}
                className="w-32 h-32 mx-auto"
              />
            </div>
          )}

          <h2 className="text-2xl font-bold mb-2">
            {callStatus === CallStatus.INACTIVE && "Ready to Discuss"}
            {callStatus === CallStatus.CONNECTING && "Connecting..."}
            {callStatus === CallStatus.ACTIVE && "In Discussion"}
            {callStatus === CallStatus.FINISHED && "Discussion Complete"}
          </h2>

          <p className="text-gray-600">
            {callStatus === CallStatus.INACTIVE &&
              "Click start to begin your voice discussion with the AI coach"}
            {callStatus === CallStatus.CONNECTING &&
              "Setting up voice connection..."}
            {callStatus === CallStatus.ACTIVE && `Discussing: ${passageTitle}`}
            {callStatus === CallStatus.FINISHED &&
              "Great job completing this discussion!"}
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3">
          {callStatus === CallStatus.ACTIVE && (
            <>
              <button
                onClick={toggleMicrophone}
                className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMuted ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    />
                  )}
                </svg>
                <span>{isMuted ? "Unmute Microphone" : "Mute Microphone"}</span>
              </button>

              <button
                onClick={handleDisconnect}
                className="py-4 rounded-lg font-semibold text-lg transition-colors bg-red-600 text-white hover:bg-red-700 cursor-pointer"
              >
                End Discussion
              </button>
            </>
          )}
        </div>
      </div>

      {/* Transcript */}
      {messages.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-gray-200">
          <h3 className="font-bold text-lg mb-4">Discussion Transcript</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  message.role === "assistant"
                    ? "bg-gray-100"
                    : "bg-primary bg-opacity-10"
                }`}
              >
                <p className="font-semibold text-sm mb-1">
                  {message.role === "assistant" ? "AI Coach" : userName}
                </p>
                <p className="text-gray-800">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
