import React from "react";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function NavLayout({ children }) {
  return (
    <>
      <Navbar />
      {/* <Nav3/> */}
      {children}
      <Footer />
    </>
  );
}
