import React, { useState } from "react";
import './FAQ.css';
import Disclaimer from "./Desclaimer";

const FAQ = ({course}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "When and where is the workshop and how long it would be?",
      answer:
        "The workshop will be held on Saturday, 8 Feb 2025, 07:00 p.m. IST. The duration will be around 3 hours and the platform will be Zoom App.",
    },
    { question: "Do I need to have prior knowledge of trading?", answer: "No prior knowledge is required." },
    { question: "What should I be prepared with before the workshop starts?", answer: "A notebook, pen, and an open mind." },
    { question: "Will I get the recordings of the workshop?", answer: "Yes, the recordings will be provided." },
    {
      question:
        "I’ve heard people losing a lot of money in the stock market and advise us to not invest in it, as the lucky one can only make money from it. Is that true?",
      answer: "The workshop aims to provide you with skills to make informed decisions.",
    },
    { question: "Will there be any refund?", answer: "Refunds will be provided under specific conditions." },
  ];

  return (
    <div className="faq-container">
      <h1 className="faq-title">FAQ's</h1>
      <div className="faq-items">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span className="arrow">{activeIndex === index ? "▼" : "▶"}</span> {faq.question}
            </div>
            {activeIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
      <Disclaimer course={course}/>
    </div>
  );
};

export default FAQ;
