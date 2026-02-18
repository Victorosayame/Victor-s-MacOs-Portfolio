//step4 Create Welcome Component with GSAP Animations, install gsap and @gsap/react
"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";


/**
 * STEP 6: Helper Function - renderText()
 * ========================================
 * Converts a text string into an array of span elements, each containing one character.
 *
 * Parameters:
 * - text: The string to be split and rendered
 * - className: CSS classes to apply to each character span
 * - baseWeight: Initial font variation setting (default 400)
 *
 * Returns: Array of React span elements with individual characters
 *
 * Purpose: Enables character-level animation control, allowing each character
 * to have independent font weight animations based on mouse proximity.
 * Note: Spaces are replaced with non-breaking spaces (\u00A0) to preserve layout
 */

interface RenderTextProps {
  text: string;
  className: string;
  baseWeight: number;
}
const renderText = ({text, className, baseWeight = 400}: RenderTextProps) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `"wght" ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};


/**
 * STEP 7: Define Font Weight Animation Ranges
 * =============================================
 * Configuration object for different text elements:
 *
 * subtitle:
 * - min: 100 (thin), max: 400 (regular), default: 100
 * - Provides subtle animation effect for intro text
 *
 * title:
 * - min: 400 (regular), max: 900 (black), default: 400
 * - Provides dramatic animation effect for "portfolio" heading
 *
 * These ranges define how much font weight changes in response to mousemovement,
 * creating the interactive "breathing" text effect.
 */
const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

/**
 * STEP 8: Setup Text Hover Interactive Effect
 * =============================================
 * Creates an interactive mouse-tracking animation system for text elements.
 *
 * How it works:
 * 1. Gets all character span elements from the container
 * 2. Calculates distance between mouse position and each character
 * 3. Uses exponential decay formula to create smooth intensity gradient
 * 4. GSAP animates each character's font weight independently
 * 5. On mouse leave, all characters smoothly return to default weight
 *
 * Parameters:
 * - container: DOM element containing character spans
 * - type: "title" or "subtitle" (determines font weight range)
 *
 * Returns: Cleanup function to remove event listeners
 *
 * Result: Characters closer to mouse cursor appear bolder/thinner,
 * creating a dynamic "gravity" effect that follows the cursor.
 */

/** Props / arguments for setupTextHover */
interface SetupTextHoverProps {
  container: HTMLElement | null;
  type: keyof typeof FONT_WEIGHTS;
}

const setupTextHover = ({container, type} : SetupTextHoverProps) => {
  if (!container) return () => {};

  const letters = container.querySelectorAll<HTMLSpanElement>("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (letter: HTMLSpanElement, weight: number, duration = 0.25) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 20000);

      animateLetter(letter, min + (max - min) * intensity);
    });
  };

  const handleMouseLeave = () =>
    letters.forEach((letter) => animateLetter(letter, base, 0.3));

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome = () => {
  //step5 Create Refs for Welcome Page Elements
  // References needed for GSAP animations and event listener setup on title and subtitle
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

   /**
   * STEP 9: Initialize Text Hover Effects on Component Mount
   * ===========================================================
   * useGSAP hook automatically manages animation lifecycle:
   * - Sets up mouse event listeners when component mounts
   * - Configures hover effects for both title and subtitle
   * - Returns cleanup function that fires on unmount
   * - Automatically handles GSAP context cleanup
   */
  useGSAP(() => {
    const titleCleanup = setupTextHover({ container: titleRef.current, type: "title" });
    const subtitleCleanup = setupTextHover({ container: subtitleRef.current, type: "subtitle" });

    return () => {
      titleCleanup();
      subtitleCleanup();
    };
  }, []);

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText({
          text: "Hey, I'm Victor! Welcome to my",
          className: "text-3xl font-georama",
          baseWeight: 100,
        })}
      </p>
      <h1 ref={titleRef} className="mt-7">
        {renderText({
          text: "portfolio",
          className: "text-9xl italic font-georama",
          baseWeight: 400,
        })}
      </h1>

      <div className="small-screen">
        <p>This Portfolio is designed for desktop/tablet screens only.</p>
      </div>
    </section>
  )
}

export default Welcome