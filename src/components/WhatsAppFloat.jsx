import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';
import styles from './WhatsAppFloat.module.css';

const WhatsAppFloat = () => {
  const phoneNumber = portfolioData.personalInfo.whatsapp.replace(/\D/g, '');
  const message = encodeURIComponent("Hello, I visited your portfolio website and would like to connect.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappFloat}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1.5 
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Contact on WhatsApp"
    >
      <FaWhatsapp className={styles.icon} />
      <span className={styles.tooltip}>Chat on WhatsApp</span>
    </motion.a>
  );
};

export default WhatsAppFloat;
