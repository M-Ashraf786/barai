"use client";
import Loader from "@/lib/Loader";
import { checkUserAuth, logout } from "@/service/user.service";
import userStore from "@/store/userStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/app/components/Header";

export default function AuthWrapper({ children }) {
  const { setUser, clearUser } = userStore();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isLoginPage = pathname === "/login";

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await checkUserAuth(); // service
        if (result.isAuthenticated) {
          setUser(result?.user);
          setIsAuthenticated(true);
        } else {
          await handleLogout();
        }
      } catch (error) {
        console.error("authenticated failed", error);
        await handleLogout();
      } finally {
        setLoading(false);
      }
    };

    const handleLogout = async () => {
      clearUser();
      setIsAuthenticated(false);
      try {
        await logout();
      } catch (error) {
        console.log("logout failed please try again later", error);
      }
      if (!isLoginPage) {
        router.push("/login");
      }
    };

    if (!isLoginPage) {
      checkAuth(); // service
    } else {
      setLoading(false);
    }
  }, [isLoginPage, router, setUser, clearUser]);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated && !isLoginPage) {
    return <Loader />;
  }

  return (
    <>
      {!isLoginPage && isAuthenticated && <Header />}
      {(isAuthenticated || isLoginPage) && children}
    </>
  );
}
