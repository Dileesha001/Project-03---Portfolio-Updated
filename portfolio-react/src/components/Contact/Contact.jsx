import React, { useState, useRef, useEffect } from "react";
import "./Contact.css";

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", subject:"", message:"" });
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => e.target.classList.toggle("visible", e.isIntersecting)),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSuccess(true);
      setForm({ firstName:"", lastName:"", email:"", subject:"", message:"" });
      setTimeout(() => setSuccess(false), 4000);
    }, 1800);
  };

  return (
    <section className="contact section" id="contact" ref={sectionRef}>
      <div className="section-header reveal">
        <span className="section-tag">Get In Touch</span>
        <h2 className="section-title">Contact <span className="highlight">Me</span></h2>
      </div>
      <div className="contact-container">
        <div className="contact-left reveal">
          <h3>Let us Work Together</h3>
          <p>I am currently available for freelance work and open to exciting new opportunities. Have a project in mind or just want to say hi? Reach out!</p>
          <div className="contact-cards">
            {[
              {icon:"fa-envelope", label:"Email",    href:"mailto:ravishan.dileesha@email.com", val:"ravishan.dileesha@email.com"},
              {icon:"fa-phone",    label:"Phone",    href:"tel:+94713108396",          val:"+94 71 310 8396"},
              {icon:"fa-map-marker-alt", label:"Location", href:null,                 val:"Gampaha, Sri Lanka"},
            ].map(c => (
              <div className="contact-card" key={c.label}>
                <div className="contact-card-icon"><i className={`fas ${c.icon}`} /></div>
                <div className="contact-card-info">
                  <span className="contact-card-label">{c.label}</span>
                  {c.href
                    ? <a href={c.href} className="contact-card-value">{c.val}</a>
                    : <span className="contact-card-value">{c.val}</span>}
                </div>
              </div>
            ))}
          </div>
          <div className="contact-social">
            {["fa-linkedin-in","fa-github","fa-twitter"].map(ic => (
              <a href="#" className="social-icon" key={ic}><i className={`fab ${ic}`} /></a>
            ))}
          </div>
        </div>

        <div className="contact-right reveal">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" placeholder="John" value={form.firstName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" placeholder="Doe" value={form.lastName} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="emailInput">Email Address</label>
              <input id="emailInput" name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="subjectInput">Subject</label>
              <input id="subjectInput" name="subject" type="text" placeholder="Project Inquiry" value={form.subject} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="messageInput">Message</label>
              <textarea id="messageInput" name="message" rows="5" placeholder="Tell me about your project..." value={form.message} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={sending}>
              <span>{sending ? "Sending..." : "Send Message"}</span>
              <i className={`fas ${sending ? "fa-spinner fa-spin" : "fa-paper-plane"}`} />
            </button>
            <div className={`form-success${success ? " show" : ""}`}>
              <i className="fas fa-check-circle" />
              <span>Message sent! I will get back to you soon.</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
