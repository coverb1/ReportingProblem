"use client";
import { Camera, Droplets, Lightbulb, MapPin, Recycle, Road, Send, Trash2, Waves, } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Category = {
  name: string;
  value: string;
  icon: React.ReactNode;
};

const categories: Category[] = [
  {
    name: "Roads",
    value: "ROADS",
    icon: <Road size={20} strokeWidth={1.8} />,
  },
  {
    name: "Water",
    value: "WATER",
    icon: <Droplets size={20} strokeWidth={1.8} />,
  },
  {
    name: "Street Lighting",
    value: "STREET_LIGHTING",
    icon: <Lightbulb size={20} strokeWidth={1.8} />,
  },
  {
    name: "Waste",
    value: "WASTE",
    icon: <Recycle size={20} strokeWidth={1.8} />,
  },
  {
    name: "Drainage",
    value: "DRAINAGE",
    icon: <Waves size={20} strokeWidth={1.8} />,
  },
  {
    name: "Public Infrastructure",
    value: "PUBLIC_INFRASTRUCTURE",
    icon: <Trash2 size={20} strokeWidth={1.8} />,
  },
];

type UserLocation = {
  district: string;
  sector: string;
  cell: string;
  village: string;
};

function getLocationName(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object" && "name" in value) {
    const name = (value as { name?: unknown }).name;
    return typeof name === "string" ? name : "";
  }

  return "";
}

export default function ReportProblemPage() {
  const router = useRouter();

  const photoInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [specificLocation, setSpecificLocation] = useState("");
  const [isPublic] = useState(true);

  const [file, setfile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [token, setToken] = useState<string | null>(null);

  const [user, setUser] = useState<UserLocation>({
    district: "",
    sector: "",
    cell: "",
    village: "",
  });

  const [loadingUser, setLoadingUser] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Create and clean up the image preview URL.
  useEffect(() => {
    if (!file) {
      setPhotoPreview(null);
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setPhotoPreview(imageUrl);

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [file]);

  // Get the login token and current user's location.
  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      router.push("/auth/login/");
      setLoadingUser(false);
      return;
    }

    setToken(savedToken);

    const getCurrentUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/auth/me",
          {
            headers: {
              Authorization: `Bearer ${savedToken}`,
            },
          }
        );

        console.log("Current user:", response.data);

        setUser({
          district: getLocationName(response.data.district),
          sector: getLocationName(response.data.sector),
          cell: getLocationName(response.data.cell),
          village: getLocationName(response.data.village),
        });
      } catch (error) {
        console.error("Failed to get current user:", error);

        setErrorMessage(
          "Could not load your registered location."
        );
      } finally {
        setLoadingUser(false);
      }
    };

    getCurrentUser();
  }, [router]);

  // Select and validate the image.
  const handlePhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] ?? null;

    setErrorMessage("");
    setSuccessMessage("");

    if (!file) {
      setfile(null);
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrorMessage(
        "Please choose a JPG, PNG, or WebP image."
      );

      event.target.value = "";
      setfile(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage(
        "The image must be 10MB or smaller."
      );

      event.target.value = "";
      setfile(null);
      return;
    }

    setfile(file);
  };

  // Remove the selected image.
  const handleRemovePhoto = () => {
    setfile(null);

    if (photoInputRef.current) {
      photoInputRef.current.value = "";
    }

    setErrorMessage("");
    setSuccessMessage("");
  };

  // Submit the report to NestJS.
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!token) {
      setErrorMessage(
        "Please log in before submitting a report."
      );

      router.push("/auth/login/");
      return;
    }

    if (!title.trim() || !description.trim()) {
      setErrorMessage(
        "Please enter a title and description."
      );
      return;
    }

    if (!selectedCategory) {
      setErrorMessage("Please select a category.");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("category", selectedCategory);
      formData.append(
        "specificLocation",
        specificLocation.trim()
      );
      formData.append("isPublic", String(isPublic));

      // Send the actual image file to the backend.
      if (file) {
        formData.append("file", file);
      }

      const response = await axios.post(
        "http://localhost:3000/report-problem/ReportProblem",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Report created:", response.data);

      setSuccessMessage(
        "Your report was submitted successfully!"
      );

      setTitle("");
      setDescription("");
      setSelectedCategory("");
      setSpecificLocation("");
      setfile(null);

      if (photoInputRef.current) {
        photoInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Failed to submit report:", error);

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        setErrorMessage(
          Array.isArray(message)
            ? message.join(", ")
            : typeof message === "string"
              ? message
              : "Failed to submit your report. Please try again."
        );
      } else {
        setErrorMessage(
          "Something went wrong. Please try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--background-secondary)",
        paddingBottom: 80,
      }}
    >
      <div
        className="container"
        style={{ maxWidth: 980, paddingTop: 52 }}
      >
        {/* PAGE INTRO */}
        <div style={{ maxWidth: 680, marginBottom: 34 }}>
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

        <form onSubmit={handleSubmit}>
          {/* PROBLEM DETAILS */}
          <section
            className="card"
            style={{ padding: 30, marginBottom: 20 }}
          >
            <div style={{ marginBottom: 28 }}>
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
              <label htmlFor="title">Problem title</label>

              <input
                id="title"
                name="title"
                type="text"
                required
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                placeholder="For example: Broken street light"
                style={{
                  outline: "none",
                  boxShadow: "none",
                }}
              />
            </div>

            {/* DESCRIPTION */}
            <div style={{ marginBottom: 27 }}>
              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows={5}
                maxLength={500}
                required
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="Explain what happened, where it happened, and how it affects the community..."
                style={{
                  resize: "vertical",
                  minHeight: 130,
                  lineHeight: 1.6,
                  outline: "none",
                  boxShadow: "none",
                }}
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: 10,
                }}
              >
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
                {categories.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() =>
                      setSelectedCategory(item.value)
                    }
                    aria-pressed={
                      selectedCategory === item.value
                    }
                    style={{
                      minHeight: 76,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      padding: "12px 10px",
                      borderRadius: "var(--radius-md)",
                      border:
                        selectedCategory === item.value
                          ? "2px solid var(--primary)"
                          : "1px solid var(--border)",
                      background:
                        selectedCategory === item.value
                          ? "var(--background-secondary)"
                          : "var(--card)",
                      cursor: "pointer",
                    }}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* LOCATION */}
          <section
            className="card"
            style={{ padding: 30, marginBottom: 20 }}
          >
            <div style={{ marginBottom: 28 }}>
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
                Your registered location is loaded from your
                account.
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
                  fontSize: 14,
                  color: "var(--text-secondary)",
                }}
              >
                {loadingUser
                  ? "Loading your location..."
                  : [
                    user.district,
                    user.sector,
                    user.cell,
                    user.village,
                  ]
                    .filter(Boolean)
                    .join(", ") ||
                  "Location not available"}
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

              <div style={{ position: "relative" }}>
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
                  value={specificLocation}
                  onChange={(event) =>
                    setSpecificLocation(event.target.value)
                  }
                  placeholder="Example: Near the primary school"
                  style={{
                    paddingLeft: 42,
                    outline: "none",
                    boxShadow: "none",
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
                team find the problem.
              </p>
            </div>
          </section>

          {/* PHOTO */}
          <section
            className="card"
            style={{ padding: 30, marginBottom: 20 }}
          >
            <div style={{ marginBottom: 25 }}>
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

            {/* IMAGE UPLOAD AREA */}
            <label
              htmlFor="file"
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
                {file ? "Choose another photo" : "Choose a photo"}
              </span>

              <span
                style={{
                  marginTop: 6,
                  color: "var(--text-muted)",
                  fontSize: 12,
                }}
              >
                JPG, PNG or WebP · Maximum 10MB
              </span>

              <input
                ref={photoInputRef}
                id="file"
                name="photo"
                type="file"
                onChange={handlePhotoChange}
                accept="image/jpeg,image/png,image/webp"
                style={{ display: "none" }}
              />
            </label>

            {/* IMAGE PREVIEW - OUTSIDE THE LABEL */}
            {photoPreview && (
              <div
                style={{
                  marginTop: 20,
                  padding: 15,
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <p
                  style={{
                    marginTop: 0,
                    marginBottom: 12,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Image preview
                </p>

                <img
                  src={photoPreview}
                  alt="Preview of the selected problem"
                  style={{
                    display: "block",
                    width: "100%",
                    maxWidth: 500,
                    maxHeight: 300,
                    objectFit: "contain",
                    borderRadius: 10,
                    margin: "0 auto",
                  }}
                />

                <p
                  style={{
                    marginTop: 12,
                    marginBottom: 12,
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    overflowWrap: "anywhere",
                  }}
                >
                  Selected image: {file?.name}
                </p>

                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  style={{
                    padding: "9px 14px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                    color: "#b42318",
                    cursor: "pointer",
                  }}
                >
                  Remove photo
                </button>
              </div>
            )}
          </section>

          {/* MESSAGES */}
          {errorMessage && (
            <p
              role="alert"
              style={{
                color: "#b42318",
                marginBottom: 16,
              }}
            >
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p
              role="status"
              style={{
                color: "green",
                marginBottom: 16,
              }}
            >
              {successMessage}
            </p>
          )}

          {/* SUBMIT */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <button
              type="submit"
              disabled={submitting || loadingUser}
              className="btn-primary"
              style={{
                minHeight: 48,
                padding: "0 22px",
                gap: 9,
                outline: "none",
                opacity:
                  submitting || loadingUser ? 0.6 : 1,
                cursor:
                  submitting || loadingUser
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {submitting ? "Submitting..." : "Submit Report"}
              <Send size={17} />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
