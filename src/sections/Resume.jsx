import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaDownload, FaFilePdf, FaEyeSlash } from 'react-icons/fa';
import styles from './Resume.module.css';
import { portfolioData } from '../data/portfolioData';

const Resume = () => {
  const resumePath = portfolioData.personalInfo.resumeLink;
  const [showPreview, setShowPreview] = useState(true);

  return (
    <section id="resume" className={styles.resumeSection}>
      <div className="container">
        <h2 className="section-title">Resume</h2>
        
        <div className={styles.resumeContainer}>
          <motion.div
            className={styles.resumeCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.iconArea}>
              <FaFilePdf className={styles.pdfIcon} />
              <div>
                <h3 className={styles.resumeTitle}>{portfolioData.personalInfo.name} — Resume</h3>
                <p className={styles.resumeSubtitle}>{portfolioData.personalInfo.title} &bull; Full Stack Developer</p>
              </div>
            </div>

            <div className={styles.actions}>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`${styles.viewBtn} ${showPreview ? styles.activeViewBtn : ''}`}
                title="Toggle Inline Preview"
              >
                {showPreview ? <><FaEyeSlash /> Hide Preview</> : <><FaEye /> Preview Resume</>}
              </button>
              <a
                id="download-resume-btn"
                href={resumePath}
                download="resume-pratik-agarwal.pdf"
                className={styles.downloadBtn}
                title="Download PDF"
              >
                <FaDownload /> Download PDF
              </a>
            </div>
          </motion.div>

          {/* Inline PDF Preview */}
          <AnimatePresence>
            {showPreview && (
              <motion.div
                className={styles.previewContainer}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.iframeWrapper}>
                  <iframe
                    src={`${resumePath}#toolbar=0&navpanes=0`}
                    title="Resume Preview"
                    className={styles.resumeIframe}
                  />
                  <div className={styles.mobilePreviewOverlay}>
                    <FaFilePdf size={40} className={styles.overlayPdfIcon} />
                    <p>PDF Preview is best viewed on larger screens.</p>
                    <a 
                      href={resumePath} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.overlayOpenBtn}
                    >
                      Open PDF in New Tab
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Resume;
