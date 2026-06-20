import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaClock, FaSync } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';
import styles from './Projects.module.css';

// Dynamic category categorizer helper
const getCategories = (repo) => {
  const cats = ['All'];
  const desc = (repo.description || '').toLowerCase();
  const name = repo.name.toLowerCase();
  const language = (repo.language || '').toLowerCase();
  const topics = (repo.topics || []).map(t => t.toLowerCase());

  // Web Development
  const webKeywords = ['web', 'react', 'html', 'css', 'javascript', 'js', 'frontend', 'backend', 'fullstack', 'api', 'django', 'flask', 'node', 'express', 'portfolio'];
  const isWeb = webKeywords.some(kw => name.includes(kw) || desc.includes(kw)) ||
                ['javascript', 'html', 'css', 'typescript'].includes(language) ||
                topics.some(t => webKeywords.includes(t));
  if (isWeb) cats.push('Web Development');

  // Competitive Programming / DSA
  const cpKeywords = ['dsa', 'competitive-programming', 'cpp', 'c++', 'algorithm', 'leetcode', 'hackerrank', 'codeforces', 'problems', 'solutions', 'data-structures', 'interview-prep'];
  const isCp = cpKeywords.some(kw => name.includes(kw) || desc.includes(kw)) ||
               ['cpp', 'c++'].includes(language) ||
               topics.some(t => cpKeywords.includes(t));
  if (isCp) cats.push('Competitive Programming');

  // Machine Learning / AI
  const mlKeywords = ['ml', 'machine-learning', 'ai', 'deep-learning', 'llm', 'genai', 'nlp', 'gpt', 'classifier', 'prediction', 'model', 'chatgpt', 'neural-network'];
  const isMl = mlKeywords.some(kw => name.includes(kw) || desc.includes(kw)) ||
               topics.some(t => mlKeywords.includes(t));
  if (isMl) cats.push('Machine Learning');

  // Open Source (all original public repos)
  if (!repo.fork) {
    cats.push('Open Source');
  }

  // Fallback
  if (cats.length === 1) {
    cats.push('Web Development');
  }

  return cats;
};

const CACHE_KEY = 'github_projects_cache';
const CACHE_TIME_KEY = 'github_projects_cache_timestamp';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('recent'); // recent, stars, forks
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filters = ['All', 'Web Development', 'Competitive Programming', 'Machine Learning', 'Open Source'];

  const loadProjects = async (forceRefresh = false) => {
    if (forceRefresh) {
      setIsRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
      const now = Date.now();

      if (!forceRefresh && cachedData && cachedTime && now - parseInt(cachedTime, 10) < CACHE_DURATION) {
        setProjects(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      const response = await fetch('https://api.github.com/users/PratikAgarwal43/repos?per_page=100');
      if (!response.ok) {
        throw new Error('Rate limit or connection issue');
      }
      
      const repos = await response.json();
      const originalRepos = repos.filter(repo => !repo.fork);

      const formatted = originalRepos.map(repo => {
        const techStack = new Set();
        if (repo.language) techStack.add(repo.language);
        if (repo.topics) {
          repo.topics.slice(0, 4).forEach(topic => {
            const capitalized = topic.charAt(0).toUpperCase() + topic.slice(1);
            techStack.add(capitalized);
          });
        }

        return {
          id: repo.id,
          title: repo.name.replace(/[-_]/g, ' '),
          description: repo.description || 'No description available. Visit the GitHub repository to learn more about this project.',
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updatedAt: repo.pushed_at,
          githubLink: repo.html_url,
          liveDemo: repo.homepage || '',
          techStack: Array.from(techStack).slice(0, 4),
          categories: getCategories(repo)
        };
      });

      localStorage.setItem(CACHE_KEY, JSON.stringify(formatted));
      localStorage.setItem(CACHE_TIME_KEY, now.toString());
      setProjects(formatted);
    } catch (err) {
      console.warn('GitHub fetch failed, falling back to local projects data:', err);
      // Fallback
      const fallback = portfolioData.projects.map((proj) => ({
        id: proj.id,
        title: proj.title,
        description: proj.description,
        stars: 2,
        forks: 0,
        updatedAt: new Date().toISOString(),
        githubLink: proj.githubLink,
        liveDemo: proj.liveDemo,
        techStack: proj.techStack,
        categories: ['All', 'Web Development', 'Open Source']
      }));
      setProjects(fallback);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Filter projects
  const filteredProjects = projects.filter(proj => 
    proj.categories.includes(activeFilter)
  );

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'stars') {
      return b.stars - a.stars;
    } else if (sortBy === 'forks') {
      return b.forks - a.forks;
    } else {
      // recent
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    }
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className="section-title">Projects</h2>
          <button 
            className={`${styles.refreshBtn} ${isRefreshing ? styles.spinning : ''}`} 
            onClick={() => loadProjects(true)}
            title="Refresh from GitHub"
            disabled={loading || isRefreshing}
          >
            <FaSync />
          </button>
        </div>

        {/* Controls Container (Filter & Sort) */}
        <div className={styles.controls}>
          <div className={styles.filterChips}>
            {filters.map((filter) => (
              <button
                key={filter}
                className={`${styles.chip} ${activeFilter === filter ? styles.activeChip : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className={styles.sortContainer}>
            <label htmlFor="sortBy">Sort By:</label>
            <select 
              id="sortBy" 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="recent">Most Recent</option>
              <option value="stars">Stars</option>
              <option value="forks">Forks</option>
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className={styles.grid}>
          {loading ? (
            // Skeleton Loader
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={styles.skeletonCard}>
                <div className={styles.skeletonImage} />
                <div className={styles.skeletonBody}>
                  <div className={styles.skeletonTitle} />
                  <div className={styles.skeletonText} />
                  <div className={styles.skeletonText} />
                  <div className={styles.skeletonBadges}>
                    <div className={styles.skeletonBadge} />
                    <div className={styles.skeletonBadge} />
                  </div>
                  <div className={styles.skeletonFooter} />
                </div>
              </div>
            ))
          ) : (
            <AnimatePresence mode="popLayout">
              {sortedProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  className={styles.card}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.cardContent}>
                    <h3 className={styles.title}>{project.title}</h3>
                    <p className={styles.description}>{project.description}</p>
                    
                    {project.techStack.length > 0 && (
                      <div className={styles.techStack}>
                        {project.techStack.map((tech, idx) => (
                          <span key={idx} className={styles.techBadge}>{tech}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.stats}>
                      <span title={`${project.stars} Stars`}>
                        <FaStar /> {project.stars}
                      </span>
                      <span title={`${project.forks} Forks`}>
                        <FaCodeBranch /> {project.forks}
                      </span>
                      <span title={`Updated: ${formatDate(project.updatedAt)}`}>
                        <FaClock /> {formatDate(project.updatedAt)}
                      </span>
                    </div>

                    <div className={styles.links}>
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={styles.link} title="GitHub Link">
                        <FaGithub size={18} /> Code
                      </a>
                      {project.liveDemo && (
                        <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles.liveLink}`} title="Live Demo">
                          <FaExternalLinkAlt size={14} /> Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>

        {!loading && sortedProjects.length === 0 && (
          <div className={styles.noProjects}>
            <p>No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
