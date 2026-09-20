import type { Metadata } from "next";
import "./globals.css";
import navbar from "./NavBar/page";
import Navbar from "../components/LandingPage/Navbar";
import Footer from "../components/LandingPage/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "RCMS",
  description: "Community Reporting Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastContainer/>
        <Navbar/>
        {/* <Footer/> */}
        <main style={{paddingTop:72}}>{children}</main>
        </body>
    </html>
  );
}