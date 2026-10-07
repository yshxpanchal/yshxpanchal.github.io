import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import TerminalEasterEgg from './components/TerminalEasterEgg';
import PortfolioLoader from './components/PortfolioLoader';

import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Certifications from './sections/Certifications';
import Education from './sections/Education';
import GitHubActivity from './sections/GitHubActivity';
import Contact from './sections/Contact';

export default function App() {
  return (
    <div className="relative min-h-screen bg-bg text-slate-200">
      <div className="relative z-10">
        <PortfolioLoader />
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Certifications />
          <GitHubActivity />
          <Education />
          <Contact />
        </main>
        <TerminalEasterEgg />
      </div>
    </div>
  );
}
