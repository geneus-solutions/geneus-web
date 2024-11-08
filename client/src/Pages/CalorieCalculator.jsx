import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Select,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import EastIcon from "@mui/icons-material/East";

// Styled components for modern UI
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme?.palette?.text?.secondary,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  borderRadius: "15px", // Softer corners
  maxWidth: "400px",
  margin: "auto",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px", // Rounded inputs
    "& fieldset": {
      borderColor: "#ddd", // Initial border color
    },
    "&:hover fieldset": {
      borderColor: "#1976d2", // On hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2", // When focused
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #1976d2, #42a5f5)", // Gradient background
  color: "#fff",
  padding: theme.spacing(1.5),
  borderRadius: "10px", // Rounded button
  width: "100%",
  textTransform: "none",
  fontWeight: "bold",
  "&:hover": {
    background: "linear-gradient(45deg, #1565c0, #1e88e5)", // Darker on hover
  },
}));

const CalorieCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [calories, setCalories] = useState(0);
  const [openCalculator, setOpenCalculator] = useState(false);

  const handleCaloriesSubmit = (calories) => {
    setCalories(calories);
  };

  const calculateCalories = () => {
    let BMR;
    if (gender === "male") {
      BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    let activityMultiplier;
    switch (activityLevel) {
      case "sedentary":
        activityMultiplier = 1.2;
        break;
      case "lightlyActive":
        activityMultiplier = 1.375;
        break;
      case "moderatelyActive":
        activityMultiplier = 1.55;
        break;
      case "veryActive":
        activityMultiplier = 1.725;
        break;
      case "extraActive":
        activityMultiplier = 1.9;
        break;
      default:
        activityMultiplier = 1.2;
    }
    const totalCalories = Math.round(BMR * activityMultiplier);
    setCalories(totalCalories);
    const numericCalories = parseFloat(totalCalories);
    if (!isNaN(numericCalories)) {
      handleCaloriesSubmit(numericCalories);
    } else {
      console.error("Input is not a valid number");
    }
  };
  return (
    <div style={{ backgroundColor: "white", width: "100%", minHeight: "100vh" }}>
      <h4 style={{ textAlign: 'center' }}>Nutritional and Calorie Calculators</h4>
      {!openCalculator&&<Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={4}>
          <img
            src="data:image/png;base64,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" // Sample image link (use a proper image source)
            alt="Calorie Illustration"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: "#1976d2",
                fontWeight: 700,
                textDecoration: "underline",
              }}
            >
              Calorie
            </Typography>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              About <span style={{ color: "#1976d2" }}>Calorie</span>
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginBottom: "16px", lineHeight: 1.7 }}
            >
              Calories are a fundamental aspect of nutrition and energy balance.
              Monitoring calorie intake can help individuals achieve their
              health and fitness goals, making awareness of caloric content
              essential for a balanced diet.{" "}
              <button
                onClick={() => setOpenCalculator(!openCalculator)}
                style={{
                  border: "none",
                  background: "none",
                  fontWeight: "bold",
                  color: "#1976d2",
                }}
              >
                Calculate your calories <EastIcon/>{" "}
              </button>
            </Typography>
          </Box>
        </Grid>

      </Grid>}
        {/* Calorie Calculator Form */}
        {openCalculator&&<Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <Paper
            elevation={0}
            sx={{ padding: 4, maxWidth: 600, width: "100%" }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Calorie Calculator
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Weight (kg)"
                  fullWidth
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Height (cm)"
                  fullWidth
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Age"
                  fullWidth
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    label="Gender"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Activity Level</InputLabel>
                  <Select
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                    label="Activity Level"
                  >
                    <MenuItem value="sedentary">
                      Sedentary (Little to no exercise)
                    </MenuItem>
                    <MenuItem value="lightlyActive">
                      Lightly Active (Exercise 1-3 times/week)
                    </MenuItem>
                    <MenuItem value="moderatelyActive">
                      Moderately Active (Exercise 3-5 times/week)
                    </MenuItem>
                    <MenuItem value="veryActive">
                      Very Active (Exercise 6-7 times/week)
                    </MenuItem>
                    <MenuItem value="extraActive">
                      Extra Active (Very hard exercise, physical job)
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={calculateCalories}
                >
                  Calculate
                </Button>
              </Grid>
              {calories > 0 && (
                <Grid item xs={12}>
                  <Typography variant="h6" align="center">
                    You need approximately {calories} calories/day.
                  </Typography>
                  <Link 
                    to='/plan-diat'
                    state={{caloriesRequired: calories }}
                    style={{
                      border: "none",
                      background: "none",
                      fontWeight: "bold",
                      color: "#1976d2",
                    }}
                  >
                      Plan Your Diat Today  <EastIcon/>
                  </Link >
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>}
    </div>
  );
};

export default CalorieCalculator;
