import React, { useEffect, useRef } from "react";
import "./About.css";
import profileImg from "../../assets/profile.jpg";

export default function About() {
  const sectionRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.target.classList.toggle("visible", e.isIntersecting)),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about section" id="about" ref={sectionRef}>
      <div className="section-header reveal">
        <span className="section-tag">Who I Am</span>
        <h2 className="section-title">About <span className="highlight">Me</span></h2>
      </div>
      <div className="about-container">
        <div className="about-image-wrapper reveal">
          <div className="about-image-glow" />
          <img src={profileImg} alt="Dileesha Ravishan" className="about-photo" />
          <div className="about-exp-badge">
            <span className="exp-number">1+</span>
            <span className="exp-text">Year Experience</span>
          </div>
        </div>
        <div className="about-content reveal">
          <h3>IT Professional &amp; Full-Stack Developer</h3>
          <p>I am Dileesha Ravishan, a passionate web developer and IT professional dedicated to crafting seamless digital experiences. I combine technical expertise with creative thinking to deliver solutions that exceed expectations.</p>
          <p>My journey in technology started with a curiosity about how things work on the internet, and it has evolved into a professional career focused on building robust, scalable, and beautiful web applications.</p>
          <div className="about-stats">
            {[["10+","Projects Completed"],["5+","Happy Clients"],["1+","Years Experience"]].map(([n,l]) => (
              <div className="stat-card" key={l}>
                <span className="stat-number">{n}</span>
                <span className="stat-label">{l}</span>
              </div>
            ))}
          </div>
          <div className="about-info-grid">
            {[
              ["fa-envelope","Email","dileesha@email.com"],
              ["fa-map-marker-alt","Location","Sri Lanka"],
              ["fa-briefcase","Status","Available for hire","available"],
              ["fa-graduation-cap","Degree","BSc in IT"],
            ].map(([icon,label,value,cls]) => (
              <div className="info-item" key={label}>
                <span className="info-label"><i className={`fas ${icon}`} /> {label}</span>
                <span className={`info-value${cls ? " "+cls : ""}`}>{value}</span>
              </div>
            ))}
          </div>
          <a href="#" className="btn btn-primary"><i className="fas fa-download" /> Download CV</a>
        </div>
      </div>
    </section>
  );
}
