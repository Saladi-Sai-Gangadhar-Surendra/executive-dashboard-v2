"use client";

import { useState } from "react";
import { useDashboard } from "@/src/context/DashboardContext";

export default function Chatbot() {
  const { excelData } = useDashboard();

  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState<any[]>([
      {
        role: "bot",
        text: "Hello 👋 Ask me anything about your projects.",
      },
    ]);

  const askBot = () => {
    if (!question.trim()) return;

    let answer =
      "Sorry, I could not find an answer.";

    const q =
      question.toLowerCase();

    const faq =
      excelData?.PROJECT_FAQ || [];

    const owners =
      excelData?.OWNER_KNOWLEDGE ||
      [];

    const quickFacts =
      excelData?.CHATBOT_QUICK_FACTS ||
      [];

    const knowledge =
      excelData?.PROJECT_KNOWLEDGE_BASE ||
      [];

    /* FAQ */

    const faqMatch = faq.find(
      (row: any) =>
        q.includes(
          String(
            row.Question
          ).toLowerCase()
        )
    );

    if (faqMatch) {
      answer = faqMatch.Answer;
    }

    /* Owners */

    const ownerMatch =
      owners.find((row: any) =>
        q.includes(
          String(
            row.Owner
          ).toLowerCase()
        )
      );

    if (ownerMatch) {
      answer =
        `${ownerMatch.Owner} works on ${ownerMatch.Project} in ${ownerMatch.Workstream}. Responsibility: ${ownerMatch.Responsibility}`;
    }

    /* Projects */

    const projectMatch =
      knowledge.find((row: any) =>
        q.includes(
          String(
            row.Project
          ).toLowerCase()
        )
      );

    if (projectMatch) {
      answer =
        `${projectMatch.Project}: ${projectMatch.Summary}`;
    }

    /* Quick Facts */

    const factMatch =
      quickFacts.find((row: any) =>
        q.includes(
          String(
            row.Metric
          ).toLowerCase()
        )
      );

    if (factMatch) {
      answer =
        `${factMatch.Metric}: ${factMatch.Value}`;
    }

    setMessages([
      ...messages,
      {
        role: "user",
        text: question,
      },
      {
        role: "bot",
        text: answer,
      },
    ]);

    setQuestion("");
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white rounded-xl shadow-2xl border z-50">
      <div className="bg-blue-600 text-white p-4 rounded-t-xl font-bold">
        🤖 Program Assistant
      </div>

      <div className="h-80 overflow-y-auto p-4 space-y-3">
        {messages.map(
          (msg, index) => (
            <div
              key={index}
              className={
                msg.role === "user"
                  ? "text-right"
                  : "text-left"
              }
            >
              <div
                className={`inline-block p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-100"
                    : "bg-slate-100"
                }`}
              >
                {msg.text}
              </div>
            </div>
          )
        )}
      </div>

      <div className="p-3 border-t flex gap-2">
        <input
          value={question}
          onChange={(e) =>
            setQuestion(
              e.target.value
            )
          }
          placeholder="Ask a question..."
          className="flex-1 border rounded-lg p-2"
        />

        <button
          onClick={askBot}
          className="bg-blue-600 text-white px-4 rounded-lg"
        >
          Ask
        </button>
      </div>
    </div>
  );
}
