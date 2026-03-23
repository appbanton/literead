"use client";

import { useState, useEffect, useRef } from "react";
import { vapi } from "@/lib/vapi.sdk";
import { configureReadingAssistant } from "@/lib/vapi-reading-assistant";

export enum CallStatus {
  INACTIVE = "inactive",
  CONNECTING = "connecting",
  ACTIVE = "active",
  FINISHED = "finished",
}

// Removed props from original Converso template that were never used inside
// this component: topic, title, userName, userImage.
// voice + style are kept — they pass through to configureReadingAssistant.
interface ReadingSessionComponentProps {
  passageId: string;
  subject: string | null;
  voice: string;
  style: string;
  passageContent: string;
  passageTitle: string;
  gradeLevel: string;
  onSessionComplete: (
    transcript: SavedMessage[],
    durationSeconds: number,
  ) => void;
  onStatusChange?: (status: CallStatus) => void;
  onMessagesChange?: (messages: SavedMessage[]) => void;
  onSpeakingChange?: (isSpeaking: boolean) => void;
}

export default function ReadingSessionComponent({
  subject,
  voice,
  style,
  passageContent,
  passageTitle,
  gradeLevel,
  onSessionComplete,
  onStatusChange,
  onMessagesChange,
  onSpeakingChange,
}: ReadingSessionComponentProps) {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [callStartTime, setCallStartTime] = useState<number | null>(null);

  const messagesRef = useRef<SavedMessage[]>([]);
  const callStartTimeRef = useRef<number | null>(null);
  const hasStartedCall = useRef(false);

  const onSessionCompleteRef = useRef(onSessionComplete);
  const onStatusChangeRef = useRef(onStatusChange);
  const onMessagesChangeRef = useRef(onMessagesChange);
  const onSpeakingChangeRef = useRef(onSpeakingChange);

  useEffect(() => {
    onSessionCompleteRef.current = onSessionComplete;
  }, [onSessionComplete]);
  useEffect(() => {
    onStatusChangeRef.current = onStatusChange;
  }, [onStatusChange]);
  useEffect(() => {
    onMessagesChangeRef.current = onMessagesChange;
  }, [onMessagesChange]);
  useEffect(() => {
    onSpeakingChangeRef.current = onSpeakingChange;
  }, [onSpeakingChange]);

  const updateStatus = (status: CallStatus) => {
    setCallStatus(status);
    onStatusChangeRef.current?.(status);
  };

  const updateMessages = (msgs: SavedMessage[]) => {
    messagesRef.current = msgs;
    onMessagesChangeRef.current?.(msgs);
  };

  useEffect(() => {
    if (!hasStartedCall.current && callStatus === CallStatus.INACTIVE) {
      hasStartedCall.current = true;
      handleCall();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onCallStart = () => {
      const now = Date.now();
      setCallStartTime(now);
      callStartTimeRef.current = now;
      updateStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = async () => {
      updateStatus(CallStatus.FINISHED);
      const finalMessages = messagesRef.current;
      const startTime = callStartTimeRef.current;
      const callDuration = startTime ? (Date.now() - startTime) / 1000 : 0;

      if (callDuration >= 30) {
        onSessionCompleteRef.current(finalMessages, Math.floor(callDuration));
      } else {
        alert(
          `❌ Voice session failed after ${Math.floor(callDuration)}s. No session consumed.`,
        );
      }
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMsg: SavedMessage = {
          role: message.role,
          content: message.transcript,
        };
        const updated = [...messagesRef.current, newMsg];
        updateMessages(updated);
      }
    };

    const onSpeechStart = () => onSpeakingChangeRef.current?.(true);
    const onSpeechEnd = () => onSpeakingChangeRef.current?.(false);
    const onError = (error: Error) => console.error("Vapi error:", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCall = async () => {
    if (!process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN) {
      alert(
        "❌ Voice AI not configured. Add NEXT_PUBLIC_VAPI_WEB_TOKEN to .env.local",
      );
      return;
    }
    updateStatus(CallStatus.CONNECTING);
    try {
      const assistant = configureReadingAssistant(
        passageTitle,
        passageContent,
        subject,
        gradeLevel,
        voice,
        style,
      );
      await vapi.start(assistant);
    } catch (error) {
      console.error("Failed to start Vapi:", error);
      updateStatus(CallStatus.INACTIVE);
      if (error instanceof Error) {
        if (error.message.includes("token") || error.message.includes("auth")) {
          alert("❌ Invalid Vapi token. Check your NEXT_PUBLIC_VAPI_WEB_TOKEN");
        } else if (
          error.message.includes("credit") ||
          error.message.includes("limit")
        ) {
          alert("❌ Vapi account has no credits.");
        } else {
          alert(`❌ Voice AI failed: ${error.message}`);
        }
      }
    }
  };

  const handleEndCall = () => vapi.stop();
  const handleToggleMute = () => vapi.setMuted(!vapi.isMuted());

  return null;
}

export function useVapiControls() {
  const endCall = () => vapi.stop();
  const toggleMute = () => vapi.setMuted(!vapi.isMuted());
  const isMuted = () => vapi.isMuted();
  return { endCall, toggleMute, isMuted };
}
