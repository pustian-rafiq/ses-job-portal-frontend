import Link from "next/link";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { appContext } from "../_app";
import { FaSpinner } from "react-icons/fa";

import AuthLayout from "../../Layouts/AuthLayout";
import publicApi from "../../services/publicApi";

function ResetPassword() {
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

  const [passInput, setRegister] = useState({
    token: "",
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

  const PasswordSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      token: passInput.token,
      password: passInput.password,
      password_confirmation: passInput.confirm_password,
    };

    if (passInput.password !== passInput.confirm_password) {
      setConfirmPassAlert(true);
      setLoading(false);
      setRegister((prev) => {
        return { ...prev, password: "", confirm_password: "" };
      });
    } else {
      setConfirmPassAlert(false);

      const response =await publicApi.post("candidate/auth/password-reset",data);

      console.log('reset', response)

      if (response.status === 200) {
        toast.success("Password Reset Successfull!", {
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

        router.push("/profile");
      } else {
        setRegister({
          ...passInput,
          password: "",
          error_list: response.data.errors,
        });
        setLoading(false);
      }
    }
  };

  return (
    <main className="main">
      <section className="pt-30 login-register">
        <div className="container">
          <div className="">
            <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
              <div className="text-center">
                <h2 className="mt-10 mb-5 text-brand-1">Reset Password</h2>
              </div>
              <form
                onSubmit={PasswordSubmit}
                className="login-register text-start mt-20"
              >

                <div className="form-group">
                  <label className="form-label" htmlFor="input-2">
                    Token <span className="required">*</span>
                  </label>
                  <input
                    className={`${
                      passInput.error_list.token && "is-invalid"
                    } form-control`}
                    id="token"
                    type="text"
                    name="token"
                    onChange={handleInput}
                    value={passInput.token}
                    placeholder="Token..."
                  />
                  <p className="text-danger ">
                    {passInput.error_list.token}
                  </p>
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="input-4">
                    Password <span className="required">*</span>
                  </label>
                  <input
                    className={`${
                      passInput.error_list.password && "is-invalid"
                    } form-control`}
                    id="password"
                    type="password"
                    name="password"
                    onChange={handleInput}
                    value={passInput.password}
                    placeholder="Password"
                  />
                  <p className="text-danger ">
                    {passInput.error_list.password}
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
                    value={passInput.confirm_password}
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
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

ResetPassword.Layout = AuthLayout;

export default ResetPassword;
