// "use client";

// import { Construction, Droplet, Lightbulb, Recycle, Waves, Building2, ArrowRight } from "lucide-react";

// const CATEGORIES = [
//   {
//     icon: Construction,
//     iconColor: "#f97316",
//     tint: "#fef0e5",
//     title: "Road Infrastructure",
//     count: "3,247 reports",
//   },
//   {
//     icon: Droplet,
//     iconColor: "#0ea5e9",
//     tint: "#e6f4fc",
//     title: "Water",
//     count: "2,108 reports",
//   },
//   {
//     icon: Lightbulb,
//     iconColor: "#eab308",
//     tint: "#fdf6e0",
//     title: "Street Lighting",
//     count: "1,456 reports",
//   },
//   {
//     icon: Recycle,
//     iconColor: "var(--primary)",
//     tint: "var(--background-green)",
//     title: "Waste Management",
//     count: "1,893 reports",
//   },
//   {
//     icon: Waves,
//     iconColor: "#6366f1",
//     tint: "#ecebfd",
//     title: "Drainage",
//     count: "987 reports",
//   },
//   {
//     icon: Building2,
//     iconColor: "#d946ef",
//     tint: "#fbe9fc",
//     title: "Public Infrastructure",
//     count: "744 reports",
//   },
// ];

// export default function ProblemCategories() {
//   return (
//     <section style={{ background: "var(--background)", paddingTop: 80, paddingBottom: 90 }}>
//       <div className="container">
//         {/* LABEL */}
//         <div style={{ textAlign: "center" }}>
//           <span
//             style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2px", color: "#b54708" }}
//           >
//             WHAT CAN YOU REPORT?
//           </span>
//         </div>

//         {/* HEADING */}
//         <h2 style={{ textAlign: "center", marginTop: 12, marginBottom: 8 }}>
//           Problem Categories
//         </h2>

//         {/* SUBTEXT */}
//         <p style={{ textAlign: "center", marginBottom: 48 }}>
//           Help us keep our communities clean, safe and beautiful.
//         </p>

//         {/* GRID */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
//             gap: 20,
//           }}
//         >
//           {CATEGORIES.map((cat) => {
//             const Icon = cat.icon;
//             return (
//               <div
//                 key={cat.title}
//                 className="card"
//                 style={{
//                   padding: 24,
//                   textAlign: "center",
//                   cursor: "pointer",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: 56,
//                     height: 56,
//                     borderRadius: "9999px",
//                     backgroundColor: cat.tint,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     marginLeft: "auto",
//                     marginRight: "auto",
//                   }}
//                 >
//                   <Icon size={24} strokeWidth={1.8} color={cat.iconColor} />
//                 </div>

//                 <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginTop: 16 }}>
//                   {cat.title}
//                 </div>

//                 <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
//                   {cat.count}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* VIEW ALL LINK */}
//         <div style={{ textAlign: "center", marginTop: 40 }}>
//           <a
//             href="/categories"
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: 8,
//               fontSize: 13,
//               fontWeight: 700,
//               letterSpacing: "0.5px",
//               textTransform: "uppercase",
//             }}
//           >
//             View All Categories
//             <ArrowRight size={15} />
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }