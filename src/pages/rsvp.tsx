"use client";

import { useState, FormEvent } from "react";
import Head from "next/head";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { PageHeaderSection } from "@/components/page-header";
import Preloader from "@/components/preloader";
import "@/styles/globals.css";
import { Playfair_Display } from "next/font/google";
import { Check, Mail, Users, AlertCircle, Heart, Trash2, Plus } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

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
    const newErrors: FormErrors = {};

    if (!formData.primaryGuestName.trim()) {
      newErrors.primaryGuestName = "Name is required";
    }
    if (!formData.willAttend) {
      newErrors.willAttend = "Please indicate if you will attend";
    }
    if (formData.willAttend === "yes") {
      // Validate that at least the primary guest has a name
      if (!formData.guests[0]?.name.trim()) {
        newErrors.guestNames = "Please enter at least your name";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleGuestChange = (
    id: string,
    field: keyof Guest,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      guests: prev.guests.map((guest) =>
        guest.id === id ? { ...guest, [field]: value } : guest
      ),
    }));
    if (errors.guestNames) {
      setErrors((prev) => ({
        ...prev,
        guestNames: "",
      }));
    }
  };

  const addGuest = () => {
    const newId = Date.now().toString();
    setFormData((prev) => ({
      ...prev,
      guests: [...prev.guests, { id: newId, name: "" }],
    }));
  };

  const removeGuest = (id: string) => {
    if (formData.guests.length > 1) {
      setFormData((prev) => ({
        ...prev,
        guests: prev.guests.filter((guest) => guest.id !== id),
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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

      // Reset form after 10 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 10000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({
        submit: error instanceof Error ? error.message : "Failed to submit RSVP",
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

      <Preloader />
      <NavBar />

      <main
        className={`${playfair.className} antialiased bg-gradient-to-b from-slate-50 via-slate-50/30 to-slate-50 text-slate-900`}
      >
        <PageHeaderSection title="RSVP" />

        <section className="py-24 px-4 md:px-8 max-w-4xl mx-auto">
          {submitted ? (
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center space-y-8">
                <div className="flex justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                    <Check className="w-12 h-12 text-slate-700" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-semibold text-slate-900">
                    Thank You!
                  </h2>
                  <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Your RSVP has been received. We are thrilled to celebrate
                    with you on our special day.
                  </p>
                  <p className="text-lg text-slate-500">
                    A confirmation email will be sent shortly.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Introduction */}
              <div className="text-center mb-16 space-y-6">
                <div className="flex justify-center">
                  <Heart className="w-8 h-8 text-slate-700" />
                </div>
                <p className="text-xl text-slate-600 italic max-w-2xl mx-auto">
                  We would be honored by your presence at our wedding
                  celebration. Please respond by September 1st, 2026.
                </p>
              </div>

              {/* Form Container */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-slate-200">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Attendance */}
                  <div className="space-y-4">
                    <label className="block text-lg font-semibold text-slate-900">
                      Will you be joining us?
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="willAttend"
                          value="yes"
                          checked={formData.willAttend === "yes"}
                          onChange={handleChange}
                          className="w-5 h-5 text-slate-700 cursor-pointer"
                        />
                        <span className="text-slate-700 group-hover:text-slate-900 transition-colors">
                          Yes, I&rsquo;ll be there
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="willAttend"
                          value="no"
                          checked={formData.willAttend === "no"}
                          onChange={handleChange}
                          className="w-5 h-5 text-slate-700 cursor-pointer"
                        />
                        <span className="text-slate-700 group-hover:text-slate-900 transition-colors">
                          Sorry, I can&rsquo;t attend
                        </span>
                      </label>
                    </div>
                    {errors.willAttend && (
                      <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.willAttend}
                      </div>
                    )}
                  </div>

                  {/* Primary Guest Name */}
                  <div className="space-y-3">
                    <label
                      htmlFor="primaryGuestName"
                      className="block text-lg font-semibold text-slate-900"
                    >
                      Your Full Name
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="primaryGuestName"
                      name="primaryGuestName"
                      value={formData.primaryGuestName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-5 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent transition-all"
                    />
                    {errors.primaryGuestName && (
                      <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.primaryGuestName}
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-3">
                    <label
                      htmlFor="phone"
                      className="block text-lg font-semibold text-slate-900"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(123) 456-7890"
                      className="w-full px-5 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Guest Names and Meal Preferences (Show only if attending) */}
                  {formData.willAttend === "yes" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="block text-lg font-semibold text-slate-900">
                          Guest Details
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={addGuest}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Add Guest
                        </button>
                      </div>

                      {errors.guestNames && (
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          {errors.guestNames}
                        </div>
                      )}

                      <div className="space-y-4">
                        {formData.guests.map((guest, index) => (
                          <div
                            key={guest.id}
                            className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-semibold text-slate-700">
                                {index === 0 ? "You" : `Guest ${index}`}
                              </span>
                              {index > 0 && (
                                <button
                                  type="button"
                                  onClick={() => removeGuest(guest.id)}
                                  className="p-1 hover:bg-red-100 rounded transition-colors"
                                  aria-label="Remove guest"
                                >
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                </button>
                              )}
                            </div>

                            <input
                              type="text"
                              value={guest.name}
                              onChange={(e) =>
                                handleGuestChange(guest.id, "name", e.target.value)
                              }
                              placeholder="Guest name"
                              className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent transition-all"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Special Message */}
                  <div className="space-y-3">
                    <label
                      htmlFor="message"
                      className="block text-lg font-semibold text-slate-900"
                    >
                      Special Message for Us
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share your well-wishes or memories..."
                      rows={4}
                      className="w-full px-5 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  {/* Submission Error */}
                  {errors.submit && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-red-700">{errors.submit}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-800 hover:to-slate-700 disabled:from-slate-400 disabled:to-slate-400 text-white py-4 px-6 rounded-lg font-semibold text-lg tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-3 group"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Check className="w-5 h-5" />
                          Confirm RSVP
                        </>
                      )}
                    </button>
                  </div>

                  {/* RSVP Deadline Notice */}
                  <div className="mt-8 p-4 bg-slate-100 rounded-lg border border-slate-300">
                    <p className="text-sm text-slate-700 text-center">
                      <span className="font-semibold">RSVP Deadline:</span>{" "}
                      September 1st, 2026
                    </p>
                  </div>
                </form>
              </div>

              {/* Additional Information */}
              <div className="mt-16 grid md:grid-cols-2 gap-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-6 h-6 text-slate-700" />
                    <h3 className="text-xl font-semibold text-slate-900">
                      Questions?
                    </h3>
                  </div>
                  <p className="text-slate-600">
                    If you have any questions or need assistance, please don&rsquo;t
                    hesitate to reach out to us.
                  </p>
                  <p className="text-slate-700 font-medium">
                    rsvp@marvinnjovelyn.com
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-slate-700" />
                    <h3 className="text-xl font-semibold text-slate-900">
                      Plus Ones
                    </h3>
                  </div>
                  <p className="text-slate-600">
                    We are delighted to welcome your plus one! Please provide
                    their information in a separate RSVP form or contact us.
                  </p>
                </div>
              </div>
            </>
          )}
        </section>

        <Footer />
      </main>
    </>
  );
}
