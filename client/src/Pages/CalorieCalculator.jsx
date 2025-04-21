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
    <div style={{ backgroundColor: "white", width: "100%", minHeight: "100vh",marginTop:'20px' }}>
      <h4 style={{ textAlign: 'center' }}>Nutritional and Calorie Calculators</h4>
        {/* Calorie Calculator Form */}
        <Grid
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
                    to='/plan-diet'
                    state={{caloriesRequired: calories }}
                    style={{
                      border: "none",
                      background: "none",
                      fontWeight: "bold",
                      color: "#1976d2",
                    }}
                  >
                      Plan Your Diet Today  <EastIcon/>
                  </Link >
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>
    </div>
  );
};

export default CalorieCalculator;
