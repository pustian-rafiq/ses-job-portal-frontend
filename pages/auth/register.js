import Link from "next/link";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { appContext } from "../_app";
import { FaSpinner } from "react-icons/fa";

import AuthService from "../../services/auth/AuthService";
import AuthLayout from "../../Layouts/AuthLayout";

function Register() {
  const router = useRouter();
  const value = useContext(appContext);

  const [loading, setLoading] = useState(false);
  const [changeIcon, setChange] = useState(false);
  const [changIcon1, setChangeIcon1] = useState(false);
  const [confirmPassAlert, setConfirmPassAlert] = useState(false);
  const [customStyle, setCustomStyle] = useState(false);

  function handleChangeIcon() {
    setChange(!changeIcon);
  }

  function handleChangeIcon1() {
    setChangeIcon1(!changIcon1);
  }

  const [registerInput, setRegister] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    setCustomStyle(true);
    const { name, value } = e.target;
    setRegister((prev) => {
      return { ...prev, [name]: value, error_list: [] };
    });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      first_name: registerInput.first_name,
      last_name: registerInput.last_name,
      email: registerInput.email,
      phone: registerInput.phone,
      password: registerInput.password,
      password_confirmation: registerInput.confirm_password,
    };

    if (registerInput.password !== registerInput.confirm_password) {
      setConfirmPassAlert(true);
      setLoading(false);
      setRegister((prev) => {
        return { ...prev, password: "", confirm_password: "" };
      });
    } else {
      setConfirmPassAlert(false);

      const response = await AuthService.register(data);

      if (response.status === 200) {
        toast.success("Registration Successfull!", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
        });
        value.setUserData(response.data.data);
        setLoading(false);

        const date = new Date();
        date.setMinutes(date.getMinutes() + 5);
        localStorage.setItem("otp_time", date);

        router.push("/auth/otp");
      } else {
        setRegister({
          ...registerInput,
          password: "",
          error_list: response.response.data.errors,
        });
        setLoading(false);
      }

      // axios.get("/sanctum/csrf-cookie").then((response) => {
      //   axios.post(`/api/candidate/auth/register`, data).then((res) => {
      //     localStorage.setItem("auth_token", res.data.api_token);
      //     localStorage.setItem("user_data", JSON.stringify(res.data.data));
      //     toast.success('Registration Successfull!', {
      //       position: "top-right",
      //       autoClose: 500,
      //       hideProgressBar: true,
      //       closeOnClick: true,
      //       });
      //       value.setUserData(res.data.data);
      //     router.push('/profile');
      //   }).catch((err) => {
      //     setRegister({ ...registerInput, error_list: err.response.data.errors });
      //     setLoading(false);
      //     setRegister((prev) => {
      //       return { ...prev, password: "", confirm_password: "" };
      //     });
      //   });
      // });
    }
  };

  return (
    <main className="main">
      <section className="pt-30 login-register">
        <div className="container">
          <div className="">
            <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
              <div className="text-center">
                <p className="font-sm text-brand-2">
                  First step of finding your desire job
                </p>
                <h2 className="mt-10 mb-5 text-brand-1">Register</h2>
              </div>
              <form
                onSubmit={registerSubmit}
                className="login-register text-start mt-20"
              >
                <div className="form-group">
                  <label className="form-label" htmlFor="input-1">
                    First Name <span className="required">*</span>
                  </label>
                  <input
                    className={`${
                      registerInput.error_list.first_name && "is-invalid"
                    } form-control`}
                    id="first_name"
                    type="text"
                    name="first_name"
                    onChange={handleInput}
                    value={registerInput.first_name}
                    placeholder="First Name..."
                  />
                  <p className="text-danger ">
                    {registerInput.error_list.first_name}
                  </p>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Last Name <span className="required">*</span>
                  </label>
                  <input
                    className={`${
                      registerInput.error_list.last_name && "is-invalid"
                    } form-control`}
                    id="last_name"
                    type="text"
                    name="last_name"
                    onChange={handleInput}
                    value={registerInput.last_name}
                    placeholder="Last Name..."
                  />
                  <p className="text-danger ">
                    {registerInput.error_list.last_name}
                  </p>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="input-2">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    className={`${
                      registerInput.error_list.email && "is-invalid"
                    } form-control`}
                    id="email"
                    type="email"
                    name="email"
                    onChange={handleInput}
                    value={registerInput.email}
                    placeholder="Email..."
                  />
                  <p className="text-danger ">
                    {registerInput.error_list.email}
                  </p>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="input-2">
                    Phone <span className="required">*</span>
                  </label>
                  <input
                    className={`${
                      registerInput.error_list.phone && "is-invalid"
                    } form-control`}
                    id="phone"
                    type="text"
                    name="phone"
                    onChange={handleInput}
                    value={registerInput.phone}
                    placeholder="Phone..."
                  />
                  <p className="text-danger ">
                    {registerInput.error_list.phone}
                  </p>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="input-4">
                    Password <span className="required">*</span>
                  </label>
                  <input
                    className={`${
                      registerInput.error_list.password && "is-invalid"
                    } form-control`}
                    id="password"
                    type="password"
                    name="password"
                    onChange={handleInput}
                    value={registerInput.password}
                    placeholder="Password"
                  />
                  <p className="text-danger ">
                    {registerInput.error_list.password}
                  </p>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="input-5">
                    Re-Password <span className="required">*</span>
                  </label>
                  <input
                    className={`${
                      confirmPassAlert && "is-invalid"
                    } form-control`}
                    id="rePassword"
                    type="password"
                    onChange={handleInput}
                    name="confirm_password"
                    value={registerInput.confirm_password}
                    onClick={() => {
                      setCustomStyle(true);
                    }}
                    placeholder="Re-enter Password..."
                  />
                  {confirmPassAlert ? (
                    <p className="text-danger">Password Mismatched!</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="login_footer form-group d-flex justify-content-between">
                  <label className="cb-container">
                    <input type="checkbox" />
                    <span className="text-small">
                      Agree our terms and policy
                    </span>
                    <span className="checkmark"></span>
                  </label>
                  <a className="text-muted" href="page-contact.html">
                    Lean more
                  </a>
                </div>

                <div className="form-group">
                  {loading ? (
                    <button
                      className="btn-brand-1 hover-up w-100"
                      type="submit"
                      disabled
                    >
                      <FaSpinner icon="spinner" className="spinner" /> &nbsp;
                      Loading...
                    </button>
                  ) : (
                    <button
                      className="btn-brand-1 hover-up w-100"
                      type="submit"
                    >
                      Submit &amp; Register
                    </button>
                  )}
                </div>
                <div className="text-muted text-center">
                  Already have an account?{" "}
                  <Link href="/auth/login">
                    <a href="page-signin.html">Sign in</a>
                  </Link>
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
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

Register.Layout = AuthLayout;

export default Register;
