
const apiConfigs = {
    API_URL: (window.location.hostname === "localhost")? process.env.REACT_APP_PLUTO_ADMIN_API_LOCAL_URL : process.env.REACT_APP_PLUTO_ADMIN_API_URL,
  
  };
  
  export default apiConfigs;