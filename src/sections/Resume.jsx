import React from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaDownload, FaFilePdf } from 'react-icons/fa';
import styles from './Resume.module.css';
import { portfolioData } from '../data/portfolioData';

const Resume = () => {
  const resumePath = portfolioData.personalInfo.resumeLink;

  return (
    <section id="resume" className={styles.resumeSection}>
      <div className="container">
        <h2 className="section-title">My Resume</h2>
        <motion.div
          className={styles.resumeCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.iconArea}>
            <FaFilePdf className={styles.pdfIcon} />
            <div>
              <h3 className={styles.resumeTitle}>Pratik Agarwal — Resume</h3>
              <p className={styles.resumeSubtitle}>Software Engineering Student · Full Stack &amp; AI Enthusiast</p>
            </div>
          </div>

          <div className={styles.actions}>
            <a
              id="view-resume-btn"
              href={resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.viewBtn}
            >
              <FaEye /> View Resume
            </a>
            <a
              id="download-resume-btn"
              href={resumePath}
              download="resume-pratik-agarwal.pdf"
              className={styles.downloadBtn}
            >
              <FaDownload /> Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
