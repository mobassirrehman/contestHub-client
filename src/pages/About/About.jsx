import { motion } from "framer-motion";
import {
  FaTrophy,
  FaUsers,
  FaGlobe,
  FaRocket,
  FaHeart,
  FaLightbulb,
  FaHandshake,
  FaChartLine,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const About = () => {
  const stats = [
    { value: "10K+", label: "Active Users", icon: FaUsers },
    { value: "500+", label: "Contests Hosted", icon: FaTrophy },
    { value: "150+", label: "Countries", icon: FaGlobe },
    { value: "$500K+", label: "Prizes Awarded", icon: FaChartLine },
  ];

  const values = [
    {
      icon: FaHeart,
      title: "Passion for Creativity",
      description:
        "We believe everyone has unique talents. Our platform gives creative minds the stage they deserve to shine.",
      color: "rose",
    },
    {
      icon: FaHandshake,
      title: "Fair & Transparent",
      description:
        "Every contest follows strict guidelines. Winners are selected through unbiased, merit-based judging.",
      color: "cyan",
    },
    {
      icon: FaLightbulb,
      title: "Innovation First",
      description:
        "We constantly improve our platform with new features, categories, and tools to enhance your experience.",
      color: "amber",
    },
    {
      icon: FaRocket,
      title: "Empowering Growth",
      description:
        "Beyond prizes, we help you build portfolios, gain exposure, and connect with opportunities worldwide.",
      color: "purple",
    },
  ];

  const team = [
    {
      name: "Alex Rivera",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      bio: "Former design lead at a Fortune 500 company, passionate about empowering creative professionals.",
    },
    {
      name: "Sarah Chen",
      role: "Head of Product",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
      bio: "10+ years in product development, focused on creating intuitive user experiences.",
    },
    {
      name: "Michael Park",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      bio: "Full-stack engineer with expertise in scalable platforms and secure payment systems.",
    },
    {
      name: "Emily Watson",
      role: "Community Lead",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      bio: "Building bridges between creators and participants, fostering a supportive community.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient-primary py-20 lg:py-32 relative overflow-hidden">
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
              <span>Our Story</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="text-gradient-primary">ContestHub</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to democratize creative competitions, making it
              easy for talented individuals worldwide to showcase their skills,
              win prizes, and advance their careers.
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

      {/* Stats Section */}
      <section className="section-padding-sm bg-base-100">
        <div className="page-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="stat-card justify-center text-center flex-col"
              >
                <stat.icon className="text-3xl text-cyan-500 mb-2" />
                <p className="stat-card-value">{stat.value}</p>
                <p className="stat-card-label">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-base-200">
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="section-badge bg-cyan-500/10 text-cyan-500">
                <FaRocket />
                <span>Our Journey</span>
              </div>
              <h2 className="section-title text-left">
                Started with a{" "}
                <span className="text-gradient-primary">Vision</span>
              </h2>
              <div className="space-y-4 text-base-content/70 leading-relaxed">
                <p>
                  ContestHub was born in 2023 from a simple observation:
                  talented creative professionals often struggle to find
                  legitimate platforms to showcase their skills and earn
                  recognition.
                </p>
                <p>
                  Our founders, having experienced this firsthand as freelance
                  designers and developers, decided to build the platform they
                  wished existed – one that's transparent, fair, and truly
                  rewards creativity.
                </p>
                <p>
                  Today, ContestHub hosts hundreds of contests across multiple
                  categories, connecting thousands of creators with
                  opportunities to win prizes, build portfolios, and launch
                  careers.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur-2xl opacity-20" />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                alt="Team collaboration"
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="section-padding bg-base-100">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <div className="section-badge bg-purple-500/10 text-purple-500">
              <FaHeart />
              <span>What We Stand For</span>
            </div>
            <h2 className="section-title">
              Our Core <span className="text-gradient-primary">Values</span>
            </h2>
            <p className="section-subtitle">
              These principles guide everything we do at ContestHub
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="feature-card flex gap-5"
              >
                <div
                  className={`feature-icon flex-shrink-0 bg-${value.color}-500/10`}
                >
                  <value.icon className={`text-2xl text-${value.color}-500`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-base-content">
                    {value.title}
                  </h3>
                  <p className="text-base-content/60 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-base-200">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <div className="section-badge bg-amber-500/10 text-amber-500">
              <FaUsers />
              <span>The Team</span>
            </div>
            <h2 className="section-title">
              Meet the <span className="text-gradient-warning">People</span>{" "}
              Behind ContestHub
            </h2>
            <p className="section-subtitle">
              A passionate team dedicated to empowering creative professionals
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="feature-card text-center group"
              >
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="relative w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-base-200 group-hover:ring-cyan-500/50 transition-all"
                  />
                </div>
                <h3 className="text-lg font-bold text-base-content">
                  {member.name}
                </h3>
                <p className="text-cyan-500 text-sm font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-base-content/60 leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-cyan-600 to-purple-600">
        <div className="page-container text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join Our Community?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Whether you want to participate in contests or create your own,
              ContestHub has everything you need to succeed.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/all-contests" className="btn btn-cta-primary btn-lg">
                <FaTrophy />
                Browse Contests
              </a>
              <a href="/register" className="btn btn-cta-outline btn-lg">
                Create Account
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
