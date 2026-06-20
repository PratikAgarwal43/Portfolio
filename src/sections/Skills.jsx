import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiPython, 
  SiCplusplus, 
  SiJavascript, 
  SiHtml5, 
  SiCss, 
  SiReact, 
  SiVite, 
  SiPostgresql, 
  SiMongodb, 
  SiGit, 
  SiGithub, 
  SiVscodium,
  SiCssmodules
} from 'react-icons/si';
import { FaCode, FaRobot, FaBrain } from 'react-icons/fa';
import styles from './Skills.module.css';
import { portfolioData } from '../data/portfolioData';

const getIcon = (iconName) => {
  switch (iconName) {
    case 'SiPython': return <SiPython />;
    case 'SiCplusplus': return <SiCplusplus />;
    case 'SiJavascript': return <SiJavascript />;
    case 'SiHtml5': return <SiHtml5 />;
    case 'SiCss3': return <SiCss />;
    case 'SiReact': return <SiReact />;
    case 'SiCssmodules': return <SiCssmodules />;
    case 'SiVite': return <SiVite />;
    case 'SiPostgresql': return <SiPostgresql />;
    case 'SiMongodb': return <SiMongodb />;
    case 'SiGit': return <SiGit />;
    case 'SiGithub': return <SiGithub />;
    case 'SiVisualstudiocode': return <SiVscodium />;
    case 'FaCode': return <FaCode />;
    case 'FaRobot': return <FaRobot />;
    case 'FaBrain': return <FaBrain />;
    default: return <FaCode />;
  }
};

const Skills = () => {
  return (
    <section id="skills" className={styles.skillsSection}>
      <div className="container">
        <h2 className="section-title">Skills &amp; Expertise</h2>
        
        <div className={styles.skillsGrid}>
          {portfolioData.skills.map((skillGroup, index) => (
            <motion.div 
              key={index} 
              className={styles.skillCard}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className={styles.categoryTitle}>{skillGroup.category}</h3>
              <div className={styles.skillItems}>
                {skillGroup.items.map((item, idx) => (
                  <div key={idx} className={styles.skillRow}>
                    <div className={styles.skillHeader}>
                      <div className={styles.skillInfo}>
                        <span className={styles.skillIcon}>{getIcon(item.icon)}</span>
                        <span className={styles.skillName}>{item.name}</span>
                      </div>
                      <span className={styles.skillPercent}>{item.level}%</span>
                    </div>
                    
                    <div className={styles.progressBar}>
                      <motion.div 
                        className={styles.progressBarFill}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
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
