import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { ADMIN_ROUTE } from "../../utilities/constants";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const isAdmin = router.route === ADMIN_ROUTE;

  return (
    <>
      <Head>
        <title>Ju Cakes</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!isAdmin && <Navbar />}
      <main className="main">{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
};

export default Layout;
