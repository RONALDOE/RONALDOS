import React, { useEffect, useState, useRef } from "react";

interface ModalProps {
  isVisible: boolean;
  position: { top: number; left: number };
  element: JSX.Element;
  style: React.CSSProperties; 
}

export default function Modal({ isVisible, position, element, style }: ModalProps) {
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
        ...style, 
      }}
      onBlur={() => setVisible(false)}
    >
      {element}
    </div>
  );
}
