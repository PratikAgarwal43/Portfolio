import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={project.image} alt={project.title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.techStack}>
          {project.techStack.map((tech, index) => (
            <span key={index} className={styles.techBadge}>{tech}</span>
          ))}
        </div>
        <div className={styles.links}>
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={styles.link}>
            <FaGithub /> Code
          </a>
          <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className={styles.link}>
            <FaExternalLinkAlt /> Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
