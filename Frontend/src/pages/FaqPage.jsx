import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How can I track my order?",
      answer:
        "Once your order has been shipped, you’ll receive an email with a tracking number. You can also track it directly from your account dashboard.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit/debit cards, UPI, PayPal, and Cash on Delivery (COD) for selected regions.",
    },
    {
      question: "How can I return a product?",
      answer:
        "To return a product, go to your orders section, select the item, and click on ‘Return’. Follow the instructions to schedule a pickup.",
    },
    {
      question: "Are your products genuine?",
      answer:
        "Yes, we only source products from verified brands and trusted suppliers to ensure 100% authenticity.",
    },
    {
      question: "Do you offer customer support?",
      answer:
        "Absolutely! Our support team is available 24/7 via live chat, email, and phone to assist you with your queries.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-800 mb-4"
        >
          Frequently Asked Questions
        </motion.h2>
        <p className="text-gray-600 text-lg">
          Got questions about shopping, delivery, or returns? We’ve got you covered!
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white shadow-md rounded-xl p-5 border border-gray-200"
          >
            <button
              className="w-full flex justify-between items-center text-left"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
              {openIndex === index ? (
                <ChevronUp className="text-gray-600" />
              ) : (
                <ChevronDown className="text-gray-600" />
              )}
            </button>

            {openIndex === index && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3 text-gray-600 text-sm leading-relaxed"
              >
                {faq.answer}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Faq;