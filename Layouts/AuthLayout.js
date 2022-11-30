// import { useAuth } from '@/hooks/auth'
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getToken } from "../services/auth/token";
import ProfileSkeleton from "../components/ProfilePage/ProfileSkeleton";

const AuthLayout = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (getToken()) {
      axios
        .get("candidate/auth/me")
        .then((res) => {
          if (res.data.data.redirect) {
            // toast.warning(
            //   "You are Logged in, But your account is not verified yet!",
            //   {
            //     position: "top-right",
            //     autoClose: 1000,
            //     hideProgressBar: true,
            //     closeOnClick: true,
            //   }
            // );
            setLoading(false);
            router.push("/auth/otp");
          } else {
            router.push("/profile");
          }
        })
        .catch((error) => {
          if (error.response.status !== 409) throw error;
          router.push("/auth/login");
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {loading ? (
          <ProfileSkeleton/>
      ) : (
        children
      )}
      <Footer />
    </div>
  );
};

export default AuthLayout;
