import React from 'react';
import { motion } from 'framer-motion';
import styles from './Skills.module.css';
import { portfolioData } from '../data/portfolioData';

const Skills = () => {
  return (
    <section id="skills" className={styles.skillsSection}>
      <div className="container">
        <h2 className="section-title">My Skills</h2>
        <div className={styles.skillsGrid}>
          {portfolioData.skills.map((skillGroup, index) => (
            <motion.div 
              key={index} 
              className={styles.skillCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className={styles.categoryTitle}>{skillGroup.category}</h3>
              <div className={styles.skillItems}>
                {skillGroup.items.map((item, idx) => (
                  <span key={idx} className={styles.skillBadge}>{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
