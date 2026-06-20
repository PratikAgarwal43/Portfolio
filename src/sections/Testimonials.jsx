import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import styles from './Testimonials.module.css';
import { portfolioData } from '../data/portfolioData';

const Testimonials = () => {
  return (
    <section id="testimonials" className={styles.testimonialsSection}>
      <div className="container">
        <h2 className="section-title">Testimonials</h2>
        
        <div className={styles.grid}>
          {portfolioData.testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              className={styles.card}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className={styles.quoteIconWrapper}>
                <FaQuoteLeft className={styles.quoteIcon} />
              </div>
              
              <p className={styles.feedback}>"{item.feedback}"</p>
              
              <div className={styles.authorInfo}>
                <h4 className={styles.name}>{item.name}</h4>
                <p className={styles.role}>
                  {item.role} &bull; <span>{item.organization}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
