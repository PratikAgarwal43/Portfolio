import { useState, useEffect } from 'react';
import { HiMenu, HiX, HiSun, HiMoon } from 'react-icons/hi';
import styles from './Navbar.module.css';
import { portfolioData } from '../data/portfolioData';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Academics', href: '#academics' },
    { name: 'Journey', href: '#journey' },
    { name: 'Projects', href: '#projects' },
    { name: 'Resume', href: '#resume' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <a href="#home" className={styles.logo}>
          {portfolioData.personalInfo.name.split(' ')[0]}<span>.dev</span>
        </a>

        <div className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          {navLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              className={styles.navLink}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href={portfolioData.personalInfo.resumeLink} 
            className={styles.resumeBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>

          {/* Theme Toggle in Menu for Mobile or End for Desktop */}
          <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle Theme">
            {theme === 'dark' ? <HiSun size={22} className={styles.themeIcon} /> : <HiMoon size={22} className={styles.themeIcon} />}
          </button>
        </div>

        {/* Mobile Navbar controls */}
        <div className={styles.mobileRight}>
          <button onClick={toggleTheme} className={`${styles.themeToggle} ${styles.mobileThemeToggle}`} aria-label="Toggle Theme">
            {theme === 'dark' ? <HiSun size={22} /> : <HiMoon size={22} />}
          </button>
          <div className={styles.hamburger} onClick={toggleMenu}>
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
