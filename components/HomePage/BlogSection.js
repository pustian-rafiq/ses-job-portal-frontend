import Image from "next/image";
import React from "react";
import Slider from "react-slick";

import image1 from "../../assets/imgs/page/homepage1/img-news1.png";
import user1 from "../../assets/imgs/page/homepage1/user1.png";

function BlogSection() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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

  return (
    <section className="section-box mt-10 mb-10">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
            News and Blog
          </h2>
          <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">
            Get the latest news, updates and tips
          </p>
        </div>
      </div>
      <div className="container">
        <div className="mt-50">
          <div className="box-swiper style-nav-top">
            <div className="swiper-container swiper-group-3 swiper">
              <div className="swiper-wrapper pb-70 pt-5">
                <Slider {...settings}>
                  {[...Array(10)].map((x, i) => (
                    <div className="swiper-slide px-2" key={i}>
                      <div className="card-grid-3 hover-up wow animate__animated animate__fadeIn">
                        <div className="text-center card-grid-3-image">
                          <a href="#">
                            <figure>
                              <Image alt="jobBox" src={image1} />
                            </figure>
                          </a>
                        </div>
                        <div className="card-block-info">
                          <div className="tags mb-15">
                            <a className="btn btn-tag" href="blog-grid.html">
                              News
                            </a>
                          </div>
                          <h5>
                            <a href="blog-details.html">
                              21 Job Interview Tips: How To Make a Great
                              Impression
                            </a>
                          </h5>
                          <p className="mt-10 color-text-paragraph font-sm">
                            Our mission is to create the world&amp;rsquo;s most
                            sustainable healthcare company by creating
                            high-quality healthcare products in iconic,
                            sustainable packaging.
                          </p>
                          <div className="card-2-bottom mt-20">
                            <div className="row">
                              <div className="col-lg-6 col-6">
                                <div className="d-flex">
                                  <Image
                                    className="img-rounded"
                                    src={user1}
                                    alt="jobBox"
                                  />
                                  <div className="info-right-img">
                                    <span className="font-sm font-bold color-brand-1 op-70">
                                      Sarah Harding
                                    </span>
                                    <br />
                                    <span className="font-xs color-text-paragraph-2">
                                      06 September
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6 text-end col-6 pt-15">
                                <span className="color-text-paragraph-2 font-xs">
                                  8 mins to read
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
