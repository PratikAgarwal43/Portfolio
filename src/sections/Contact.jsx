import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import styles from './Contact.module.css';
import { portfolioData } from '../data/portfolioData';

const Contact = () => {
  return (
    <section id="contact" className={styles.contactSection}>
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className={styles.contactContainer}>
          <motion.div 
            className={styles.contactInfo}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Let's Connect</h3>
            <p>I'm currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
            
            <div className={styles.infoItems}>
              <a
                href={`mailto:${portfolioData.personalInfo.email}`}
                className={styles.infoItem}
              >
                <FaEnvelope className={styles.icon} />
                <span>{portfolioData.personalInfo.email}</span>
              </a>
              <a
                href={`https://wa.me/${portfolioData.personalInfo.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoItem}
              >
                <FaWhatsapp className={`${styles.icon} ${styles.whatsappIcon}`} />
                <span>{portfolioData.personalInfo.whatsapp}</span>
              </a>
              <div className={styles.infoItem}>
                <FaMapMarkerAlt className={styles.icon} />
                <span>{portfolioData.personalInfo.location}</span>
              </div>
            </div>
            
            <div className={styles.socials}>
              {portfolioData.socialLinks.github && (
                <a href={portfolioData.socialLinks.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub size={24} />
                </a>
              )}
              {portfolioData.socialLinks.linkedin && (
                <a href={portfolioData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={24} />
                </a>
              )}
            </div>
          </motion.div>
          
          <motion.div 
            className={styles.contactForm}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Your Name" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Your Email" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" placeholder="Your Message"></textarea>
              </div>
              <button type="submit" className={styles.submitBtn}>Send Message</button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
