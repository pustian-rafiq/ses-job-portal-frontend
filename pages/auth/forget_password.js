import { useContext, useState } from "react";
import React from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { appContext } from "../_app";
import { FaSpinner } from "react-icons/fa";
import publicApi from "../../services/publicApi";
import AuthLayout from "../../Layouts/AuthLayout";

function Forget_password() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const value = useContext(appContext);

  const [input, setInput] = useState({
    email: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setInput({ ...input, [e.target.name]: e.target.value, error_list: [] });
  };

  const inputSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      email: input.email,
    };

    const response = await publicApi.post('candidate/auth/forgot-password',data);

    // console.log('resend res', response)
    if (response.data.status) {
      setLoading(false);
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
      });
      router.push("/auth/reset_password");
    } else {
      setInput({
        ...input,
        error_list: response.data.errors,
      });
      setLoading(false);
    }
  };

  return (
    <main className="main">
      <section className="pt-50 login-register">
        <div className="container">
          <div className="row login-register-cover">
            <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
              <div className="text-center">
                <h2 className="mt-10 mb-5 text-brand-1">Forget Password</h2>
                <h6>Send Verification code to Reset Password</h6>
              </div>
              <form
                className="login-register text-start mt-20"
                onSubmit={inputSubmit}
              >
                <div className="form-group">
                  <label className="form-label" htmlFor="input-1">
                    Your Email address *
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    onChange={handleInput}
                    value={input.email}
                    required
                  />
                  <b className="text-danger ">{input.error_list.email}</b>
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
                      Send
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* <div className="img-2"><Image src="assets/imgs/page/login-register/img-3.svg" width="16" height="40" alt="JobBox"/></div> */}
          </div>
        </div>
      </section>
    </main>
  );
}

Forget_password.Layout = AuthLayout;

export default Forget_password;
