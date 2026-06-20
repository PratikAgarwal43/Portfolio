import styles from './CertificateCard.module.css';

const CertificateCard = ({ cert }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={cert.image} alt={cert.title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{cert.title}</h3>
        <p className={styles.org}>{cert.organization}</p>
        <span className={styles.date}>{cert.date}</span>
      </div>
    </div>
  );
};

export default CertificateCard;
