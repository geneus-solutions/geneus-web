import { useParams } from "react-router-dom";
import img1 from "../../assets/banner.jpeg";

import { useCourceQuery } from "../../features/cources/courceApiSlice";
import CourseDescription from "./CourseDescription";
import CourseBanner from "./CourseBanner";

const Cource = () => {
  const { id } = useParams();
  const { data: course } = useCourceQuery(id, { skip: !id });

  return (
    <div>
      <CourseBanner imgSrc={img1} title="A Course You'll Actually Finish" course={course} />
      <CourseDescription courseDetails={course} />
    </div>
  );
};

export default Cource;
