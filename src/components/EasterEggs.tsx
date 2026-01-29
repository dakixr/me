"use client";

import { useKonamiCode } from "@/hooks/useKonamiCode";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EasterEggState {
  konamiActive: boolean;
  tripleClickCount: number;
  secretWord: string[];
  footerClicks: number;
  showConfetti: boolean;
  showSecretMessage: boolean;
  showBirthday: boolean;
  showMatrix: boolean;
}

const CONFETTI_COLORS = [
  "#60a5fa", "#a78bfa", "#22d3ee", "#34d399", "#fbbf24", "#f472b6", "#fb923c",
];

const SECRET_WORD_SEQUENCE = ["h", "e", "l", "l", "o"];
const SECRET_FACTS = [
  "Did you know? I've contributed to over 50 open-source projects! 🚀",
  "Fun fact: My first program was a 'Hello World' in Python at age 12! 👶",
  "Secret: I once solved a critical production bug while on vacation in Bali! 🏖️",
  "Hidden gem: I prefer Vim over VS Code for quick edits! 💻",
  "Trivia: I've mentored over 20 junior developers into senior roles! 🎓",
  "Easter egg discovered! You're one of the curious ones! 🎉",
];

export default function EasterEggs() {
  const konamiActive = useKonamiCode();
  const [state, setState] = useState<EasterEggState>({
    konamiActive: false,
    tripleClickCount: 0,
    secretWord: [],
    footerClicks: 0,
    showConfetti: false,
    showSecretMessage: false,
    showBirthday: false,
    showMatrix: false,
  });
  const [confettiPieces, setConfettiPieces] = useState<Array<{ id: number; x: number; y: number; color: string; rotation: number }>>([]);

  const createConfetti = useCallback(() => {
    const newPieces = Array.from({ length: 50 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: -10,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rotation: Math.random() * 360,
    }));
    setConfettiPieces(newPieces);
    setState(prev => ({ ...prev, showConfetti: true }));
    
    setTimeout(() => {
      setConfettiPieces([]);
      setState(prev => ({ ...prev, showConfetti: false }));
    }, 3000);
  }, []);

  const showRandomSecret = useCallback(() => {
    setState(prev => ({ ...prev, showSecretMessage: true, secretWord: [] }));
    setTimeout(() => {
      setState(prev => ({ ...prev, showSecretMessage: false }));
    }, 4000);
  }, []);

  useEffect(() => {
    if (konamiActive && !state.konamiActive) {
      setState(prev => ({ ...prev, konamiActive: true }));
      createConfetti();
      document.body.style.transition = "filter 0.3s ease";
      document.body.style.filter = "hue-rotate(180deg)";
      
      setTimeout(() => {
        document.body.style.filter = "none";
        setState(prev => ({ ...prev, konamiActive: false }));
      }, 5000);
    }
  }, [konamiActive, state.konamiActive, createConfetti]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSecretWord = [...state.secretWord, e.key.toLowerCase()];
      
      if (newSecretWord.length > SECRET_WORD_SEQUENCE.length) {
        newSecretWord.shift();
      }
      
      setState(prev => ({ ...prev, secretWord: newSecretWord }));
      
      if (JSON.stringify(newSecretWord) === JSON.stringify(SECRET_WORD_SEQUENCE)) {
        showRandomSecret();
      }
      
      if (e.key === "m" && e.ctrlKey) {
        setState(prev => ({ ...prev, showMatrix: true }));
        setTimeout(() => {
          setState(prev => ({ ...prev, showMatrix: false }));
        }, 3000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.secretWord, showRandomSecret]);

  useEffect(() => {
    const today = new Date();
    if (today.getMonth() === 11 && today.getDate() === 25) {
      setState(prev => ({ ...prev, showBirthday: true }));
    }
  }, []);

  const handleHeroTripleClick = useCallback((e: MouseEvent) => {
    const heroSection = document.querySelector("#about");
    if (heroSection && heroSection.contains(e.target as Node)) {
      setState(prev => {
        const newCount = prev.tripleClickCount + 1;
        if (newCount >= 3) {
          showRandomSecret();
          return { ...prev, tripleClickCount: 0 };
        }
        return { ...prev, tripleClickCount: newCount };
      });
      
      setTimeout(() => {
        setState(prev => ({ ...prev, tripleClickCount: 0 }));
      }, 1000);
    }
  }, [showRandomSecret]);

  useEffect(() => {
    document.addEventListener("click", handleHeroTripleClick);
    return () => document.removeEventListener("click", handleHeroTripleClick);
  }, [handleHeroTripleClick]);

  useEffect(() => {
    const handleFooterEasterEgg = () => {
      createConfetti();
    };

    window.addEventListener('footer-easter-egg', handleFooterEasterEgg);
    return () => window.removeEventListener('footer-easter-egg', handleFooterEasterEgg);
  }, [createConfetti]);

  const handleScrollPattern = useCallback(() => {
    const scrollY = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollY / scrollHeight) * 100;
    
    if (scrollPercent > 98) {
      const scrollDate = localStorage.getItem("lastScrollBottomDate");
      const today = new Date().toDateString();
      
      if (scrollDate !== today) {
        localStorage.setItem("lastScrollBottomDate", today);
        showRandomSecret();
      }
    }
  }, [showRandomSecret]);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollPattern, 200);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [handleScrollPattern]);

  return (
    <>
      <AnimatePresence>
        {state.showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-[100]">
            {confettiPieces.map((piece) => (
              <motion.div
                key={piece.id}
                initial={{ y: piece.y, opacity: 1 }}
                animate={{ y: "110vh", opacity: 0, rotate: piece.rotation + 360 }}
                transition={{ duration: 3, ease: "easeOut" }}
                className="absolute w-3 h-3"
                style={{
                  left: `${piece.x}%`,
                  backgroundColor: piece.color,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {state.showSecretMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-lg shadow-2xl z-50 max-w-md text-center pointer-events-none"
          >
            <p className="font-medium text-sm md:text-base">
              {SECRET_FACTS[Math.floor(Math.random() * SECRET_FACTS.length)]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {state.showBirthday && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-full shadow-xl z-40 pointer-events-none"
          >
            <span className="text-xl">🎄 Happy Holidays! 🎄</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {state.showMatrix && (
          <div className="fixed inset-0 bg-black z-50 pointer-events-none flex items-center justify-center overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-green-500 font-mono text-4xl md:text-6xl animate-pulse"
            >
              WAKE UP NEO...
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {state.konamiActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed top-8 right-8 bg-yellow-500 text-black px-6 py-4 rounded-lg shadow-2xl z-40 pointer-events-none"
          >
            <p className="font-bold text-lg">🎮 KONAMI CODE ACTIVATED!</p>
            <p className="text-sm mt-1">+1000 Experience Points</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
