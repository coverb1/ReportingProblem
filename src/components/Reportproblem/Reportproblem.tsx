"use client";

import { useState, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Home,
  Droplet,
  Lightbulb,
  Recycle,
  Waves,
  Construction,
  Bot,
} from "lucide-react";

type Category = {
  id: string;
  label: string;
  icon: typeof Home;
  iconColor: string;
};

const CATEGORIES: Category[] = [
  { id: "road", label: "Road Infrastructure", icon: Home, iconColor: "#c9822e" },
  { id: "water", label: "Water", icon: Droplet, iconColor: "#5b8fc7" },
  { id: "lighting", label: "Street Lighting", icon: Lightbulb, iconColor: "#b89b3c" },
  { id: "waste", label: "Waste Management", icon: Recycle, iconColor: "#4f9d78" },
  { id: "drainage", label: "Drainage", icon: Waves, iconColor: "#5b8fc7" },
  { id: "public", label: "Public Infrastructure", icon: Construction, iconColor: "#c65d52" },
];

const STEPS = [
  { number: 1, label: "Describe" },
  { number: 2, label: "Location" },
  { number: 3, label: "Review" },
];

const MIN_CHARS_FOR_AI = 30;

export default function ReportProblemForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const charsLeftForAI = Math.max(MIN_CHARS_FOR_AI - description.length, 0);
  const aiActive = description.length >= MIN_CHARS_FOR_AI;

  function handleFile(file: File | null) {
    if (file) setPhotoName(file.name);
  }

  return (
    <div
      style={{
        backgroundColor: "#060d16",
        minHeight: "100vh",
        padding: "32px 32px 80px",
        fontFamily: "'Century Gothic', 'AppleGothic', Arial, sans-serif",
        color: "#f5f7fa",
      }}
    >
      <div style={{ maxWidth: 1200, marginLeft: "auto", marginRight: "auto" }}>
        {/* BACK LINK */}
        <button
          type="button"
          className="flex items-center"
          style={{ gap: 6, fontSize: 13, color: "#08aeea", background: "none", border: "none", cursor: "pointer" }}
        >
          <ArrowLeft size={14} />
          Back
        </button>

        {/* TITLE */}
        <h1 className="font-serif font-bold" style={{ fontSize: 32, marginTop: 16 }}>
          Report a Community Problem
        </h1>
        <p style={{ color: "#5b8fc7", fontSize: 14, marginTop: 8 }}>
          Write freely — AI will classify, prioritize, and route your report automatically.
        </p>

        {/* STEPPER */}
        <div className="flex items-center" style={{ marginTop: 28, marginBottom: 32 }}>
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex items-center">
              <div className="flex items-center" style={{ gap: 10 }}>
                <div
                  className="flex items-center justify-center font-bold"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    fontSize: 13,
                    backgroundColor: step.number === 1 ? "#08aeea" : "transparent",
                    border: step.number === 1 ? "none" : "1px solid #2a3a4c",
                    color: step.number === 1 ? "#ffffff" : "#55708e",
                  }}
                >
                  {step.number}
                </div>
                <span
                  className="font-semibold"
                  style={{ fontSize: 14, color: step.number === 1 ? "#f5f7fa" : "#55708e" }}
                >
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ width: 60, height: 1, backgroundColor: "#1b344b", margin: "0 16px" }} />
              )}
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="flex" style={{ gap: 24, alignItems: "flex-start" }}>
          {/* LEFT COLUMN */}
          <div style={{ flex: 2 }}>
            {/* PROBLEM TITLE */}
            <label className="font-semibold" style={{ fontSize: 14, display: "block", marginBottom: 8 }}>
              Problem Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief summary of the problem"
              className="w-full"
              style={{
                backgroundColor: "#0c1a2a",
                border: "1px solid #1b344b",
                borderRadius: 10,
                padding: "13px 16px",
                fontSize: 14,
                color: "#f5f7fa",
                outline: "none",
              }}
            />

            {/* DESCRIPTION */}
            <div style={{ marginTop: 20 }}>
              <div className="flex items-baseline" style={{ gap: 8, marginBottom: 8 }}>
                <label className="font-semibold" style={{ fontSize: 14 }}>
                  Describe the problem
                </label>
                <span style={{ fontSize: 12, color: "#55708e" }}>AI reads this to classify and prioritize</span>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Example: There is a big hole on the road near the school. It is getting bigger after rain and children might fall..."
                rows={5}
                className="w-full"
                style={{
                  backgroundColor: "#0c1a2a",
                  border: "1px solid #1b344b",
                  borderRadius: 10,
                  padding: "13px 16px",
                  fontSize: 14,
                  color: "#f5f7fa",
                  outline: "none",
                  resize: "vertical",
                  lineHeight: 1.6,
                }}
              />
              <p style={{ fontSize: 12, color: "#55708e", marginTop: 8 }}>
                {description.length} chars ·{" "}
                {aiActive ? "AI analysis active" : `${charsLeftForAI} more to activate AI`}
              </p>
            </div>

            {/* CATEGORY */}
            <div style={{ marginTop: 24 }}>
              <div className="flex items-baseline" style={{ gap: 8, marginBottom: 12 }}>
                <label className="font-semibold" style={{ fontSize: 14 }}>
                  Category
                </label>
                <span style={{ fontSize: 12, color: "#55708e" }}>Optional — AI auto-detects</span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 12,
                }}
              >
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const selected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(selected ? null : cat.id)}
                      className="flex flex-col items-center justify-center transition-colors"
                      style={{
                        backgroundColor: "#0c1a2a",
                        border: selected ? "1px solid #08aeea" : "1px solid #1b344b",
                        borderRadius: 10,
                        padding: "16px 12px",
                        gap: 8,
                        cursor: "pointer",
                      }}
                    >
                      <Icon size={22} color={cat.iconColor} />
                      <span style={{ fontSize: 13, color: "#c3ceda" }}>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* UPLOAD PHOTO */}
            <div style={{ marginTop: 24 }}>
              <label className="font-semibold" style={{ fontSize: 14, display: "block", marginBottom: 12 }}>
                Upload Photo
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleFile(e.dataTransfer.files?.[0] ?? null);
                }}
                className="flex flex-col items-center justify-center"
                style={{
                  border: `1px dashed ${isDragging ? "#08aeea" : "#2a3a4c"}`,
                  borderRadius: 10,
                  padding: "36px 20px",
                  cursor: "pointer",
                  backgroundColor: isDragging ? "#0d1f30" : "transparent",
                  transition: "background-color 0.15s, border-color 0.15s",
                }}
              >
                <Camera size={28} color="#55708e" />
                <p style={{ fontSize: 14, color: "#c3ceda", marginTop: 12 }}>
                  {photoName ? photoName : "Click to upload or drag a photo"}
                </p>
                <p style={{ fontSize: 12, color: "#55708e", marginTop: 4 }}>
                  JPG, PNG, HEIC · max 10MB · AI analyzes image automatically
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/heic"
                onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                style={{ display: "none" }}
              />
            </div>

            {/* PUBLIC TOGGLE */}
            <div
              className="flex items-center justify-between"
              style={{
                marginTop: 20,
                backgroundColor: "#0c1a2a",
                border: "1px solid #1b344b",
                borderRadius: 10,
                padding: "16px 18px",
              }}
            >
              <div>
                <p className="font-semibold" style={{ fontSize: 14 }}>
                  Make this report public
                </p>
                <p style={{ fontSize: 12, color: "#55708e", marginTop: 3 }}>
                  Visible on community map to all citizens
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsPublic((v) => !v)}
                aria-pressed={isPublic}
                style={{
                  width: 44,
                  height: 24,
                  borderRadius: 999,
                  border: "none",
                  backgroundColor: isPublic ? "#4f9d78" : "#2a3a4c",
                  position: "relative",
                  cursor: "pointer",
                  transition: "background-color 0.15s",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 3,
                    left: isPublic ? 23 : 3,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    backgroundColor: "#ffffff",
                    transition: "left 0.15s",
                  }}
                />
              </button>
            </div>

            {/* CONTINUE BUTTON */}
            <button
              type="button"
              className="flex items-center justify-center font-bold w-full transition-colors"
              style={{
                marginTop: 24,
                height: 52,
                borderRadius: 10,
                background: "linear-gradient(90deg, #08aeea 0%, #0798cc 100%)",
                color: "#ffffff",
                fontSize: 15,
                gap: 8,
                border: "none",
                cursor: "pointer",
              }}
            >
              Continue — Set Location
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>
          </div>

          {/* RIGHT: LIVE AI ANALYSIS */}
          <div style={{ flex: 1, position: "sticky", top: 24 }}>
            <div
              className="rounded-[12px] border border-[#1b344b]"
              style={{ backgroundColor: "#0c1a2a", overflow: "hidden" }}
            >
              <div
                className="flex items-center justify-between"
                style={{ padding: "16px 18px", borderBottom: "1px solid #1b344b" }}
              >
                <div className="flex items-center" style={{ gap: 8 }}>
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      backgroundColor: aiActive ? "#4f9d78" : "#55708e",
                    }}
                  />
                  <span className="font-semibold" style={{ fontSize: 14 }}>
                    Live AI Analysis
                  </span>
                </div>
                {!aiActive && (
                  <span style={{ fontSize: 11, color: "#55708e", fontFamily: "monospace" }}>
                    {charsLeftForAI}+ chars to activate
                  </span>
                )}
              </div>

              <div
                className="flex flex-col items-center text-center"
                style={{ padding: "40px 24px" }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    backgroundColor: "#132335",
                    marginBottom: 20,
                  }}
                >
                  <Bot size={28} color="#5b8fc7" />
                </div>
                <p style={{ fontSize: 13, color: "#8a97a8", lineHeight: 1.6 }}>
                  AI instantly classifies category, assigns priority, detects duplicates, and
                  identifies the responsible organization as you type.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}