import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import { testimonialData } from "../../utils/testimonialData";

function TestimonialSection() {
  var settings = {
    dots: true,
    infinite: true,
    padding: 3,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const testimonialList = testimonialData.map((data, index) => {
    return (
    
        <div className="testimonial" key={index}>
          <div className="pic">
            <Image height={100} width={100} src={data.photo} alt="jobBox" />
          </div>
          <p className="description testimonial_ellipsis">{`"${data.review}"`}</p>
          <h3 className="title">{data.name}</h3>
          <small className="post">- {data.designation}</small>
        </div>
    
    );
  });

  return (
    <section className="section-box mt-50">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
            Testimonials
          </h2>
          <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">
            Experiences with Our Clients
          </p>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <Slider {...settings}>{testimonialList}</Slider>
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;
