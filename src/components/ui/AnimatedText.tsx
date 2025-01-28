"use client";

import { useState, useEffect } from "react";

const AnimatedText = ({ text }: { text: string }) => {
  const [visibleLetters, setVisibleLetters] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLetters((prev) => {
        if (prev < text.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 20); // Adjust this delay to control the speed

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="flex space-x-1">
      {text.split("").map((letter, index) => (
        <span
          key={index}
          className={`transition-transform transform ${
            index < visibleLetters ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          } duration-500 ease-out`}
          style={{ transitionDelay: `${index * 10}ms` }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

export default AnimatedText;
