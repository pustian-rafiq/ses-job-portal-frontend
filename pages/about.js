import React from "react";

import Meta from "../components/Meta/Meta";
import MasterLayout from "../Layouts/MasterLayout";
import AboutUsImg from "../public/images/aboutus.jpg"
import AboutUs1 from "../public/images/aboutus1.jpg"
import AboutUs2 from "../public/images/aboutus2.jpg"
import Image from "next/image";
import TestimonialSection from "../components/HomePage/TestimonialSection";
import ScrollButton from "../components/Common/ScrollButton";
import { useEffect } from "react";

const  AboutUs = () => {

 useEffect(() => {
  window.scroll(0, 0);
 })

  return (
    <>
      <Meta title="About | SES Job portal" />
      <main className="main">
      
      <section className="section-box mt-50">
        <div className="post-loop-grid">
          <div className="container">
            <div className="text-center">
              {/* <h6 className="f-18 color-text-mutted text-uppercase">Our Vission & Mission</h6> */}
              <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">Our Company Vission & Mission</h2>
              <p className="font-sm color-text-paragraph wow animate__animated animate__fadeInUp w-lg-50 mx-auto">We help people achieve independence by making it easier to start, run, and grow a business. We believe the future of commerce has more voices, not fewer, so we’re reducing the barriers to business ownership to make commerce better for everyone.</p>
            </div>
            <div className="row mt-70">
              <div className="col-lg-6 col-md-12 col-sm-12 mt-2">
              <Image src={AboutUsImg} alt="joxBox" width="700%" height="400" />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 mt-0">
                <h3 className="mt-0">What we can do?</h3>
                <div className="mt-20" style={{textAlign: 'justify'}}>
                  <p className="font-md color-text-paragraph mt-20">Aenean sollicituin, lorem quis bibendum auctor nisi elit consequat ipsum sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet maurisorbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctora ornare odio.</p>
                  <p className="font-md color-text-paragraph mt-20">Aenean sollicituin, lorem quis bibendum auctor nisi elit consequat ipsum sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet maurisorbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctora ornare odio.</p>
                  <p className="font-md color-text-paragraph mt-20">className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis non nisi purus. Integer sit nostra, per inceptos himenaeos.</p>
                  <p className="font-md color-text-paragraph mt-20">className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis non nisi purus. Integer sit nostra, per inceptos himenaeos.</p>
                </div>
                <div className="mt-30"><a className="btn btn-brand-1" href="#">Read More</a></div>
              </div>
            </div>
            <div className="row mt-70">
           
              <div className="col-lg-6 col-md-12 col-sm-12 mt-0">
                <h3 className="mt-0">How we can do?</h3>
                <div className="mt-20" style={{textAlign: 'justify'}}>
                  <p className="font-md color-text-paragraph mt-20">Aenean sollicituin, lorem quis bibendum auctor nisi elit consequat ipsum sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet maurisorbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctora ornare odio.</p>
                  <p className="font-md color-text-paragraph mt-20">Aenean sollicituin, lorem quis bibendum auctor nisi elit consequat ipsum sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet maurisorbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctora ornare odio.</p>
                  <p className="font-md color-text-paragraph mt-20">className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis non nisi purus. Integer sit nostra, per inceptos himenaeos.</p>
                  <p className="font-md color-text-paragraph mt-20">className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis non nisi purus. Integer sit nostra, per inceptos himenaeos.</p>
                </div>
                <div className="mt-30"><a className="btn btn-brand-1" href="#">Read More</a></div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 mt-2">
              <Image src={AboutUs1} alt="joxBox" width="700%" height="400"/>
              </div>
            </div>
            <div className="row mt-70">
              <div className="col-lg-6 col-md-12 col-sm-12 mt-">
              <Image src={AboutUs2} alt="joxBox" width="700%" height="400"/>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 mt-0">
                <h3 className="mt-0">What we can do?</h3>
                <div className="mt-20 " style={{textAlign: 'justify'}}>
                  <p className="font-md color-text-paragraph mt-20"  >Aenean sollicituin, lorem quis bibendum auctor nisi elit consequat ipsum sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet maurisorbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctora ornare odio.</p>
                  <p className="font-md color-text-paragraph mt-20" >Aenean sollicituin, lorem quis bibendum auctor nisi elit consequat ipsum sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet maurisorbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctora ornare odio.</p>
                  <p className="font-md color-text-paragraph mt-20">className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis non nisi purus. Integer sit nostra, per inceptos himenaeos.</p>
                  <p className="font-md color-text-paragraph mt-20">className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis non nisi purus. Integer sit nostra, per inceptos himenaeos.</p>
                </div>
                <div className="mt-30"><a className="btn btn-brand-1" href="#">Read More</a></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    
      <section className="section-box mt-30 mb-40">
       
          <div className="row mt-50">
            <TestimonialSection/>
          </div>
     
      </section>
   
    </main>
    <ScrollButton/>
    </>
  );
}

AboutUs.Layout = MasterLayout;

export default AboutUs;

 