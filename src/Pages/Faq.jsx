import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is BackTracker?",
    answer:
      "BackTracker is a platform that helps students and staff report, search, and recover lost or found items across the campus easily.",
  },
  {
    question: "How do I report a lost item?",
    answer:
      "Click on the 'Report Lost Item' button on the homepage, fill in the details about your item, and submit the form. Your item will be listed in the lost items section.",
  },
  {
    question: "How do I report a found item?",
    answer:
      "If you found something, use the 'Report Found Item' option. Fill in the description and location details so the rightful owner can claim it.",
  },
  {
    question: "Do I need an account to use BackTracker?",
    answer:
      "Yes, creating an account ensures we can verify and keep track of item claims securely within the university community.",
  },
  {
    question: "Is BackTracker only for Parul University?",
    answer:
      "Currently, BackTracker is designed specifically for Parul University students and staff. Expansion to other institutions may be considered in the future.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach out via the contact page or email us directly at support@backtracker.com.",
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Page Header */}
      <header className="bg-gradient-to-r from-blue-200 to-blue-100 py-14 shadow-md">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-center text-gray-700 max-w-2xl mx-auto text-lg">
          Find answers to the most common questions about using BackTracker.
        </p>
      </header>

      {/* FAQ Section */}
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow hover:shadow-lg border border-blue-100 transition"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left text-gray-900 font-semibold focus:outline-none"
                aria-expanded={openIndex === index}
              >
                {faq.question}
                <ChevronDown
                  className={`w-6 h-6 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-blue-600" : "text-gray-500"
                  }`}
                />
              </button>

              {/* Animated Answer */}
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-5 text-gray-600">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FAQPage;