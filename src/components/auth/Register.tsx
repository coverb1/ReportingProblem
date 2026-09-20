"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {UserRound,Mail,Lock,Eye,EyeOff, MapPin,ChevronDown,ArrowRight,} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignUpPage() {
  type LocationItem = {
    id: string;
    name: string;
  };

  const [showPassword, setShowPassword] = useState(false);
  const [district, setDistrict] = useState<LocationItem[]>([]);
  const [sectors, setSectors] = useState<LocationItem[]>([]);
  const [village, setVillage] = useState<LocationItem[]>([]);
  const [cells, setCells] = useState<LocationItem[]>([]);

  const [districtId, setDistrictId] = useState("");
  const [sectorsId, setSectorsId] = useState("");
  const [villageId, setVillageId] = useState("");
  const [cellId, setCellId] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const getDistrict = async () => {
      try {
        const responce = await axios.get(
          "http://localhost:3000/location/districts"
        );
        console.log(responce.data);
        setDistrict(responce.data);
      } catch (error) {
        console.log("District", error);
      }
    };

    getDistrict();
  }, []);

  const handleDistrictChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const districtId = e.target.value;

    setDistrictId(districtId);
    setSectorsId("");
    setCellId("");
    setVillageId("");
    setCells([]);
    setVillage([]);

    if (!districtId) {
      setSectors([]);
      return;
    }

    const response = await axios.get(
      `http://localhost:3000/location/districts/${districtId}/sectors`
    );

    setSectors(response.data);
    console.log(response.data);
  };

  const handleSectorsChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const sectorId = e.target.value;

    setSectorsId(sectorId);
    setVillageId("");
    setCellId("");
    setVillage([]);

    if (!sectorId) {
      setCells([]);
      return;
    }

    const response = await axios.get(
      `http://localhost:3000/location/sectors/${sectorId}/cells`
    );

    setCells(response.data);
    console.log("cells:", response.data);
  };

  const handleCellChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const cellId = e.target.value;

    setCellId(cellId);
    setVillageId("");

    if (!cellId) {
      setVillage([]);
      return;
    }

    const response = await axios.get(
      `http://localhost:3000/location/cells/${cellId}/villages`
    );

    setVillage(response.data);
  };

  const handleVilllageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const villageId = e.target.value;
    setVillageId(villageId);
    console.log(villageId);
  };

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/auth/register`,
        {
          name,
          email,
          password: passWord,
          villageId,
        }
      );

      console.log(`Registration successful${response.data}`);

      toast.success("Registration successful!");

      setName("");
      setEmail("");
      setPassWord("");

      setDistrictId("");
      setSectorsId("");
      setCellId("");
      setVillageId("");

      setSectors([]);
      setCells([]);
      setVillage([]);
    } catch (error) {
      toast.error(`Registration failed! ${error}`);
    }
  };

  const selectClass =
    "!m-0 !block !h-12 !w-full !appearance-none !rounded-[var(--radius-md)] !border !border-[var(--border)] !bg-[var(--background)] !px-10 !py-3 !text-sm !font-normal !text-[var(--text-primary)] !outline-none !transition-all focus:!border-[var(--primary)] focus:!ring-2 focus:!ring-[var(--primary-light)]";

  return (
    <main className="!min-h-screen !bg-[var(--background-secondary)] !px-4 !py-8 sm:!px-6 sm:!py-12">
      <div className="!mx-auto !w-full !max-w-[900px]">

        {/* Card */}
        <div className="!w-full !overflow-hidden !rounded-[var(--radius-lg)] !border !border-[var(--border-light)] !bg-[var(--background)] !shadow-sm">

          {/* Card Content */}
          <div className="!p-6 sm:!p-10">

            {/* Header */}
            <div className="!mb-8">
              <h1 className="!m-0 !text-3xl !font-bold !leading-tight !text-[var(--text-primary)] sm:!text-[36px]">
                Create your account
              </h1>

              <p className="!m-0 !mt-2 !text-sm !font-normal !leading-6 !text-[var(--text-secondary)] sm:!text-[15px]">
                Join RCPMS and help make your community better.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleRegister}
              className="!grid !grid-cols-1 !gap-10 md:!grid-cols-2 md:!gap-12"
            >

              {/* Personal Information */}
              <div>
                <h2 className="!mb-6 !mt-0 !text-base !font-bold !text-[var(--text-primary)]">
                  Personal Information
                </h2>

                {/* Full Name */}
                <div className="!mb-5">
                  <label
                    htmlFor="fullName"
                    className="!mb-1.5 !block !text-sm !font-medium !text-[var(--text-primary)]"
                  >
                    Full Name
                  </label>

                  <div className="!relative">
                    <UserRound
                      size={18}
                      strokeWidth={1.8}
                      className="pointer-events-none !absolute !left-3.5 !top-1/2 !z-10 !-translate-y-1/2 !text-[var(--text-muted)]"
                    />

                    <input
                      id="fullName"
                      name="fullName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Enter your full name"
                      autoComplete="name"
                      className="!m-0 !block !h-12 !w-full !rounded-[var(--radius-md)] !border !border-[var(--border)] !bg-[var(--background)] !px-4 !py-3 !pl-11 !text-sm !font-normal !text-[var(--text-primary)] !outline-none !transition-all !placeholder:text-[var(--text-muted)] focus:!border-[var(--primary)] focus:!ring-2 focus:!ring-[var(--primary-light)]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="!mb-5">
                  <label
                    htmlFor="email"
                    className="!mb-1.5 !block !text-sm !font-medium !text-[var(--text-primary)]"
                  >
                    Email
                  </label>

                  <div className="!relative">
                    <Mail
                      size={18}
                      strokeWidth={1.8}
                      className="pointer-events-none !absolute !left-3.5 !top-1/2 !z-10 !-translate-y-1/2 !text-[var(--text-muted)]"
                    />

                    <input
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      autoComplete="email"
                      className="!m-0 !block !h-12 !w-full !rounded-[var(--radius-md)] !border !border-[var(--border)] !bg-[var(--background)] !px-4 !py-3 !pl-11 !text-sm !font-normal !text-[var(--text-primary)] !outline-none !transition-all !placeholder:text-[var(--text-muted)] focus:!border-[var(--primary)] focus:!ring-2 focus:!ring-[var(--primary-light)]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="!mb-1.5 !block !text-sm !font-medium !text-[var(--text-primary)]"
                  >
                    Password
                  </label>

                  <div className="!relative">
                    <Lock
                      size={18}
                      strokeWidth={1.8}
                      className="pointer-events-none !absolute !left-3.5 !top-1/2 !z-10 !-translate-y-1/2 !text-[var(--text-muted)]"
                    />

                    <input
                      id="password"
                      name="password"
                      value={passWord}
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setPassWord(e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="new-password"
                      className="!m-0 !block !h-12 !w-full !rounded-[var(--radius-md)] !border !border-[var(--border)] !bg-[var(--background)] !px-4 !py-3 !pl-11 !pr-12 !text-sm !font-normal !text-[var(--text-primary)] !outline-none !transition-all !placeholder:text-[var(--text-muted)] focus:!border-[var(--primary)] focus:!ring-2 focus:!ring-[var(--primary-light)]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="!absolute !right-3 !top-1/2 !flex !h-8 !w-8 !-translate-y-1/2 !items-center !justify-center !rounded-md !border-0 !bg-transparent !p-0 !text-[var(--text-muted)] !transition-colors hover:!text-[var(--primary)] focus:!outline-none"
                    >
                      {showPassword ? (
                        <EyeOff size={19} strokeWidth={1.8} />
                      ) : (
                        <Eye size={19} strokeWidth={1.8} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div>
                <h2 className="!mb-6 !mt-0 !text-base !font-bold !text-[var(--text-primary)]">
                  Location Information
                </h2>

                {/* District */}
                <div className="!mb-5">
                  <label
                    htmlFor="district"
                    className="!mb-1.5 !block !text-sm !font-medium !text-[var(--text-primary)]"
                  >
                    District
                  </label>

                  <div className="!relative">
                    <MapPin
                      size={18}
                      strokeWidth={1.8}
                      className="pointer-events-none !absolute !left-3.5 !top-1/2 !z-10 !-translate-y-1/2 !text-[var(--text-muted)]"
                    />

                    <select
                      id="district"
                      name="district"
                      value={districtId}
                      onChange={handleDistrictChange}
                      className={selectClass}
                    >
                      <option value="">Select District</option>

                      {district.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={17}
                      strokeWidth={1.8}
                      className="pointer-events-none !absolute !right-3.5 !top-1/2 !-translate-y-1/2 !text-[var(--text-muted)]"
                    />
                  </div>
                </div>

                {/* Sector */}
                <div className="!mb-5">
                  <label
                    htmlFor="sector"
                    className="!mb-1.5 !block !text-sm !font-medium !text-[var(--text-primary)]"
                  >
                    Sector
                  </label>

                  <div className="!relative">
                    <MapPin
                      size={18}
                      strokeWidth={1.8}
                      className="pointer-events-none !absolute !left-3.5 !top-1/2 !z-10 !-translate-y-1/2 !text-[var(--text-muted)]"
                    />

                    <select
                      id="sector"
                      name="sector"
                      value={sectorsId}
                      onChange={handleSectorsChange}
                      disabled={!districtId}
                      className={`${selectClass} disabled:!cursor-not-allowed disabled:!opacity-50`}
                    >
                      <option value="">Select Sector</option>

                      {sectors.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={17}
                      strokeWidth={1.8}
                      className="pointer-events-none !absolute !right-3.5 !top-1/2 !-translate-y-1/2 !text-[var(--text-muted)]"
                    />
                  </div>
                </div>

                {/* Cell */}
                <div className="!mb-5">
                  <label
                    htmlFor="cell"
                    className="!mb-1.5 !block !text-sm !font-medium !text-[var(--text-primary)]"
                  >
                    Cell
                  </label>

                  <div className="!relative">
                    <MapPin
                      size={18}
                      strokeWidth={1.8}
                      className="pointer-events-none !absolute !left-3.5 !top-1/2 !z-10 !-translate-y-1/2 !text-[var(--text-muted)]"
                    />

                    <select
                      id="cell"
                      name="cell"
                      value={cellId}
                      onChange={handleCellChange}
                      disabled={!sectorsId}
                      className={`${selectClass} disabled:!cursor-not-allowed disabled:!opacity-50`}
                    >
                      <option value="">Select Cell</option>

                      {cells.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={17}
                      strokeWidth={1.8}
                      className="pointer-events-none !absolute !right-3.5 !top-1/2 !-translate-y-1/2 !text-[var(--text-muted)]"
                    />
                  </div>
                </div>

                {/* Village */}
                <div>
                  <label
                    htmlFor="village"
                    className="!mb-1.5 !block !text-sm !font-medium !text-[var(--text-primary)]"
                  >
                    Village
                  </label>

                  <div className="!relative">
                    <MapPin
                      size={18}
                      strokeWidth={1.8}
                      className="pointer-events-none !absolute !left-3.5 !top-1/2 !z-10 !-translate-y-1/2 !text-[var(--text-muted)]"
                    />

                    <select
                      value={villageId}
                      onChange={handleVilllageChange}
                      id="village"
                      name="village"
                      disabled={!cellId}
                      className={`${selectClass} disabled:!cursor-not-allowed disabled:!opacity-50`}
                    >
                      <option value="">Select Village</option>

                      {village.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={17}
                      strokeWidth={1.8}
                      className="pointer-events-none !absolute !right-3.5 !top-1/2 !-translate-y-1/2 !text-[var(--text-muted)]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="md:!col-span-2">
                <button
                  type="submit"
                  className="!mt-2 !flex !h-12 !w-full !items-center !justify-center !rounded-[var(--radius-md)] !border-0 !bg-[var(--primary)] !px-5 !py-3 !text-sm !font-semibold !text-white !shadow-none !transition-colors hover:!bg-[var(--primary-dark)] focus:!outline-none focus:!ring-2 focus:!ring-[var(--primary-light)] focus:!ring-offset-2"
                >
                  Create Account

                  <ArrowRight
                    size={18}
                    strokeWidth={2}
                    className="!ml-2"
                  />
                </button>
              </div>
            </form>
          </div>

          {/* Sign In */}
          <div className="!border-t !border-[var(--border-light)] !px-6 !py-5 sm:!px-10">
            <p className="!m-0 !text-center !text-sm !font-normal !text-[var(--text-secondary)]">
              Already have an account?{" "}

              <Link
                href="/auth/login"
                className="!font-bold !text-[var(--primary)] !no-underline hover:!text-[var(--primary-dark)]"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}