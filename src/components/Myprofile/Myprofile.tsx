"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { UserRound, ShieldCheck, MapPin, Pencil, Camera, ChevronRight, LockKeyhole, Trash2, Mail, Phone, MapPinned, X, Check, } from "lucide-react";
import "./profile.css";
import { toast } from "react-toastify";
import axios from "axios";

type ProfileTab = "profile" | "location" | "security";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("profile");
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingLocation, setEditingLocation] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null)

    // Sample frontend data. Connect these values to the backend later.
    ;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [sector, setSector] = useState("");
  const [cell, setCell] = useState("");
  const [village, setVillage] = useState("");
  const [profileImage, setProfileImage] = useState("")
  const [popUpImage, setPopUpImage] = useState(false)

  const fullName = name.trim();
  const initials = fullName.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "U";

  const tabs = [
    { id: "profile" as const, label: "My Profile", icon: UserRound },
    { id: "location" as const, label: "My Location", icon: MapPin },
    { id: "security" as const, label: "Security", icon: ShieldCheck },
  ];
  const locationText = [village, cell, sector, district]
    .filter(Boolean).join(", ") || "Location not provided";

  const renderValue = (label: string, value: string, icon?: React.ReactNode) => (
    <div className="profile-value" key={label}>
      <span className="profile-field-label">{label}</span>
      <span className="profile-field-value">
        {icon}
        {value || "Not provided"}
      </span>
    </div>
  );

  useEffect(() => {
    try {
      async function getMyProfile() {
        const token = localStorage.getItem("token")
        if (!token) {
          toast.error("Your imformation not found")
          return
        }
        const response = await axios.get("http://localhost:3000/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        setName(response.data.name)
        setEmail(response.data.email)
        setPhone(response.data.phone)
        setDistrict(response.data.district)
        setSector(response.data.sector)
        setCell(response.data.cell)
        setVillage(response.data.village)
        console.log(response.data)
      }
      getMyProfile()
    } catch (error) {
      //   toast.error(error)  
      console.log(error)
    }
  }, [])

  return (
    <main className="profile-page">
      <div className="container profile-container">
        <header className="profile-page-header">
          <h1>Account Settings</h1>
          <p>Manage your personal information and account preferences.</p>
        </header>

        <div className="profile-settings card">
          <aside className="profile-sidebar">
            <p className="profile-sidebar-heading">Account</p>
            <nav className="profile-tabs" aria-label="Account settings">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    className={`profile-tab${activeTab === tab.id ? " active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                    aria-current={activeTab === tab.id ? "page" : undefined}
                  >
                    <Icon size={17} strokeWidth={1.8} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            <hr className="divider profile-divider" />
            <p className="profile-sidebar-heading">More</p>
            <Link href="/MyReport" className="profile-tab profile-sidebar-link">
              <MapPinned size={17} strokeWidth={1.8} />
              <span>My Reports</span>
              <ChevronRight size={15} className="profile-tab-chevron" />
            </Link>
            <button
              type="button"
              className="profile-tab profile-delete-link"
              onClick={() => setShowDeleteConfirmation(true)}
            >
              <Trash2 size={17} strokeWidth={1.8} />
              <span>Delete Account</span>
            </button>
          </aside>

          <section className="profile-content">
            {activeTab === "profile" && (
              <>
                <h2 className="profile-section-title">My Profile</h2>

                {/* where you can upload your image */}
                <div className="card profile-overview">
                  <div className="profile-avatar-wrap">
                    <div className="profile-avatar" onClick={() => setPopUpImage(true)} title="ProfileImage">

                      {profileImage ? (
                        <img src={profileImage} alt="Profile" />
                      ) : (
                        initials
                      )}
                    </div>

                    <input type="file"
                      accept="image/*"
                      hidden
                      ref={fileInputRef}
                      onChange={(e) => {
                        const file = e.target.files?.[0]

                        if (file) {
                          const imageURl = URL.createObjectURL(file)
                          setProfileImage(imageURl)
                        }
                      }}
                    />

                    {popUpImage && (
                      <div className="profile-modal-overlay">
                        <div className="profile-photo-modal">
                          <h3>Change Profile Photo</h3>

                          <button type="button" onClick={() => fileInputRef.current?.click()}>
                            Upload Image
                          </button>
                          <button type="button" onClick={() =>{
                            
                          } }>
                        </button>

                      </div>
  </div>
)}


                  <button
                    type="button"
                    className="profile-avatar-camera"
                    aria-label="Change profile photo"
                    title="Change profile photo"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera size={14} />
                  </button>
                </div>

                <div className="profile-overview-details">
                  <h3>{fullName || "Your name"}</h3>
                  <p className="profile-account-label">RCPMS account</p>
                  <p className="profile-location-summary">
                    <MapPin size={14} />
                    <span>{locationText}</span>
                  </p>
                </div>
              </div>
            {/* ///// */}

            <div className="card profile-section-card">
              <div className="profile-card-heading">
                <h3>Personal Information</h3>
                <button
                  type="button"
                  className="profile-edit-button"
                  onClick={() => setEditingPersonal(!editingPersonal)}
                >
                  {editingPersonal ? <X size={14} /> : <Pencil size={14} />}
                  {editingPersonal ? "Cancel" : "Edit"}
                </button>
              </div>

              {editingPersonal ? (
                <form
                  className="profile-form-grid"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setEditingPersonal(false);
                  }}
                >
                  <div className="profile-form-field">
                    <label htmlFor="profile-first-name">First name</label>
                    <input id="profile-first-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="First name" />
                  </div>

                  <div className="profile-form-field">
                    <label htmlFor="profile-email">Email address</label>
                    <input id="profile-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" />
                  </div>
                  <div className="profile-form-field">
                    <label htmlFor="profile-phone">Phone number</label>
                    <input id="profile-phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone number" />
                  </div>
                  <div className="profile-form-actions profile-form-full-width">
                    <button type="button" className="btn-secondary" onClick={() => setEditingPersonal(false)}>Cancel</button>
                    <button type="submit" className="btn-primary"><Check size={16} /> Save changes</button>
                  </div>
                </form>
              ) : (
                <div className="profile-information-grid">
                  {renderValue("First name", name)}
                  {/* {renderValue("Last name", lastName)} */}
                  {renderValue("Email address", email, <Mail size={15} />)}
                  {renderValue("Phone number", phone, <Phone size={15} />)}
                </div>
              )}
            </div>

            <div className="card profile-section-card">
              <div className="profile-card-heading">
                <h3>My Location</h3>
                <button type="button" className="profile-edit-button" onClick={() => { setActiveTab("location"); setEditingLocation(false); }}>
                  View location <ChevronRight size={14} />
                </button>
              </div>
              <div className="profile-information-grid">
                {renderValue("District", district)}
                {renderValue("Sector", sector)}
                {renderValue("Cell", cell)}
                {renderValue("Village", village)}
              </div>
            </div>
          </>
            )}

          {activeTab === "location" && (
            <>
              <h2 className="profile-section-title">My Location</h2>
              <p className="profile-section-description">Review your registered community location.</p>

              <div className="card profile-section-card">
                <div className="profile-location-heading">
                  <div className="profile-icon-tile"><MapPinned size={22} /></div>
                  <div>
                    <h3>Registered Address</h3>
                    <p>Your current registered location</p>
                  </div>
                  <span className="badge-success profile-current-badge">Current</span>
                </div>

                {editingLocation ? (
                  <form className="profile-form-grid" onSubmit={(event) => { event.preventDefault(); setEditingLocation(false); }}>
                    <div className="profile-form-field">
                      <label htmlFor="profile-district">District</label>
                      <input id="profile-district" value={district} onChange={(event) => setDistrict(event.target.value)} placeholder="Enter district" />
                    </div>
                    <div className="profile-form-field">
                      <label htmlFor="profile-sector">Sector</label>
                      <input id="profile-sector" value={sector} onChange={(event) => setSector(event.target.value)} placeholder="Enter sector" />
                    </div>
                    <div className="profile-form-field">
                      <label htmlFor="profile-cell">Cell</label>
                      <input id="profile-cell" value={cell} onChange={(event) => setCell(event.target.value)} placeholder="Enter cell" />
                    </div>
                    <div className="profile-form-field">
                      <label htmlFor="profile-village">Village</label>
                      <input id="profile-village" value={village} onChange={(event) => setVillage(event.target.value)} placeholder="Enter village" />
                    </div>
                    <div className="profile-notice profile-form-full-width">
                      <ShieldCheck size={20} />
                      <p>This is a frontend preview. In the live application, location changes should be submitted for review. Your current location should remain active until an authorized reviewer approves the request.</p>
                    </div>
                    <div className="profile-form-actions profile-form-full-width">
                      <button type="button" className="btn-secondary" onClick={() => setEditingLocation(false)}>Cancel</button>
                      <button type="submit" className="btn-primary"><Check size={16} /> Done</button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="profile-information-grid">
                      {renderValue("District", district)}
                      {renderValue("Sector", sector)}
                      {renderValue("Cell", cell)}
                      {renderValue("Village", village)}
                    </div>
                    <hr className="divider profile-section-divider" />
                    <div className="profile-notice">
                      <ShieldCheck size={20} />
                      <div>
                        <h4>Need to move to another location?</h4>
                        <p>Request a change to your registered location. Your existing location should remain active until an authorized reviewer approves the request.</p>
                      </div>
                    </div>
                    <div className="profile-form-actions profile-location-actions">
                      <button type="button" className="btn-primary" onClick={() => setEditingLocation(true)}><Pencil size={15} /> Request location change</button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {activeTab === "security" && (
            <>
              <h2 className="profile-section-title">Security</h2>
              <p className="profile-section-description">Manage your password and protect your account.</p>

              <div className="card profile-section-card">
                <div className="profile-security-heading">
                  <div className="profile-icon-tile"><LockKeyhole size={22} /></div>
                  <div className="profile-security-description">
                    <h3>Password</h3>
                    <p>Update your password periodically to keep your account secure.</p>
                  </div>
                  <button type="button" className="profile-edit-button" onClick={() => setShowPasswordForm(!showPasswordForm)}>{showPasswordForm ? "Cancel" : "Change"}</button>
                </div>

                {showPasswordForm && (
                  <form className="profile-password-form" onSubmit={(event) => { event.preventDefault(); setShowPasswordForm(false); }}>
                    <div className="profile-form-field">
                      <label htmlFor="profile-current-password">Current password</label>
                      <input id="profile-current-password" type="password" placeholder="Enter current password" />
                    </div>
                    <div className="profile-form-field">
                      <label htmlFor="profile-new-password">New password</label>
                      <input id="profile-new-password" type="password" placeholder="Enter new password" />
                    </div>
                    <div className="profile-form-field">
                      <label htmlFor="profile-confirm-password">Confirm new password</label>
                      <input id="profile-confirm-password" type="password" placeholder="Confirm new password" />
                    </div>
                    <div className="profile-form-actions">
                      <button type="submit" className="btn-primary">Save password</button>
                    </div>
                  </form>
                )}
              </div>

              <div className="card profile-section-card">
                <h3 className="profile-card-title">Account information</h3>
                <p className="profile-account-copy">Your RCPMS account is used to access your reports and registered community information.</p>
                <hr className="divider profile-section-divider" />
                <div className="profile-notice">
                  <ShieldCheck size={20} />
                  <div>
                    <h4>Account protection</h4>
                    <p>Your account permissions are managed by the system and cannot be changed from this page.</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>

      {
    showDeleteConfirmation && (
      <div className="profile-modal-overlay" role="presentation" onClick={() => setShowDeleteConfirmation(false)}>
        <div className="card profile-modal" role="dialog" aria-modal="true" aria-labelledby="delete-account-title" onClick={(event) => event.stopPropagation()}>
          <div className="profile-modal-icon"><Trash2 size={22} /></div>
          <h2 id="delete-account-title">Delete your account?</h2>
          <p>This is a visual confirmation only. Account deletion is not connected to the backend in this frontend preview.</p>
          <div className="profile-form-actions">
            <button type="button" className="btn-secondary" onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
            <button type="button" className="profile-danger-button" onClick={() => setShowDeleteConfirmation(false)}>Close</button>
          </div>
        </div>
      </div>
    )
  }
    </main >
  );
}
