export const portfolioData = {
  personalInfo: {
    name: "Your Name",
    title: "Software Development Student",
    summary: "First-year student at NxtWave Institute of Advanced Technologies. I have skills in Python, DSA, HTML, CSS, JavaScript, React, SQL, and MongoDB. I'm highly interested in AI and software development, and I recently built an AI-powered website.",
    resumeLink: "/resume.pdf",
    email: "your.email@example.com",
    location: "City, Country"
  },
  socialLinks: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
  },
  about: {
    introduction: "Hi, I'm a passionate first-year software development student at NxtWave Institute of Advanced Technologies. I love solving problems and building interactive applications.",
    goals: "My career goal is to become a full-stack developer focusing on modern web technologies and AI integration, contributing to open-source projects, and gaining real-world experience.",
    journey: "I started my journey with Python and Data Structures, quickly moving to web technologies like HTML, CSS, JavaScript, and now React. I've built multiple projects, including an AI-powered website."
  },
  skills: [
    { category: "Programming Languages", items: ["Python", "JavaScript"] },
    { category: "Frontend", items: ["HTML", "CSS", "React"] },
    { category: "Backend Basics", items: ["Node.js Basics"] },
    { category: "Databases", items: ["SQL", "MongoDB"] },
    { category: "Tools & Technologies", items: ["Git", "GitHub"] },
    { category: "Other", items: ["Data Structures & Algorithms", "AI/GenAI Basics"] }
  ],
  projects: [
    {
      id: 1,
      title: "AI-Powered Website",
      description: "A website that utilizes GenAI to generate dynamic content, offering interactive user experiences.",
      image: "https://via.placeholder.com/400x250/222/fff?text=AI+Website",
      techStack: ["React", "CSS", "GenAI APIs"],
      githubLink: "https://github.com/",
      liveDemo: "https://vercel.com/"
    },
    {
      id: 2,
      title: "Modern React Portfolio",
      description: "A personal portfolio built from scratch using React, plain CSS, and Framer Motion.",
      image: "https://via.placeholder.com/400x250/222/fff?text=Portfolio",
      techStack: ["React", "CSS Modules", "Vite"],
      githubLink: "https://github.com/",
      liveDemo: "https://vercel.com/"
    }
  ],
  certificates: [
    {
      id: 1,
      title: "Python & DSA Foundation",
      organization: "NxtWave",
      date: "Jan 2024",
      image: "https://via.placeholder.com/300x200/222/fff?text=Certificate+1"
    },
    {
      id: 2,
      title: "Frontend Web Development",
      organization: "NxtWave",
      date: "Mar 2024",
      image: "https://via.placeholder.com/300x200/222/fff?text=Certificate+2"
    }
  ]
};
