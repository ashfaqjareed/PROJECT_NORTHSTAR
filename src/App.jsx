import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { IS_UNDER_MAINTENANCE, PAGE_VISIBILITY } from './config';
import Layout from './components/Layout';
import Maintenance from './pages/Maintenance';
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import About from './pages/About';
import Support from './pages/Support';

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
            <Route index element={PAGE_VISIBILITY.home ? <Home /> : <Navigate to="/" replace />} />
            <Route path="services" element={PAGE_VISIBILITY.services ? <Services /> : <Navigate to="/" replace />} />
            <Route path="projects" element={PAGE_VISIBILITY.projects ? <Projects /> : <Navigate to="/" replace />} />
            <Route path="projects/:slug" element={PAGE_VISIBILITY.projects ? <ProjectDetail /> : <Navigate to="/" replace />} />
            <Route path="pricing" element={PAGE_VISIBILITY.pricing ? <Pricing /> : <Navigate to="/" replace />} />
            <Route path="pricing/:slug" element={PAGE_VISIBILITY.pricing ? <PricingDetail /> : <Navigate to="/" replace />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="testimonials" element={<Navigate to="/" replace />} />
            <Route path="faq" element={<Navigate to="/" replace />} />
            <Route path="support" element={<Support />} />
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
