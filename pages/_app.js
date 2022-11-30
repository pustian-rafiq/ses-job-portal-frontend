import "bootstrap/dist/css/bootstrap.min.css";
import { createContext, useEffect, useState } from "react";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/globals.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-loading-skeleton/dist/skeleton.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee, faUser } from '@fortawesome/free-solid-svg-icons'
import { getToken } from "../services/auth/token";
import publicApi from "../services/publicApi";
library.add(faCheckSquare, faCoffee, faUser)


export const appContext = createContext();

//Backend Connection
// axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.baseURL = process.env.domain;

axios.interceptors.request.use(function (config) {
  const token = getToken();
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

const NoLayout = ({ children }) => children;

function MyApp({ Component, pageProps }) {
  const [userData, setUserData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState(null)
  
  const Layout = Component.Layout || NoLayout;

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.js");
    // Router.events.on("routeChangeStart", () => NProgress.start());
    // Router.events.on("routeChangeComplete", () => NProgress.done());
    // Router.events.on("routeChangeError", () => NProgress.done());

    setUserData(JSON.parse(localStorage.getItem("user_data")));
    // setToken(localStorage.getItem("api_token"))

    fetchCategories()

    
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem("api_token"))
    }

  }, []);
const fetchCategories = async () =>{
  const response =await publicApi.get("/categories");
  if (response.status === 200) {
    // console.log("categories",response.data);
    setCategories(response.data)
  }
}
 
  return (
    <appContext.Provider value={{userData, setUserData,categories,token,setToken}}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </appContext.Provider>
  );
}

export default MyApp;
