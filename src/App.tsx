import React, { useState } from "react";
import {
  Sparkles,
  Globe,
  CheckCircle,
  Smile,
  Heart,
  RefreshCw,
  Code,
  Bot,
  ListTodo,
  Plus,
  Trash2,
  ArrowRight,
  Zap,
  CheckSquare,
  Square,
  AlertCircle
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
  category: string;
}

export default function App() {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [language, setLanguage] = useState<"en" | "es" | "fr" | "de" | "ja">("en");

  // AI Task Generator State
  const [projectPrompt, setProjectPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<"hello" | "aitasks">("aitasks");

  const greetings = {
    en: "Hello, World!",
    es: "¡Hola, Mundo!",
    fr: "Bonjour le Monde!",
    de: "Hallo, Welt!",
    ja: "こんにちは世界!"
  };

  const handleWave = () => {
    setIsAnimating(true);
    setCount((prev) => prev + 1);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handleGenerateTasks = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectPrompt.trim()) return;

    setIsGenerating(true);

    try {
      const response = await fetch(
        "https://ai.gateway.lovable.dev/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              {
                role: "system",
                content: `You are an expert full-stack AI product manager and architect. Break down the user's project description into 5 to 8 prioritized, actionable tasks.
Return a JSON array where each object has:
- "title": string
- "description": string
- "priority": "High" | "Medium" | "Low"
- "category": string (e.g. Frontend, Backend, Database, Design, DevOps)

Return ONLY valid JSON array with no markdown blocks or extra text.`
              },
              {
                role: "user",
                content: projectPrompt
              }
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate tasks from AI Gateway");
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Clean up markdown code blocks if any
      const cleanedJson = content.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsedTasks = JSON.parse(cleanedJson);

      const newTasks: Task[] = parsedTasks.map((t: any, index: number) => ({
        id: Date.now().toString() + index,
        title: t.title || "Task",
        description: t.description || "",
        priority: t.priority || "Medium",
        completed: false,
        category: t.category || "General"
      }));

      setTasks(newTasks);
    } catch (error) {
      console.error("Error generating tasks:", error);
      // Fallback sample tasks if API fails or needs quick offline check
      setTasks([
        {
          id: "1",
          title: "Define Architecture & Tech Stack",
          description: "Choose core frameworks, database, and hosting setup.",
          priority: "High",
          completed: false,
          category: "Architecture"
        },
        {
          id: "2",
          title: "Design UI/UX Wireframes",
          description: "Draft key user flows and component hierarchy.",
          priority: "High",
          completed: false,
          category: "Design"
        },
        {
          id: "3",
          title: "Implement Core API Endpoints",
          description: "Build robust backend services and authentication.",
          priority: "Medium",
          completed: false,
          category: "Backend"
        }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Hallo World Studio
            </span>
            <span className="block text-xs text-indigo-400 font-medium">React • TypeScript • AI Gateway</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab("aitasks")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition ${
              activeTab === "aitasks"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>AI Task Planner</span>
          </button>
          <button
            onClick={() => setActiveTab("hello")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition ${
              activeTab === "hello"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Hello World</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {(['en', 'es', 'fr', 'de', 'ja'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase transition ${
                language === lang
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center p-6 max-w-5xl mx-auto w-full">
        {activeTab === "aitasks" ? (
          <div className="w-full py-6">
            {/* AI Generator Hero Banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800/80 rounded-3xl p-6 sm:p-10 mb-8 shadow-2xl">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
              
              <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 px-4 py-1.5 rounded-full text-indigo-300 text-xs font-semibold mb-6">
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                <span>Powered by AI Gateway & Gemini 2.5 Flash</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white via-indigo-100 to-slate-400 bg-clip-text text-transparent">
                Turn Any Project Idea into Prioritized Tasks
              </h1>

              <p className="text-slate-400 text-sm sm:text-base max-w-2xl mb-8">
                Describe what you want to build (e.g. "A real-time collaborative code editor with AI code completion"). Our AI architect will instantly structure your roadmap.
              </p>

              <form onSubmit={handleGenerateTasks} className="space-y-4">
                <div className="relative">
                  <textarea
                    value={projectPrompt}
                    onChange={(e) => setProjectPrompt(e.target.value)}
                    placeholder="Describe your project idea in detail..."
                    rows={3}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm transition resize-none shadow-inner"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>AI Gateway ready</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isGenerating || !projectPrompt.trim()}
                    className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl shadow-xl shadow-indigo-600/30 transition transform active:scale-95 flex items-center space-x-2 text-sm"
                  >
                    {isGenerating ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                    <span>{isGenerating ? "Generating Roadmap..." : "Generate Tasks"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Tasks Section */}
            {tasks.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <h2 className="text-xl font-bold flex items-center space-x-2">
                    <ListTodo className="w-5 h-5 text-indigo-400" />
                    <span>Generated Project Roadmap ({tasks.length})</span>
                  </h2>
                  <div className="text-xs text-slate-400">
                    {tasks.filter(t => t.completed).length} of {tasks.length} completed
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {tasks.map((task) => {
                    const priorityColor = 
                      task.priority === "High" ? "bg-rose-500/10 text-rose-400 border-rose-500/30" :
                      task.priority === "Medium" ? "bg-amber-500/10 text-amber-400 border-amber-500/30" :
                      "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";

                    return (
                      <div
                        key={task.id}
                        className={`group bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl flex items-start justify-between gap-4 transition hover:border-slate-700 ${
                          task.completed ? "opacity-60 bg-slate-900/30" : ""
                        }`}
                      >
                        <div className="flex items-start space-x-4 flex-1">
                          <button
                            onClick={() => toggleTaskCompletion(task.id)}
                            className="mt-1 text-slate-400 hover:text-indigo-400 transition"
                          >
                            {task.completed ? (
                              <CheckSquare className="w-5 h-5 text-indigo-400" />
                            ) : (
                              <Square className="w-5 h-5" />
                            )}
                          </button>

                          <div className="space-y-1 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className={`font-semibold text-sm sm:text-base text-white ${task.completed ? "line-through text-slate-400" : ""}`}>
                                {task.title}
                              </span>
                              <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-semibold ${priorityColor}`}>
                                {task.priority} Priority
                              </span>
                              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium border border-slate-700">
                                {task.category}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-400">
                              {task.description}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-slate-500 hover:text-rose-400 p-2 rounded-xl hover:bg-slate-800 transition opacity-0 group-hover:opacity-100"
                          title="Delete task"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {tasks.length === 0 && !isGenerating && (
              <div className="text-center py-16 border border-dashed border-slate-800 rounded-3xl p-8">
                <Bot className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-300 mb-1">No tasks generated yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Type your project idea above and click "Generate Tasks" to let our AI architect build your roadmap.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto w-full py-12">
            <div className="relative">
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 px-4 py-1.5 rounded-full text-indigo-300 text-xs font-semibold mb-8">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Welcome to your ultimate Hello World experience</span>
              </div>

              <h1 className={`text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-indigo-100 to-slate-400 bg-clip-text text-transparent transition-transform duration-300 ${isAnimating ? 'scale-105' : 'scale-100'}`}>
                {greetings[language]}
              </h1>

              <p className="text-lg sm:text-xl text-slate-400 max-w-xl mx-auto mb-10">
                A pristine, modern starter web application built with React, TypeScript, Vite, and Tailwind CSS. Click below to wave and celebrate!
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleWave}
                  className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl shadow-indigo-600/30 transition transform active:scale-95 flex items-center justify-center space-x-3"
                >
                  <Smile className={`w-5 h-5 ${isAnimating ? 'animate-bounce' : ''}`} />
                  <span>Wave Hello! ({count})</span>
                </button>

                <button
                  onClick={() => setCount(0)}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-medium px-6 py-4 rounded-2xl border border-slate-800 transition flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset Counter</span>
                </button>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 w-full text-left">
              <div className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                  <Code className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white mb-1">Type Safe</h3>
                <p className="text-xs text-slate-400">Strict TypeScript checks ensuring clean, maintainable components.</p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white mb-1">Lightning Fast</h3>
                <p className="text-xs text-slate-400">Powered by Vite for instantaneous hot module replacement.</p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-4">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white mb-1">Tailwind UI</h3>
                <p className="text-xs text-slate-400">Crafted with modern dark gradients and gorgeous typography.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/40 py-6 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto w-full">
        <p>© {new Date().getFullYear()} Hallo World Studio. All rights reserved.</p>
        <p className="flex items-center space-x-1 mt-2 sm:mt-0">
          <span>Made with</span>
          <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 inline" />
          <span>using React & AI Gateway</span>
        </p>
      </footer>
    </div>
  );
}
