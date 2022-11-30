import React from "react";

import Slider from "react-slick";

function CircleMeta() {
  const settings = {
    dots: false,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      <div className="card card-circle">
        <div className="card-body">
          <h5 className="card-title text-white">450+ Jobs</h5>
          <p className="card-text text-white">
            Jobs in all categories and locations. You can find your dream job
            here.
          </p>
          <a href="jobs" className="btn btn-primary mt-3">
            Browse Jobs
          </a>
        </div>
      </div>
      <div className="card card-circle">
        <div className="card-icon">
          <i className="fas fa-apple-alt"></i>
        </div>
        <div className="card-body">
          <h5 className="card-title text-white">50+ Company</h5>
          <p className="card-text text-white">
            Best companies in Japan are hiring. You can find your dream job
            here.
          </p>
          <a href="contact" className="btn btn-primary mt-3">
            Contact Us
          </a>
        </div>
      </div>
      <div className="card card-circle">
        <div className="card-icon">
          <i className="fas fa-apple-alt"></i>
        </div>
        <div className="card-body">
          <h5 className="card-title text-white">¥50000+ Avg. salary</h5>
          <p className="card-text text-white">
            High Salary is based on your skills and experience. Claim it now.
            Simply get yourself registered.
          </p>
          <a href="auth/register" className="btn btn-primary mt-3">
            Register Now
          </a>
        </div>
      </div>
    </Slider>
  );
}

export default CircleMeta;
