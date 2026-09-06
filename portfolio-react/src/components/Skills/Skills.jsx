import React, { useEffect, useRef } from "react";
import "./Skills.css";

const skills = [
  { name: "HTML / CSS",       pct: 95 },
  { name: "JavaScript",       pct: 85 },
  { name: "React.js",         pct: 75 },
  { name: "Node.js / Express",pct: 70 },
  { name: "MySQL / MongoDB",  pct: 72 },
];

const techs = [
  { icon: "fab fa-html5",     label: "HTML5",      color: "#e34f26" },
  { icon: "fab fa-css3-alt",  label: "CSS3",       color: "#264de4" },
  { icon: "fab fa-js-square", label: "JavaScript", color: "#f0db4f" },
  { icon: "fab fa-react",     label: "React",      color: "#61dafb" },
  { icon: "fab fa-node-js",   label: "Node.js",    color: "#68a063" },
  { icon: "fab fa-python",    label: "Python",     color: "#3776ab" },
  { icon: "fab fa-git-alt",   label: "Git",        color: "#f05032" },
  { icon: "fab fa-github",    label: "GitHub",     color: "#ffffff" },
  { icon: "fas fa-database",  label: "MongoDB",    color: "#4db33d" },
  { icon: "fas fa-database",  label: "MySQL",      color: "#00758f" },
  { icon: "fab fa-figma",     label: "Figma",      color: "#f24e1e" },
  { icon: "fab fa-docker",    label: "Docker",     color: "#0db7ed" },
];

export default function Skills() {
  const barRefs = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Reveal observer
    const revealObs = new IntersectionObserver(
      (entries) => entries.forEach(e => e.target.classList.toggle("visible", e.isIntersecting)),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach(el => revealObs.observe(el));

    // Skill bar observer
    const barObs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          const pct = e.target.getAttribute("data-width");
          e.target.style.width = pct + "%";
          barObs.unobserve(e.target);
        }
      }),
      { threshold: 0.4 }
    );
    barRefs.current.forEach(el => el && barObs.observe(el));

    return () => { revealObs.disconnect(); barObs.disconnect(); };
  }, []);

  return (
    <section className="skills section" id="skills" ref={sectionRef}>
      <div className="section-header reveal">
        <span className="section-tag">What I Know</span>
        <h2 className="section-title">My <span className="highlight">Skills</span></h2>
      </div>
      <div className="skills-container">
        <div className="skills-left reveal">
          <h3>Technical Skills</h3>
          <p>I work with modern technologies to build full-stack applications. Here are my key proficiencies:</p>
          <div className="skill-bars">
            {skills.map((s, i) => (
              <div className="skill-bar-item" key={s.name}>
                <div className="skill-bar-header">
                  <span className="skill-name">{s.name}</span>
                  <span className="skill-percent">{s.pct}%</span>
                </div>
                <div className="skill-bar-track">
                  <div
                    className="skill-bar-fill"
                    data-width={s.pct}
                    ref={el => barRefs.current[i] = el}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="skills-right reveal">
          <h3>Tools &amp; Technologies</h3>
          <div className="tech-grid">
            {techs.map((t) => (
              <div className="tech-card" key={t.label + t.color}>
                <i className={`${t.icon} tech-icon`} style={{ color: t.color }} />
                <span>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
