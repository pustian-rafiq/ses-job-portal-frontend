import React from "react";
import marketing from "../../assets/imgs/page/homepage1/marketing.svg";
import Slider from "react-slick";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "next/image";
import Link from "next/link";

function CategorySection() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
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

  const skillsList = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node",
    "MongoDB",
    "Php",
  ];

  return (
    <>
      <section className="section-box">
        <div className="section-box wow animate__animated animate__fadeIn mt-70">
          <div className="container">
            <div className="text-center">
              <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
                Browse by Skills
              </h2>
              <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">
                Find the job that&rsquo;s perfect for you based on skills
              </p>
            </div>
            <div className="box-swiper mt-50">
              <div className="swiper-container swiper-group-5 swiper">
                <div className="swiper-wrapper pb-50 pt-5">
                  <div className="swiper-slide hover-up">
                    <Slider {...settings}>
                      {skillsList.map((skill, i) => (
                        <div key={i} className="text-center col-md-4 p-2">
                          <Link
                            href={{
                              pathname: "/jobs",
                              query: { search: skill },
                            }}
                          >
                            <div
                              className="item-logo"
                              style={{ cursor: "pointer" }}
                            >
                              <div className="image-left">
                                <Image alt="jobBox" src={marketing} />
                              </div>
                              <div className="text-info-right">
                                <h4>{skill}</h4>

                                {/* <p className="font-xs">
                                  1526<span> Jobs Available</span>
                                </p> */}
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CategorySection;
