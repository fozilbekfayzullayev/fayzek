import { useState, useEffect } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updatePosition);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  useEffect(() => {
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // MutationObserver bilan sahifadagi o'zgarishlarni kuzatamiz
    const attachListeners = () => {
      const hoverElements = document.querySelectorAll(
        "a, button, [data-cursor-hover]"
      );
      hoverElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
      return hoverElements;
    };

    const detachListeners = (elements) => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };

    let currentElements = attachListeners();

    // Sahifadagi o'zgarishlarni kuzatish
    const observer = new MutationObserver(() => {
      detachListeners(currentElements);
      currentElements = attachListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Global mouseout event - agar cursor hech narsa ustida bo'lmasa
    const handleGlobalMouseOut = (e) => {
      if (!e.relatedTarget || e.relatedTarget === document.documentElement) {
        setIsHovering(false);
      }
    };

    document.addEventListener("mouseout", handleGlobalMouseOut);

    return () => {
      detachListeners(currentElements);
      observer.disconnect();
      document.removeEventListener("mouseout", handleGlobalMouseOut);
    };
  }, []);

  return (
    <>
      <div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={`bg-white rounded-full transition-all duration-200 ${
            isHovering ? "w-12 h-12" : "w-3 h-3"
          }`}
        />
      </div>

      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
          transition: "all 0.15s ease-out",
        }}
      >
        <div
          className={`border-2 border-white rounded-full transition-all duration-300 ${
            isHovering ? "w-16 h-16 opacity-50" : "w-8 h-8"
          }`}
        />
      </div>
    </>
  );
};

export default CustomCursor;
