import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaTrophy, FaCertificate } from 'react-icons/fa';
import styles from './Timeline.module.css';
import { portfolioData } from '../data/portfolioData';

const Timeline = () => {
  const getIcon = (type) => {
    switch (type) {
      case 'education': return <FaGraduationCap />;
      case 'internship': return <FaBriefcase />;
      case 'achievement': return <FaTrophy />;
      case 'certification': return <FaCertificate />;
      default: return <FaCertificate />;
    }
  };

  return (
    <section id="journey" className={styles.timelineSection}>
      <div className="container">
        <h2 className="section-title">Timeline &amp; Journey</h2>

        <div className={styles.timelineContainer}>
          <div className={styles.timelineLine} />

          {portfolioData.timeline.map((item, index) => (
            <motion.div
              key={item.id}
              className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Timeline Icon */}
              <div className={`${styles.iconWrapper} ${styles[item.type]}`}>
                {getIcon(item.type)}
              </div>

              {/* Card Content */}
              <div className={styles.card}>
                <span className={styles.date}>{item.date}</span>
                <h3 className={styles.title}>{item.title}</h3>
                <h4 className={styles.organization}>{item.organization}</h4>
                <p className={styles.description}>{item.description}</p>
                <span className={styles.badge}>{item.type.toUpperCase()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
