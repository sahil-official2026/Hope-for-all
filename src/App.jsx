import { useEffect, useState } from "react";
import {
  Heart, Menu, X, ArrowRight, Utensils, Shirt, BookOpen,
  Users, HandHeart, ShieldCheck, LogIn, LogOut, MessageCircle,
  ChevronLeft, ChevronRight, LayoutDashboard
} from "lucide-react";
import "./App.css";

const slides = [
  {
    image: "/images/Hope.jpeg",
    title: "Together, we can bring hope",
    text: "Standing beside families and communities that need support."
  },
  {
    image: "/images/Food Donation.jpeg",
    title: "Food for every family",
    text: "Supporting families with food and daily necessities."
  },
  {
    image: "/images/education.jpeg",
    title: "Education opens doors",
    text: "Helping children move towards a brighter future."
  },
  {
    image: "/images/Clothes Donation.jpeg",
    title: "Dignity through clothing",
    text: "Sharing clothing and essentials with those who need them."
  },
  {
    image: "/images/Woman empowerment.jpeg",
    title: "Empowering women",
    text: "Encouraging opportunity, confidence, skills and independence."
  }
];

const initiatives = [
  {
    icon: Utensils,
    title: "Food Support",
    text: "Helping families with essential food and daily necessities."
  },
  {
    icon: Shirt,
    title: "Clothing Donations",
    text: "Providing clothing and footwear to underprivileged communities."
  },
  {
    icon: BookOpen,
    title: "Education",
    text: "Supporting learning opportunities and a brighter future for children."
  },
  {
    icon: Users,
    title: "Women Empowerment",
    text: "Promoting skills, confidence, dignity and opportunities for women."
  }
];

function App() {
  const [slide, setSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [question, setQuestion] = useState({ name: "", email: "", message: "" });
  const [notice, setNotice] = useState("");
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("hopeForAllInquiries") || "[]");
    setInquiries(saved);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setSlide((current) => (current + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const changeSlide = (direction) => {
    setSlide((current) => (current + direction + slides.length) % slides.length);
  };

  const submitQuestion = (event) => {
    event.preventDefault();
    const newInquiry = { ...question, id: Date.now(), date: new Date().toLocaleString() };
    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    localStorage.setItem("hopeForAllInquiries", JSON.stringify(updated));
    setQuestion({ name: "", email: "", message: "" });
    setNotice("Thank you! Your question has been received.");
  };

  const adminLogin = (event) => {
    event.preventDefault();
    // Demo login only. Replace with secure server-side authentication before publishing.
    if (adminEmail === "admin@hopeforall.org" && adminPassword === "Hope@123") {
      setLoggedIn(true);
      setNotice("");
    } else {
      setNotice("Incorrect admin email or password. Please try again.");
    }
  };

  const deleteInquiry = (id) => {
    const updated = inquiries.filter((item) => item.id !== id);
    setInquiries(updated);
    localStorage.setItem("hopeForAllInquiries", JSON.stringify(updated));
  };

  const closeAdmin = () => {
    setAdminOpen(false);
    setLoggedIn(false);
    setAdminEmail("");
    setAdminPassword("");
    setNotice("");
  };

  return (
    <div className="website">
      <nav className="navbar">
        <a className="brand" href="#home">HOPE <span>FOR ALL</span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
        <div className={`nav-links ${menuOpen ? "show" : ""}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About Us</a>
          <a href="#vision" onClick={() => setMenuOpen(false)}>Our Vision</a>
          <a href="#mission" onClick={() => setMenuOpen(false)}>Our Mission</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
        <div className="nav-actions">
          <a href="#contact" className="donate-btn">Support Us</a>
          <button className="admin-open" onClick={() => { setAdminOpen(true); setNotice(""); }}>
            <LogIn size={16} /> Admin
          </button>
        </div>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="subtitle">HOPE FOR ALL PAKISTAN</p>
            <h1>Reaching the <span>Underprivileged</span></h1>
            <p className="hero-description">
              Bringing hope, love, and support to those who need it most.
              Together, we can make a difference in the lives of underprivileged families.
            </p>
            <div className="hero-buttons">
              <a href="#vision" className="primary-btn">Our Vision <ArrowRight size={17} /></a>
              <a href="#about" className="secondary-btn">Learn More</a>
            </div>
            <div className="hero-note"><Heart size={17} /> Compassion • Dignity • Hope</div>
          </div>

          <div className="hero-carousel" aria-label="Hope for All image carousel">
            <img
              key={slides[slide].image}
              src={slides[slide].image}
              alt={slides[slide].title}
              onError={(event) => { event.currentTarget.src = "https://placehold.co/1000x700/f8f6f0/173d2b?text=Add+your+photo+in+public%2Fimages"; }}
            />
            <div className="carousel-shade" />
            <div className="carousel-caption">
              <span>OUR WORK, OUR HOPE</span>
              <h2>{slides[slide].title}</h2>
              <p>{slides[slide].text}</p>
            </div>
            <div className="carousel-controls">
              <button onClick={() => changeSlide(-1)} aria-label="Previous image"><ChevronLeft /></button>
              <div className="carousel-dots">
                {slides.map((item, index) => (
                  <button key={item.image} className={slide === index ? "active" : ""} onClick={() => setSlide(index)} aria-label={`Show slide ${index + 1}`} />
                ))}
              </div>
              <button onClick={() => changeSlide(1)} aria-label="Next image"><ChevronRight /></button>
            </div>
            <div className="slide-count">{String(slide + 1).padStart(2, "0")} / 05</div>
          </div>
        </section>

        <section className="about section-light" id="about">
          <p className="subtitle">WHO WE ARE</p>
          <h2>About Hope for All</h2>
          <p className="section-copy">
            Hope for All Pakistan is a humanitarian vision dedicated to reaching underprivileged
            communities and supporting families facing difficult living conditions.
            We believe every person deserves food, clothing, dignity, love, and hope for a better future.
          </p>
        </section>

        <section className="vision" id="vision">
          <div className="vision-content">
            <p className="subtitle">OUR VISION</p>
            <h2>Reaching the Underprivileged</h2>
            <p>
              Our vision is to reach those who are often forgotten, providing practical support
              through food, clothing, education, and opportunities for women.
              Through compassion, honesty, and transparency, we aim to restore hope
              and bring meaningful change to lives.
            </p>
            <h3>"Together, We Can Make a Difference"</h3>
          </div>
        </section>

        <section className="mission" id="mission">
          <p className="subtitle">WHAT WE STAND FOR</p>
          <h2>Our Mission</h2>
          <p className="mission-intro">Small acts of kindness can create lasting change.</p>
          <div className="cards">
            {initiatives.map(({ icon: Icon, title, text }) => (
              <article className="card" key={title}>
                <div className="card-icon"><Icon size={29} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact section-light" id="contact">
          <div className="contact-copy">
            <p className="subtitle">GET IN TOUCH</p>
            <h2>Have a question?</h2>
            <p>Want to know more, volunteer, or ask how you can support our work? Send us a message.</p>
            <div className="contact-promise"><HandHeart size={20} /> Every question matters. We value your voice.</div>
          </div>
          <form className="question-form" onSubmit={submitQuestion}>
            <label>Your name<input required value={question.name} onChange={(e) => setQuestion({ ...question, name: e.target.value })} placeholder="Enter your name" /></label>
            <label>Email address<input required type="email" value={question.email} onChange={(e) => setQuestion({ ...question, email: e.target.value })} placeholder="you@example.com" /></label>
            <label>Your question<textarea required rows="4" value={question.message} onChange={(e) => setQuestion({ ...question, message: e.target.value })} placeholder="Write your question here..." /></label>
            <button type="submit" className="primary-btn">Send Question <ArrowRight size={17} /></button>
            {notice && !adminOpen && <p className="form-notice">{notice}</p>}
          </form>
        </section>
      </main>

      <footer>
        <div className="footer-brand">HOPE FOR ALL PAKISTAN</div>
        <p>Reaching the Underprivileged. Restoring Hope. Sharing Love.</p>
        <p className="copyright">© 2026 Hope for All Pakistan. All Rights Reserved.</p>
      </footer>

      {adminOpen && (
        <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) closeAdmin(); }}>
          <section className="admin-modal">
            <button className="modal-close" onClick={closeAdmin} aria-label="Close admin portal"><X /></button>
            {!loggedIn ? (
              <div className="login-panel">
                <div className="admin-icon"><ShieldCheck size={30} /></div>
                <p className="subtitle">HOPE FOR ALL PAKISTAN</p>
                <h2>Admin Portal</h2>
                <p className="admin-description">Sign in to view questions submitted by visitors.</p>
                <form onSubmit={adminLogin}>
                  <label>Admin email<input type="email" required value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} placeholder="admin@hopeforall.org" /></label>
                  <label>Password<input type="password" required value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} placeholder="Enter password" /></label>
                  <button className="primary-btn login-submit" type="submit"><LogIn size={17} /> Sign In</button>
                  {notice && <p className="form-notice error">{notice}</p>}
                </form>
                <p className="demo-hint">Demo login: admin@hopeforall.org / Hope@123</p>
              </div>
            ) : (
              <div className="dashboard">
                <div className="dashboard-head">
                  <div>
                    <p className="subtitle">ADMINISTRATION</p>
                    <h2><LayoutDashboard size={24} /> Dashboard</h2>
                  </div>
                  <button className="logout-btn" onClick={closeAdmin}><LogOut size={16} /> Sign Out</button>
                </div>
                <div className="stats-card"><MessageCircle /><div><strong>{inquiries.length}</strong><span>Visitor questions</span></div></div>
                <h3 className="inquiries-title">Submitted Questions</h3>
                {inquiries.length === 0 ? (
                  <div className="empty-state">No questions have been submitted yet.</div>
                ) : (
                  <div className="inquiry-list">
                    {inquiries.map((item) => (
                      <article className="inquiry" key={item.id}>
                        <div className="inquiry-top"><strong>{item.name}</strong><span>{item.date}</span></div>
                        <a href={`mailto:${item.email}`}>{item.email}</a>
                        <p>{item.message}</p>
                        <button className="delete-btn" onClick={() => deleteInquiry(item.id)}>Delete question</button>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default App;