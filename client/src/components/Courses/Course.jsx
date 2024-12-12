import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForward from "@mui/icons-material/ArrowForward";
import img1 from "../../assets/banner.jpeg";

import { useCourceQuery } from "../../features/cources/courceApiSlice";
import CourseDescription from "./CourseDescription";

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
      <div style={{ position: "relative", width: "100vw", height: "70vh" }}>
        <Box
          component="img"
          src={img1}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(124, 166, 255, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              px: 6,
              color: "white",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ color: "primary.light", mb: 1, fontSize: "1.25rem" }}
            >
              A Course You'll Actually Finish
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                mb: 2,
                maxWidth: "800px",
                fontSize: { xs: "2.5rem", md: "3.75rem" },
              }}
            >
              {course?.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{ maxWidth: "600px", mb: 4, fontSize: "1.1rem" }}
            >
              {course?.description}
            </Typography>
            <Button
              variant="contained"
              color="info"
              size="large"
              sx={{
                width: "fit-content",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
              }}
            >
              Enroll now
            </Button>
          </Box>
        </div>
      </div>

            <CourseDescription courseDetails={course} />
    </div>
  );
};

export default Cource;
