import React from "react";
import Image from "next/image";

import processBackground from "../../assets/imgs/page/homepage1/processBg.png";
import ProcessStep from "./ProcessStep";

function ProcessSection({ onlySteps = false }) {
  return (
    <section className="section-box overflow-visible mt-10 mb-10  py-5">
      <div className="container">
        <div className="row">
          {!onlySteps && (
            <>
              <div className="col-lg-6 col-sm-12">
                <div className="content-job-inner">
                  <h2 className="text-52 wow animate__animated animate__fadeInUp">
                    Customer satisfaction rate
                    <span className="color-brand-2"> 94.5%</span>
                  </h2>
                  <br />
                  <h5 className="text-32 wow animate__animated animate__fadeInUp">
                    Professionals help from proposal to decision
                  </h5>
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="box-image-job">
                  <figure className="wow animate__animated animate__fadeIn">
                    <Image alt="" src={processBackground} />
                  </figure>
                </div>
              </div>
            </>
          )}
        </div>
        <ProcessStep />
      </div>
    </section>
  );
}

export default ProcessSection;
