import React from 'react';
import { motion } from 'framer-motion';
import styles from './Certificates.module.css';
import { portfolioData } from '../data/portfolioData';
import CertificateCard from '../components/CertificateCard';

const Certificates = () => {
  if (!portfolioData.certificates || portfolioData.certificates.length === 0) return null;

  return (
    <section id="certificates" className={styles.certificatesSection}>
      <div className="container">
        <h2 className="section-title">Certificates & Achievements</h2>
        <div className={styles.grid}>
          {portfolioData.certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <CertificateCard cert={cert} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
