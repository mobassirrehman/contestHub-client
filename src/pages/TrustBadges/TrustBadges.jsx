import { motion } from "framer-motion";
import { FaShieldAlt } from "react-icons/fa";

const TrustBadges = () => {
  // Partners with reliable image URLs from devicons CDN
  const partners = [
    {
      name: "Vercel",
      description: "Hosting",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
      darkInvert: true,
    },
    {
      name: "AWS",
      description: "Infrastructure",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    },
    {
      name: "Stripe",
      description: "Payments",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/512px-Stripe_Logo%2C_revised_2016.svg.png",
    },
    {
      name: "Firebase",
      description: "Authentication",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    },
    {
      name: "MongoDB",
      description: "Database",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "Cloudflare",
      description: "Security",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg",
    },
  ];

  const trustBadges = [
    {
      icon: "🔒",
      title: "SSL Secured",
      description: "256-bit encryption",
    },
    {
      icon: "✓",
      title: "Verified Platform",
      description: "Trusted by 10K+ users",
    },
    {
      icon: "💳",
      title: "Secure Payments",
      description: "PCI DSS Compliant",
    },
    {
      icon: "🛡️",
      title: "Data Protected",
      description: "GDPR Compliant",
    },
  ];

  return (
    <section className="section-padding-sm bg-base-200">
      <div className="page-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 bg-emerald-500/10 text-emerald-500">
            <FaShieldAlt />
            <span>Trusted & Secure</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Powered by Industry Leaders
          </h2>
          <p className="text-base-content/60 max-w-xl mx-auto">
            We partner with the best to provide you a secure and reliable
            platform
          </p>
        </motion.div>

        {/* Partners Marquee with Fading Edges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative mb-10"
        >
          {/* Fading Edge Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-base-200 via-base-200/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-base-200 via-base-200/80 to-transparent z-10 pointer-events-none" />

          {/* Marquee Container */}
          <div className="overflow-hidden">
            <div className="flex animate-marquee hover:[animation-play-state:paused]">
              {/* Double items for seamless loop */}
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-3 sm:mx-4 px-5 sm:px-6 py-4 bg-base-100 rounded-2xl border border-base-300 hover:border-cyan-500/50 hover:shadow-lg transition-all flex items-center gap-4 min-w-[180px] sm:min-w-[200px]"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className={`w-10 h-10 object-contain flex-shrink-0 ${
                      partner.darkInvert ? "dark:invert" : ""
                    }`}
                    loading="lazy"
                  />
                  <div>
                    <p className="font-semibold text-base-content">
                      {partner.name}
                    </p>
                    <p className="text-xs text-base-content/50">
                      {partner.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {trustBadges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 sm:p-4 bg-base-100 rounded-2xl border border-base-300 hover:shadow-md transition-shadow"
            >
              <span className="text-2xl sm:text-3xl">{badge.icon}</span>
              <div>
                <p className="font-semibold text-base-content text-sm sm:text-base">
                  {badge.title}
                </p>
                <p className="text-xs text-base-content/60">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBadges;
