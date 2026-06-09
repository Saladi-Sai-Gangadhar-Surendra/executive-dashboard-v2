"use client";

import { useState } from "react";
import { useDashboard } from "@/src/context/DashboardContext";

export default function Chatbot() {
  const { excelData } = useDashboard();

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState<any[]>([
    {
      role: "bot",
      text: "Hello 👋 Ask me anything about your projects.",
    },
  ]);

  const askBot = () => {
    if (!question.trim()) return;

    const q = question.toLowerCase();

    let answer = "Sorry, I could not find an answer.";

    const metadata =
      excelData?.PROJECT_METADATA || [];

    const knowledge =
      excelData?.PROJECT_KNOWLEDGE_BASE || [];

    const owners =
      excelData?.OWNER_KNOWLEDGE || [];

    const phases =
      excelData?.PHASE_MASTER || [];

    const facts =
      excelData?.CHATBOT_QUICK_FACTS || [];

    const tasks =
      excelData?.MASTER_TASKS_COMPLETE || [];

    const actions =
      excelData?.MASTER_ACTIONS_COMPLETE || [];

    /* ==========================
       TOTAL PROJECTS
    ========================== */

    if (
      q.includes("how many projects") ||
      q.includes("total projects")
    ) {
      const count =
        metadata.length || 0;

      answer = `Total Projects: ${count}`;
    }

    /* ==========================
       TOTAL TASKS
    ========================== */

    else if (
      q.includes("how many tasks") ||
      q.includes("total tasks")
    ) {
      answer = `Total Tasks: ${tasks.length}`;
    }

    /* ==========================
       TOTAL ACTIONS
    ========================== */

    else if (
      q.includes("how many actions") ||
      q.includes("total actions")
    ) {
      answer = `Total Actions: ${actions.length}`;
    }

    /* ==========================
       COMPLETION %
    ========================== */

    else if (
      q.includes("completion") ||
      q.includes("completion percentage")
    ) {
      const completion =
        facts.find(
          (f: any) =>
            String(
              f.Metric
            ).toLowerCase() ===
            "completion percentage"
        );

      answer = completion
        ? `Dashboard Completion: ${completion.Value}`
        : "Completion data not available";
    }

    /* ==========================
       LIST OWNERS
    ========================== */

    else if (
      q.includes("list owners") ||
      q.includes("all owners")
    ) {
      const ownerNames = [
        ...new Set(
          owners.map(
            (o: any) => o.Owner
          )
        ),
      ];

      answer =
        "Owners:\n" +
        ownerNames.join(", ");
    }

    /* ==========================
       LIST PHASES
    ========================== */

    else if (
      q.includes("list phases") ||
      q.includes("all phases")
    ) {
      const phaseNames = [
        ...new Set(
          phases.map(
            (p: any) => p.Phase
          )
        ),
      ];

      answer =
        "Phases:\n" +
        phaseNames.join(", ");
    }

    /* ==========================
       LIST WORKSTREAMS
    ========================== */

    else if (
      q.includes(
        "list workstreams"
      ) ||
      q.includes(
        "all workstreams"
      )
    ) {
      const streams = [
        ...new Set(
          tasks.map(
            (t: any) =>
              t.Workstream
          )
        ),
      ];

      answer =
        "Workstreams:\n" +
        streams.join(", ");
    }

    /* ==========================
       OWNER LOOKUP
    ========================== */

    else {
      const ownerMatch =
        owners.find((o: any) =>
          q.includes(
            String(
              o.Owner
            ).toLowerCase()
          )
        );

      if (ownerMatch) {
        answer =
          `${ownerMatch.Owner} works on ${ownerMatch.Project} in ${ownerMatch.Workstream}. Responsibility: ${ownerMatch.Responsibility}`;
      }
    }

    /* ==========================
       PROJECT LOOKUP
    ========================== */

    if (
      answer ===
      "Sorry, I could not find an answer."
    ) {
      const project =
        knowledge.find((p: any) =>
          q.includes(
            String(
              p.Project
            ).toLowerCase()
          )
        );

      if (project) {
        if (
          q.includes("health")
        ) {
          answer = `${project.Project} Health: ${project.Health}`;
        } else if (
          q.includes(
            "priority"
          )
        ) {
          answer = `${project.Project} Priority: ${project.Priority}`;
        } else if (
          q.includes(
            "manager"
          )
        ) {
          answer = `${project.Project} Manager: ${project.Project_Manager}`;
        } else {
          answer = `${project.Project}: ${project.Summary}`;
        }
      }
    }

    /* ==========================
       WHO WORKS ON PROJECT
    ========================== */

    if (
      answer ===
      "Sorry, I could not find an answer."
    ) {
      const projects = [
        "neurobiplane",
        "flexfloor",
        "cardiacbiplane",
      ];

      for (const project of projects) {
        if (
          q.includes(project) &&
          (q.includes("owner") ||
            q.includes(
              "working"
            ) ||
            q.includes(
              "responsible"
            ))
        ) {
          const found =
            tasks.filter(
              (t: any) =>
                String(
                  t.Project
                )
                  .toLowerCase()
                  .includes(
                    project
                  )
            );

          const ownersFound =
            [
              ...new Set(
                found.map(
                  (f: any) =>
                    f.Owner
                )
              ),
            ]
              .filter(Boolean)
              .slice(0, 15);

          answer =
            `People working on ${project}:\n` +
            ownersFound.join(
              ", "
            );

          break;
        }
      }
    }

    /* ==========================
       OPEN ACTIONS
    ========================== */

    if (
      answer ===
        "Sorry, I could not find an answer." &&
      q.includes("open action")
    ) {
      const open =
        actions.filter(
          (a: any) =>
            String(
              a.Status
            ).toLowerCase() ===
            "open"
        );

      answer =
        open.length > 0
          ? open
              .slice(0, 10)
              .map(
                (a: any) =>
                  `${a.Description}`
              )
              .join("\n")
          : "No open actions found";
    }

    /* ==========================
       CLOSED ACTIONS
    ========================== */

    if (
      answer ===
        "Sorry, I could not find an answer." &&
      q.includes(
        "closed action"
      )
    ) {
      const closed =
        actions.filter(
          (a: any) =>
            String(
              a.Status
            ).toLowerCase() ===
            "closed"
        );

      answer =
        `Closed Actions: ${closed.length}`;
    }

    /* ==========================
       TASKS FOR PROJECT
    ========================== */

    if (
      answer ===
      "Sorry, I could not find an answer."
    ) {
      const projectNames = [
        "neurobiplane",
        "flexfloor",
        "cardiacbiplane",
      ];

      for (const p of projectNames) {
        if (
          q.includes(p) &&
          q.includes("task")
        ) {
          const projectTasks =
            tasks.filter(
              (t: any) =>
                String(
                  t.Project
                )
                  .toLowerCase()
                  .includes(p)
            );

          answer =
            projectTasks
              .slice(0, 15)
              .map(
                (t: any) =>
                  t.Task
              )
              .join("\n");

          break;
        }
      }
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
                <pre className="whitespace-pre-wrap">
                  {msg.text}
                </pre>
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
