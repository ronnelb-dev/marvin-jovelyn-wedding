"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import Head from "next/head";
import {
  AlertCircle,
  Check,
  Mail,
  Plus,
  Trash2,
  Users,
} from "lucide-react";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import "@/styles/globals.css";

interface Guest {
  id: string;
  name: string;
}

interface FormData {
  primaryGuestName: string;
  phone: string;
  guests: Guest[];
  message: string;
  willAttend: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function RSVPPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    primaryGuestName: "",
    phone: "",
    guests: [{ id: "1", name: "" }],
    message: "",
    willAttend: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!formData.primaryGuestName.trim()) {
      nextErrors.primaryGuestName = "Name is required";
    }

    if (!formData.willAttend) {
      nextErrors.willAttend = "Please indicate if you will attend";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }
  };

  const handleGuestChange = (id: string, value: string) => {
    setFormData((current) => ({
      ...current,
      guests: current.guests.map((guest) =>
        guest.id === id ? { ...guest, name: value } : guest,
      ),
    }));
  };

  const addGuest = () => {
    setFormData((current) => ({
      ...current,
      guests: [...current.guests, { id: Date.now().toString(), name: "" }],
    }));
  };

  const removeGuest = (id: string) => {
    if (formData.guests.length <= 1) return;

    setFormData((current) => ({
      ...current,
      guests: current.guests.filter((guest) => guest.id !== id),
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit RSVP");
      }

      setSubmitted(true);
      setFormData({
        primaryGuestName: "",
        phone: "",
        guests: [{ id: "1", name: "" }],
        message: "",
        willAttend: "",
      });

      window.setTimeout(() => setSubmitted(false), 10000);
    } catch (error) {
      setErrors({
        submit:
          error instanceof Error ? error.message : "Failed to submit RSVP",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>RSVP - Marvin & Jovelyn Wedding</title>
        <meta
          name="description"
          content="RSVP for Marvin and Jovelyn's wedding celebration"
        />
      </Head>

      <main className="cordially-template cordially-rsvp-page">
        <NavBar />

        <section className="cordially-rsvp-hero">
          <p className="cordially-kicker">marvin &amp; jovelyn</p>
          <h1>RSVP</h1>
          <p>
            We would be honored by your presence at our wedding celebration.
            Please respond by September 1st, 2026.
          </p>
        </section>

        <section className="cordially-rsvp-section">
          {submitted ? (
            <div className="cordially-rsvp-confirmation">
              <div>
                <Check size={42} />
              </div>
              <h2>Thank You!</h2>
              <p>
                Your RSVP has been received. We are thrilled to celebrate with
                you on our special day.
              </p>
            </div>
          ) : (
            <div className="cordially-rsvp-layout">
              <aside className="cordially-rsvp-aside">
                <p className="cordially-kicker">find your invitation</p>
                <h2>You are responding for your household.</h2>
                <div className="cordially-rsvp-note">
                  <Mail size={20} />
                  <div>
                    <strong>Questions?</strong>
                    <span>rsvp@marvinnjovelyn.com</span>
                  </div>
                </div>
                <div className="cordially-rsvp-note">
                  <Users size={20} />
                  <div>
                    <strong>Plus Ones</strong>
                    <span>
                      Add your guest below so we can reserve their seat.
                    </span>
                  </div>
                </div>
              </aside>

              <form className="cordially-rsvp-form" onSubmit={handleSubmit}>
                <fieldset className="cordially-radio-group">
                  <legend>
                    Will you be joining us?
                    <span>*</span>
                  </legend>
                  <label>
                    <input
                      type="radio"
                      name="willAttend"
                      value="yes"
                      checked={formData.willAttend === "yes"}
                      onChange={handleChange}
                    />
                    <span>Yes, I&apos;ll be there</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="willAttend"
                      value="no"
                      checked={formData.willAttend === "no"}
                      onChange={handleChange}
                    />
                    <span>Sorry, I can&apos;t attend</span>
                  </label>
                  {errors.willAttend && (
                    <p className="cordially-field-error">
                      <AlertCircle size={16} />
                      {errors.willAttend}
                    </p>
                  )}
                </fieldset>

                <label className="cordially-field">
                  <span>
                    Your Full Name
                    <em>*</em>
                  </span>
                  <input
                    type="text"
                    name="primaryGuestName"
                    value={formData.primaryGuestName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                  {errors.primaryGuestName && (
                    <p className="cordially-field-error">
                      <AlertCircle size={16} />
                      {errors.primaryGuestName}
                    </p>
                  )}
                </label>

                <label className="cordially-field">
                  <span>Phone Number</span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(123) 456-7890"
                  />
                </label>

                {formData.willAttend === "yes" && (
                  <div className="cordially-guests">
                    <div className="cordially-guests-header">
                      <span>Guest Details</span>
                      <button type="button" onClick={addGuest}>
                        <Plus size={16} />
                        Add Guest
                      </button>
                    </div>

                    {formData.guests.map((guest, index) =>
                      index === 0 ? null : (
                        <div className="cordially-guest-row" key={guest.id}>
                          <input
                            type="text"
                            value={guest.name}
                            onChange={(event) =>
                              handleGuestChange(guest.id, event.target.value)
                            }
                            placeholder={`Guest ${index} name`}
                          />
                          <button
                            type="button"
                            onClick={() => removeGuest(guest.id)}
                            aria-label="Remove guest"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      ),
                    )}
                  </div>
                )}

                <label className="cordially-field">
                  <span>Special Message for Us</span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share your well-wishes or memories..."
                    rows={4}
                  />
                </label>

                {errors.submit && (
                  <p className="cordially-submit-error">
                    <AlertCircle size={18} />
                    {errors.submit}
                  </p>
                )}

                <button
                  type="submit"
                  className="cordially-submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Confirm RSVP"}
                </button>

                <p className="cordially-rsvp-deadline">
                  RSVP Deadline: September 1st, 2026
                </p>
              </form>
            </div>
          )}
        </section>

        <Footer />
      </main>
    </>
  );
}
