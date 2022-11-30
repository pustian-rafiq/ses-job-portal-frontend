import Image from "next/image";
import Link from "next/link";
import React from "react";

import fbLogo from "../assets/images/socialLogo/facebookLogo.png";
import whatsappLogo from "../assets/images/socialLogo/whatsAppLogo.png";
import linkedinLogo from "../assets/images/socialLogo/linkedinLogo.png";
import Logo from "../assets/images/logo/logo.png";

function Footer() {
  return (
    <>
      <footer className="footer mt-50 bg-light pt-50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <Link passHref href="/">
                <Image alt="logo" src={Logo} width="200" height="50" />
              </Link>
              <div className="mt-20 mb-20 font-xs color-text-paragraph-2">
                SES Job Portal is a job portal that provides job opportunities
                for job seekers and employers. We are a software technology
                solution and services provider that works with customers and
                partners worldwide. The ideal candidate for this position is
                passionate about driving an issue to resolution and has high
                customer focus.
              </div>
              <div className="footer-social">
                <a
                  className="icon-socials icon-facebook"
                  href="www.facebook.com/ls-jobportal"
                  target="_blank"
                >
                  <Image alt="facebook logo" src={fbLogo} />
                </a>
                <a
                  className="icon-socials icon-whatsapp"
                  href="https://wa.me/8109024500384"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image alt="WhatsApp icon" src={whatsappLogo} />
                </a>
                <a
                  className="icon-socials icon-linkedin"
                  href="www.linkedin.com/ls-jobportal"
                  target="_blank"
                >
                  <Image alt="LinkedIn icon" src={linkedinLogo} />
                </a>
              </div>
            </div>
            <div className="col-4 col-sm-2 col-md-2  col-lg-2">
              <h6 className="mb-20">Resources</h6>
              <ul className="menu-footer">
                <li>
                  <Link passHref href="/about">
                    About us
                  </Link>
                </li>
                <li>
                  <Link passHref href="#">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link passHref href="#">
                    Products
                  </Link>
                </li>
                <li>
                  <Link passHref href="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-4 col-sm-2 col-md-2 col-lg-2">
              <h6 className="mb-20">Community</h6>
              <ul className="menu-footer">
                <li>
                  <Link passHref href="#">
                    Feature
                  </Link>
                </li>
                <li>
                  <Link passHref href="#">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link passHref href="#">
                    Credit
                  </Link>
                </li>
                <li>
                  <Link passHref href="#">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-4 col-sm-2 col-md-2 col-lg-2">
              <h6 className="mb-20">More</h6>
              <ul className="menu-footer">
                <li>
                  <Link passHref href="#">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link passHref href="#">
                    Help
                  </Link>
                </li>
                <li>
                  <Link passHref href="#">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link passHref href="#">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom mt-50">
            <div className="row">
              <div className="col-12 col-md-6 ">
                <span className="font-xs color-text-paragraph">
                  Copyright &copy; 2022. SES Job Portal all right reserved
                </span>
              </div>
              <div className="col-12 col-md-6  ">
                <div className="footer-social">
                  <ul className="d-flex justify-content-end footer-privacy">
                    <li className="mr-10">
                      <Link
                        passHref
                        style={{ paddingRight: "10px" }}
                        className="font-xs   color-text-paragraph"
                        href="#"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li className="mr-10">
                      <Link
                        passHref
                        style={{ paddingRight: "10px" }}
                        className="font-xs bg-primary color-text-paragraph"
                        href="#"
                      >
                        Terms &amp; Conditions
                      </Link>
                    </li>
                    <li>
                      <Link
                        passHref
                        style={{ paddingRight: "10px" }}
                        className="font-xs bg-primary color-text-paragraph"
                        href="#"
                      >
                        Security
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
