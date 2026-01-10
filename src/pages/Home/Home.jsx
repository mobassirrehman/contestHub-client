import Banner from "../Banner/Banner";
import ContestCategories from "../ContestCategories/ContestCategories";
import CTASection from "../CTASection/CTASection";
import FeaturedCreators from "../FeaturedCreators/FeaturedCreators";
import HowItWorks from "../HowItWorks/HowItWorks";
import PopularContests from "../PopularContests/PopularContests";
import Testimonials from "../Testimonials/Testimonials";
import TrustBadges from "../TrustBadges/TrustBadges";
import WhyChooseUs from "../Whychooseus/Whychooseus";
import WinnerSection from "../WinnerSection/WinnerSection";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularContests></PopularContests>
      <ContestCategories></ContestCategories>
      <WinnerSection></WinnerSection>
      <HowItWorks></HowItWorks>
      <CTASection></CTASection>
      <Testimonials></Testimonials>
      <WhyChooseUs></WhyChooseUs>
      <TrustBadges></TrustBadges>
      <FeaturedCreators></FeaturedCreators>
    </div>
  );
};

export default Home;
