import axios from "axios";
import { useContext, useState } from "react";
import Link from "next/link";
import React from "react";
import MasterLayout from "../../Layouts/MasterLayout";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { appContext } from "../_app";
import { FaSpinner } from "react-icons/fa";
import AuthService from "../../services/auth/AuthService";
import AuthLayout from "../../Layouts/AuthLayout";

function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const value = useContext(appContext);

  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setLogin({
      ...loginInput,
      [e.target.name]: e.target.value,
      error_list: [],
    });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };

    const response = await AuthService.login(data);
    if (response.status === 200) {
      value.setUserData(response.data.data);
      value.setToken(response.data.api_token);
      setLoading(false);
      if (response.data.redirect) {
        toast.warning("Your account is not verified yet!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
        });
        router.push("/auth/otp");
      } else {
        toast.success("Logged in Successfully!", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
        });
        router.push("/profile");
      }
    } else {
      setLogin({
        ...loginInput,
        password: "",
        error_list: response.response.data.errors,
      });
      setLoading(false);
    }
  };

  return (
    <main className="main">
      <section className="pt-30">
          <div className="container">
            <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
              <div className="text-center">
                <h2 className="mt-10 mb-5 text-brand-1">Login</h2>
              </div>
              <form
                className="login-register text-start mt-20"
                onSubmit={loginSubmit}
              >
                <div className="form-group">
                  <label className="form-label" htmlFor="input-1">
                    Username or Email address{" "}
                    <span className="required">*</span>
                  </label>

                  <input
                    type="text"
                    className={`${
                      loginInput.error_list?.email && "is-invalid"
                    } form-control`}
                    name="email"
                    onChange={handleInput}
                    value={loginInput.email}
                  />
                  <b className="text-danger ">{loginInput.error_list?.email}</b>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="input-4">
                    Password <span className="required">*</span>
                  </label>

                  <input
                    type="password"
                    className={`${
                      loginInput.error_list?.password && "is-invalid"
                    } form-control`}
                    name="password"
                    onChange={handleInput}
                    value={loginInput.password}
                  />
                  <b className="text-danger ">
                    {loginInput.error_list?.password}
                  </b>
                </div>
                <div className="login_footer form-group d-flex justify-content-between">
                  <label className="cb-container">
                    <input type="checkbox" />
                    <span className="text-small">Remember me</span>
                    <span className="checkmark"></span>
                  </label>
                  <Link href="/auth/forget_password">
                    <a className="text-muted">Forgot Password</a>
                  </Link>
                </div>

                <div className="form-group">
                  {loading ? (
                    <button
                      className=" btn-brand-1 hover-up w-100"
                      disabled
                      type="submit"
                    >
                      <FaSpinner icon="spinner" className="spinner" /> &nbsp;
                      Loading...
                    </button>
                  ) : (
                    <button
                      className=" btn-brand-1 hover-up w-100"
                      type="submit"
                    >
                      Login
                    </button>
                  )}
                </div>
                <div className="divider-text-center">
                  <span>Or</span>
                </div>
                {/* <button
                  type="button"
                  className="login-with-google-btn sso-login-btn"
                >
                  Sign in with Google
                </button> */}
                <button
                  type="button"
                  className="login-with-line-btn sso-login-btn"
                >
                  Sign in with Line
                </button>
                <div className="text-muted text-center">
                  Dont have an Account?{" "}
                  <Link href="/auth/register">
                    <a href="page-signin.html">Sign up</a>
                  </Link>
                </div>
              </form>
            </div>
            {/* <div className="img-2"><Image src="assets/imgs/page/login-register/img-3.svg" width="16" height="40" alt="JobBox"/></div> */}
          </div>
      </section>
    </main>
  );
}

Login.Layout = AuthLayout;

export default Login;
