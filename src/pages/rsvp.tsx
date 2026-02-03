"use client";

import { useState, FormEvent } from "react";
import Head from "next/head";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageHeaderSection from "@/components/page-header";
import Preloader from "@/components/preloader";
import "@/styles/globals.css";
import { Playfair_Display } from "next/font/google";
import { Check, Mail, User, Users, AlertCircle, Heart } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface FormData {
  guestName: string;
  email: string;
  phone: string;
  numberOfGuests: string;
  mealPreference: string;
  dietaryRestrictions: string;
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
    guestName: "",
    email: "",
    phone: "",
    numberOfGuests: "1",
    mealPreference: "chicken",
    dietaryRestrictions: "",
    message: "",
    willAttend: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.guestName.trim()) {
      newErrors.guestName = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.willAttend) {
      newErrors.willAttend = "Please indicate if you will attend";
    }
    if (formData.willAttend === "yes" && !formData.numberOfGuests) {
      newErrors.numberOfGuests = "Number of guests is required";
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here you would typically send the data to your backend
      console.log("Form submitted:", formData);

      setSubmitted(true);
      setFormData({
        guestName: "",
        email: "",
        phone: "",
        numberOfGuests: "1",
        mealPreference: "chicken",
        dietaryRestrictions: "",
        message: "",
        willAttend: "",
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
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
                          Yes, I'll be there
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
                          Sorry, I can't attend
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

                  {/* Guest Name */}
                  <div className="space-y-3">
                    <label
                      htmlFor="guestName"
                      className="block text-lg font-semibold text-slate-900"
                    >
                      Your Full Name
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="guestName"
                      name="guestName"
                      value={formData.guestName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-5 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent transition-all"
                    />
                    {errors.guestName && (
                      <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.guestName}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-3">
                    <label
                      htmlFor="email"
                      className="block text-lg font-semibold text-slate-900"
                    >
                      Email Address
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-5 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent transition-all"
                    />
                    {errors.email && (
                      <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
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

                  {/* Number of Guests (Show only if attending) */}
                  {formData.willAttend === "yes" && (
                    <div className="space-y-3">
                      <label
                        htmlFor="numberOfGuests"
                        className="block text-lg font-semibold text-slate-900"
                      >
                        Number of Guests
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        id="numberOfGuests"
                        name="numberOfGuests"
                        value={formData.numberOfGuests}
                        onChange={handleChange}
                        className="w-full px-5 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent transition-all"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5+ Guests</option>
                      </select>
                      {errors.numberOfGuests && (
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          {errors.numberOfGuests}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Meal Preference (Show only if attending) */}
                  {formData.willAttend === "yes" && (
                    <div className="space-y-3">
                      <label
                        htmlFor="mealPreference"
                        className="block text-lg font-semibold text-slate-900"
                      >
                        Meal Preference
                      </label>
                      <select
                        id="mealPreference"
                        name="mealPreference"
                        value={formData.mealPreference}
                        onChange={handleChange}
                        className="w-full px-5 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent transition-all"
                      >
                        <option value="chicken">Grilled Chicken</option>
                        <option value="fish">Pan Seared Fish</option>
                        <option value="beef">Herb-Crusted Beef</option>
                        <option value="vegetarian">
                          Vegetarian Pasta
                        </option>
                      </select>
                    </div>
                  )}

                  {/* Dietary Restrictions */}
                  <div className="space-y-3">
                    <label
                      htmlFor="dietaryRestrictions"
                      className="block text-lg font-semibold text-slate-900"
                    >
                      Dietary Restrictions or Allergies
                    </label>
                    <textarea
                      id="dietaryRestrictions"
                      name="dietaryRestrictions"
                      value={formData.dietaryRestrictions}
                      onChange={handleChange}
                      placeholder="Please let us know about any dietary restrictions or allergies..."
                      rows={3}
                      className="w-full px-5 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent transition-all resize-none"
                    />
                  </div>

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
                    If you have any questions or need assistance, please don't
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
