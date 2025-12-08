import Banner from "../Banner/Banner";
import ContestCategories from "../ContestCategories/ContestCategories";
import CTASection from "../CTASection/CTASection";
import HowItWorks from "../HowItWorks/HowItWorks";
import PopularContests from "../PopularContests/PopularContests";
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
    </div>
  );
};

export default Home;
