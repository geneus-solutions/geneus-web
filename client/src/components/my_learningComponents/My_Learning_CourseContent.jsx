import {useEffect} from "react";
import { useNavigate,useLocation } from "react-router-dom";

import "../../styles/My_Learning.css";


const MyLearningCourseContent = ({data}) => {

  const navigate = useNavigate();
  const location = useLocation();
  const currentContent = location?.state?.content;
  const courseId = location?.state?.courseId;

  useEffect(() => {
    if(!currentContent&&data){
      navigate('/my-learning/', { state: {courseId,content:data?.courseContent[0] } });
    }
  }, [courseId,currentContent,data]);

  const handleCurrentVideo = (content) => {
    navigate('/my-learning/', { state: { courseId,content } });
  }
  console.log(currentContent);

  return (
    <div className="course-content">
      <h3 style={{padding:'10px',paddingTop:0,margin:0,fontSize:'20px'}}>Course Content</h3>
      <ul>
        {
          data?.courseContent?.map((content,index) => {
            return (
              <li key={index+1} onClick={()=>handleCurrentVideo(content)}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <p>
                    <strong>{index+1} : </strong> 
                    <span className={currentContent?.contentTitle === content?.contentTitle&&"active"}>
                      {content?.contentTitle}
                    </span>
                  </p>
                  <p>
                    {content?.time}
                  </p>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};

export default MyLearningCourseContent;
