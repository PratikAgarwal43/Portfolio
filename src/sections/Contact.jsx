import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaLinkedin, 
  FaGithub, 
  FaWhatsapp, 
  FaInstagram,
  FaTelegramPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaSpinner
} from 'react-icons/fa';
import { FaXTwitter, FaThreads } from 'react-icons/fa6';
import styles from './Contact.module.css';
import { portfolioData } from '../data/portfolioData';

const Contact = () => {
  const { personalInfo, socialLinks } = portfolioData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, loading, success, error, mailto-fallback

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Check if Formspree ID is set and not placeholder
    const isFormspreeConfigured = 
      personalInfo.formspreeId && 
      personalInfo.formspreeId !== 'your-formspree-id' &&
      personalInfo.formspreeId.trim() !== '';

    if (!isFormspreeConfigured) {
      // Fallback mode: Mailto
      setStatus('mailto-fallback');
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\nSent via Portfolio Contact Form on ${new Date().toLocaleString()}`
      )}`;
      
      setTimeout(() => {
        window.open(mailtoUrl, '_blank');
        setStatus('idle');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 1000);
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch(`https://formspree.io/f/${personalInfo.formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New Portfolio Message: ${formData.subject}`,
          timestamp: new Date().toLocaleString()
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  // Centralized Social Links Config helper
  const getSocialIcon = (key) => {
    switch (key) {
      case 'github': return <FaGithub />;
      case 'linkedin': return <FaLinkedin />;
      case 'instagram': return <FaInstagram />;
      case 'whatsapp': return <FaWhatsapp />;
      case 'twitter': return <FaXTwitter />;
      case 'threads': return <FaThreads />;
      case 'telegram': return <FaTelegramPlane />;
      default: return null;
    }
  };

  const getSocialLabel = (key) => {
    switch (key) {
      case 'github': return 'GitHub';
      case 'linkedin': return 'LinkedIn';
      case 'instagram': return 'Instagram';
      case 'whatsapp': return 'WhatsApp';
      case 'twitter': return 'X (Twitter)';
      case 'threads': return 'Threads';
      case 'telegram': return 'Telegram';
      default: return key;
    }
  };

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
            <p>
              I'm always open to discussing new projects, internship opportunities, or collaboration. 
              Feel free to reach out via the contact form or any of my social profiles.
            </p>
            
            <div className={styles.infoItems}>
              <a href={`mailto:${personalInfo.email}`} className={styles.infoItem}>
                <FaEnvelope className={styles.icon} />
                <span>{personalInfo.email}</span>
              </a>
              <a 
                href={socialLinks.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.infoItem}
              >
                <FaWhatsapp className={`${styles.icon} ${styles.whatsappColor}`} />
                <span>{personalInfo.whatsapp}</span>
              </a>
              <div className={styles.infoItem}>
                <FaMapMarkerAlt className={styles.icon} />
                <span>{personalInfo.location}</span>
              </div>
            </div>

            {/* Social Links Sub-section */}
            <div className={styles.socialSection}>
              <h4>Social Profiles</h4>
              <div className={styles.socialsList}>
                {Object.entries(socialLinks).map(([key, url]) => {
                  if (!url || url === 'https://instagram.com/' || url === 'https://x.com/' || url === 'https://threads.net/' || url === 'https://t.me/') {
                    // Hide empty or placeholder socials except if they match WhatsApp
                    if (key !== 'whatsapp' && key !== 'github' && key !== 'linkedin') return null;
                  }
                  return (
                    <a 
                      key={key}
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`${styles.socialLink} ${styles[key]}`}
                      aria-label={getSocialLabel(key)}
                    >
                      {getSocialIcon(key)}
                      <span className={styles.tooltip}>{getSocialLabel(key)}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className={styles.contactFormContainer}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name" 
                  className={errors.name ? styles.inputError : ''}
                />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email" 
                  className={errors.email ? styles.inputError : ''}
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Message Subject" 
                  className={errors.subject ? styles.inputError : ''}
                />
                {errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  rows="5" 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className={errors.message ? styles.inputError : ''}
                ></textarea>
                {errors.message && <span className={styles.errorText}>{errors.message}</span>}
              </div>

              <button 
                type="submit" 
                className={styles.submitBtn} 
                disabled={status === 'loading' || status === 'mailto-fallback'}
              >
                {status === 'loading' ? (
                  <>
                    <FaSpinner className={styles.spinner} /> Sending...
                  </>
                ) : status === 'mailto-fallback' ? (
                  'Opening Mail Client...'
                ) : (
                  'Send Message'
                )}
              </button>

              {/* Submission Status Alerts */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div 
                    className={`${styles.alert} ${styles.alertSuccess}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <FaCheckCircle className={styles.alertIcon} />
                    <div>
                      <strong>Success!</strong> Your message has been sent successfully. I will get back to you shortly.
                    </div>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div 
                    className={`${styles.alert} ${styles.alertError}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <FaExclamationCircle className={styles.alertIcon} />
                    <div>
                      <strong>Error!</strong> Something went wrong. Please try again or email me directly at <strong>{personalInfo.email}</strong>.
                    </div>
                  </motion.div>
                )}

                {personalInfo.formspreeId === 'your-formspree-id' && (
                  <motion.div 
                    className={`${styles.alert} ${styles.alertInfo}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <FaExclamationCircle className={styles.alertIcon} />
                    <div>
                      Form is currently running in fallback mode (it will open your email app). Set a valid <code>formspreeId</code> in data config to enable background delivery.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
