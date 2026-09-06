import React, { useEffect, useRef } from "react";
import "./Hero.css";
import profileImg from "../../assets/profile.jpg";

const phrases = [
  "Web Developer",
  "IT Professional",
  "Frontend Developer",
  "Full-Stack Developer",
  "UI/UX Enthusiast",
];

export default function Hero() {
  const typedRef = useRef(null);

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    const type = () => {
      const current = phrases[phraseIndex];
      if (!typedRef.current) return;
      if (isDeleting) {
        typedRef.current.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedRef.current.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }
      let delay = isDeleting ? 60 : 110;
      if (!isDeleting && charIndex === current.length) { delay = 1800; isDeleting = true; }
      else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 400; }
      timeout = setTimeout(type, delay);
    };
    type();
    return () => clearTimeout(timeout);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="home" id="home">
      <div className="home-content">
        <div className="greeting-badge">
          <span className="badge-dot" />
          <span>Available for hire</span>
        </div>
        <h3>Hello, it is me</h3>
        <h1>Dileesha <span className="highlight">Ravishan</span></h1>
        <h3>And I am a <span className="typed-text" ref={typedRef} /><span className="cursor">|</span></h3>
        <p>A passionate IT Professional and Web Developer with over 1 year of expertise in building high-quality websites, web applications, and digital experiences that make a real impact.</p>
        <div className="home-buttons">
          <button className="btn btn-primary" onClick={() => scrollTo("contact")}>Hire Me</button>
          <button className="btn btn-outline" onClick={() => scrollTo("portfolio")}>View Work</button>
        </div>
        <div className="social-links">
          <a href="#" className="social-icon" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
          <a href="#" className="social-icon" aria-label="GitHub"><i className="fab fa-github" /></a>
          <a href="#" className="social-icon" aria-label="Twitter"><i className="fab fa-twitter" /></a>
          <a href="#" className="social-icon" aria-label="Instagram"><i className="fab fa-instagram" /></a>
        </div>
      </div>

      <div className="home-image-wrapper">
        <div className="home-image-ring ring-outer" />
        <div className="home-image-ring ring-inner" />
        <div className="home-image-circle">
          <img className="home-photo" src={profileImg} alt="Dileesha Ravishan" />
        </div>
        <div className="floating-badge badge-1"><i className="fab fa-js" /><span>JavaScript</span></div>
        <div className="floating-badge badge-2"><i className="fab fa-react" /><span>React</span></div>
        <div className="floating-badge badge-3"><i className="fab fa-node-js" /><span>Node.js</span></div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
