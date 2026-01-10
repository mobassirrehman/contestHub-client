import { motion } from "framer-motion";
import { FaShieldAlt } from "react-icons/fa";

const TrustBadges = () => {
  const partners = [
    {
      name: "Vercel",
      description: "Hosting",
      logo: (
        <svg viewBox="0 0 76 65" fill="currentColor" className="w-8 h-8">
          <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
        </svg>
      ),
    },
    {
      name: "AWS",
      description: "Infrastructure",
      logo: (
        <svg
          viewBox="0 0 64 64"
          fill="currentColor"
          className="w-10 h-10 text-orange-500"
        >
          <path d="M18.3 44.3c-5.1-3.8-8.3-9.8-8.3-16.5 0-11.4 9.2-20.6 20.6-20.6 8.5 0 15.8 5.1 19 12.4l3.5-1.4C49.5 9.4 40.5 3 30.1 3 16.4 3 5.3 14.1 5.3 27.8c0 8.6 4.4 16.2 11 20.7l2-4.2z" />
          <path d="M57.5 27.8c0 4.9-1.7 9.4-4.5 13l2.7 3.3c3.7-4.5 5.9-10.2 5.9-16.3 0-7.3-3-13.8-7.8-18.5l-2.7 3.3c3.8 3.8 6.4 9.2 6.4 15.2z" />
          <path d="M30.1 43.5c-8.7 0-15.7-7-15.7-15.7s7-15.7 15.7-15.7c6.5 0 12.1 3.9 14.5 9.6l3.6-1.5c-3-7-9.9-11.9-18.1-11.9-10.8 0-19.5 8.7-19.5 19.5s8.7 19.5 19.5 19.5c8.2 0 15.1-5 18.1-12l-3.6-1.5c-2.4 5.8-8 9.7-14.5 9.7z" />
        </svg>
      ),
    },
    {
      name: "Stripe",
      description: "Secure Payments",
      logo: (
        <svg
          viewBox="0 0 60 25"
          fill="currentColor"
          className="w-12 h-6 text-[#635bff]"
        >
          <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.02 1.04-.06 1.48zm-3.67-3.07c0-1.62-.77-2.91-2.07-2.91-1.28 0-2.18 1.16-2.32 2.91h4.39z" />
          <path d="M34.94 20.29h4.22V5.62h-4.22v14.67z" />
          <path d="M28.64 5.62l-.26 1.34c-.78-.32-1.88-.57-2.72-.57-1.17 0-1.85.4-1.85 1.17 0 .85.88 1.17 2.18 1.6 2.03.66 3.46 1.73 3.46 4.05 0 3.38-2.72 5.08-6.07 5.08-1.6 0-3.2-.32-4.01-.66V14.2c.93.44 2.37.81 3.68.81 1.32 0 2.14-.35 2.14-1.23 0-.81-.66-1.17-2.03-1.56-2.32-.66-3.63-1.7-3.63-4.04 0-2.97 2.37-4.89 5.82-4.89 1.17 0 2.5.19 3.29.47v1.86z" />
          <path d="M16.28 20.29h4.22V.85h-4.22v19.44z" />
          <path d="M11.54 20.29h4.22V5.62h-4.22v14.67zm2.12-16.59c1.36 0 2.47-.98 2.47-2.2 0-1.24-1.1-2.2-2.47-2.2-1.36 0-2.47.96-2.47 2.2 0 1.22 1.1 2.2 2.47 2.2z" />
          <path d="M4.22 8.15V5.62H0v14.67h4.22v-7.71c0-2.37 1.6-3.11 3.88-2.69V5.66c-2.07 0-3.35.74-3.88 2.5z" />
        </svg>
      ),
    },
    {
      name: "Firebase",
      description: "Authentication",
      logo: (
        <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
          <path
            d="M5.8 24.6l.17-.237 8.02-15.214.017-.03-.017-.04-3.236-6.1a.477.477 0 0 0-.87.054L5.8 24.6z"
            fill="#FFC24A"
          />
          <path
            d="M5.9 24.42l.1-.18 8.02-15.14-3.3-6.25a.42.42 0 0 0-.77.05L5.9 24.42z"
            fill="#FFA712"
          />
          <path
            d="M16.58 13.72l2.54-2.66L16.58 6a.42.42 0 0 0-.72 0l-1.36 2.62v.1l2.08 5z"
            fill="#F4BD62"
          />
          <path
            d="M16.58 13.5l-2.07-4.88-1.37 2.63 3.44 2.25z"
            fill="#FFA50E"
          />
          <path
            d="M5.8 24.6l.18-.12 10.48-6.17.1-.4-2.52-4.2-8.24 10.9z"
            fill="#F6820C"
          />
          <path
            d="M26.2 24.6L24.3 5.84a.45.45 0 0 0-.77-.25L5.8 24.6l9.2 5.16a1.26 1.26 0 0 0 1.22 0l9.98-5.16z"
            fill="#FDE068"
          />
          <path
            d="M24.3 5.83a.45.45 0 0 0-.77-.24L20.4 9.2l-3.82 4.1 10.08 11.1 1.54-18.57z"
            fill="#FCCA3F"
          />
          <path
            d="M16.22 29.7a1.26 1.26 0 0 1-1.22 0L5.9 24.6l-.1.06 9.2 5.1a1.26 1.26 0 0 0 1.22 0l9.98-5.1-.1-.06-9.88 5.1z"
            fill="#EEAB37"
          />
        </svg>
      ),
    },
    {
      name: "MongoDB",
      description: "Database",
      logo: (
        <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
          <path
            d="M16.62 30l-.74-.26s.09-3.65-1.22-3.91c-.87-.96.14-40.75 3.9.44 0 0-1.62.72-1.86 2.04-.26 1.3-.08 1.69-.08 1.69z"
            fill="#A6A385"
          />
          <path
            d="M17.12 26.6s5.47-3.57 4.1-11.13c-1.2-6.6-3.86-8.8-4.2-9.73-.38-.7-.74-1.65-.74-1.65l.3 19.54.54 2.97z"
            fill="#499D4A"
          />
          <path
            d="M15.06 26.8s-5.04-3.4-4.6-9.6c.52-7.32 4-10.08 4.7-10.93.3-.5.4-.83.4-1.25l.1 21.44-.6.35z"
            fill="#58AA50"
          />
        </svg>
      ),
    },
    {
      name: "Cloudflare",
      description: "Security",
      logo: (
        <svg viewBox="0 0 32 32" fill="none" className="w-10 h-10">
          <path
            d="M22.8 21.8l.4-1.4c.3-1 .2-1.8-.2-2.4-.4-.5-1-.8-1.7-.9l-11.7-.2c-.1 0-.2 0-.3-.1s-.1-.2 0-.3c0-.1.1-.2.2-.2l11.8-.2c1.7-.1 3.5-1.5 4.1-3.2l.8-2.2c0-.1.1-.2 0-.3-1-4-4.6-6.9-8.8-6.9-4.1 0-7.6 2.7-8.7 6.4-.8-.6-1.7-.9-2.8-.8-1.8.1-3.3 1.5-3.5 3.3-.1.5 0 1 .1 1.5-2.5.3-4.5 2.4-4.5 5 0 .5.1 1 .2 1.4.1.2.2.3.4.3H22.4c.2 0 .3-.1.4-.3z"
            fill="#F6821F"
          />
          <path
            d="M25.6 11.6c-.1 0-.3 0-.4.1l-.2 1c-.3 1-.2 1.8.2 2.4.4.5 1 .8 1.7.9l2.4.2c.1 0 .2 0 .3.1s.1.2 0 .3c0 .1-.1.2-.2.2l-2.5.2c-1.7.1-3.5 1.5-4.1 3.2l-.2.7c-.1.2 0 .3.2.3h9.6c.2 0 .3-.1.4-.2.3-.8.5-1.8.5-2.7 0-3.5-2.8-6.4-6.3-6.7h-1.4z"
            fill="#FBAD41"
          />
        </svg>
      ),
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
    <section className="section-padding-sm bg-base-200 overflow-hidden">
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

        {/* Partners Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative mb-10"
        >
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-base-200 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-base-200 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <div className="flex animate-marquee hover:[animation-play-state:paused]">
            {/* Double the items for seamless loop */}
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-4 px-6 py-4 bg-base-100 rounded-2xl border border-base-300 hover:border-cyan-500/50 hover:shadow-lg transition-all flex items-center gap-4 min-w-[180px]"
              >
                <div className="flex-shrink-0">{partner.logo}</div>
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
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {trustBadges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-base-100 rounded-2xl border border-base-300 hover:shadow-md transition-shadow"
            >
              <span className="text-3xl">{badge.icon}</span>
              <div>
                <p className="font-semibold text-base-content">{badge.title}</p>
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
