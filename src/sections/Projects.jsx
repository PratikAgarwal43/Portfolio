import React from 'react';
import { motion } from 'framer-motion';
import styles from './Projects.module.css';
import { portfolioData } from '../data/portfolioData';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  return (
    <section id="projects" className={styles.projectsSection}>
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className={styles.projectsGrid}>
          {portfolioData.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
