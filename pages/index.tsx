import Head from "next/head";
import Sidebar from "../components/common/Sidebar/Sidebar";
import Navbar from "../components/common/Navbar/Navbar";
import MyFiles from "../components/MyFiles";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { authActions, authSelector } from "../store/authSlice";
import { useEffect, useCallback } from "react";
import SignIn from "./auth/signin";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  // callback function to check if user is authenticated
  const checkAuth = useCallback(() => {
    const sessionUser = JSON.parse(sessionStorage?.getItem("user") || "{}");
    if (sessionUser.id) dispatch(authActions.persistedLogin(sessionUser));
  }, [isAuthenticated]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!isAuthenticated && router.pathname !== "/auth/signin") {
    return <SignIn />;
  }
  return (
    <>
      <Head>
        <title>Sam's Drive</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex bg-slate-100">
        <Sidebar />
        <section className="flex-1">
          {/* create a simple nav */}
          <Navbar />
          <MyFiles />
        </section>
      </main>
    </>
  );
}
