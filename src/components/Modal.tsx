import React, { useEffect, useState, useRef } from "react";
interface Modal {
  isVisible: boolean;
  position: { top: number; left: number };
  element: JSX.Element;
}

export default function MyInfo({ isVisible, position, element }: Modal) {
  const [visible, setVisible] = useState(isVisible);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      setVisible(true);
      if (ref.current) {
        ref.current.style.display = "block";
      }
    } else {
      setVisible(false);
    }
  }, [isVisible]);

  const handleTransitionEnd = () => {
    if (!visible && ref.current) {
      ref.current.style.display = "none";
    }
  };

  return (
    <div
      ref={ref}
      className={`rounded-lg shadow-lg fixed bg-gray-900 text-white p-6 transition-all duration-300 transform z-10 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
      onTransitionEnd={handleTransitionEnd}
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {element}
    </div>
  );
}
