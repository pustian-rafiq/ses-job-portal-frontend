import Image from "next/image";
import React, { useEffect,useState } from "react";
import Meta from "../components/Meta/Meta";

import MasterLayout from "../Layouts/MasterLayout";
import contactIllustrator from "../public/images/contact-us-ils.svg";
import Logo from "../assets/images/logo/logo.png";
import Link from "next/link";

const Contact = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    setCategories()
   })

   
  return (
    <>
      <Meta title="Contact | SES Job portal" />
      <main className="name">
        <section className="section-box mt-50 mb-50">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mb-40">
                <span className="font-md color-brand-2 mt-20 d-inline-block">
                  Contact us
                </span>
                <h2 className="mt-5 mb-10">Get in touch</h2>
                <p className="font-md color-text-paragraph-2">
                  The right move at the right time saves your investment. live
                  <br className="d-none d-lg-block" /> the dream of expanding
                  your business.
                </p>
                <form
                  className="contact-form-style mt-30"
                  id="contact-form"
                  action="#"
                  method="post"
                >
                  <div
                    className="row wow animate__ animate__fadeInUp animated"
                    data-wow-delay=".1s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.1s",
                      animationName: "fadeInUp",
                    }}
                  >
                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="name"
                          placeholder="Enter your name"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="company"
                          placeholder="Comapy (optioanl)"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="email"
                          placeholder="Your email"
                          type="email"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="phone"
                          placeholder="Phone number"
                          type="tel"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <div className="textarea-style mb-30">
                        <textarea
                          className="font-sm color-text-paragraph-2"
                          name="message"
                          placeholder="Tell us about yourself"
                        ></textarea>
                      </div>
                      <button
                        className="submit btn btn-send-message"
                        type="submit"
                      >
                        Send message
                      </button>
                      <label className="ml-20">
                        <input
                          className="float-start mr-5 mt-6"
                          type="checkbox"
                        />{" "}
                        By clicking contact us button, you agree our terms and
                        policy,
                      </label>
                    </div>
                  </div>
                </form>
                <p className="form-messege"></p>
              </div>
              <div className="col-lg-4 text-center d-none d-lg-block shape-1 mt-50">
                <Image src={contactIllustrator} alt="contact" />
              </div>
            </div>
          </div>
        </section>
        <section className="section-box mt-50 mb-50">
          <div className="container">
            <div className="box-info-contact">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12 mb-30">
                  <Link href="/">
                    <Image alt="logo" src={Logo} />
                  </Link>
                  <div className="font-sm color-text-paragraph mt-10">
                    5F, Akasaka Dai-ichi Bldg., 4-9-17 Akasaka, Minato-ku,
                    Tokyo, 107-0052, Japan
                    <br /> Phone:{" "}
                    <a href="tel:+81 03-3401-8901">+81 03-3401-8901</a>
                    <br /> Email:{" "}
                    <a href="mailto: bangla@linkstaff.co.jp">
                      bangla@linkstaff.co.jp
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 mb-30">
                  <h6>Osaka</h6>
                  <p className="font-sm color-text-paragraph mb-20">
                    2118 Thornridge Cir. Syracuse,
                    <br className="d-none d-lg-block" /> Connecticut 35624
                  </p>
                  <h6>Fukuoka</h6>
                  <p className="font-sm color-text-paragraph mb-20">
                    4517 Washington Ave.
                    <br className="d-none d-lg-block" /> Manchester, Kentucky
                    39495
                  </p>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 mb-30">
                  <h6>Kobe</h6>
                  <p className="font-sm color-text-paragraph mb-20">
                    3891 Ranchview Dr. Richardson,
                    <br className="d-none d-lg-block" /> California 62639
                  </p>
                  <h6>Hirushima</h6>
                  <p className="font-sm color-text-paragraph mb-20">
                    4140 Parker Rd. Allentown,
                    <br className="d-none d-lg-block" /> New Mexico 31134
                  </p>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 mb-30">
                  <h6>Sendai</h6>
                  <p className="font-sm color-text-paragraph mb-20">
                    3891 Ranchview Dr. Richardson,
                    <br className="d-none d-lg-block" /> California 62639
                  </p>
                  <h6>Dhaka</h6>
                  <p className="font-sm color-text-paragraph mb-20">
                    4140 Parker Rd. Allentown,
                    <br className="d-none d-lg-block" /> Gulshan 1
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="contact-map-section">
          <div className="outer-container">
            <div className="map-boxed">
              <div className="map-outer">
                <iframe src="https://maps.google.com/maps?q=akasaka%20&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=&amp;output=embed"></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

Contact.Layout = MasterLayout;

export default Contact;
