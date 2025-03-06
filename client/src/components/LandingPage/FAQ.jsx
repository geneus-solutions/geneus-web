import React, { useState } from "react";
import './FAQ.css';
import Disclaimer from "./Desclaimer";

const FAQ = ({course, titleColor, answerColor }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How long do I have access to the course?",
      answer:
      "You’ll have 2 years of unlimited access to the course from the date of enrollment. This means you can learn at your own pace without any rush.",
    },
    { question: "Are the courses live or recorded?", answer: "All our courses are pre-recorded, so you can watch them anytime, anywhere, and revisit lessons whenever needed." },
    { question: "Can I get a refund if I’m not satisfied with the course?", answer: "Unfortunately, we do not offer refunds. We recommend checking the course details, previewing available content, and ensuring it fits your needs before purchasing." },
    { question: "Will I receive a certificate after completing the course?", answer: "Yes! Once you complete all the required lessons and assessments, you’ll receive a certificate of completion." },
    {
      question:
        "Do I need any prior knowledge to take the course?",
      answer: "No worries! Each course comes with its own prerequisites, which you’ll find in the course description. Some courses are perfect for beginners, while others may need a little background knowledge—but don’t worry, we’ll guide you every step of the way!	",
    }
  ];

  return (
    <div className="faq-container">
      <h1 className="faq-title" style={{color: titleColor}}>FAQ's</h1>
      <div className="faq-items">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span className="arrow">{activeIndex === index ? "▼" : "▶"}</span> {faq.question}
            </div>
            {activeIndex === index && <div className="faq-answer" style={{color: answerColor}}>{faq.answer}</div>}
          </div>
        ))}
      </div>
      <Disclaimer course={course}/>
    </div>
  );
};

export default FAQ;
