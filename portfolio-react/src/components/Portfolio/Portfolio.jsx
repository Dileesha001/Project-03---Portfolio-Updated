import React, { useState, useRef, useEffect } from "react";
import "./Portfolio.css";

const projects = [
  {
    title: "E-Commerce Platform", category: "web",
    desc: "Full-stack online store with payment integration",
    tags: ["React","Node.js","MongoDB"], icon: "fa-shopping-cart",
    bg: "linear-gradient(135deg,#6505ec,#250256)", type: "Web Development",
  },
  {
    title: "Task Manager App", category: "app",
    desc: "Productivity app with real-time collaboration",
    tags: ["JavaScript","Firebase"], icon: "fa-tasks",
    bg: "linear-gradient(135deg,#8b00ff,#4b0082)", type: "Application",
  },
  {
    title: "Dashboard UI Kit", category: "ui",
    desc: "Admin dashboard design with modern components",
    tags: ["Figma","CSS"], icon: "fa-palette",
    bg: "linear-gradient(135deg,#7c3aed,#1e0040)", type: "UI/UX Design",
  },
  {
    title: "Blog Platform", category: "web",
    desc: "Content management system with markdown support",
    tags: ["Next.js","MySQL"], icon: "fa-blog",
    bg: "linear-gradient(135deg,#5b21b6,#250256)", type: "Web Development",
  },
  {
    title: "Analytics Dashboard", category: "app",
    desc: "Real-time data visualization with interactive charts",
    tags: ["React","D3.js"], icon: "fa-chart-line",
    bg: "linear-gradient(135deg,#6d28d9,#3b0764)", type: "Application",
  },
  {
    title: "Mobile App Design", category: "ui",
    desc: "Complete mobile UI/UX design for a fitness app",
    tags: ["Figma","Prototyping"], icon: "fa-mobile-alt",
    bg: "linear-gradient(135deg,#9333ea,#4c1d95)", type: "UI/UX Design",
  },
];

const filters = ["all","web","app","ui"];

export default function Portfolio() {
  const [active, setActive] = useState("all");
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => e.target.classList.toggle("visible", e.isIntersecting)),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const visible = projects.filter(p => active === "all" || p.category === active);

  return (
    <section className="portfolio section" id="portfolio" ref={sectionRef}>
      <div className="section-header reveal">
        <span className="section-tag">My Work</span>
        <h2 className="section-title">Recent <span className="highlight">Projects</span></h2>
      </div>
      <div className="portfolio-filters reveal">
        {filters.map(f => (
          <button
            key={f}
            className={`filter-btn${active === f ? " active" : ""}`}
            onClick={() => setActive(f)}
          >
            {f === "all" ? "All" : f === "web" ? "Web Dev" : f === "app" ? "App" : "UI/UX"}
          </button>
        ))}
      </div>
      <div className="portfolio-grid" id="portfolioGrid">
        {visible.map((p, i) => (
          <div className="portfolio-card reveal" key={p.title} style={{ transitionDelay: `${i * 0.08}s` }}>
            <div className="portfolio-card-image">
              <div className="portfolio-placeholder" style={{ background: p.bg }}>
                <i className={`fas ${p.icon}`} />
              </div>
              <div className="portfolio-overlay">
                <div className="portfolio-overlay-content">
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                  <div className="portfolio-tags">
                    {p.tags.map(t => <span key={t}>{t}</span>)}
                  </div>
                  <div className="portfolio-links">
                    <a href="#" className="p-link"><i className="fas fa-external-link-alt" /> Live</a>
                    <a href="#" className="p-link"><i className="fab fa-github" /> Code</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="portfolio-card-info">
              <h4>{p.title}</h4>
              <p>{p.type}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
