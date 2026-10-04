"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  Check,
  ChevronRight,
  Droplets,
  FileText,
  Lightbulb,
  MapPin,
  MessageSquare,
  Recycle,
  Road,
  Send,
  Trash2,
  Waves,
} from "lucide-react";

type Category = {
  name: string;
  icon: React.ReactNode;
};

const categories: Category[] = [
  {
    name: "Roads",
    icon: <Road size={20} strokeWidth={1.8} />,
  },
  {
    name: "Water",
    icon: <Droplets size={20} strokeWidth={1.8} />,
  },
  {
    name: "Street Lighting",
    icon: <Lightbulb size={20} strokeWidth={1.8} />,
  },
  {
    name: "Waste",
    icon: <Recycle size={20} strokeWidth={1.8} />,
  },
  {
    name: "Drainage",
    icon: <Waves size={20} strokeWidth={1.8} />,
  },
  {
    name: "Public Infrastructure",
    icon: <Trash2 size={20} strokeWidth={1.8} />,
  },
];

export default function ReportProblemPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [specificLocation, setSpecificLocation] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [photo, setPhoto] = useState<File | null>(null);

  const handlePhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0] ?? null;
    setPhoto(file);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    // Backend submission will be connected later.
    console.log({
      title,
      description,
      category,
      specificLocation,
      isPublic,
      photo,
    });
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--background-secondary)",
        paddingBottom: 80,
      }}
    >
      {/* =====================================================
          HEADER
      ====================================================== */}
      <div
        style={{
          borderBottom: "1px solid var(--border-light)",
          background: "var(--card)",
        }}
      >
        <div
          className="container"
          style={{
            minHeight: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              color: "var(--text-secondary)",
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={17} />
            Back to home
          </Link>

          <div
            style={{
              color: "var(--primary)",
              fontSize: 21,
              fontWeight: 800,
              letterSpacing: "-0.4px",
            }}
          >
            RCPMS
          </div>
        </div>
      </div>

      {/* =====================================================
          PAGE CONTENT
      ====================================================== */}
      <div
        className="container"
        style={{
          maxWidth: 980,
          paddingTop: 52,
        }}
      >
        {/* PAGE INTRO */}
        <div
          style={{
            maxWidth: 680,
            marginBottom: 34,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              color: "var(--primary)",
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 13,
            }}
          >
            <MessageSquare size={16} />
            Community report
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.12,
              letterSpacing: "-0.035em",
            }}
          >
            Report a problem
          </h1>

          <p
            style={{
              marginTop: 13,
              marginBottom: 0,
              maxWidth: 620,
              fontSize: 16,
              lineHeight: 1.7,
              color: "var(--text-secondary)",
            }}
          >
            Tell us what is happening in your community. Your
            report will be sent to the local authority responsible
            for your area.
          </p>
        </div>

        <form>
          {/* =====================================================
              PROBLEM DETAILS
          ====================================================== */}
          <section
            className="card"
            style={{
              padding: 30,
              marginBottom: 20,
            }}
          >
            {/* SECTION HEADER */}
            <div
              style={{
                marginBottom: 28,
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 20,
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                }}
              >
                What is the problem?
              </h2>

              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: 13,
                  color: "var(--text-muted)",
                }}
              >
                Give us a short description of the issue.
              </p>
            </div>

            {/* TITLE */}
            <div style={{ marginBottom: 23 }}>
              <label htmlFor="title">
                Problem title
                <span
                
                >
                  
                </span>
              </label>

              <input
                id="title"
                name="title"
                type="text"
                placeholder="For example: Broken street light"
                value={title}onChange={(event) =>setTitle(event.target.value)
                }
                required
                style={{
                  outline: "none",
                  boxShadow: "none",
                }}
                onBlur={(event) => {
                  event.currentTarget.style.borderColor =
                    "var(--border)";
                  event.currentTarget.style.boxShadow =
                    "none";
                }}
              />
            </div>

            {/* DESCRIPTION */}
            <div style={{ marginBottom: 27 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  marginBottom: 6,
                }}
              >
                <label
                  htmlFor="description"
                  style={{
                    marginBottom: 0,
                  }}
                >
                  Description
                </label>

                <span
                  style={{
                    fontSize: 12,
                    color: "var(--text-muted)",
                  }}
                >
                  {/* {description.length}/500 */}
                </span>
              </div>

              <textarea
                id="description"
                name="description"
                rows={5}
                maxLength={500}
                placeholder="Explain what happened, where it happened, and how it is affecting the community..."
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                required
                style={{
                  resize: "vertical",
                  minHeight: 130,
                  lineHeight: 1.6,
                  outline: "none",
                  boxShadow: "none",
                }}
                
                onBlur={(event) => {
                  event.currentTarget.style.borderColor =
                    "var(--border)";
                  event.currentTarget.style.boxShadow =
                    "none";
                }}
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label style={{ marginBottom: 10 }}>
                Category
                <span
                  style={{
                    color: "#b42318",
                    marginLeft: 4,
                  }}
                >
                  *
                </span>
              </label>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(145px, 1fr))",
                  gap: 10,
                }}
              >
                {categories.map((item) => {
                  const selected =
                    category === item.name;

                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() =>
                        setCategory(item.name)
                      }
                      style={{
                        minHeight: 76,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        padding: "12px 10px",
                        borderRadius:
                          "var(--radius-md)",
                        border: selected
                          ? "1px solid var(--primary)"
                          : "1px solid var(--border)",
                        background: selected
                          ? "var(--primary-light)"
                          : "var(--card)",
                        color: selected
                          ? "var(--primary)"
                          : "var(--text-secondary)",
                        fontFamily: "inherit",
                        fontSize: 13,
                        fontWeight: selected
                          ? 600
                          : 500,
                        cursor: "pointer",
                        outline: "none",
                        boxShadow: "none",
                        transition:
                          "all 0.18s ease",
                      }}
                    >
                      {item.icon}

                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* =====================================================
              LOCATION
          ====================================================== */}
          <section
            className="card"
            style={{
              padding: 30,
              marginBottom: 20,
            }}
          >
            {/* SECTION HEADER */}
            <div
              style={{
                marginBottom: 28,
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 20,
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                }}
              >
                Where is the problem?
              </h2>

              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: 13,
                  color: "var(--text-muted)",
                }}
              >
                Your registered location is used automatically.
              </p>
            </div>

            {/* REGISTERED LOCATION */}
            <div
              style={{
                padding: 18,
                borderRadius: "var(--radius-md)",
                background: "var(--background-secondary)",
                border: "1px solid var(--border-light)",
                marginBottom: 22,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  marginBottom: 14,
                  color: "var(--text-primary)",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                <MapPin
                  size={17}
                  color="var(--primary)"
                />

                Your registered location
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 7,
                  fontSize: 14,
                  color: "var(--text-secondary)",
                }}
              >
                <span>Gasabo</span>

                <ChevronRight
                  size={15}
                  color="var(--text-muted)"
                />

                <span>Ndera</span>

                <ChevronRight
                  size={15}
                  color="var(--text-muted)"
                />

                <span>Bwiza</span>

                <ChevronRight
                  size={15}
                  color="var(--text-muted)"
                />

                <strong
                  style={{
                    color: "var(--text-primary)",
                  }}
                >
                  Ruhangare
                </strong>
              </div>
            </div>

            {/* SPECIFIC LOCATION */}
            <div>
              <label htmlFor="specificLocation">
                More specific location

                <span
                  style={{
                    marginLeft: 6,
                    fontSize: 12,
                    fontWeight: 400,
                    color: "var(--text-muted)",
                  }}
                >
                  Optional
                </span>
              </label>

              <div
                style={{
                  position: "relative",
                }}
              >
                <MapPin
                  size={17}
                  style={{
                    position: "absolute",
                    left: 14,
                    top: 14,
                    color: "var(--text-muted)",
                  }}
                />

                <input
                  id="specificLocation"
                  name="specificLocation"
                  type="text"
                  placeholder="Example: Near the primary school"
                  value={specificLocation}
                  onChange={(event) =>
                    setSpecificLocation(
                      event.target.value,
                    )
                  }
                  style={{
                    paddingLeft: 42,
                    outline: "none",
                    boxShadow: "none",
                  }}
                  
                  onBlur={(event) => {
                    event.currentTarget.style.borderColor =
                      "var(--border)";
                    event.currentTarget.style.boxShadow =
                      "none";
                  }}
                />
              </div>

              <p
                style={{
                  marginTop: 7,
                  marginBottom: 0,
                  fontSize: 12,
                  color: "var(--text-muted)",
                }}
              >
                Add a nearby landmark to help the responsible
                team find the problem easily.
              </p>
            </div>
          </section>

          {/* =====================================================
              PHOTO
          ====================================================== */}
          <section
            className="card"
            style={{
              padding: 30,
              marginBottom: 20,
            }}
          >
            {/* SECTION HEADER */}
            <div
              style={{
                marginBottom: 25,
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 20,
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                }}
              >
                Add a photo
              </h2>

              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: 13,
                  color: "var(--text-muted)",
                }}
              >
                A photo can help us understand the problem better.
              </p>
            </div>

            <label
              htmlFor="photo"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 190,
                padding: 25,
                borderRadius: "var(--radius-lg)",
                border: "1.5px dashed var(--border)",
                background: "var(--background-secondary)",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 14,
                  background: "var(--primary-light)",
                  color: "var(--primary)",
                  marginBottom: 13,
                }}
              >
                <Camera size={22} />
              </div>

              <span
                style={{
                  color: "var(--text-primary)",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {photo
                  ? photo.name
                  : "Choose a photo"}
              </span>

              <span
                style={{
                  marginTop: 6,
                  color: "var(--text-muted)",
                  fontSize: 12,
                }}
              >
                JPG, PNG or HEIC · Maximum 10MB
              </span>

              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/jpeg,image/png,image/heic"
                onChange={handlePhotoChange}
                style={{
                  display: "none",
                }}
              />
            </label>
          </section>

          {/* =====================================================
              PUBLIC REPORT
          ====================================================== */}
          <section
            className="card"
            style={{
              padding: "20px 22px",
              marginBottom: 28,
            }}
          >
            <button
              type="button"
              onClick={() =>
                setIsPublic((previous) => !previous)
              }
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
                border: "none",
                background: "transparent",
                padding: 0,
                textAlign: "left",
                fontFamily: "inherit",
                cursor: "pointer",
                outline: "none",
                boxShadow: "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 13,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 11,
                    background:
                      "var(--background-secondary)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <FileText size={18} />
                </div>

                <div>
                  <div
                    style={{
                      color: "var(--text-primary)",
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    Make this report public
                  </div>

                  <div
                    style={{
                      marginTop: 3,
                      color: "var(--text-muted)",
                      fontSize: 12,
                    }}
                  >
                    Allow other citizens to see this report
                  </div>
                </div>
              </div>

              {/* SWITCH */}
              <div
                style={{
                  width: 46,
                  height: 26,
                  flexShrink: 0,
                  padding: 3,
                  borderRadius: 999,
                  background: isPublic
                    ? "var(--primary)"
                    : "#cbd5e1",
                  transition:
                    "background-color 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#ffffff",
                    transform: isPublic
                      ? "translateX(20px)"
                      : "translateX(0)",
                    transition:
                      "transform 0.2s ease",
                    boxShadow:
                      "0 1px 3px rgba(0,0,0,0.15)",
                  }}
                />
              </div>
            </button>
          </section>

          {/* =====================================================
              BOTTOM ACTIONS
          ====================================================== */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                color: "var(--text-muted)",
                fontSize: 12,
              }}
            >
              <Check
                size={15}
                color="var(--primary)"
              />

              You can track your report after submitting
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={
                !title ||
                !description ||
                !category
              }
              style={{
                minHeight: 48,
                padding: "0 22px",
                gap: 9,
                outline: "none",
              }}
            >
              Submit Report
              <Send size={17} />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}