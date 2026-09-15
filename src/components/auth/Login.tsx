// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import {
//   Lock,
//   Mail,
//   Eye,
//   EyeOff,
//   ArrowRight,
// } from "lucide-react";

// export default function SignInPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     setError("");
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     console.log({
//       ...formData,
//       rememberMe,
//     });

//     // Connect login API here
//   };

//   return (
//     <main className="min-h-screen bg-[var(--background-secondary)] px-4 py-8 sm:px-6 sm:py-12">
//       <div className="mx-auto w-full max-w-[560px]">

//         {/* Logo */}
//         <Link
//           href="/"
//           className="mx-auto mb-7 flex w-fit items-center gap-2.5"
//         >
//           <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary)] text-2xl font-bold text-white">
//             R
//           </span>

//           <span className="text-2xl font-extrabold text-[var(--text-primary)]">
//             RCPMS
//           </span>
//         </Link>

//         {/* Card */}
//         <div className="card overflow-hidden">

//           {/* Card Content */}
//           <div className="p-6 sm:p-10">

//             {/* Header */}
//             <div className="mb-8">

//               <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary-light)] text-[var(--primary)]">
//                 <Lock
//                   size={26}
//                   strokeWidth={1.8}
//                 />
//               </div>

//               <h1 className="text-3xl font-bold sm:text-[36px]">
//                 Welcome back
//               </h1>

//               <p className="mt-2 max-w-[460px] text-sm sm:text-[15px]">
//                 Sign in to your account to continue reporting
//                 and tracking community problems.
//               </p>

//             </div>

//             {/* Error */}
//             {error && (
//               <div className="mb-5 rounded-[var(--radius-md)] border border-[#fecdca] bg-[#fef3f2] px-4 py-3 text-sm text-[var(--danger)]">
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>

//               {/* Email */}
//               <div className="mb-5">

//                 <label htmlFor="email">
//                   Email
//                 </label>

//                 <div className="relative mt-1.5">

//                   <Mail
//                     size={19}
//                     strokeWidth={1.8}
//                     className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-[var(--text-muted)]"
//                   />

//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     placeholder="Enter your email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     autoComplete="email"
//                     required
//                     className="!pl-11"
//                   />

//                 </div>

//               </div>

//               {/* Password */}
//               <div className="mb-5">

//                 <label htmlFor="password">
//                   Password
//                 </label>

//                 <div className="relative mt-1.5">

//                   <Lock
//                     size={19}
//                     strokeWidth={1.8}
//                     className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-[var(--text-muted)]"
//                   />

//                   <input
//                     id="password"
//                     name="password"
//                     type={
//                       showPassword
//                         ? "text"
//                         : "password"
//                     }
//                     placeholder="Enter your password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     autoComplete="current-password"
//                     required
//                     className="!pl-11 !pr-12"
//                   />

//                   <button
//                     type="button"
//                     onClick={() =>
//                       setShowPassword(!showPassword)
//                     }
//                     aria-label={
//                       showPassword
//                         ? "Hide password"
//                         : "Show password"
//                     }
//                     className="absolute right-0 top-0 flex h-full w-12 items-center justify-center border-0 bg-transparent text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
//                   >
//                     {showPassword ? (
//                       <EyeOff size={19} />
//                     ) : (
//                       <Eye size={19} />
//                     )}
//                   </button>

//                 </div>

//               </div>

//               {/* Remember / Forgot */}
//               <div className="mb-6 flex items-center justify-between gap-4">

//                 <label className="!mb-0 flex items-center gap-2 !text-sm !font-normal !text-[var(--text-secondary)]">

//                   <input
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={(e) =>
//                       setRememberMe(e.target.checked)
//                     }
//                     className="!m-0 !h-[17px] !w-[17px] !cursor-pointer !rounded !border-[var(--border)] !p-0 accent-[var(--primary)]"
//                   />

//                   <span>
//                     Remember me
//                   </span>

//                 </label>

//                 <Link
//                   href="/forgot-password"
//                   className="text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-dark)]"
//                 >
//                   Forgot password?
//                 </Link>

//               </div>

//               {/* Sign In */}
//               <button
//                 type="submit"
//                 className="btn-primary w-full"
//               >
//                 Sign In

//                 <ArrowRight
//                   size={19}
//                   strokeWidth={2}
//                   className="ml-2"
//                 />
//               </button>

//             </form>

//           </div>

//           {/* Bottom */}
//           <div className="border-t border-[var(--border-light)] px-6 py-5 sm:px-10">

//             <p className="text-center text-sm text-[var(--text-secondary)]">
//               Don't have an account?{" "}

//               <Link
//                 href="/signup"
//                 className="font-bold text-[var(--primary)] hover:text-[var(--primary-dark)]"
//               >
//                 Sign Up
//               </Link>
//             </p>

//           </div>

//         </div>

//       </div>
//     </main>
//   );
// }