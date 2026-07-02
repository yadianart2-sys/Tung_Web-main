import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import WhyTung from './components/WhyTung.jsx';
import Tokenomics from './components/Tokenomics.jsx';
import HowToBuy from './components/HowToBuy.jsx';
import PassiveIncome from './components/PassiveIncome.jsx';
import ViralMeme from './components/ViralMeme.jsx';
import Roadmap from './components/Roadmap.jsx';
import GameSection from './components/GameSection.jsx';
import Footer from './components/Footer.jsx';
import SEO from './components/SEO.jsx';

export default function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-[#050505] text-white font-sans">
        <SEO />
        <Navbar />
        <main>
          <Hero />
          <WhyTung />
          <Tokenomics />
          <HowToBuy />
          <PassiveIncome />
          <ViralMeme />
          <Roadmap />
          <GameSection />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}
