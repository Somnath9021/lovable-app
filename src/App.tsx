import React, { useState } from "react";
import {
  Sparkles,
  Code,
  Layers,
  Zap,
  CheckCircle2,
  Terminal,
  Cpu,
  Globe,
  Shield,
  ArrowRight,
  Github,
  ExternalLink,
  RefreshCw,
  Star,
  Box
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "stack" | "preview">("overview");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<string | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedOutput(null);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedOutput(`Successfully synthesized component for: "${prompt}" using UltraX AI & Tailwind CSS.`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              UltraX AI Studio
            </span>
            <span className="block text-xs text-indigo-400 font-medium">React • TypeScript • Vite • Tailwind</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
          {(['overview', 'features', 'stack', 'preview'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
                activeTab === tab
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center space-x-2 text-sm text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-800 transition"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <button
            onClick={() => setActiveTab("preview")}
            className="flex items-center space-x-2 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2 rounded-xl shadow-lg shadow-indigo-500/25 transition transform active:scale-95"
          >
            <Zap className="w-4 h-4" />
            <span>Live Sandbox</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-10 flex flex-col">
        {activeTab === "overview" && (
          <div className="space-y-12 animate-fadeIn">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-950/40 via-slate-900/40 to-slate-950 border border-indigo-500/20 p-8 md:p-16 text-center shadow-2xl">
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 px-3.5 py-1.5 rounded-full text-indigo-300 text-xs font-semibold mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Powered by UltraX & Lovable Engine</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl mx-auto mb-6 bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Build extraordinary web apps at the speed of thought.
              </h1>

              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                Your full-stack AI workspace is active and ready. Instant TypeScript generation, lightning-fast Vite bundling, and pristine Tailwind UI.
              </p>

              {/* Prompt Generator Box */}
              <form onSubmit={handleGenerate} className="max-w-2xl mx-auto bg-slate-900/90 border border-slate-700/80 p-2.5 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center px-3 space-x-2">
                  <Terminal className="w-5 h-5 text-indigo-400 shrink-0" />
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what you want to build (e.g., 'Crypto dashboard with live charts')..."
                    className="w-full bg-transparent border-none text-slate-200 placeholder-slate-500 focus:outline-none text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium px-6 py-3 rounded-xl transition flex items-center justify-center space-x-2 shadow-md disabled:opacity-55"
                >
                  {isGenerating ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Generate</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {generatedOutput && (
                <div className="max-w-2xl mx-auto mt-6 bg-indigo-950/60 border border-indigo-500/40 p-4 rounded-xl text-left text-sm text-indigo-200 flex items-start space-x-3 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-white">Generation Complete</span>
                    {generatedOutput}
                  </div>
                </div>
              )}
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl hover:border-slate-700 transition">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                  <Code className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">TypeScript & React 18</h3>
                <p className="text-slate-400 text-sm">
                  Fully typed components with strict mode enabled, ensuring maximum code quality and robust maintainability.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl hover:border-slate-700 transition">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Vite Supercharged</h3>
                <p className="text-slate-400 text-sm">
                  Instant hot module replacement (HMR) and optimized production builds powered by Vite's blazing fast bundler.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-2xl hover:border-slate-700 transition">
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-4">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Tailwind CSS v3+</h3>
                <p className="text-slate-400 text-sm">
                  Utility-first styling crafted for responsiveness, dark mode readiness, and gorgeous modern design aesthetics.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "features" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-white mb-3">Platform Capabilities</h2>
              <p className="text-slate-400">Explore the deep feature set built into your UltraX AI development environment.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Smart Component Synthesis", desc: "Convert natural language instructions into fully structured React TSX instantly.", icon: Cpu },
                { title: "Live Preview Sandbox", desc: "Test your layouts and interactions in real-time without leaving your browser workspace.", icon: Globe },
                { title: "Production Security", desc: "End-to-end safe execution sandboxes with zero compromise on runtime performance.", icon: Shield },
                { title: "Modular Architecture", desc: "Easily scale from single landing pages to enterprise multi-route web applications.", icon: Box }
              ].map((feat, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                    <feat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{feat.title}</h3>
                    <p className="text-slate-400 text-sm">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "stack" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-white mb-3">Technology Stack</h2>
              <p className="text-slate-400">A modern, industry-standard stack designed for performance and developer joy.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "React 18", type: "UI Library", desc: "Declarative component-based architecture." },
                { name: "TypeScript", type: "Type Safety", desc: "Static typing for robust code bases." },
                { name: "Vite", type: "Bundler", desc: "Extremely fast development server and build tool." },
                { name: "Tailwind CSS", type: "Styling", desc: "Rapid UI styling with utility classes." }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md inline-block mb-3">
                      {item.type}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                    <span>Status: Active</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "preview" && (
          <div className="space-y-6 animate-fadeIn flex-1 flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Interactive Sandbox Preview</h2>
                <p className="text-slate-400 text-sm">Test interactive UI elements right inside this view.</p>
              </div>
              <div className="flex items-center space-x-2 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Sandbox Online</span>
              </div>
            </div>

            <div className="flex-1 bg-slate-900/80 border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-6 min-h-[400px]">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-xl">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="max-w-md">
                <h3 className="text-xl font-bold text-white mb-2">Ready to Build Your App</h3>
                <p className="text-slate-400 text-sm mb-6">
                  Your environment is fully initialized. Ask the AI assistant to create any page, dashboard, or component you desire.
                </p>
                <button
                  onClick={() => setActiveTab("overview")}
                  className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-2.5 rounded-xl shadow-lg transition"
                >
                  <span>Return to Generator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/40 py-6 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between max-w-7xl w-full mx-auto">
        <p>© {new Date().getFullYear()} UltraX AI & Lovable. All rights reserved.</p>
        <div className="flex items-center space-x-4 mt-3 sm:mt-0">
          <span className="hover:text-slate-400 transition cursor-pointer">Privacy Policy</span>
          <span className="hover:text-slate-400 transition cursor-pointer">Terms of Service</span>
          <span className="hover:text-slate-400 transition cursor-pointer">Documentation</span>
        </div>
      </footer>
    </div>
  );
}
