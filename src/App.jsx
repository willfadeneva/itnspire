import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  Code2,
  Facebook,
  Globe2,
  Handshake,
  Headphones,
  Instagram,
  Languages,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageSquareText,
  Phone,
  Quote,
  RefreshCw,
  Send,
  Server,
  Sparkles,
  Target,
  TestTube2,
  Twitter,
  UsersRound,
  X,
} from 'lucide-react';
import logo from '../assets/logo.jpg';

const navItems = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#job-seekers', label: 'Job Seekers' },
  { href: '#contact', label: 'Contact Us' },
];

const expertise = [
  { title: 'IT Solutions', icon: Code2 },
  { title: 'IT Consulting', icon: Headphones },
  { title: 'Executive Search & Hiring', icon: BriefcaseBusiness },
  { title: 'Translation Services', icon: Languages },
];

const services = [
  {
    title: 'Infrastructure Services',
    icon: Server,
    body: "We help you design and develop a cloud-ready IT infrastructure that's right for your business and strategic needs. Our services cover the complete spectrum — from strategy to service management, network transformation to workplace solutions.",
  },
  {
    title: 'App & Website Development',
    icon: Code2,
    body: 'With our application & website development experience using highly technical tools, we can help you create powerful customer-facing experiences by enhancing your online presence.',
  },
  {
    title: 'Testing Automation',
    icon: TestTube2,
    body: "We help you find the right testing strategy aligned with your technological goals. Achieve better quality with reduced time and cost in today's fast-paced, competitive business landscape.",
  },
  {
    title: 'IT Outsourcing',
    icon: Globe2,
    body: 'With our reliable IT Outsourcing services, we provide optimized and secure mission-critical services at a reduced cost. Simplify your existing infrastructure and shift focus to core competencies.',
  },
  {
    title: 'Executive Search & Hiring',
    icon: BriefcaseBusiness,
    body: 'Our talent search and executive hiring services connect highly skilled candidates with the right employers across various industries. Whether hiring or seeking a new role, we help find the perfect fit.',
  },
  {
    title: 'Translation Services',
    icon: Languages,
    body: 'We specialize in professional translation services for a globalizing corporate sector. Our in-house specialists, certified translators, and smart tools deliver professional quality at competitive costs.',
  },
];

const countryCodes = [
  { value: '+254', label: '🇰🇪 +254 (Kenya)' },
  { value: '+81', label: '🇯🇵 +81 (Japan)' },
  { value: '+1', label: '🇺🇸 +1 (USA)' },
  { value: '+44', label: '🇬🇧 +44 (UK)' },
  { value: '+91', label: '🇮🇳 +91 (India)' },
  { value: '+63', label: '🇵🇭 +63 (Philippines)' },
  { value: '+65', label: '🇸🇬 +65 (Singapore)' },
  { value: '+86', label: '🇨🇳 +86 (China)' },
  { value: '+49', label: '🇩🇪 +49 (Germany)' },
  { value: '+33', label: '🇫🇷 +33 (France)' },
  { value: '+61', label: '🇦🇺 +61 (Australia)' },
];

const sectionIds = ['hero', 'about', 'services', 'job-seekers', 'contact'];

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function scrollToHash(hash) {
  const target = document.querySelector(hash);
  if (!target) return;

  const offset = parseInt(getComputedStyle(document.documentElement).scrollPaddingTop, 10) || 82;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

function makeCaptcha() {
  const num1 = Math.floor(Math.random() * 20) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operator = Math.random() > 0.5 ? '+' : '-';
  let a = num1;
  let b = num2;

  if (operator === '-' && a < b) {
    [a, b] = [b, a];
  }

  return {
    question: `${a} ${operator} ${b} = ?`,
    answer: operator === '+' ? a + b : a - b,
  };
}

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [captcha, setCaptcha] = useState(() => makeCaptcha());
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+81',
    phone: '',
    message: '',
    captcha: '',
  });

  const heroMetrics = useMemo(
    () => [
      { value: '4', label: 'Service pillars' },
      { value: 'Japan', label: 'Market focus' },
      { value: 'Bilingual', label: 'Recruitment expertise' },
    ],
    [],
  );

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + 150;
      let current = 'hero';

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;

        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
          current = id;
        }
      });

      setActiveSection(current);
      setIsScrolled(window.scrollY > window.innerHeight * 0.22);
      setShowTop(window.scrollY > 520);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleNavClick = (event, href) => {
    event.preventDefault();
    setMenuOpen(false);
    scrollToHash(href);
  };

  const setField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const refreshCaptcha = () => {
    setCaptcha(makeCaptcha());
    setFormData((current) => ({ ...current, captcha: '' }));
    setErrors((current) => {
      const next = { ...current };
      delete next.captcha;
      return next;
    });
  };

  const validate = () => {
    const nextErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-+()]{6,20}$/;

    if (!formData.name.trim()) nextErrors.name = 'This field is required.';
    if (!formData.email.trim()) {
      nextErrors.email = 'This field is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = 'This field is required.';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      nextErrors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.message.trim()) nextErrors.message = 'This field is required.';

    if (!formData.captcha.trim()) {
      nextErrors.captcha = 'This field is required.';
    } else if (Number.parseInt(formData.captcha, 10) !== captcha.answer) {
      nextErrors.captcha = 'Incorrect answer. Please try again.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) {
      setToast({ type: 'error', message: 'Please fix the errors above before submitting.' });
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setToast({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
      setFormData({ name: '', email: '', countryCode: '+81', phone: '', message: '', captcha: '' });
      setErrors({});
      setCaptcha(makeCaptcha());
    }, 1500);
  };

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <header className={`navbar ${isScrolled ? 'is-scrolled' : ''}`}>
        <a className="nav-logo" href="#hero" onClick={(event) => handleNavClick(event, '#hero')}>
          <img src={logo} alt="IT Inspire Logo" />
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              className={activeSection === item.href.slice(1) ? 'active' : ''}
              href={item.href}
              key={item.href}
              onClick={(event) => handleNavClick(event, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="nav-menu-button"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.nav
              aria-label="Mobile navigation"
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              onClick={(event) => event.stopPropagation()}
            >
              {navItems.map((item) => (
                <a href={item.href} key={item.href} onClick={(event) => handleNavClick(event, item.href)}>
                  {item.label}
                </a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section className="hero" id="hero">
          <HeroScene />
          <div className="hero-scrim" />

          <motion.div
            className="hero-content"
          >
            <motion.div className="eyebrow" variants={fadeUp}>
              <Sparkles size={16} />
              IT Solutions & Executive Search Company
            </motion.div>

            <motion.h1 variants={fadeUp}>
              <span className="brand-it">IT</span>
              <span className="brand-nspire">nspire</span>
            </motion.h1>

            <motion.p className="hero-tagline" variants={fadeUp}>
              Inspire to Innovate
            </motion.p>
            <motion.p className="hero-subtext" variants={fadeUp}>
              IT Solutions & Executive Search Company
            </motion.p>

            <motion.div className="hero-actions" variants={fadeUp}>
              <a className="button button-primary" href="#services" onClick={(event) => handleNavClick(event, '#services')}>
                Explore Our Services
                <ArrowRight size={18} />
              </a>
              <a className="button button-secondary" href="#contact" onClick={(event) => handleNavClick(event, '#contact')}>
                Get in Touch
                <MessageSquareText size={18} />
              </a>
            </motion.div>

            <motion.div className="hero-metrics" variants={fadeUp}>
              {heroMetrics.map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <a className="scroll-cue" href="#about" aria-label="Scroll to about section" onClick={(event) => handleNavClick(event, '#about')}>
            <ChevronDown size={22} />
          </a>
        </section>

        <section className="section about-section" id="about">
          <div className="container">
            <SectionHeader
              title="About Us"
              tagline="Experience & Expertise — IT Solutions & Executive Search Company"
            />

            <motion.div
              className="about-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              <InfoCard icon={Target} title="Our Purpose">
                Our purpose drives the high quality of service we deliver to our customers, and we're honored to be recognized for our commitment to our clients and candidates.
              </InfoCard>
              <InfoCard icon={Quote} title="What We Believe In">
                "Success doesn't come to you. You go to it!"
              </InfoCard>
            </motion.div>

            <motion.div
              className="collaboration-panel"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65 }}
            >
              <div className="panel-icon">
                <Handshake size={28} />
              </div>
              <div>
                <h3>Collaboration</h3>
                <p>
                  We work in collaboration with you. Finding the best fit – the right solution, the right strategy, the right candidate for the right job is our goal. Our functional expertise, extensive knowledge and vast experience enables us to be your partner of choice.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="expertise-wrap"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={stagger}
            >
              <motion.div className="expertise-copy" variants={fadeUp}>
                <h3>Striving for Excellence</h3>
                <p>We strive for excellence in all we do – be it IT Consulting, IT solutions, Staffing & Recruitment, or Translation Services.</p>
              </motion.div>
              <div className="expertise-grid">
                {expertise.map(({ title, icon: Icon }) => (
                  <motion.div className="expertise-card" key={title} variants={fadeUp}>
                    <Icon size={26} />
                    <h4>{title}</h4>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <SectionHeader
              title="Our Services"
              tagline="Comprehensive IT & Talent Solutions Tailored to Your Needs"
            />

            <motion.div
              className="services-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              variants={stagger}
            >
              {services.map(({ title, body, icon: Icon }) => (
                <motion.article className="service-card" key={title} variants={fadeUp} whileHover={{ y: -8 }}>
                  <div className="service-icon">
                    <Icon size={26} />
                  </div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="section job-section" id="job-seekers">
          <div className="container job-layout">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7 }}
            >
              <p className="section-kicker">Job Seekers</p>
              <h2>Job Seekers</h2>
              <p className="job-lead">
                Looking for your next career opportunity? We connect highly skilled candidates with the right employers. Contact us to explore current openings and find the role that matches your expertise.
              </p>
              <p className="job-note">
                We specialize in the <strong>Japanese bilingual recruitment market</strong>, connecting top talent with leading organizations across Japan and globally.
              </p>
              <a className="button button-primary" href="#contact" onClick={(event) => handleNavClick(event, '#contact')}>
                Contact Us
                <Send size={18} />
              </a>
            </motion.div>

            <motion.div
              className="talent-panel"
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7 }}
            >
              <div className="talent-orbit">
                <UsersRound size={82} />
              </div>
              <div className="talent-list">
                <span><CheckCircle2 size={18} /> Japanese bilingual recruitment market</span>
                <span><CheckCircle2 size={18} /> Top talent with leading organizations</span>
                <span><CheckCircle2 size={18} /> Japan and globally</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container">
            <SectionHeader
              title="Get in Touch"
              tagline="Have a question or ready to get started? We'd love to hear from you."
            />

            <div className="contact-grid">
              <motion.form
                className="contact-form"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65 }}
              >
                <Field label="Name" htmlFor="name" required error={errors.name}>
                  <input
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    required
                    type="text"
                    value={formData.name}
                    onChange={(event) => setField('name', event.target.value)}
                  />
                </Field>

                <Field label="Email" htmlFor="email" required error={errors.email}>
                  <input
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(event) => setField('email', event.target.value)}
                  />
                </Field>

                <Field label="Phone" htmlFor="phone" required error={errors.phone}>
                  <div className="phone-row">
                    <select
                      id="countryCode"
                      className="country-code"
                      value={formData.countryCode}
                      onChange={(event) => setField('countryCode', event.target.value)}
                    >
                      {countryCodes.map((code) => (
                        <option value={code.value} key={code.value}>
                          {code.label}
                        </option>
                      ))}
                    </select>
                    <input
                      id="phone"
                      name="phone"
                      placeholder="Phone number"
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(event) => setField('phone', event.target.value)}
                    />
                  </div>
                </Field>

                <Field label="Message" htmlFor="message" required error={errors.message}>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your needs..."
                    required
                    rows="5"
                    value={formData.message}
                    onChange={(event) => setField('message', event.target.value)}
                  />
                </Field>

                <Field label={`Verify you're human: ${captcha.question}`} htmlFor="captcha" required error={errors.captcha}>
                  <div className="captcha-row">
                    <input
                      id="captcha"
                      name="captcha"
                      placeholder="Answer"
                      required
                      type="number"
                      value={formData.captcha}
                      onChange={(event) => setField('captcha', event.target.value)}
                    />
                    <button className="icon-button" type="button" aria-label="New question" onClick={refreshCaptcha}>
                      <RefreshCw size={18} />
                    </button>
                  </div>
                </Field>

                <button className="button button-primary form-submit" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send size={18} />
                </button>
              </motion.form>

              <motion.aside
                className="contact-card"
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: 0.08 }}
              >
                <h3>Contact Information</h3>
                <ContactDetail icon={MapPin} label="Office">Tokyo, Japan</ContactDetail>
                <ContactDetail icon={Mail} label="Email">
                  <a href="mailto:info@itinspire.com">info@itinspire.com</a>
                </ContactDetail>
                <ContactDetail icon={Phone} label="Phone">
                  <a href="tel:+819012345678">+81 90-1234-5678</a>
                </ContactDetail>
                <ContactDetail icon={Clock3} label="Business Hours">Mon – Fri: 9:00 AM – 6:00 PM JST</ContactDetail>
              </motion.aside>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src={logo} alt="IT Inspire" />
            <p className="footer-tagline">Inspire to Innovate</p>
            <p>IT Solutions & Executive Search Company delivering excellence in technology and talent acquisition.</p>
          </div>

          <FooterLinks
            title="Quick Links"
            links={[
              ['Home', '#hero'],
              ['About Us', '#about'],
              ['Job Seekers', '#job-seekers'],
              ['Contact Us', '#contact'],
            ]}
            onNavigate={handleNavClick}
          />
          <FooterLinks
            title="Services"
            links={[
              ['Infrastructure Services', '#services'],
              ['App & Web Development', '#services'],
              ['Testing Automation', '#services'],
              ['IT Outsourcing', '#services'],
              ['Executive Search', '#services'],
              ['Translation Services', '#services'],
            ]}
            onNavigate={handleNavClick}
          />

          <div className="footer-social">
            <h4>Follow Us</h4>
            <div>
              <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">© 2024 IT Inspire. All rights reserved.</div>
      </footer>

      <AnimatePresence>
        {showTop && (
          <motion.a
            className="back-to-top"
            href="#hero"
            aria-label="Back to top"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            onClick={(event) => handleNavClick(event, '#hero')}
          >
            <ChevronUp size={20} />
          </motion.a>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            className={`toast toast-${toast.type}`}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            role="status"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HeroScene() {
  const nodes = [
    { left: '59%', top: '18%', size: 8, delay: 0.1 },
    { left: '72%', top: '28%', size: 12, delay: 0.4 },
    { left: '83%', top: '47%', size: 9, delay: 0.2 },
    { left: '64%', top: '62%', size: 11, delay: 0.6 },
    { left: '78%', top: '76%', size: 7, delay: 0.8 },
    { left: '48%', top: '42%', size: 10, delay: 0.5 },
  ];

  const dataColumns = Array.from({ length: 16 }, (_, index) => index);

  return (
    <div className="hero-scene" aria-hidden="true">
      <div className="aurora-field" />
      <motion.div
        className="perspective-grid"
        animate={{ backgroundPosition: ['0px 0px', '48px 48px'] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="light-architecture"
      >
        {dataColumns.map((item) => (
          <motion.span
            key={item}
            style={{ '--h': `${70 + ((item * 37) % 170)}px`, '--d': `${item * 0.06}s` }}
            animate={{ scaleY: [0.78, 1, 0.84] }}
            transition={{ duration: 2.9 + (item % 4) * 0.3, repeat: Infinity, delay: item * 0.06 }}
          />
        ))}
      </motion.div>

      <motion.div
        className="command-sphere"
        animate={{ rotate: 360 }}
        transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
      >
        <span />
        <span />
        <span />
      </motion.div>

      {nodes.map((node) => (
        <motion.span
          className="network-node"
          key={`${node.left}-${node.top}`}
          style={{ left: node.left, top: node.top, width: node.size, height: node.size }}
          animate={{ opacity: [0.5, 1, 0.55], scale: [1, 1.7, 1] }}
          transition={{ duration: 3.4, repeat: Infinity, delay: node.delay }}
        />
      ))}

      <motion.div
        className="glass-card card-main"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <div className="card-topline">
          <Building2 size={18} />
          <span>Tokyo, Japan</span>
        </div>
        <div className="signal-stack">
          <i />
          <i />
          <i />
        </div>
        <strong>IT Solutions</strong>
        <p>Infrastructure • Development • Automation</p>
      </motion.div>

      <motion.div
        className="glass-card card-secondary"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5.4, repeat: Infinity }}
      >
        <div className="profile-cluster">
          <span />
          <span />
          <span />
        </div>
        <strong>Executive Search & Hiring</strong>
        <p>Japanese bilingual recruitment market</p>
      </motion.div>

      <motion.div
        className="glass-card card-tertiary"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6.4, repeat: Infinity }}
      >
        <Languages size={22} />
        <strong>Translation Services</strong>
      </motion.div>
    </div>
  );
}

function SectionHeader({ title, tagline }) {
  return (
    <motion.div
      className="section-header"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.62 }}
    >
      <p className="section-kicker">{title}</p>
      <h2>{title}</h2>
      {tagline && <p>{tagline}</p>}
    </motion.div>
  );
}

function InfoCard({ icon: Icon, title, children }) {
  return (
    <motion.article className="info-card" variants={fadeUp} whileHover={{ y: -6 }}>
      <div className="card-icon">
        <Icon size={26} />
      </div>
      <h3>{title}</h3>
      <p>{children}</p>
    </motion.article>
  );
}

function Field({ label, htmlFor, required, error, children }) {
  return (
    <label className={`field ${error ? 'has-error' : ''}`} htmlFor={htmlFor}>
      <span>
        {label} {required && <b>*</b>}
      </span>
      {children}
      <em>{error || ''}</em>
    </label>
  );
}

function ContactDetail({ icon: Icon, label, children }) {
  return (
    <div className="contact-detail">
      <div>
        <Icon size={19} />
      </div>
      <span>
        <strong>{label}</strong>
        <p>{children}</p>
      </span>
    </div>
  );
}

function FooterLinks({ title, links, onNavigate }) {
  return (
    <div className="footer-links">
      <h4>{title}</h4>
      <ul>
        {links.map(([label, href]) => (
          <li key={`${title}-${label}`}>
            <a href={href} onClick={(event) => onNavigate(event, href)}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
