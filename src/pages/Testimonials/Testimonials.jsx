import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Graphic Designer",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "ContestHub transformed my freelance career. I've won 3 design contests and landed multiple clients through the exposure. The platform is incredibly well-designed and fair.",
      contestsWon: 3,
      earned: "$4,500",
    },
    {
      id: 2,
      name: "Michael Roberts",
      role: "Content Writer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "As a writer, finding quality competitions was always hard. ContestHub's article writing contests have great prizes and the community feedback is invaluable for growth.",
      contestsWon: 5,
      earned: "$7,200",
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Web Developer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The web development contests here are challenging and rewarding. I've improved my skills significantly and the prize money has been a great bonus!",
      contestsWon: 2,
      earned: "$3,800",
    },
    {
      id: 4,
      name: "David Kim",
      role: "Photographer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "ContestHub's photography contests have helped me build an amazing portfolio. The judging is transparent and the community is supportive. Highly recommended!",
      contestsWon: 4,
      earned: "$5,600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="section-padding bg-base-200">
      <div className="page-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <div className="section-badge bg-purple-500/10 text-purple-500">
            <FaStar />
            <span>Success Stories</span>
          </div>
          <h2 className="section-title">
            What Our <span className="text-gradient-primary">Winners</span> Say
          </h2>
          <p className="section-subtitle">
            Join thousands of creative professionals who have found success,
            recognition, and rewards through ContestHub.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="testimonial-card group"
            >
              {/* Quote Icon */}
              <FaQuoteLeft className="text-3xl text-cyan-500/20 mb-4" />

              {/* Review Text */}
              <p className="text-base-content/80 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-amber-400 text-sm" />
                ))}
              </div>

              {/* User Info & Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-base-200">
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-cyan-500/20"
                  />
                  <div>
                    <h4 className="font-semibold text-base-content">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-base-content/60">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="text-right">
                  <p className="text-lg font-bold text-emerald-500">
                    {testimonial.earned}
                  </p>
                  <p className="text-xs text-base-content/60">
                    {testimonial.contestsWon} contests won
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "4.9/5", label: "Average Rating" },
            { value: "98%", label: "Satisfaction Rate" },
            { value: "10K+", label: "Happy Winners" },
            { value: "$500K+", label: "Prizes Distributed" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 bg-base-100 rounded-2xl"
            >
              <p className="text-2xl font-bold text-gradient-primary">
                {stat.value}
              </p>
              <p className="text-sm text-base-content/60">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
