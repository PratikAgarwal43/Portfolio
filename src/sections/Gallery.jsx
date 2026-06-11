import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './Gallery.module.css';

// Dynamically import all images from public/Gallery via Vite's glob
const rawImages = import.meta.glob('/public/Gallery/*.{jpg,jpeg,png,gif,webp}', { eager: true, as: 'url' });

const images = Object.entries(rawImages).map(([path, url]) => ({
  src: url,
  alt: path.split('/').pop().replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
}));

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (images.length === 0) return null;

  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = () => setLightboxIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setLightboxIndex((i) => (i + 1) % images.length);

  return (
    <section id="gallery" className={styles.gallerySection}>
      <div className="container">
        <h2 className="section-title">Gallery</h2>
        <div className={styles.grid}>
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              className={styles.item}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              onClick={() => openLightbox(idx)}
            >
              <img src={img.src} alt={img.alt} className={styles.image} loading="lazy" />
              <div className={styles.overlay}>
                <span className={styles.overlayText}>{img.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button className={styles.closeBtn} onClick={closeLightbox} aria-label="Close">
              <FaTimes />
            </button>
            <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">
              <FaChevronLeft />
            </button>
            <motion.img
              key={lightboxIndex}
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              className={styles.lightboxImage}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">
              <FaChevronRight />
            </button>
            <p className={styles.lightboxCaption}>{images[lightboxIndex].alt}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
