import axios from "axios";
import { useEffect, useState } from "react";
import MainContent from "../components/MainContent";
import Meta from "../components/Meta/Meta";
import MasterLayout from "../Layouts/MasterLayout";

const Home = () => {

  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   axios.get("/api/categories").then((res) => {
  //     if (res.status === 200) {
  //       setCategories(res.data)
  //     }
  //   });
  // }, []);


  return (
    <>
      <Meta title="Home | SES Job portal" />
      <MainContent />
    </>
  );
};

Home.Layout = MasterLayout;

export default Home;

