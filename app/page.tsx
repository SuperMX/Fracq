"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SAMPLE_REELS = [
  { id: 1, text: "Learn React in 5 minutes/day ⚡" },
  { id: 2, text: "Earn your first $100 online 💸" },
  { id: 3, text: "Master AI prompts 🤖" },
  { id: 4, text: "Build a SaaS in a weekend 🚀" },
  { id: 5, text: "Design like a pro 🎨" },
  { id: 6, text: "Close your first client 🔥" },
];

export default function ReelsPage() {
  const [index, setIndex] = useState(0);
  const isScrolling = useRef(false);

  const next = () => {
    if (index < SAMPLE_REELS.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;

      isScrolling.current = true;

      if (e.deltaY > 0) {
        next();
      } else {
        prev();
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 800);
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [index]);

  const touchStartY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(delta) < 50) return;

    if (delta > 0) {
      next();
    } else {
      prev();
    }
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden bg-black text-white flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute h-full w-full flex items-center justify-center text-3xl font-bold text-center px-6"
        >
          {SAMPLE_REELS[index].text}
        </motion.div>
      </AnimatePresence>

      {/* UI Overlay */}
      <div className="absolute bottom-10 left-6 right-6 flex justify-between items-end">
        <div>
          <h2 className="text-xl font-semibold">@fracq</h2>
          <p className="text-sm opacity-70">Daily skill streak</p>
        </div>

        <div className="flex flex-col gap-4 text-center">
          <button className="bg-white/10 p-3 rounded-full">❤️</button>
          <button className="bg-white/10 p-3 rounded-full">💬</button>
          <button className="bg-white/10 p-3 rounded-full">🔗</button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute top-4 left-4 right-4 flex gap-1">
        {SAMPLE_REELS.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded ${
              i === index ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
