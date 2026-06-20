import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import styles from './Footer.module.css';
import { portfolioData } from '../data/portfolioData';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerBrand}>
          <h3>{portfolioData.personalInfo.name}</h3>
          <p>{portfolioData.personalInfo.title}</p>
        </div>
        
        <div className={styles.socialLinks}>
          {portfolioData.socialLinks.github && (
            <a href={portfolioData.socialLinks.github} target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} />
            </a>
          )}
          {portfolioData.socialLinks.linkedin && (
            <a href={portfolioData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} />
            </a>
          )}
          {portfolioData.socialLinks.twitter && (
            <a href={portfolioData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} />
            </a>
          )}
        </div>
        
        <div className={styles.footerCopyright}>
          <p>&copy; {new Date().getFullYear()} {portfolioData.personalInfo.name}. Built with React.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
