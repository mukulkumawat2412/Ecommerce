import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import api from "../utils/axiosInstance.js";
import { useDispatch } from "react-redux";
import { CreateContactUserData } from "../redux/slices/contactUsSlice.jsx";


// Professional Contact Us component
// Usage: import ContactUs from './ContactUs.jsx' and render <ContactUs />
// Dependencies: react, react-hook-form, axios, lucide-react, framer-motion, tailwindcss

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch()

  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {


    // Basic client-side sanitization / honeypot check
    // if (data._gotcha) return; // bot detected

    setLoading(true);
    setStatus(null);


    try {
      // Prepare form data (support file upload if needed)
      // const formData = new FormData();
      // formData.append("fullName", data.fullName);
      // formData.append("email", data.email);
      // formData.append("phone", data.phone || "");
      // formData.append("subject", data.subject);
      // formData.append("department", data.department);
      // formData.append("message", data.message);
      // if (data.attachment && data.attachment[0]) {
      //   formData.append("attachment", data.attachment[0]);
      // }

      // POST to your backend contact endpoint. Adjust URL as necessary.

      const res = await dispatch(CreateContactUserData(data))

      console.log(res)

      setStatus("success");
      reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false)
    }
  }

return (
  <section className="max-w-6xl mt-10 mx-auto p-4 sm:p-6 md:p-12">
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start"
    >
      {/* Left: Contact Info */}
      <div className="lg:col-span-1 bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-semibold mb-2">Get in touch</h2>
        <p className="text-sm text-gray-600 mb-6">
          Have a question, business inquiry or feedback? Fill the form — we usually reply within 1 business day.
        </p>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-indigo-50">
              <MapPin size={18} />
            </div>
            <div>
              <h4 className="text-sm font-medium">Head Office</h4>
              <p className="text-xs text-gray-600">
                123 Commerce St, Suite 400<br />Mumbai, India
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-emerald-50">
              <Phone size={18} />
            </div>
            <div>
              <h4 className="text-sm font-medium">Phone</h4>
              <a className="text-xs text-gray-600 block" href="tel:+911234567890">+91 12345 67890</a>
              <a className="text-xs text-gray-600 block" href="tel:+911112223334">+91 11122 23334</a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-sky-50">
              <Mail size={18} />
            </div>
            <div>
              <h4 className="text-sm font-medium">Email</h4>
              <a className="text-xs text-gray-600 block" href="mailto:support@yourstore.com">support@yourstore.com</a>
            </div>
          </div>

          <div className="pt-3 border-t">
            <p className="text-xs text-gray-500">Business hours: Mon - Fri, 10:00 — 18:00 IST</p>
          </div>

          <div className="pt-3">
            <iframe
              title="office-location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11612345678!2d72.7754!3d19.0822"
              className="w-full h-36 rounded-md border"
              loading="lazy"
              aria-hidden="false"
            />
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <h3 className="text-xl font-semibold mb-3">Contact form</h3>
        <p className="text-sm text-gray-600 mb-6">
          Tell us a bit about your request — the more detail, the better we can help.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
          aria-label="Contact form"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Full name</label>
              <input
                type="text"
                placeholder="Your full name"
                {...register("fullName", { required: "Name is required", minLength: { value: 2, message: "Enter your full name" } })}
                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-200 outline-none ${errors.fullName ? "border-red-300" : "border-gray-200"}`}
              />
              {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email address</label>
              <input
                type="text"
                placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}
                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-200 outline-none ${errors.email ? "border-red-300" : "border-gray-200"}`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Phone (optional)</label>
              <input
                type="number"
                placeholder="+91 9XXXXXXXXX"
                {...register("phone", { minLength: { value: 7, message: "Enter a valid phone" } })}
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-200 outline-none border-gray-200"
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                placeholder="Brief subject"
                {...register("subject", { required: "Subject is required" })}
                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-200 outline-none ${errors.subject ? "border-red-300" : "border-gray-200"}`}
              />
              {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
            <select
              {...register("department", { required: true })}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-200 outline-none border-gray-200"
              defaultValue="support"
            >
              <option value="support">Support</option>
              <option value="sales">Sales</option>
              <option value="partnerships">Partnerships</option>
              <option value="media">Media & PR</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
            <select
              {...register("status", { required: true })}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-200 outline-none border-gray-200"
              defaultValue="Pending"
            >
              <option value="Pending">Pending</option>
              <option value="Replied">Replied</option>
              <option value="Spam">Spam</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Message</label>
            <textarea
              rows={6}
              placeholder="Tell us more — what happened, when, and any order IDs or screenshots that help us investigate."
              {...register("message", { required: "Message is required", minLength: { value: 10, message: "Please provide more detail" } })}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-200 outline-none ${errors.message ? "border-red-300" : "border-gray-200"}`}
            />
            {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
          </div>

          <div className="flex items-center gap-4">
            <div className="ml-auto text-right">
              <label className="inline-flex items-center text-xs text-gray-600">
                <input type="checkbox" {...register("consent")} className="mr-2" />
                I agree to be contacted regarding this request.
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              disabled={loading || isSubmitting}
              className={`${loading ? "bg-black text-white" : "bg-indigo-600 text-white font-medium hover:bg-indigo-700"} inline-flex items-center gap-2 px-5 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-300`}
              aria-live="polite"
            >
              {loading ? <><Loader2 className="animate-spin" size={16} /> Processing</> : <><Send size={16} /> Send message</>}
            </button>

            <button
              type="button"
              onClick={() => reset()}
              className="px-4 py-2 rounded-2xl border border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
            >
              Reset
            </button>

            <div className="ml-auto text-sm mt-2 sm:mt-0">
              {status === "success" && <span className="text-green-600">Message sent — we will reply soon.</span>}
              {status === "error" && <span className="text-red-600">Something went wrong. Try again later.</span>}
            </div>
          </div>

          <div className="pt-2 text-xs text-gray-400">
            By submitting you agree to our <a href="/privacy" className="underline">privacy policy</a>.
          </div>
        </form>
      </div>
    </motion.div>
  </section>
);

}
