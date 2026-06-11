import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './AcademicCoursework.module.css';

const semesters = [
  {
    semester: 'Semester 1',
    courses: [
      { name: 'Web Application Development 1', icon: '🌐' },
      { name: 'Computer Programming', icon: '💻' },
      { name: 'Mathematics for Computer Science', icon: '📐' },
      { name: 'Quantitative Aptitude', icon: '🔢' },
      { name: 'Communicative English Foundation', icon: '📚' },
      { name: 'Introduction to Generative AI', icon: '🤖' },
    ],
  },
  {
    semester: 'Semester 2',
    courses: [
      { name: 'Web Application Development 2', icon: '⚛️' },
      { name: 'Introduction to Database', icon: '🗄️' },
      { name: 'Numerical Ability', icon: '📊' },
      { name: 'Communicative English Advanced', icon: '🗣️' },
      { name: 'Data Structures Using C++', icon: '🧩' },
      { name: 'Building LLM Applications', icon: '🦾' },
    ],
  },
];

const AcademicCoursework = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="academics" className={styles.academicSection}>
      <div className="container">
        <h2 className="section-title">Academic Coursework</h2>
        <p className={styles.subtitle}>
          NxtWave Institute of Advanced Technologies · B.Tech Software Engineering
        </p>

        <div className={styles.tabs}>
          {semesters.map((sem, idx) => (
            <button
              key={idx}
              className={`${styles.tab} ${active === idx ? styles.activeTab : ''}`}
              onClick={() => setActive(idx)}
            >
              {sem.semester}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          className={styles.grid}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {semesters[active].courses.map((course, idx) => (
            <motion.div
              key={idx}
              className={styles.courseCard}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.07 }}
            >
              <span className={styles.courseIcon}>{course.icon}</span>
              <span className={styles.courseName}>{course.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AcademicCoursework;
