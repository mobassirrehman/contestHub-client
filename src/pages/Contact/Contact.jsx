import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaHeadset,
  FaClock,
  FaQuestionCircle,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for reaching out. We'll get back to you within 24 hours.",
        confirmButtonColor: "#06b6d4",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email Us",
      details: "support@contesthub.com",
      subtext: "We reply within 24 hours",
      color: "cyan",
    },
    {
      icon: FaPhone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      subtext: "Mon-Fri, 9am-6pm EST",
      color: "emerald",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      details: "123 Creative Street",
      subtext: "San Francisco, CA 94102",
      color: "purple",
    },
  ];

  const quickLinks = [
    {
      icon: FaHeadset,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      action: "Start Chat",
    },
    {
      icon: FaQuestionCircle,
      title: "FAQ",
      description: "Find answers to common questions",
      action: "View FAQ",
      link: "/faq",
    },
    {
      icon: FaClock,
      title: "Response Time",
      description: "Average response within 2 hours",
      action: "Learn More",
    },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient-primary py-20 lg:py-28 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="page-container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 bg-white/10 backdrop-blur-sm border border-white/20">
              <HiSparkles className="text-cyan-300" />
              <span>Get in Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Contact <span className="text-gradient-primary">Us</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Have questions or need assistance? We're here to help you succeed
              on your creative journey.
            </p>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              className="fill-base-100"
            />
          </svg>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section-padding-sm bg-base-100">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-24 relative z-10"
          >
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="feature-card text-center hover:-translate-y-2 transition-transform"
              >
                <div className={`feature-icon mx-auto bg-${info.color}-500/10`}>
                  <info.icon className={`text-2xl text-${info.color}-500`} />
                </div>
                <h3 className="text-lg font-bold mb-1 text-base-content">
                  {info.title}
                </h3>
                <p className="text-base-content font-medium">{info.details}</p>
                <p className="text-sm text-base-content/60">{info.subtext}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section-padding bg-base-100">
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Send Us a <span className="text-gradient-primary">Message</span>
              </h2>
              <p className="text-base-content/60 mb-8">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="form-control">
                    <label className="label">
                      <span className="form-label">Your Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="input input-bordered w-full rounded-xl"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="form-label">Email Address</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="input input-bordered w-full rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="form-label">Subject</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="select select-bordered w-full rounded-xl"
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Feedback & Suggestions</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="form-label">Message</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    className="textarea textarea-bordered w-full rounded-xl h-36 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-gradient-primary w-full"
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Quick Links & Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Quick Support Options */}
              <div>
                <h3 className="text-xl font-bold mb-4">Quick Support</h3>
                <div className="space-y-4">
                  {quickLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.link || "#"}
                      className="flex items-center gap-4 p-4 bg-base-200 rounded-2xl hover:bg-base-300 transition-colors group"
                    >
                      <div className="p-3 bg-cyan-500/10 rounded-xl">
                        <link.icon className="text-xl text-cyan-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-base-content">
                          {link.title}
                        </h4>
                        <p className="text-sm text-base-content/60">
                          {link.description}
                        </p>
                      </div>
                      <span className="text-sm text-cyan-500 font-medium group-hover:translate-x-1 transition-transform">
                        {link.action} →
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div>
                <h3 className="text-xl font-bold mb-4">Our Location</h3>
                <div className="bg-base-200 rounded-2xl overflow-hidden h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977978193!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c8b7e0b9d%3A0x1e2b0f0c0b0c0c0c!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                  />
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="social-btn hover:bg-cyan-500 hover:text-white"
                    >
                      <social.icon />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="section-padding-sm bg-base-200">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-base-content/60 max-w-xl mx-auto mb-6">
              Check out our comprehensive FAQ section for quick answers to
              common questions about contests, payments, and more.
            </p>
            <a href="/faq" className="btn btn-outline-cyan">
              <FaQuestionCircle />
              Visit FAQ Center
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
