import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Select,
  Grid,
  Typography,
  // Box,
  TextField,
  Button,
  MenuItem,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import EastIcon from "@mui/icons-material/East";

import { useAddYourHealthGoalMutation } from "../features/healthGoal/healthGoalApiSlice";
import { useGetYourCaloriesRequirementQuery } from "../features/Food/foodApiSlice";

const CalorieCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [calories, setCalories] = useState(0);
  const [country, setCountry] = useState("India"); // Default country
  const [goal, setGoal] = useState("Lose Weight"); // Default goal
  // const [openCalculator, setOpenCalculator] = useState(false);

  const [addYourHealthGoal] = useAddYourHealthGoalMutation();

   const { data: calorieData } = useGetYourCaloriesRequirementQuery();
   const navigate = useNavigate();
   
  const handleCaloriesSubmit = (calories) => {
    setCalories(calories);
  };

  const calculateCalories = async() => {

    try {

      let BMR;

      // calculate age 
      const age = Math.floor(
        (new Date() - new Date(DOB)) / (1000 * 60 * 60 * 24 * 365.25)
      );

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
  
      const goalMultiplier = {
        "Lose Weight": -500,
        "Maintain Weight": 0,
        "Gain Weight": 500,
      }[goal];

      const totalCalories = Math.round(
        BMR * activityMultiplier + goalMultiplier
      );
      setCalories(totalCalories);
      const numericCalories = parseFloat(totalCalories);
  
      if (!isNaN(numericCalories)) {
        handleCaloriesSubmit(numericCalories);
      }
      
      const data = await addYourHealthGoal({
        goal: goal,
        activityLevel: activityLevel,
        gender:gender,
        dateOfBirth: DOB,
        country: country,
        height: height,
        weight: weight,
      }).unwrap();
      
      console.log("Data submitted successfully:", data);
      // console.log("Data submitted successfully:");
      
    } catch (error) {
      console.error("Input is not a valid number");
    }

  };


  useEffect(() => {
  if (calorieData) {
    navigate("/plan-diet", { state: { caloriesRequired: calorieData } });
  }
}, [calorieData, navigate]);

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
                  // label="Age"
                  fullWidth
                  value={DOB}
                  onChange={(e) => setDOB(e.target.value)}
                  type="date"
                  sx={{
                    "& input": {
                      backgroundColor: "white",
                      color: "black",
                    },
                  }}
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
                  <InputLabel>Goal</InputLabel>
                  <Select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    label="Goal"
                  >
                    <MenuItem value="Lose Weight">Lose Weight</MenuItem>
                    <MenuItem value="Maintain Weight">Maintain Weight</MenuItem>
                    <MenuItem value="Gain Weight">Gain Weight</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Country"
                  fullWidth
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  variant="outlined"
                />
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
                  {/* <Typography variant="h6" align="center">
                    You need approximately {calories} calories/day.
                  </Typography> */}
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
