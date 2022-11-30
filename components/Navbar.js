import { useContext, useState } from "react";
import Link from "next/link";

import { useRouter } from "next/router";
import { Modal, Button } from "react-bootstrap";
import Headroom from "react-headroom";
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";

import { appContext } from "../pages/_app";
import AuthService from "../services/auth/AuthService";

import Image from "next/image";
import logo from "../assets/images/logo/logo.png";

const Navbar = () => {
  const router = useRouter();
  const value = useContext(appContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const currentRoute = router.pathname;

  // console.log(currentRoute)

  const confirm_modal = () => {
    console.log("modal is working ...");
    setShow(false);
  };

  const logoutController = async (e) => {
    e.preventDefault();

    const response = await AuthService.logout();

    router.push("/");

    if (response.status === 200) {
      value.setUserData([]);
      value.setToken(null);
    }
  };

  return (
    <Headroom>
      <nav className="header navbar sticky-top navbar-expand-lg navbar-light navbar-fixed-top bg-light shadow-sm">
        <div className="container">
          <Link passHref href="/">
            <a>
              <Image className="logo-nav" src={logo} alt="logo" />
            </a>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 main-menu text-center">
              <li className="nav-item">
                <Link passHref href="/">
                  <a
                    className={`nav-link ${
                      router.asPath === "/" ? "active" : ""
                    }`}
                  >
                    Home
                  </a>
                </Link>
              </li>

              <li className="nav-item">
                <Link passHref href="/jobs">
                  <a
                    className={`nav-link ${
                      currentRoute === "/jobs" ? "active" : ""
                    }`}
                  >
                    Jobs
                  </a>
                </Link>
                {/* <ul>
                  <li>
                    <a href="index.html">Job type 1</a>
                  </li>
                  <li>
                    <a href="index-2.html">Job type 2</a>
                  </li>
                  <li>
                    <a href="index-3.html">Job type 3</a>
                  </li>
                </ul> */}
              </li>
              <li className="nav-item">
                <Link passHref href="/profile">
                  <a
                    className={`nav-link ${
                      router.asPath === "/profile" ? "active" : ""
                    }`}
                  >
                    Profile
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link passHref href="/contact">
                  <a
                    className={`nav-link ${
                      router.asPath === "/contact" ? "active" : ""
                    }`}
                  >
                    Contact
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link passHref href="/about">
                  <a
                    className={`nav-link ${
                      router.asPath === "/about" ? "active" : ""
                    }`}
                  >
                    About Us
                  </a>
                </Link>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" onClick={handleShow} href="#">
                  {" "}
                  Modal
                </a>
              </li> */}
            </ul>
            {/* <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}

            <ul className="d-flex navbar-nav mb-2 mb-lg-0">
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Language
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      English
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Japanese
                    </a>
                  </li>
                </ul>
              </li> */}

              {value.userData?.name ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-center"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {value.userData.name}
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link passHref href="/profile">
                        <a className="dropdown-item">
                          <FaUserAlt /> Profile
                        </a>
                      </Link>
                    </li>
                    <li onClick={logoutController} className="link">
                      <a className="dropdown-item">
                        <FaSignOutAlt /> Logout
                      </a>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item mb-hide">
                    <Link passHref href="/auth/register">
                      <a
                        type="button"
                        className="btn btn-outline-primary btn-shadow mx-2 hover-up"
                      >
                        Register
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item mb-hide">
                    <Link passHref href="/auth/login">
                      <a className="btn btn-default btn-shadow mx-2 hover-up">
                        Login
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item row d-flex text-center pc-hide">
                  {/* <hr/> */}
                    <div className="col-6">
                      <Link passHref href="/auth/register">
                        <a
                          type="button"
                          className="btn btn-outline-primary btn-shadow mx-2 hover-up"
                        >
                          Register
                        </a>
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link passHref href="/auth/login">
                        <a className="btn btn-default btn-shadow mx-2 hover-up">
                          Login
                        </a>
                      </Link>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Modal show={show} onHide={handleClose} keyboard="false">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure You Want This!.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={confirm_modal}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Headroom>
  );
};

export default Navbar;
