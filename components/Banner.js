import React from "react";

import Carousel from 'react-bootstrap/Carousel';

import banner1 from "../public/banner/evgeny-yundin-iCbBwKuv22Y-unsplash.jpg";
import banner2 from "../public/banner/bike2.jpg";
import Image from "next/image";

function Banner() {
  return (
    <div>
      <Carousel fade pause={false}>
      <Carousel.Item interval={2000}>
        <Image
          layout="responsive"
          className="d-block w-100"
          src={banner1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <Image
          layout="responsive"
          className="d-block w-100"
          src={banner2}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default Banner;
