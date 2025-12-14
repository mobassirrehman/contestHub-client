import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FaPaintBrush,
  FaPen,
  FaGamepad,
  FaBullhorn,
  FaCode,
  FaCamera,
} from "react-icons/fa";

const ContestCategories = () => {
  const categories = [
    {
      name: "Image Design",
      slug: "image-design",
      icon: <FaPaintBrush />,
      color: "from-pink-500/70 to-rose-500/70",
      bgImage: "https://i.ibb.co.com/LDLhyBSq/image-design.avif",
      count: "45+ Contests",
    },
    {
      name: "Article Writing",
      slug: "article-writing",
      icon: <FaPen />,
      color: "from-blue-500/80 to-cyan-500/80",
      bgImage: "https://i.ibb.co.com/LhNYqVZ4/article-writing.avif",
      count: "32+ Contests",
    },
    {
      name: "Gaming Review",
      slug: "gaming-review",
      icon: <FaGamepad />,
      color: "from-purple-500/80 to-violet-500/80",
      bgImage: "https://i.ibb.co.com/ynPfw06Q/gaming-review.avif",
      count: "28+ Contests",
    },
    {
      name: "Marketing Strategy",
      slug: "marketing-strategy",
      icon: <FaBullhorn />,
      color: "from-orange-500/80 to-amber-500/80",
      bgImage: "https://i.ibb.co.com/3yR4WPkC/marketing-strategy.avif",
      count: "21+ Contests",
    },
    {
      name: "Web Development",
      slug: "web-development",
      icon: <FaCode />,
      color: "from-green-500/80 to-emerald-500/80",
      bgImage: "https://i.ibb.co.com/KzQVvyNq/web-developement.avif",
      count: "38+ Contests",
    },
    {
      name: "Photography",
      slug: "photography",
      icon: <FaCamera />,
      color: "from-red-500/80 to-pink-500/80",
      bgImage: "https://i.ibb.co.com/gL2ZK8pt/photography.avif",
      count: "25+ Contests",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Explore Contest Categories
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Find the perfect competition that matches your skills and interests.
            We have contests for every creative mind.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Link
                to={`/all-contests?type=${category.slug}`}
                className="block relative h-48 lg:h-56 rounded-2xl overflow-hidden"
              >
                <img
                  src={category.bgImage}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div
                  className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80 group-hover:opacity-90 transition-opacity`}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-center text-sm lg:text-base">
                    {category.name}
                  </h3>
                  <span className="text-xs opacity-80 mt-1">
                    {category.count}
                  </span>
                </div>

                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-2xl transition-colors" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContestCategories;
