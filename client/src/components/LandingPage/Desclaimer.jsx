import React, { useState } from "react";
import "./Disclaimer.css";

// const FAQItem = ({ question, answer }) => {

//     return (
//         <div className="disclaimer-faq-item">
//       <h3 className="disclaimer-faq-question" onClick={() => setIsOpen(!isOpen)}>
//         {question}
//         <span className="disclaimer-faq-toggle">{isOpen ? "-" : "+"}</span>
//       </h3>
//       {isOpen && <p className="disclaimer-faq-answer">{answer}</p>}
//     </div>
//   );
// };

const Disclaimer = ({course}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="disclaimer-faq-item">
      <h3
        className="disclaimer-faq-question"
        onClick={() => setIsOpen(!isOpen)}
      >
        Disclaimer
        <span className="disclaimer-faq-toggle">{isOpen ? "-" : "+"}</span>
      </h3>
      {isOpen && (
        <div className="disclaimer-content">
          <p>
            {course?.description}
            {/* <strong>Stock Market using AI Workshop – Skill Nation</strong>{" "}
            <br />
            <strong>Information for Educational Purposes Only:</strong> <br />
            The information provided on this page, including the Stock Market
            using AI content, is intended for educational purposes only and does
            not constitute financial advice. While we strive to provide accurate
            and up-to-date information, fantasy cricket involves inherent risks
            and uncertainties, and actual results may differ from expectations.
          </p>
          <p>
            <strong>18+ Age Requirement:</strong> <br /> You must be at least 18
            years old to participate in the Stock Market using an AI workshop
            and any related fantasy cricket activity.
          </p>
          <p>
            <strong>No Guarantees:</strong> <br />
            Skill Nation does not guarantee any specific outcomes or financial
            success as a result of attending the Stock Market using AI Workshop.
            Individual results will vary depending on a variety of factors,
            including skill, market conditions, and personal circumstances.
          </p>
          <p>
            <strong>Investment Risk:</strong> <br /> Stock Market involves real
            money investment and carries the potential for financial loss.
            Participants should carefully consider their financial situation and
            risk tolerance before participating in any trading activity.
          </p>
          <p>
            <strong>Independent Decision Making:</strong> <br /> The information
            presented in the workshop should not be considered as a substitute
            for independent research and due diligence. Participants are
            encouraged to conduct their own research and make informed
            investment decisions based on their own individual circumstances.
          </p>
          <p>
            <strong>Third-Party Links:</strong> <br /> This page may contain
            links to third-party websites or resources. Skill Nation is not
            responsible for the content or accuracy of any third-party
            information and does not endorse any specific products or services.
          </p>
          <p>
            By accessing this page, you acknowledge and agree to the following:
          </p>
          <p>You understand that trading involves risks and uncertainties. */}
          </p>
        </div>
      )}
    </div>
  );
};

export default Disclaimer;
