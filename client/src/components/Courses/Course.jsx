import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import img1 from "../../assets/banner.jpeg";

import { useCourceQuery } from "../../features/cources/courceApiSlice";
import CourseDescription from "./CourseDescription";
import CourseBanner from "./CourseBanner";

const SectionContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(8),
  padding: theme.spacing(6),
  maxWidth: "1200px",
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    padding: theme.spacing(4),
  },
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: "500px",
}));

const VideoContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  "& video": {
    width: "100%",
    height: "auto",
    borderRadius: theme.shape.borderRadius,
  },
}));

const MoreButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#00b0ff",
  color: "white",
  padding: "12px 24px",
  borderRadius: theme.shape.borderRadius,
  textTransform: "none",
  fontSize: "1rem",
  "&:hover": {
    backgroundColor: "#0081cb",
  },
}));

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
