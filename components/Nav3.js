
import React, { useState, useContext } from 'react'

import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaBars } from 'react-icons/fa';

import { appContext } from '../pages/_app';

function Nav3() {
    const router = useRouter();
    const value = useContext(appContext);

    const [toggle, setToggle] = useState(false);
  function toggleSideBar() {
    setToggle(!toggle);
  }

  // close sidebar on click outside
//   document.body.onclick = function(e) {
//     console.log(e.clientX);
//     if (e.clientX > window.innerWidth * 0.8) {
//       setToggle(false);
//     }
//   };

  return (
    <header>
    <FaBars onClick={toggleSideBar} className="bar" />
    <div className="logo">Portfolio</div>
    <nav className={toggle ? "sidebar" : ""}>
    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 main-menu">
              <li className="nav-item">
                <Link href="/">
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
                <Link href="/jobs">
                  <a
                    className={`nav-link ${
                      router.asPath === "/jobs" ? "active" : ""
                    }`}
                  >
                    Jobs
                  </a>
                </Link>
                <ul>
                  <li>
                    <a href="index.html">Job type 1</a>
                  </li>
                  <li>
                    <a href="index-2.html">Job type 2</a>
                  </li>
                  <li>
                    <a href="index-3.html">Job type 3</a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link href="/profile">
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
                <Link href="/contact">
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
                <Link href="/about">
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
                    className="nav-link dropdown-toggle"
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
                      <Link href="/profile">
                        <a className="dropdown-item">Profile</a>
                      </Link>
                    </li>
                    <li onClick={logoutController} className="link">
                      <a className="dropdown-item">Logout</a>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link href="/auth/register">
                      <a
                        type="button"
                        className="btn btn-outline-primary btn-shadow mx-2 hover-up"
                      >
                        Register
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link href="/auth/login">
                      <a className="btn btn-default btn-shadow mx-2 hover-up">
                        Login
                      </a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
    </nav>
  </header>
  )
}

export default Nav3