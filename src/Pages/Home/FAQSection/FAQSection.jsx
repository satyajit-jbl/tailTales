import React, { useState } from "react";
import { motion } from "framer-motion";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How can I adopt a pet?",
      answer: "You can browse available pets, fill out the adoption form, and our team will guide you through the process.",
    },
    {
      question: "What are the adoption fees?",
      answer: "Adoption fees vary based on the pet. Fees help cover vaccinations, spaying/neutering, and medical care.",
    },
    {
      question: "Can I meet the pet before adoption?",
      answer: "Yes! We encourage meeting the pet to ensure compatibility before finalizing the adoption.",
    },
    {
      question: "Do you offer support after adoption?",
      answer: "Absolutely! We provide resources, guidance, and support to help you and your new pet adjust.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-300 to-orange-400 dark:bg-gray-800 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-orange-900 dark:text-white mb-8">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-orange-800 dark:text-gray-300 mb-12">
          Find answers to the most common questions about pet adoption.
        </p>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 border ${
                activeIndex === index
                  ? "border-orange-500"
                  : "border-transparent dark:border-gray-600"
              }`}
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-orange-900 dark:text-white">
                  {faq.question}
                </h3>
                <svg
                  className={`w-6 h-6 text-orange-500 dark:text-gray-300 transform ${
                    activeIndex === index ? "rotate-180" : "rotate-0"
                  } transition-transform duration-300`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="mt-4 text-left text-orange-700 dark:text-gray-300"
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
