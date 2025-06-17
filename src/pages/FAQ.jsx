import React, { useState } from 'react';

const faqData = [
  {
    question: "What is investnow.com?",
    answer:
      "investnow.com is a global investment firm that offers clients easy access to cryptocurrency, stocks, real estate, bonds, indices, and metaverse investment opportunities.",
  },
  {
    question: "Is investnow.com regulated?",
    answer:
      "Yes, we follow strict compliance and security protocols across all regions we operate in. Our services are aligned with international financial regulations.",
  },
  {
    question: "How do I start investing?",
    answer:
      "Simply sign up on our platform, choose your preferred investment package, and fund your account. Our intuitive dashboard guides you through every step.",
  },
  {
    question: "Are my funds safe?",
    answer:
      "Absolutely. All transactions are encrypted and securely processed. We also maintain top-tier risk management standards to protect our clients' capital.",
  },
  {
    question: "What is the minimum investment amount?",
    answer:
      "Our minimum investment starts as low as $100 to allow anyone to begin their investment journey.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-12 px-6 md:px-24">
      <h2 className="text-3xl font-bold text-center mb-8 text-red-400">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg shadow-sm transition duration-300"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full text-left px-4 py-4 font-medium text-gray-800 hover:bg-blue-50 flex justify-between items-center"
            >
              <span>{item.question}</span>
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-600">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
