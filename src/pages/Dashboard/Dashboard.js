import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "../../store/action";
import CanvasJSReact from "../../assets/canvasjs.react";
import { Chart } from "react-google-charts";
// import SearchIcon from "@material-ui/icons/Search";
// import Group from "@material-ui/icons/Group";
// import PersonOutline from "@material-ui/icons/PersonOutline";
// import { Chart } from 'react-charts'
// import BarChart from 'react-bar-chart';
import {
  Container,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

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


  const monthlyOption1 = dashboardList?.monthly_details;
  const yearlyOption1 = dashboardList?.yearly_details;
    
  const currentYear = new Date().getFullYear();
  const [dashboardYear, setDashboardYear] = useState({
    years: currentYear,
  });


  useEffect(() => {
    dispatch(getDashboard({dashboardYear}));
  }, [dispatch,dashboardYear]);


  const handleFilter = (event) => {
    setDashboardYear({
      ...dashboardYear,
      [event.target.name]: event.target.value,
    });
    // setSetYear(event.target.value)
    // getData();
  };

  const getData = () => {
    dispatch(getDashboard({dashboardYear}));
  };

  const yearList = [
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
  ];
 
  var options = {
    title: "",
    legend: { position: "none" },
  };
  return (
    <section key={Date.now()+'1'} className="pt-16 pb-32">
      <Container key={Date.now()+'2'} maxWidth="lg">
      <p key={Date.now()+'22'}  className="mt-5" >
          Welcome to your Pluto Software admin dashboard. Here you can get an
          overview of your account activity, or use navigation on the left hand
          side to get to your desired location.
        </p>

        {/* <h1 key={Date.now()+'3'} className="mt-0">Dashboard</h1> */}
        {loading ? (
          <Backdrop key={Date.now()+'4'} className={classes.backdrop} open={loading}>
            <CircularProgress key={Date.now()+'5'} color="inherit" />
          </Backdrop>
        ) : (
          ""
        )}
     
        <div className="box-container" key={Date.now()+'6'}>
          {
            // [1, 2, 3].map(index => {
            // return (
            <>
              <div className="box-list" key={Date.now()+'7'}>
                <div className="inner-box-list" key={Date.now()+'8'}>
                  <div>
                    <h2 key={Date.now()+'9'}>{dashboardList?.total_user}</h2>
                    <p key={Date.now()+'10'} >Total Number Of User</p>
                  </div>
                  <div key={Date.now()+'16'}>
                    {/* <Group className={classes.searchIcondet} /> */}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/></svg> */}
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                </div>
              </div>
              <div className="box-list" key={Date.now()+'11'}>
                <div className="inner-box-list" key={Date.now()+'12'}>
                  <div key={Date.now()+'14'}>
                    <h2 key={Date.now()+'13'}>{dashboardList?.block_user}</h2>
                    <p key={Date.now()+'14'}>Total Block User</p>
                  </div>
                  <div key={Date.now()+'15'}>
                    {/* <PersonOutline className={classes.searchIcondet} /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M15.18,10.94c0.2-0.44,0.32-0.92,0.32-1.44C15.5,7.57,13.93,6,12,6c-0.52,0-1,0.12-1.44,0.32L15.18,10.94z"/><path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,15c-2.32,0-4.45,0.8-6.14,2.12 C4.7,15.73,4,13.95,4,12c0-1.85,0.63-3.55,1.69-4.9l2.86,2.86c0.21,1.56,1.43,2.79,2.99,2.99l2.2,2.2C13.17,15.05,12.59,15,12,15z M18.31,16.9L7.1,5.69C8.45,4.63,10.15,4,12,4c4.42,0,8,3.58,8,8C20,13.85,19.37,15.54,18.31,16.9z"/></g></g></svg>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"/><g><path d="M8.65,5.82C9.36,4.72,10.6,4,12,4c2.21,0,4,1.79,4,4c0,1.4-0.72,2.64-1.82,3.35L8.65,5.82z M20,17.17 c-0.02-1.1-0.63-2.11-1.61-2.62c-0.54-0.28-1.13-0.54-1.77-0.76L20,17.17z M21.19,21.19L2.81,2.81L1.39,4.22l8.89,8.89 c-1.81,0.23-3.39,0.79-4.67,1.45C4.61,15.07,4,16.1,4,17.22V20h13.17l2.61,2.61L21.19,21.19z"/></g></svg> */}
                  </div>
                </div>
              </div>
            </>
            // )
            // })
          }
        </div>
        <div key={Date.now()+'16'} style={{display: "flex",alignItems: "center",width:'100%',justifyContent: "space-between"}} className="inner-box-list">
            <h2 key={Date.now()+'17'}>Monthly User Details</h2>
            <InputLabel style={{marginLeft: '54%'}}>Select Year</InputLabel>
              <FormControl key={Date.now()+'2'}
              variant="outlined"
              className={classes.formControl1}
              width="50%"
            >
              <Select key={Date.now()+'18'}
                value={dashboardYear.years ? dashboardYear.years : 'ss'}
                name="years"
                onChange={(e) => handleFilter(e)}
              >
                {yearList.map(({ value, label }, index) => (
                  <MenuItem value={value}>{label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        <Chart key={Date.now()+'19'}
          chartType="ColumnChart"
          width="100%"
          height="400px"
          data={monthlyOption1}
          options={options}
        />
       <div  key={Date.now()+'20'} style={{display: "flex",alignItems: "center",width:'100%',justifyContent: "space-between"}} className="inner-box-list">
            <h2 key="aa">Yearly User Details</h2>
          </div>
        <Chart key={Date.now()+'21'}
          chartType="ColumnChart"
          width="100%"
          height="400px"
          data={yearlyOption1}
          options={options}
        />
      </Container>
    </section>
  );
};

export default Dashboard;
