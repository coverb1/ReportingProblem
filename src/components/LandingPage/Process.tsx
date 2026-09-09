// "use client";

// import { PenLine, Bot, Landmark, UserCheck, CheckCircle2 } from "lucide-react";

// const STEPS = [
//   {
//     number: 1,
//     icon: PenLine,
//     color: "#08aeea",
//     tint: "#e7f6fd",
//     title: "Citizen Reports",
//     description:
//       "Describe in your own words. Upload a photo, share location. No technical knowledge needed.",
//   },
//   {
//     number: 2,
//     icon: Bot,
//     color: "#8b5cf6",
//     tint: "#f1ecfe",
//     title: "AI Analyzes",
//     description:
//       "Classifies category, sets priority, detects duplicates, assesses risk — in seconds.",
//   },
//   {
//     number: 3,
//     icon: Landmark,
//     color: "#f59e0b",
//     tint: "#fef3e2",
//     title: "Auto-Routed",
//     description:
//       "AI identifies the responsible organization and routes the report immediately.",
//   },
//   {
//     number: 4,
//     icon: UserCheck,
//     color: "#f97316",
//     tint: "#fef0e5",
//     title: "Team Acts",
//     description:
//       "Staff accepts and a technician is dispatched. Progress tracked in real-time.",
//   },
//   {
//     number: 5,
//     icon: CheckCircle2,
//     color: "var(--primary)",
//     tint: "var(--background-green)",
//     title: "Resolved",
//     description:
//       "Citizen confirms the fix. Report closed. Your community measurably improves.",
//   },
// ];

// export default function Process() {
//   return (
//     <section style={{ background: "var(--background-secondary)", paddingTop: 80, paddingBottom: 90 }}>
//       <div className="container">
//         {/* LABEL */}
//         <div style={{ textAlign: "center" }}>
//           <span
//             className="text-primary"
//             style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2px" }}
//           >
//             THE PROCESS
//           </span>
//         </div>

//         {/* HEADING */}
//         <h2 style={{ textAlign: "center", marginTop: 12, marginBottom: 56 }}>
//           From report to resolution
//         </h2>

//         {/* STEPS ROW */}
//         <div style={{ position: "relative", display: "flex", justifyContent: "space-between" }}>
//           {/* CONNECTING DOTTED LINE */}
//           <div
//             style={{
//               position: "absolute",
//               top: 36,
//               left: 44,
//               right: 44,
//               height: 0,
//               borderTop: "2px dotted var(--border)",
//               zIndex: 0,
//             }}
//           />

//           {STEPS.map((step) => {
//             const Icon = step.icon;
//             return (
//               <div
//                 key={step.number}
//                 style={{
//                   position: "relative",
//                   zIndex: 1,
//                   width: 200,
//                   textAlign: "center",
//                 }}
//               >
//                 {/* ICON CIRCLE */}
//                 <div
//                   style={{
//                     width: 72,
//                     height: 72,
//                     marginLeft: "auto",
//                     marginRight: "auto",
//                     borderRadius: "9999px",
//                     backgroundColor: step.tint,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Icon size={28} strokeWidth={1.8} color={step.color} />
//                 </div>

//                 {/* NUMBER + TITLE */}
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     gap: 8,
//                     marginTop: 18,
//                   }}
//                 >
//                   <span
//                     style={{
//                       width: 20,
//                       height: 20,
//                       flexShrink: 0,
//                       borderRadius: "9999px",
//                       backgroundColor: step.color,
//                       color: "#ffffff",
//                       fontSize: 11,
//                       fontWeight: 700,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     {step.number}
//                   </span>
//                   <span style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>
//                     {step.title}
//                   </span>
//                 </div>

//                 {/* DESCRIPTION */}
//                 <p style={{ fontSize: 13, lineHeight: 1.55, marginTop: 8 }}>
//                   {step.description}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }