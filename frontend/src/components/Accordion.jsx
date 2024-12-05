import { useState } from "react";
import { motion } from "framer-motion";

const AccordionItem = ({ title, content, isOpen, onToggle, isFirst, isLast }) => (
  <div
    className={`border-b bg-white ${
      isFirst ? "rounded-t-lg" : ""
    } ${isLast && !isOpen ? "rounded-b-lg" : ""}`}
  >
    <button
      onClick={onToggle}
      className={`w-full text-left flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 rounded-lg"
      }`}
    >
      <span className="text-lg font-semibold">{title}</span>
      <motion.svg
        className="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </motion.svg>
    </button>
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden bg-white"
    >
      <div className="p-4 text-gray-700">
        <p>{content}</p>
      </div>
    </motion.div>
  </div>
);

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="rounded-lg border overflow-hidden shadow-sm">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
          isFirst={index === 0}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
};

export default Accordion;
