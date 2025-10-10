
import Hero from "../components/Hero";
import Information from "../components/Information";
import MainLayout from "../components/MainLayout"


const Home = () => {
  
      const menuLinks = [
    { label: "Home", path: "/" },
    { label: "Our Services", path: "/services" },
    { label: "Find Doctors", path: "/find-doctors" },
    { label: "News and Update", path: "/news-updates" },
    { label: "Patient Rights", path: "/patient-rights" },
    { label: "Online Patient Survey", path: "/online-patient-survey" },

  ];

  return (
    <MainLayout>

          <Hero />

          {/* Information Section */}
          <Information />
    </MainLayout>
       
  );
};

export default Home;