import React, { useEffect, useState } from 'react';
import {
  Grid, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Divider, Dialog,DialogTitle, DialogContent,DialogActions, IconButton, TextField, Button
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CloseIcon from '@mui/icons-material/Close';
import useFetch from '../hooks/fetchHook';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import defaultAxios from '../customAxios/defaultAxios';
import FooterTable from '../components/FooterTable/FooterTable';
import AddFoodToLunch from './AddFood';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { AttractionsOutlined } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  sectionBox: {
    marginBottom: '5px',
  },
  sectionTitle: {
    width: '60px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#005FAF',
  },
  tableHeader: {
    backgroundColor: '#005FAF',
  },
  tableCell: {
    padding: '8px 16px',
    width:'60px',
    fontSize: '14px',
    marginRight: '10px',
    backgroundColor: '#f5f5f5',
  },
  totalRow: {
    width: '100%',
    backgroundColor: 'white',
    fontWeight: 'bold',
  },
  totalSection: {
    marginTop: '24px',
    backgroundColor: '#f9f9f9',
    padding: '16px',
    borderRadius: '8px',
  },
  totalText: {
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  divider: {
    margin: '16px 0',
  },
  goalSection: {
    marginTop: '16px',
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#3366CC',
    color: 'white',
  },
  searchBox: {
    marginTop: '16px',
    marginBottom: '16px',
  },
  submitButton: {
    backgroundColor: '#FF4500',
    color: 'white',
    marginTop: '20px',
  },
}));

const DietPlan = () => {
  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState('');
  const {user} = useSelector((state) => state.auth);
  // console.log('user : ',user)
  const [{apiData},,setParams] = useFetch(`api/getFoodById/${user?.id}`,{skip:!user?.id});
  // console.log(apiData);

  useEffect(() => {
    if(apiData){
      setMeals([
        {
          name: 'Breakfast',
          items:apiData?.breakfast,
          total:apiData?.breakfast?.reduce((acc,curr)=>({
            calories: acc.calories + curr.item.calories,
            carbs: acc.carbs + curr.item.carbs,
            fat: acc.fat + curr.item.fat,
            protein: acc.protein + curr.item.protein,
          }),{calories:0,carbs:0,fat:0,protein:0,sodium:0,sugar:0}),
        },
        {
          name: 'Lunch',
          items: apiData?.lunch,
          total:apiData?.lunch?.reduce((acc,curr)=>({
            calories: acc.calories + curr.item.calories,
            carbs: acc.carbs + curr.item.carbs,
            fat: acc.fat + curr.item.fat,
            protein: acc.protein + curr.item.protein,
          }),{calories:0,carbs:0,fat:0,protein:0,sodium:0,sugar:0})
        },
        {
          name: 'Dinner',
          items: apiData?.dinner,
          total:apiData?.dinner?.reduce((acc,curr)=>({
            calories: acc.calories + curr.item.calories,
            carbs: acc.carbs + curr.item.carbs,
            fat: acc.fat + curr.item.fat,
            protein: acc.protein + curr.item.protein,
          }),{calories:0,carbs:0,fat:0,protein:0,sodium:0,sugar:0})
        },
        {
          name: 'Snacks',
          items: apiData?.snacks,
          total:apiData?.snacks?.reduce((acc,curr)=>({
            calories: acc.calories + curr.item.calories,
            carbs: acc.carbs + curr.item.carbs,
            fat: acc.fat + curr.item.fat,
            protein: acc.protein + curr.item.protein,
          }),{calories:0,carbs:0,fat:0,protein:0,sodium:0,sugar:0})
        }
      ]
      )
    }
  }, [apiData])

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const totalSummary = {
    calories: apiData?.totalCalories, carbs: apiData?.totalCarbs, fat: apiData?.totalFat, protein: apiData?.totalProtein,
    goal: { calories: 1943, carbs: 194, fat: 65, protein: 146}
  };

  const handleOpen = (meal_name) => {
    console.log('hhh : ',meal_name)
    setMealName(meal_name);
    setOpen(true)
  
  };
  console.log(mealName)
  const handleClose = () => setOpen(false);
  return (
    <div style={{padding:'5px'}}>
      <Typography variant="h4" gutterBottom style={{ color: '#3366CC' }}>Today's Diet Plan</Typography>
      {meals?.map((meal, index) => (
        <MealSection key={index} recall={setParams} tableNumber={index} meal={meal} classes={classes} handleOpen={handleOpen} />
      ))}
      <Divider className={classes.divider} />
      <FooterTable total={totalSummary} mealName={mealName} />
      <FoodDialog open={open} recall={setParams} handleClose={handleClose} classes={classes} />
    </div>
  );
};

const MealSection = ({ tableNumber, meal, classes, recall, handleOpen }) => {
  const privateAxios = useAxiosPrivate();
  const { user } = useSelector((state) => state.auth);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [mealName, setMealName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleDialogOpen = (item,selectedMealName) => {
    setSelectedFood(item);
    setQuantity(item.quantity);
    setMealName(selectedMealName);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedFood(null);
  };

  const deleteFood = async (id) => {
    try {
      console.log('data to delete : ', { id, userId: user?.userId })
      const { data } = await privateAxios.delete(`/api/removeFood`, {
        data: { id, userId: user?.userId }
      });
      recall({});
      toast.success(data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  
  const updateQuantity = async () => {
    try {
      const { data } = await privateAxios.put(`/api/updateFood`, {
        id: selectedFood._id,
        meal: mealName,
        quantity
      });
      recall({});
      setOpenDialog(false);
      toast.success(data?.message);
      handleDialogClose();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <Box className={classes.sectionBox}>
      <TableContainer component={Paper} elevation={0}>
        <Table size="small">
          <TableHead>
            <TableRow className={classes.totalRow}>
              <TableCell style={{ width: '150px', color: '#3366CC', fontWeight: 'bold', cursor: 'pointer' }}>
                <Typography variant="h6" className={classes.sectionTitle}>{meal?.name}</Typography>
              </TableCell>
              {tableNumber === 0 && <TableCell align="center" style={{ backgroundColor: '#3366CC', color: 'white', fontWeight: 'bold' }}>Calories (kcal)</TableCell>}
              {tableNumber === 0 && <TableCell align="center" style={{ backgroundColor: '#3366CC', color: 'white', fontWeight: 'bold' }}>Carbs (g)</TableCell>}
              {tableNumber === 0 && <TableCell align="center" style={{ backgroundColor: '#3366CC', color: 'white', fontWeight: 'bold' }}>Fat (g)</TableCell>}
              {tableNumber === 0 && <TableCell align="center" style={{ backgroundColor: '#3366CC', color: 'white', fontWeight: 'bold' }}>Protein (g)</TableCell>}
              {tableNumber === 0 && <TableCell align="center"></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {meal?.items?.length > 0 ? meal?.items?.map((item, index) => (
              <TableRow key={index}>
                <TableCell
                  className={classes.tableCell}
                  title="serving"
                  style={{ color: 'blue', cursor: 'pointer' }}
                  onClick={() => handleDialogOpen(item,meal?.name)}
                >
                  {item?.item?.name} | {item?.item?.servingSize} x {item?.quantity}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>{item?.item?.calories * item.quantity}</TableCell>
                <TableCell align="center" className={classes.tableCell}>{item?.item?.carbs * item.quantity}</TableCell>
                <TableCell align="center" className={classes.tableCell}>{item?.item?.fat * item.quantity}</TableCell>
                <TableCell align="center" className={classes.tableCell}>{item?.item?.protein * item.quantity}</TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  <RemoveCircleIcon style={{ color: 'red', cursor: 'pointer' }} onClick={() => deleteFood(item._id)} />
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell className={classes.tableCell} colSpan={6} align="center" style={{ color: 'blue', cursor: 'pointer' }}>No Food Added</TableCell>
              </TableRow>
            )}
            <TableRow className={classes.totalRow}>
              <TableCell style={{ color: '#3366CC', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleOpen(meal?.name)}>Add Food</TableCell>
              <TableCell align="center" className={classes.totalCell} style={{ color: 'green', fontWeight: 'bold' }}>{meal?.total?.calories}</TableCell>
              <TableCell align="center" className={classes.totalCell} style={{ color: 'green', fontWeight: 'bold' }}>{meal?.total?.carbs}</TableCell>
              <TableCell align="center" className={classes.totalCell} style={{ color: 'green', fontWeight: 'bold' }}>{meal?.total?.fat}</TableCell>
              <TableCell align="center" className={classes.totalCell} style={{ color: 'green', fontWeight: 'bold' }}>{meal?.total?.protein}</TableCell>
              <TableCell align="center" className={classes.totalCell} style={{ color: 'green', fontWeight: 'bold' }}></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for updating quantity */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Update Quantity for {selectedFood?.item?.name}</DialogTitle>
        <DialogContent>
          <Typography>Serving Size: {selectedFood?.item?.servingSize}</Typography>
          <Typography>Calories: {selectedFood?.item?.calories}</Typography>
          <Typography>Carbs: {selectedFood?.item?.carbs}</Typography>
          <Typography>Fat: {selectedFood?.item?.fat}</Typography>
          <Typography>Protein: {selectedFood?.item?.protein}</Typography>
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value,selectedFood?.item?.name)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={updateQuantity} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const FoodDialog = ({ open, handleClose,recall,mealName }) => {
  console.log('gggg : ',mealName)
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth PaperProps={{style: {borderRadius: '7px'}}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#005FAF', color: 'white' }}>
        <Typography variant="h6" style={{ textAlign: 'center', fontWeight: 'bold' }}>Your Personal Foods</Typography>
        <IconButton onClick={handleClose} style={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </div>

      <DialogContent style={{ padding: '24px' }}>
        <AddFoodToLunch recall={recall} mealName={mealName}/>
        
      </DialogContent>

    </Dialog>
  );
};


export default DietPlan;

