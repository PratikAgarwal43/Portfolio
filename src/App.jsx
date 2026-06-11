import React from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import AcademicCoursework from './sections/AcademicCoursework';
import Projects from './sections/Projects';
import Resume from './sections/Resume';
import Certificates from './sections/Certificates';
import Gallery from './sections/Gallery';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <AcademicCoursework />
        <Projects />
        <Resume />
        <Certificates />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
