import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExternalLinkAlt, FaFilePdf, FaEye, FaDownload, FaImage } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';
import styles from './Certificates.module.css';

const Certificates = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [preview, setPreview] = useState(null);

  const categories = ['All', 'Achievements', 'Participation', 'Workshops', 'Internships', 'Courses'];

  const filteredCertificates = activeCategory === 'All'
    ? portfolioData.certificates
    : portfolioData.certificates.filter(cert => cert.category === activeCategory);

  const openPreview = (cert) => setPreview(cert);
  const closePreview = () => setPreview(null);

  // Helper to trigger direct PDF/image download
  const handleDownload = (e, cert) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = cert.url;
    link.setAttribute('download', cert.title);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="certificates" className={styles.certificatesSection}>
      <div className="container">
        <h2 className="section-title">Certificates &amp; Credentials</h2>

        {/* Filter Tabs */}
        <div className={styles.filterContainer}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.filterTab} ${activeCategory === category ? styles.activeTab : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <motion.div 
          layout
          className={styles.grid}
        >
          <AnimatePresence mode="popLayout">
            {filteredCertificates.map((cert, index) => (
              <motion.div
                layout
                key={cert.url}
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
              >
                <div className={styles.mediaContainer} onClick={() => openPreview(cert)}>
                  {cert.ext === 'pdf' ? (
                    <div className={styles.pdfThumbnail}>
                      <FaFilePdf className={styles.pdfIcon} />
                      <span>PDF Document</span>
                    </div>
                  ) : (
                    <div className={styles.imgThumbnail}>
                      <img src={cert.url} alt={cert.title} className={styles.thumbImg} loading="lazy" />
                      <div className={styles.imgOverlay}>
                        <FaImage size={24} />
                      </div>
                    </div>
                  )}
                  <div className={styles.categoryBadge}>{cert.category}</div>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.certTitle}>{cert.title}</h3>
                  <p className={styles.certOrg}>{cert.organization}</p>
                  <span className={styles.certDate}>{cert.date}</span>

                  <div className={styles.actions}>
                    <button 
                      className={styles.viewBtn} 
                      onClick={() => openPreview(cert)}
                      title="View Certificate"
                    >
                      <FaEye /> View
                    </button>
                    <button 
                      className={styles.downloadBtn} 
                      onClick={(e) => handleDownload(e, cert)}
                      title="Download Certificate"
                    >
                      <FaDownload /> Download
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePreview}
          >
            <button className={styles.closeBtn} onClick={closePreview} aria-label="Close">
              <FaTimes />
            </button>
            <motion.div
              className={styles.lightboxContent}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <div>
                  <h3>{preview.title}</h3>
                  <p>{preview.organization} &bull; {preview.date}</p>
                </div>
                <div className={styles.headerActions}>
                  <a 
                    href={preview.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.modalActionLink}
                    title="Open in new tab"
                  >
                    <FaExternalLinkAlt /> Open Original
                  </a>
                  <button 
                    onClick={(e) => handleDownload(e, preview)}
                    className={styles.modalActionBtn}
                    title="Download"
                  >
                    <FaDownload /> Save File
                  </button>
                </div>
              </div>

              <div className={styles.modalBody}>
                {preview.ext === 'pdf' ? (
                  <iframe
                    src={`${preview.url}#toolbar=0`}
                    title={preview.title}
                    className={styles.pdfEmbed}
                  />
                ) : (
                  <img src={preview.url} alt={preview.title} className={styles.lightboxImg} />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
