import React, { useState } from "react";

interface AccordionProps {
  title: any;
  content: any;
}

const Accordeon: React.FC<AccordionProps> = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };
  return (
    <div>
      <button className="accordion my-2" onClick={toggleAccordion}>
        {title}
        <span className="arrow">{isActive ? "\u25B2" : "\u25BC"}</span>
      </button>
      <div className="panel" style={{ display: isActive ? "block" : "none" }}>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Accordeon;
