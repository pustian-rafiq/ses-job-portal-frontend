import axios from "axios";
import { useEffect, useState } from "react";
import MasterLayout from "../../Layouts/MasterLayout";
import OtpInput from "react-otp-input";
import { FaCentercode, FaSpinner } from "react-icons/fa";
import AuthService from "../../services/auth/AuthService";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import AuthLayout from "../../Layouts/AuthLayout";
import OtpTimer from "otp-timer";
import Timer from "otp-timer";
import moment from "moment/moment";
import { useRef } from "react";

function Otp() {
  const [loading, setLoading] = useState("");
  const [timer, setTimer] = useState(0);
  const [code, setCode] = useState("");
  const [minute, setMinute] = useState("__");
  const [second, setSecond] = useState("__");
  const [flag, setFlag] = useState(true);

  const router = useRouter();

  const interval = useRef();

  const handleChange = (code) => setCode(code);

  const otpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      otp: code,
    };

    const response = await AuthService.otp(data);

    // console.log(response);

    if (response) {
      setLoading(false);
      if (response.data.status) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
        });
        localStorage.removeItem("otp_time");
        router.push("/profile");
      } else {
        toast.warning(response.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
        });
      }
    }
  };

  const timerHandler = (date) => {
    const countDownDate = new Date(date).getTime();

    clearInterval(interval.current);

    interval.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 3) {
        setFlag(false);
        setMinute("00");
        setSecond("00");
        clearInterval(interval.current);
      }

      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      setMinute(minutes);

      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setSecond(seconds);
    }, 1000);
  };

  const resendOtp = async (e) => {
    e.preventDefault();

    setCode("");

    const response = await AuthService.resendOtp();

    // console.log(response);
    clearInterval(interval.current);
    setMinute("__");
    setSecond("__");

    const date = new Date();
    date.setMinutes(date.getMinutes() + 5);
    localStorage.setItem("otp_time", date);
    setFlag(true);

    timerHandler(date);

    if (response.data.status) {
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(response.data.message, {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      date = new Date();
      date.setMinutes(date.getMinutes() + response.data.data);
      localStorage.setItem("otp_time", date);
      // setFlag(true);
      timerHandler(date);
    }
  };

  const compared = moment(localStorage.getItem("otp_time")).format(
    "LL HH:mm:ss"
  );

  useEffect(() => {
    // setFlag(false);
    timerHandler(localStorage.getItem("otp_time"));
  }, []);

  return (
    <main className="main">
      <section className="pt-50 login-register">
        <div className="container">
          <div className="row login-register-cover">
            <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
              <div className="text-center">
                <h2 className="mt-10 mb-5 text-brand-1">Verify by OTP</h2>

                {flag && (
                  <>
                    <b>OTP has been sent to your email</b>
                    <h6>
                      Please try within: {minute < 10 && 0}
                      {minute}: {second < 10 && 0}
                      {second}
                    </h6>
                  </>
                )}
              </div>

              {flag ? (
                <form
                  onSubmit={otpSubmit}
                  className="login-register text-start mt-20"
                >
                  <div className="form-group">
                    <OtpInput
                      value={code}
                      onChange={handleChange}
                      numInputs={6}
                      separator={<span style={{ width: "8px" }}></span>}
                      isInputNum={true}
                      shouldAutoFocus={true}
                      inputStyle={{
                        border: "1px solid transparent",
                        borderRadius: "8px",
                        width: "50px",
                        height: "51px",
                        fontSize: "22px",
                        color: "#000",
                        fontWeight: "400",
                        caretColor: "blue",
                        background: "#cfcfcf",
                        textAlign: "inherit!important",
                      }}
                      focusStyle={{
                        border: "1px solid #CFD3DB",
                        // outline: "2px solid blue"
                      }}
                    />
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
                        Submit
                      </button>
                    )}
                  </div>
                </form>
              ) : (
                <div>
                  <h6 className="text-danger text-center py-3">
                    Time is Over, Please Try Again!
                  </h6>
                  <button
                    className=" btn-brand-1 hover-up w-100"
                    onClick={resendOtp}
                  >
                    Resend OTP
                  </button>
                </div>
              )}
            </div>

            {/* <div className="img-2"><Image src="assets/imgs/page/login-register/img-3.svg" width="16" height="40" alt="JobBox"/></div> */}
          </div>
        </div>
      </section>
    </main>
  );
}

Otp.Layout = AuthLayout;

export default Otp;
