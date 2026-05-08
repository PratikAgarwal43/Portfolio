import React from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import { portfolioData } from '../data/portfolioData';

const About = () => {
  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className={styles.content}>
          <motion.div 
            className={styles.textContainer}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className={styles.paragraph}>{portfolioData.about.introduction}</p>
            <p className={styles.paragraph}>{portfolioData.about.journey}</p>
            <p className={styles.paragraph}>{portfolioData.about.goals}</p>
          </motion.div>
          
          <motion.div 
            className={styles.imageContainer}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.imageWrapper}>
              <div className={styles.imagePlaceholder}>
                <span>Developer Image</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
