import React, { useState } from "react";
import {
  Sparkles,
  Globe,
  CheckCircle,
  Smile,
  Heart,
  RefreshCw,
  Code
} from "lucide-react";

export default function App() {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [language, setLanguage] = useState<"en" | "es" | "fr" | "de" | "ja">("en");

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Hallo World Studio
            </span>
            <span className="block text-xs text-indigo-400 font-medium">React • TypeScript • Tailwind</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {(['en', 'es', 'fr', 'de', 'ja'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase transition ${
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

      {/* Hero / Main Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto w-full">
        <div className="relative">
          {/* Background Glow */}
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
              onClick={() => {
                setCount(0);
              }}
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
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/40 py-6 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto w-full">
        <p>© {new Date().getFullYear()} Hallo World Studio. All rights reserved.</p>
        <p className="flex items-center space-x-1 mt-2 sm:mt-0">
          <span>Made with</span>
          <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 inline" />
          <span>using React & Tailwind CSS</span>
        </p>
      </footer>
    </div>
  );
}
