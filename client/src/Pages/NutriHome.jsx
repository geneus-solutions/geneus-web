// import { useNavigate } from "react-router-dom";
// import { FaStar } from "react-icons/fa";
// import { LuBicepsFlexed } from "react-icons/lu";
// import FeatureSection from "../components/NutriHomeComponents/Features";
// import GettingStarted from "../components/NutriHomeComponents/GetStarted";
import NutriHeroSection from "../components/NutriHomeComponents/NutriHeroSection";
import HowItWorks from "../components/NutriHomeComponents/HowItWorks";
import DietSteps from "../components/NutriHomeComponents/DietSteps";
import RecipeCarousel from "../components/NutriHomeComponents/Slider";
import Article from "../components/NutriHomeComponents/Article";
import StartToday from "../components/NutriHomeComponents/StartToday";

const NutriHome = () => {
    // const navigate = useNavigate();

    return (
        <div style={{width:'100%'}}>
            <NutriHeroSection />
            <HowItWorks />
            <DietSteps />
            <RecipeCarousel />
            <Article />
            <StartToday />
        </div>
    );
};

// Common styles

export default NutriHome;

    // <div
    //     style={{
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'space-between',
    //         borderBottom: '1px solid rgba(0,0,0,0.3)',
    //     }}
    // >
    //     <div
    //         style={{
    //             flex: 1,
    //             display: 'flex',
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             flexDirection: 'column',
    //             padding: '20px',
    //             textAlign: 'center',
    //         }}
    //     >
    //         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
    //             <div style={{ display: 'flex' }}>
    //                 <img alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" style={avatarStyle} />
    //                 <img alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" style={avatarStyle} />
    //                 <img alt="Agnes Walker" src="https://mui.com/static/images/avatar/3.jpg" style={avatarStyle} />
    //             </div>
    //             <h3 style={titleStyle}>100K+</h3>
    //         </div>
    //         <p style={descStyle}>
    //             Thousands trust it for a reason. Join them and<br /> discover the benefits.
    //         </p>
    //     </div>

    //     {/* Ratings Block */}
    //     <div
    //         style={{
    //             flex: 1,
    //             display: 'flex',
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             flexDirection: 'column',
    //             padding: '20px',
    //             textAlign: 'center',
    //             borderLeft: '1px solid rgba(0,0,0,0.3)',
    //         }}
    //     >
    //         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
    //             <FaStar style={{ width: '30px', height: '30px', color: 'rgb(255, 255, 0)' }} />
    //             <h3 style={titleStyle}>4.9</h3>
    //         </div>
    //         <p style={descStyle}>
    //             Positive ratings by Nutri app users around the world! <br />
    //             Check the review <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>here!</span>
    //         </p>
    //     </div>

    //     <div
    //         style={{
    //             flex: 1,
    //             display: 'flex',
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             flexDirection: 'column',
    //             padding: '20px',
    //             textAlign: 'center',
    //             borderLeft: '1px solid rgba(0,0,0,0.3)',
    //         }}
    //     >
    //         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
    //             <LuBicepsFlexed style={{ width: '30px', height: '30px' }} />
    //             <h3 style={titleStyle}>100+</h3>
    //         </div>
    //         <p style={descStyle}>
    //             A lot of workouts available now and still <br /> counting more!
    //         </p>
    //     </div>
    // </div>
    // <div>
    //     <FeatureSection />
    // </div>
    // <div>
    //     <GettingStarted />
    // </div>
    // <StartToday />
// const avatarStyle = { width: '30px', height: '30px', borderRadius: '50%', marginRight: '5px' };
// const titleStyle = { margin: 0, fontWeight: 'bold' };
// const descStyle = { margin: 0, fontSize: '0.8rem', color: 'rgba(0,0,0,0.8)', lineHeight: '20px' };