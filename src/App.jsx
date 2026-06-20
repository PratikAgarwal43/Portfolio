import { lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import BackToTop from './components/BackToTop';
import { portfolioData } from './data/portfolioData';

// Lazy load sections below the fold
const About = lazy(() => import('./sections/About'));
const Skills = lazy(() => import('./sections/Skills'));
const AcademicCoursework = lazy(() => import('./sections/AcademicCoursework'));
const Timeline = lazy(() => import('./sections/Timeline'));
const Projects = lazy(() => import('./sections/Projects'));
const Resume = lazy(() => import('./sections/Resume'));
const Certificates = lazy(() => import('./sections/Certificates'));
const Testimonials = lazy(() => import('./sections/Testimonials'));
const Gallery = lazy(() => import('./sections/Gallery'));
const Contact = lazy(() => import('./sections/Contact'));

// Skeleton Loader fallback for Suspense
const SectionSkeleton = () => (
  <div 
    style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '6rem 2rem', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1.5rem' 
    }}
  >
    <div 
      style={{ 
        width: '180px', 
        height: '2.5rem', 
        background: 'var(--bg-tertiary, #1f1f1f)', 
        borderRadius: '6px', 
        alignSelf: 'center',
        opacity: 0.6,
        marginBottom: '2rem'
      }} 
    />
    <div 
      style={{ 
        width: '100%', 
        height: '12rem', 
        background: 'var(--bg-tertiary, #1f1f1f)', 
        borderRadius: '12px',
        opacity: 0.4
      }} 
    />
  </div>
);

function App() {
  // Google Analytics setup
  useEffect(() => {
    const gaId = portfolioData.personalInfo.googleAnalyticsId;
    if (gaId && gaId !== 'G-XXXXXXXXXX') {
      // Script 1: tag manager source script
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script1);

      // Script 2: gtag initializers
      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `;
      document.head.appendChild(script2);
    }
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <Hero />
        <Suspense fallback={<SectionSkeleton />}>
          <About />
          <Skills />
          <AcademicCoursework />
          <Timeline />
          <Projects />
          <Resume />
          <Certificates />
          <Testimonials />
          <Gallery />
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloat />
      <BackToTop />
    </>
  );
}

export default App;
