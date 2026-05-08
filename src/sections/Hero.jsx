import React from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import { portfolioData } from '../data/portfolioData';

const Hero = () => {
  return (
    <section id="home" className={styles.hero}>
      <div className={`container ${styles.heroContainer}`}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.greeting}>Hello, I'm</h2>
          <h1 className={styles.name}>{portfolioData.personalInfo.name}</h1>
          <h3 className={styles.title}>{portfolioData.personalInfo.title}</h3>
          <p className={styles.summary}>{portfolioData.personalInfo.summary}</p>
          
          <div className={styles.actions}>
            <a href="#projects" className={styles.primaryBtn}>View Work</a>
            <a href="#contact" className={styles.secondaryBtn}>Contact Me</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
