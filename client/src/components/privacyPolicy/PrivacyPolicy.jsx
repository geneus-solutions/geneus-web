import React, { useState, useEffect } from 'react';
import './PrivacyPolicy.css';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isPrivacyPolicyAccepted = localStorage.getItem('privacyPolicyAccepted');
    if (!isPrivacyPolicyAccepted) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('privacyPolicyAccepted', 'true');
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen && (
       <div className="privacy-policy" id="privacy-policy">
       <div className="wrap">
         <div className="bg_grad">
           <div className="privacy-policy__text">
           We use cookies to make your experience smoother. They help us personalize content and improve our site just for you. 
           {/* or check out our Privacy Policy page to learn more! */}
             {/* <Link href="#href" className="text__link">Learn more</Link> */}
             <button className="text_got-it" id="got-it-button" onClick={()=>handleClose()}>Got it!</button>
           </div>
         </div>
       </div>
     </div>
      )}
    </div>
  );
};

export default PrivacyPolicy;
