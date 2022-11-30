// import { useAuth } from '@/hooks/auth'
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfileSkeleton from "../components/ProfilePage/ProfileSkeleton";
import { appContext } from "../pages/_app";
import { destroyToken, getToken } from "../services/auth/token";
import privateApi from "../services/privateApi";

const PrivateLayout = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const value = useContext(appContext);

  useEffect(() => {

    const fetchData = async () => {
      const response = await privateApi.get(`candidate/auth/me`);

      if (response.status === 200 && response.data.data.redirect) {
        router.push("/auth/otp");
      } else if (response.status === 200 && !response.data.data.redirect) {
        setLoading(false);
      } else if (response.status === 401) {
        destroyToken();
        value.setUserData([]);
        value.setToken(null);
        router.push("/auth/login");
      } else {
        router.push("/");
      }
    }

    if (getToken()) {
      fetchData();
    } else {
      router.push("/auth/login");
    }
  }, []);

 

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {loading ? <ProfileSkeleton /> : children}
      <Footer />
    </div>
  );
};

export default PrivateLayout;
