import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "../../store/action";
import CanvasJSReact from "../../assets/canvasjs.react";
import { Chart } from "react-google-charts";
// import { Chart } from 'react-charts'
// import BarChart from 'react-bar-chart';
import {
  Container,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  makeStyles,
  Button,
  Card,
  Box,
  MenuItem,
  Select,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Dashboard = () => {
  const useStyle = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));

  const classes = useStyle();
  const dispatch = useDispatch();
  const { dashboardList, loading } = useSelector(
    (state) => state.dashboardReducer
  );
  console.log(dashboardList, " dashboardList");
  console.log(dashboardList.monthly_details, " monthly_details");
  console.log(dashboardList.yearly_details, " yearly_details");
  const getData = () => {
    dispatch(getDashboard({}));
  };

  useEffect(() => {
    getData();
  }, []);

  const monthlyOption1 = dashboardList?.monthly_details;
  const yearlyOption1 = dashboardList?.yearly_details;
  //  const data = [
  //   ["Element", "user", { role: "style" }],
  //   ["Copper", 8.94, "#b87333"], // RGB value
  //   ["Silver", 10.49, "silver"], // English color name
  //   ["Gold", 19.3, "gold"],
  //   ["Platinum2", 21.45, "color: #e5e4e2"],
  //   ["Platinum3", 21.45, "gray"],
  //   ["Platinum4", 21.45, "green"],
  //   ["Platinum5", 21.45, "pink"],
  //   ["Platinum6", 21.45, "yellow"],
  //   ["Platinum7", 21.45, "blue"],
  //   ["Platinum8", 21.45, "red"],
  // ];
  console.log(monthlyOption1, "monthlyOption1");
  const datas = React.useMemo(
    () => [
      {
        label: "Series 1",
        data: [
          [0, 1],
          [1, 2],
          [2, 4],
          [3, 2],
          [4, 7],
        ],
      },
    ],
    []
  );

  const data2 = [
    { text: "Man", value: 500 },
    { text: "Woman", value: 300 },
  ];

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  const axes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  return (
    <section className="pt-16 pb-32">
      <Container maxWidth="lg">
        <h1 className="mt-0">Dashboard</h1>
        {loading ? (
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          ""
        )}
        {/* <div className="col-md-6 mb-2">
        <CanvasJSChart options={monthlyOption} />
      </div>
     <div className="col-md-6 mb-2">
        <CanvasJSChart options={yearlyOption} />
      </div>*/}
        <Box className="mt-16">Total User {dashboardList?.total_user}</Box>
        <Box className="mt-16">
          Total Block User {dashboardList?.block_user}
        </Box>
        
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="400px"
          data={monthlyOption1}
        />
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="400px"
          data={yearlyOption1}
        />

        {/* <div
      style={{
        width: '400px',
        height: '300px'
      }}
    >
      <Chart data={datas} axes={axes} />
    </div> */}

        {/* <div style={{width: '50%'}}> 
                <BarChart ylabel='Quantity'
                  width={500}
                  height={500}
                  margin={margin}
                  data={data2}
                  onBarClick={handleBarClick()}/>
            </div> */}

        <p>
          Welcome to your Pluto Software admin dashboard. Here you can get an
          overview of your account activity, or use navigation on the left hand
          side to get to your desired location.
        </p>
      </Container>
    </section>
  );
};

export default Dashboard;
