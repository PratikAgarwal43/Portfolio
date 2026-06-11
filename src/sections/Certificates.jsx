import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExternalLinkAlt, FaFilePdf, FaCertificate } from 'react-icons/fa';
import styles from './Certificates.module.css';

// Dynamically import all files from public/Certificates
const rawCerts = import.meta.glob(
  '/public/Certificates/*.{jpg,jpeg,png,pdf}',
  { eager: true, as: 'url' }
);

function parseName(filepath) {
  const filename = filepath.split('/').pop();
  // Remove extension
  const noExt = filename.replace(/\.[^.]+$/, '');
  // Strip parenthesis content into subtitle
  const match = noExt.match(/^(.*?)\((.+)\)$/);
  if (match) {
    return { title: match[2].trim(), subtitle: match[1].trim() };
  }
  return { title: noExt, subtitle: '' };
}

const certificates = Object.entries(rawCerts).map(([path, url]) => {
  const ext = path.split('.').pop().toLowerCase();
  const { title, subtitle } = parseName(path);
  return { url, ext, title, subtitle, path };
});

const Certificates = () => {
  const [preview, setPreview] = useState(null);

  const open = (cert) => setPreview(cert);
  const close = () => setPreview(null);

  return (
    <section id="certificates" className={styles.certificatesSection}>
      <div className="container">
        <h2 className="section-title">Certificates &amp; Achievements</h2>
        <div className={styles.grid}>
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              className={styles.card}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              onClick={() => open(cert)}
            >
              {cert.ext === 'pdf' ? (
                <div className={styles.pdfThumb}>
                  <FaFilePdf className={styles.pdfIcon} />
                </div>
              ) : (
                <div className={styles.imgThumb}>
                  <img src={cert.url} alt={cert.title} className={styles.thumbImg} loading="lazy" />
                </div>
              )}
              <div className={styles.cardBody}>
                <h3 className={styles.certTitle}>{cert.title}</h3>
                {cert.subtitle && <p className={styles.certSubtitle}>{cert.subtitle}</p>}
              </div>
              <div className={styles.viewHint}>
                <FaExternalLinkAlt size={13} /> Preview
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {preview && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button className={styles.closeBtn} onClick={close} aria-label="Close">
              <FaTimes />
            </button>
            <motion.div
              className={styles.lightboxContent}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {preview.ext === 'pdf' ? (
                <iframe
                  src={preview.url}
                  title={preview.title}
                  className={styles.pdfEmbed}
                />
              ) : (
                <img src={preview.url} alt={preview.title} className={styles.lightboxImg} />
              )}
              <div className={styles.lightboxFooter}>
                <span>{preview.title}</span>
                <a href={preview.url} target="_blank" rel="noopener noreferrer" className={styles.openBtn}>
                  <FaExternalLinkAlt /> Open in new tab
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
