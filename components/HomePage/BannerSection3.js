import Link from "next/link";
import React from "react";

import CircleMeta from "../Banner/CircleMeta";
import SearchBar from "../Common/SearchBar";

function BannerSection3() {
  const trending = [
    "Designer",
    "Web",
    "IOS",
    "Developer",
    "PHP",
    "Senior",
    "Engineer",
  ];

  return (
    <>
      <section className="section-box top-header-banner">
        <div className="banner-hero hero-1">
          <div className="banner-inner container">
            <div className="row">
              <div className="col-xl-8 col-md-12">
                <div className="block-banner">
                  <p
                    className="text-42 heading-banner wow animate__ animate__fadeInUp animated"
                    style={{
                      visibility: "visible",
                      animationName: "fadeInUp",
                    }}
                  >
                    The <span className="color-brand-2">#1 Job Board</span>
                    <br className="d-none d-lg-block" />
                    for Finding your next job
                  </p>
                  <div
                    className="banner-description mt-20 wow animate__ animate__fadeInUp animated"
                    data-wow-delay=".1s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.1s",
                      animationName: "fadeInUp",
                    }}
                  >
                    <div
                      className="font-lg font-regular text-muted mt-20 wow animate__animated animate__fadeInUp"
                      data-wow-delay=".1s"
                    >
                      Each month, more than 3 million job seekers turn to
                      website in their search for work, making over 140,000
                      applications every single day.
                    </div>
                  </div>
                  <SearchBar />
                  <div
                    className="list-tags-banner mt-60 wow animate__ animate__fadeInUp animated"
                    data-wow-delay=".3s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.3s",
                      animationName: "fadeInUp",
                    }}
                  >
                    <strong>Trending now:</strong>
                    {trending.map((data, index) => {
                      return (
                        <Link
                          passHref
                          href={{
                            pathname: "/jobs",
                            query: { search: data },
                          }}
                          key={index}
                        >
                          <a className="pr-3 text-decoration-none"> {data}</a>
                        </Link>
                      );
                    })}
                    {/* <a href="#">Designer</a>, <a href="#">Web</a>,{" "}
                    <a href="#">IOS</a>, <a href="#">Developer</a>,{" "}
                    <a href="#">PHP</a>, <a href="#">Senior</a>,{" "}
                    <a href="#">Engineer</a> */}
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-12 d-xl-block shape-1 mb-hide">
                <CircleMeta />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BannerSection3;
