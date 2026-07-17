import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { IS_UNDER_MAINTENANCE } from './config';
import Layout from './components/Layout';
import Maintenance from './pages/Maintenance';
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import About from './pages/About';
import Testimonials from './pages/Testimonials';
import Support from './pages/Support';
import Faq from './pages/Faq';
import Process from './pages/Process';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ProjectDetail from './pages/ProjectDetail';
import PricingDetail from './pages/PricingDetail';

function App() {
  if (IS_UNDER_MAINTENANCE) {
    return (
      <ThemeProvider>
        <Maintenance />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="pricing/:slug" element={<PricingDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="support" element={<Support />} />
            <Route path="faq" element={<Faq />} />
            <Route path="process" element={<Process />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
