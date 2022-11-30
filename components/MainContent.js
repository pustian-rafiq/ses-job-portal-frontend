import React from "react";

import CategorySection from "./HomePage/CategorySection";
import ApplySection from "./HomePage/ApplySection";
import JobSection from "./HomePage/JobSection";
import JobSearchSection from "./HomePage/JobSearchSection";
import StateSection from "./HomePage/StateSection";
import ProcessSection from "./HomePage/ProcessSection";
import BannerSection3 from "./HomePage/BannerSection3";
import ScrollButton from "./Common/ScrollButton";

function MainContent( ) {
  return (
    <>
      <main className="main">
        {/* <BannerSection /> */}
        {/* <BannerSection /> */}
        <BannerSection3   />

        <CategorySection  />

        <ApplySection />

        <JobSection   />

        <JobSearchSection />

        <StateSection /> 

        {/* <TestimonialSection />  */}

        <ProcessSection />
        <ScrollButton/>
        {/* <BlogSection /> */}
      </main>
    </>
  );
}

export default MainContent;
