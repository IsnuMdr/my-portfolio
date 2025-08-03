"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { AnimatedSection } from "../animations/AnimatedSection";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { About } from "@/types/about";

export const Contact = ({ about }: { about: About | null }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [submitStatus, setSubmitStatus] = useState<
  //   "idle" | "success" | "error"
  // >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: "", email: "", subject: "", message: "" });
        // setSubmitStatus("success");
        // setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        // setSubmitStatus("error");
        // setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    } catch (error) {
      console.error(error);
      // setSubmitStatus("error");
      // setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: about?.email || "isnu.mdr@gmail.com",
      href: `mailto:${about?.email}` || "mailto:isnu.mdr@gmail.com",
      description: "Send me an email anytime",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Phone,
      label: "Phone",
      value: about?.phone || "+62 812-3456-7890",
      href: `wa.me/${about?.phone}` || "wa.me/+6281234567890",
      description: "Available Mon-Fri, 9AM-6PM",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: MapPin,
      label: "Location",
      value: about?.location || "South Jakarta, ID",
      href: "https://maps.google.com",
      description: "Open to remote work",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Calendar,
      label: "Schedule",
      value: "Book a Call",
      href: "https://calendly.com",
      description: "30-min free consultation",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <section
      id="contact"
      className="section-padding bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-200/30 to-accent-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-accent-200/30 to-primary-200/30 rounded-full blur-3xl"></div>

      <div className="container-elegant relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block text-primary-600 font-medium mb-4 tracking-wider uppercase text-sm"
            >
              Get In Touch
            </motion.span>
            <h2 className="responsive-text-display font-bold mb-6 text-gradient">
              Let&apos;s Work Together
            </h2>
            <p className="responsive-text-body text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Have a project in mind or want to discuss opportunities? I&apos;d
              love to hear from you. Let&apos;s create something amazing
              together.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Methods */}
          <div className="lg:col-span-5">
            <AnimatedSection>
              <div className="space-y-6 mb-8">
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  return (
                    <motion.a
                      key={method.label}
                      href={method.href}
                      target={
                        method.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        method.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      whileHover={{ x: 5, scale: 1.02 }}
                      className="flex items-center gap-4 p-6 card-elegant group"
                    >
                      <div
                        className={`w-14 h-14 ${method.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent size={24} className={method.color} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                          {method.label}
                        </h4>
                        <p className="font-semibold text-gray-800 mb-1">
                          {method.value}
                        </p>
                        <p className="text-sm text-gray-600">
                          {method.description}
                        </p>
                      </div>
                      <ExternalLink
                        size={16}
                        className="text-gray-400 group-hover:text-primary-600 transition-colors"
                      />
                    </motion.a>
                  );
                })}
              </div>

              {/* Quick Stats */}
              <AnimatedSection delay={0.3}>
                <div className="card-elegant p-6">
                  <h3 className="font-bold text-gray-900 mb-4">
                    Why Work With Me?
                  </h3>
                  <div className="space-y-3">
                    {[
                      "⚡ Quick response within 24 hours",
                      "🎯 Focus on your business goals",
                      "💡 Creative problem-solving approach",
                      "🚀 Modern, scalable solutions",
                      "🤝 Transparent communication",
                    ].map((point, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="flex items-center gap-3 text-gray-700"
                      >
                        <span className="text-lg">{point}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </AnimatedSection>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <AnimatedSection delay={0.2}>
              <div className="card-elegant p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MessageCircle size={24} className="text-primary-600" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Send a Message
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.6 }}
                    >
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="input-elegant"
                        placeholder="John Doe"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="input-elegant"
                        placeholder="johndoe@example.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="textarea-elegant"
                      placeholder="Your message here..."
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-elegant w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </motion.div>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};
