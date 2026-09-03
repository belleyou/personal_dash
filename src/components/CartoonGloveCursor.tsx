import React, { useState, useEffect } from "react";

interface CartoonGloveCursorProps {
  /** Optional custom scaling factor */
  scale?: number;
}

export const CartoonGloveCursor: React.FC<CartoonGloveCursorProps> = ({ scale = 1 }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isDown, setIsDown] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the device has a fine pointer (desktop mouse/trackpad)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = !!target.closest(
          'a, button, input, select, textarea, [role="button"], [tabindex], .cursor-pointer, input[type="range"]'
        );
        setIsHovering(interactive);
      }
    };

    const handleMouseDown = () => setIsDown(true);
    const handleMouseUp = () => setIsDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[99999] select-none transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        willChange: "transform",
      }}
      aria-hidden="true"
    >
      {/* 
        The cartoon glove pointing hand matching the user's attachment:
        - White glove with thick black borders
        - Straight index pointing upward/angled left (tip is at index finger hotspot x=18, y=4)
        - Curled middle, ring, pinky fingers with black crease markings
        - Thumb resting folded across
        - Solid black cartoon drop shadow offset down-right (matching neobrutalist style)
      */}
      <div
        className="relative transition-transform duration-100 ease-out"
        style={{
          // Hotspot calibration: fingertip at top-left of the index finger
          transform: `translate(-18px, -4px) scale(${isDown ? 0.88 * scale : isHovering ? 1.15 * scale : 1.0 * scale}) rotate(${isHovering ? "-8deg" : isDown ? "4deg" : "0deg"})`,
          transformOrigin: "18px 4px",
        }}
      >
        <svg
          width="54"
          height="62"
          viewBox="0 0 54 62"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
        >
          {/* Solid Black Cartoon Shadow Layer (Offset +4px X, +5px Y matching attachment) */}
          <path
            d="M 20 6
               C 17 6, 14 9, 15 15
               L 19 28
               C 16 27, 11 29, 11 35
               C 11 41, 17 48, 25 53
               C 33 58, 41 55, 45 47
               C 48 41, 46 33, 42 28
               C 44 25, 43 21, 38 18
               C 35 16, 31 17, 29 19
               C 28 15, 25 13, 22 14
               L 20 6 Z"
            fill="#18181b"
            transform="translate(4, 5)"
          />

          {/* Outer Black Ink Contour Border */}
          <path
            d="M 19 4
               C 15.5 4, 12.5 7.5, 14 14
               L 18 28
               C 14 26.5, 8.5 29, 9 36
               C 9.5 43, 16 50, 25 55
               C 34 59.5, 43 56, 47 48
               C 50.5 41, 48 32.5, 43 27
               C 45.5 24, 44 19.5, 38.5 17
               C 35 15, 31 16.5, 29 19
               C 27.5 14.5, 24 12, 21 13
               L 19 4 Z"
            fill="#18181b"
          />

          {/* White Main Glove Body */}
          <path
            d="M 19 6
               C 16.5 6, 14.5 8.5, 15.5 14
               L 19.5 27
               C 16 26, 11.5 28.5, 12 34.5
               C 12.5 41, 18 47.5, 26 52
               C 34 56, 41.5 53, 44.5 46
               C 47.5 39.5, 45 32, 40.5 27
               C 42.5 24.5, 41.5 20.5, 37 18.5
               C 34 17, 30.5 18, 28.5 20.5
               C 27 16.5, 24 14.5, 21.5 15.5
               L 19 6 Z"
            fill="#ffffff"
          />

          {/* Index Finger Highlight Contour */}
          <path
            d="M 18 8 L 17 20"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Crease line between index & middle finger */}
          <path
            d="M 26 23 L 32 38"
            stroke="#18181b"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Crease line between middle & ring finger */}
          <path
            d="M 33 22 L 39 36"
            stroke="#18181b"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Crease line for pinky finger */}
          <path
            d="M 39 28 L 43 37"
            stroke="#18181b"
            strokeWidth="3.0"
            strokeLinecap="round"
          />

          {/* Thumb palm fold crease */}
          <path
            d="M 21 32 C 18 31, 15 34, 16 39"
            stroke="#18181b"
            strokeWidth="3.0"
            strokeLinecap="round"
            fill="none"
          />

          {/* Subtle palm contour crease line */}
          <path
            d="M 25 43 Q 32 46 37 42"
            stroke="#18181b"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Interactive Tap Sparkle Indicator when hovering */}
          {isHovering && (
            <circle
              cx="19"
              cy="5"
              r="3"
              fill="#10b981"
              className="animate-ping"
              opacity="0.75"
            />
          )}
        </svg>
      </div>
    </div>
  );
};
