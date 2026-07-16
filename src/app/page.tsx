"use client";

import { Loader2, Menu, ArrowRight, ChevronDown, Code, Globe, Server, Database, Palette, Mail, CheckCircle, Send, ArrowUp, Blocks, Briefcase, Copy, Check } from 'lucide-react';

import { useEffect, useState, useRef } from "react";
import ShaderBackground from "../components/ShaderBackground";
import { useLanguage } from "../context/LanguageContext";

// ======================= LANGUAGE TOGGLE COMPONENT =======================
function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const enRef = useRef<HTMLSpanElement>(null);
  const arRef = useRef<HTMLSpanElement>(null);
  const [sliderStyle, setSliderStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const activeRef = language === "en" ? enRef : arRef;
    if (activeRef.current) {
      setSliderStyle({
        width: activeRef.current.offsetWidth + "px",
        left: activeRef.current.offsetLeft + "px",
      });
    }
  }, [language]);

  return (
    <button
      onClick={toggleLanguage}
      className="lang-toggle"
      aria-label={language === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
      id="lang-toggle-btn"
      type="button"
    >
      <div className="lang-toggle-slider" style={sliderStyle}></div>
      <span
        ref={enRef}
        className={`lang-toggle-option ${language === "en" ? "active" : ""}`}
      >
        EN
      </span>
      <span
        ref={arRef}
        className={`lang-toggle-option ${language === "ar" ? "active" : ""}`}
      >
        عر
      </span>
    </button>
  );
}

export default function Home() {
  const { language, t } = useLanguage();
  const isRTL = language === "ar";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText('kareemhanysultan2004@gmail.com');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      // fallback for older browsers
      const el = document.createElement('textarea');
      el.value = 'kareemhanysultan2004@gmail.com';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setIsSuccess(true);
        form.reset();
        setTimeout(() => setIsSuccess(false), 4000);
      } else {
        alert(t("contact.form.errorResponse"));
      }
    } catch (error) {
      alert(t("contact.form.errorNetwork"));
    }
    
    setIsSubmitting(false);
  };
  useEffect(() => {
    // Scroll Reveal Logic
    const reveals = document.querySelectorAll(".reveal");
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      const elementVisible = 100;
      reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
          reveal.classList.add("active");
        }
      });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Trigger on initial load

    // Back to Top Logic
    const backToTopBtn = document.getElementById("back-to-top");
    const scrollListener = () => {
      if (window.scrollY > 500) {
        backToTopBtn?.classList.add("visible");
      } else {
        backToTopBtn?.classList.remove("visible");
      }
    };
    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", revealOnScroll);
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <>
      {/* ======================= NAVIGATION ======================= */}
      <nav className="fixed top-0 w-full z-50 bg-surface/70 dark:bg-surface/70 backdrop-blur-xl border-b border-white/5 shadow-sm transition-all active:scale-95">
        <div className="max-w-container-max mx-auto px-gutter flex justify-between items-center h-20">
          <a
            className="font-headline-md text-headline-md font-bold text-on-surface hover:text-primary transition-colors duration-300"
            href="#"
          >
            {t("nav.name")}
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a
              className="text-primary font-bold border-b-2 border-primary pb-1"
              href="#home"
            >
              {t("nav.home")}
            </a>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors duration-300"
              href="#about"
            >
              {t("nav.about")}
            </a>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors duration-300"
              href="#skills"
            >
              {t("nav.skills")}
            </a>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors duration-300"
              href="#projects"
            >
              {t("nav.projects")}
            </a>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors duration-300"
              href="#experience"
            >
              {t("nav.experience")}
            </a>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors duration-300"
              href="#contact"
            >
              {t("nav.contact")}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <LanguageToggle />
            <button
              className="md:hidden text-on-surface hover:text-primary transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <a
              className="hidden md:inline-flex items-center justify-center bg-primary text-on-primary px-6 py-2 rounded-full font-label-sm hover:bg-primary-fixed transition-all duration-300 shadow-[0_0_15px_rgba(173,198,255,0.3)] hover:shadow-[0_0_25px_rgba(173,198,255,0.6)]"
              href="#contact"
            >
              {t("nav.contactMe")}
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-gutter pb-6 flex flex-col gap-4 bg-surface/90 backdrop-blur-xl border-t border-white/5">
            <a className="text-primary font-bold py-2" href="#home" onClick={() => setMobileMenuOpen(false)}>{t("nav.home")}</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors py-2" href="#about" onClick={() => setMobileMenuOpen(false)}>{t("nav.about")}</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors py-2" href="#skills" onClick={() => setMobileMenuOpen(false)}>{t("nav.skills")}</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors py-2" href="#projects" onClick={() => setMobileMenuOpen(false)}>{t("nav.projects")}</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors py-2" href="#experience" onClick={() => setMobileMenuOpen(false)}>{t("nav.experience")}</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors py-2" href="#contact" onClick={() => setMobileMenuOpen(false)}>{t("nav.contact")}</a>
            <a
              className="inline-flex items-center justify-center bg-primary text-on-primary px-6 py-3 rounded-full font-label-sm hover:bg-primary-fixed transition-all duration-300 mt-2"
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.contactMe")}
            </a>
          </div>
        </div>
      </nav>
      <main>
        {/* ======================= HERO SECTION ======================= */}
        <section
          className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden reveal"
          id="home"
        >
          <div className="absolute inset-0 z-0">
            <ShaderBackground />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10"></div>
            <div className="absolute inset-0 grid-bg opacity-30 z-10"></div>
          </div>
          <div className={`relative z-20 max-w-container-max mx-auto px-gutter w-full flex flex-col md:flex-row items-center justify-between gap-12`}>
            <div className={`flex-1 text-center ${isRTL ? "md:text-right" : "md:text-left"} reveal`}>
              <p className={`font-mono text-mono text-secondary mb-4 flex items-center justify-center ${isRTL ? "md:justify-end" : "md:justify-start"} gap-2`}>
                <span className="w-8 h-[1px] bg-secondary"></span> {t("hero.greeting")}
              </p>
              <h1 className="font-display-hero-mobile text-display-hero-mobile md:font-display-hero md:text-display-hero text-on-surface mb-6 leading-tight">
                {t("hero.titleLine1")} <br className="hidden md:block" />{" "}
                <span className="text-gradient">{t("hero.name")}</span>
              </h1>
              <p className={`font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl ${isRTL ? "mx-auto md:mr-0 md:ml-auto" : "mx-auto md:mx-0"}`}>
                {t("hero.subtitle")}
              </p>
              <div className={`flex flex-wrap items-center justify-center ${isRTL ? "md:justify-end" : "md:justify-start"} gap-4`}>
                <a
                  className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-sm font-semibold hover:bg-primary-fixed transition-all duration-300 shadow-[0_0_20px_rgba(173,198,255,0.4)] hover:shadow-[0_0_30px_rgba(173,198,255,0.7)] flex items-center gap-2"
                  href="#projects"
                >
                  {t("hero.cta.work")}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                </a>
                <a
                  className="px-8 py-4 rounded-full font-label-sm font-semibold text-on-surface border border-outline hover:border-primary hover:text-primary transition-all duration-300 glass-panel glow-hover"
                  href="#contact"
                >
                  {t("hero.cta.contact")}
                </a>
              </div>
            </div>
            <div className="flex-1 flex justify-center md:justify-end reveal">
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full p-2 bg-gradient-to-tr from-primary to-secondary animate-[spin_10s_linear_infinite]">
                <div className="w-full h-full rounded-full overflow-hidden bg-surface animate-[spin_10s_linear_infinite_reverse]">
                  <img
                    alt={t("hero.imgAlt")}
                    className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700"
                    src="/kareem.png"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center animate-bounce reveal">
            <span className="text-on-surface-variant font-mono text-[10px] uppercase tracking-widest mb-2">
              {t("hero.scroll")}
            </span>
            <ChevronDown className="w-6 h-6 text-on-surface-variant" />
          </div>
        </section>

        {/* ======================= ABOUT SECTION ======================= */}
        <section
          className="py-section-padding-mobile md:py-section-padding-desktop relative reveal"
          id="about"
        >
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="text-center mb-16 reveal">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">
                {t("about.title")}
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="reveal">
                <p className={`font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed ${isRTL ? "text-right" : ""}`}>
                  {t("about.p1")}
                </p>
                <p className={`font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed ${isRTL ? "text-right" : ""}`}>
                  {t("about.p2")}
                </p>
             
              </div>
              <div className="grid grid-cols-2 gap-4 reveal">
                <div className="glass-panel p-6 rounded-xl glow-hover transition-all duration-300">
                  <div className="text-primary mb-2">
                    <Blocks className="w-8 h-8" />
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                    {t("about.projects")}
                  </h3>
                  <p className="font-mono text-mono text-on-surface-variant">
                    {t("about.projectsLabel")}
                  </p>
                </div>

                <div className="glass-panel p-6 rounded-xl glow-hover transition-all duration-300">
                  <div className="text-secondary mb-2">
                    <Globe className="w-8 h-8" />
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                    {t("about.fullstack")}
                  </h3>
                  <p className="font-mono text-mono text-on-surface-variant">
                    {t("about.fullstackLabel")}
                  </p>
                </div>

                <div className="glass-panel p-6 rounded-xl glow-hover transition-all duration-300 col-span-2 flex items-center justify-between">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                      {t("about.iti")}
                    </h3>
                    <p className="font-mono text-mono text-on-surface-variant">
                      {t("about.itiLabel")}
                    </p>
                  </div>
                  <div className="text-tertiary">
                    <Briefcase className="w-10 h-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= SKILLS SECTION ======================= */}
        <section
          className="py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-lowest relative border-y border-white/5 reveal"
          id="skills"
        >
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="text-center mb-16 reveal">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">
                {t("skills.title")}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
                {t("skills.subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
              <div className="glass-panel rounded-xl p-8 bento-card bento-card-primary transition-all duration-500 reveal md:col-span-2 group relative overflow-hidden flex flex-col justify-between">
                <div className={`absolute ${isRTL ? "-left-10" : "-right-10"} -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all`}></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="text-primary w-6 h-6" />
                    <h3 className="font-headline-md text-xl text-on-surface">
                      {t("skills.backend.title")}
                    </h3>
                  </div>
                  <p className="font-body-md text-on-surface-variant mb-6 line-clamp-2">
                    {t("skills.backend.desc")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                  <span className="px-3 py-1 bg-surface-container border border-outline-variant rounded-full font-mono text-[12px] text-on-surface">
                    Node.js
                  </span>
                  <span className="px-3 py-1 bg-surface-container border border-outline-variant rounded-full font-mono text-[12px] text-on-surface">
                    Express
                  </span>
                  <span className="px-3 py-1 bg-surface-container border border-outline-variant rounded-full font-mono text-[12px] text-on-surface">
                    Mongo
                  </span>
                  <span className="px-3 py-1 bg-surface-container border border-outline-variant rounded-full font-mono text-[12px] text-on-surface">
                    TypeScript
                  </span>
                  <span className="px-3 py-1 bg-surface-container border border-outline-variant rounded-full font-mono text-[12px] text-on-surface">
                    
                  </span>
                </div>
              </div>

              <div className="glass-panel rounded-xl p-8 bento-card bento-card-secondary transition-all duration-500 reveal group relative overflow-hidden flex flex-col justify-between">
                <div className={`absolute ${isRTL ? "-left-10" : "-right-10"} -bottom-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all`}></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Server className="text-secondary w-6 h-6" />
                    <h3 className="font-headline-md text-xl text-on-surface">
                      {t("skills.frontend.title")}
                    </h3>
                  </div>
                  <p className="font-body-md text-on-surface-variant line-clamp-3">
                    {t("skills.frontend.desc")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 relative z-10">
                  <span className="px-3 py-1 bg-surface-container border border-outline-variant rounded-full font-mono text-[12px] text-on-surface">
                    React
                  </span>
                  <span className="px-3 py-1 bg-surface-container border border-outline-variant rounded-full font-mono text-[12px] text-on-surface">
                    Next.js
                  </span>
                  <span className="px-3 py-1 bg-surface-container border border-outline-variant rounded-full font-mono text-[12px] text-on-surface">
                   TypeScript
                  </span>
                </div>
              </div>

              <div className="glass-panel rounded-xl p-8 bento-card bento-card-tertiary transition-all duration-500 reveal group relative overflow-hidden flex flex-col justify-between">
                <div className={`absolute ${isRTL ? "-right-10" : "-left-10"} -bottom-10 w-40 h-40 bg-tertiary/10 rounded-full blur-3xl group-hover:bg-tertiary/20 transition-all`}></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="text-tertiary w-6 h-6" />
                    <h3 className="font-headline-md text-xl text-on-surface">
                      {t("skills.database.title")}
                    </h3>
                  </div>
                  <p className="font-body-md text-on-surface-variant line-clamp-3">
                    {t("skills.database.desc")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 relative z-10">
                  <span className="px-3 py-1 bg-surface-container border border-outline-variant rounded-full font-mono text-[12px] text-on-surface">
                    SQL
                  </span>
                  <span className="px-3 py-1 bg-surface-container border border-outline-variant rounded-full font-mono text-[12px] text-on-surface">
                    MongoDB
                  </span>
                  <span className="px-3 py-1 bg-surface-container border border-outline-variant rounded-full font-mono text-[12px] text-on-surface">
                    Redis
                  </span>
                </div>
              </div>

              <div className="glass-panel rounded-xl p-8 bento-card bento-card-primary transition-all duration-500 reveal md:col-span-2 group relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-container/5 rounded-full blur-3xl group-hover:bg-primary-container/10 transition-all"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-on-surface text-2xl">
                      build
                    </span>
                    <h3 className="font-headline-md text-xl text-on-surface">
                      {t("skills.devops.title")}
                    </h3>
                  </div>
                  <p className="font-body-md text-on-surface-variant mb-6 max-w-lg">
                    {t("skills.devops.desc")}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="px-3 py-1 bg-surface-container border border-outline-variant rounded-full font-mono text-[12px] text-on-surface">
                      Docker
                    </span>
                    <span className="px-3 py-1 bg-surface-container border border-outline-variant rounded-full font-mono text-[12px] text-on-surface">
                      AWS
                    </span>
                    <span className="px-3 py-1 bg-surface-container border border-outline-variant rounded-full font-mono text-[12px] text-on-surface">
                      CI/CD
                    </span>
                    <span className="px-3 py-1 bg-surface-container border border-outline-variant rounded-full font-mono text-[12px] text-on-surface">
                      Git
                    </span>
                    <span className="px-3 py-1 bg-surface-container border border-outline-variant rounded-full font-mono text-[12px] text-on-surface">
                      Linux
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= PROJECTS SECTION ======================= */}
        <section
          className="py-section-padding-mobile md:py-section-padding-desktop relative reveal"
          id="projects"
        >
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 reveal">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">
                  {t("projects.title")}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                  {t("projects.subtitle")}
                </p>
              </div>
              <a
                className={`hidden md:inline-flex items-center gap-2 text-primary hover:text-primary-fixed transition-colors font-label-sm mt-4 md:mt-0`}
                href="https://github.com/K-Sultan" target="_blank"
              >
                {t("projects.viewGithub")}{" "}
                <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
              </a>
            </div>
            <div className="space-y-24">
              {/* Project 1 - Sonesta */}
              <div className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center reveal">
                <div className="lg:col-span-7 relative overflow-hidden rounded-xl glass-panel border border-white/10 group-hover:border-primary/50 transition-colors duration-500 h-[300px] md:h-[450px]">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
                  <img
                    alt={t("projects.sonesta.imgAlt")}
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    src="/Sonesta.png"
                  />
                </div>
                <div className={`lg:col-span-5 flex flex-col justify-center ${isRTL ? "lg:pr-8" : "lg:pl-8"}`}>
                  <p className="font-mono text-mono text-primary mb-2">
                    {t("projects.sonesta.number")}
                  </p>
                  <h3 className="font-headline-md text-2xl text-on-surface font-bold mb-4">
                    {t("projects.sonesta.title")}
                  </h3>
                  <div className={`glass-panel p-6 rounded-lg mb-6 shadow-lg ${isRTL ? "lg:-mr-12" : "lg:-ml-12"} relative z-20`}>
                    <p className="font-body-md text-on-surface-variant">
                      {t("projects.sonesta.desc")}
                    </p>
                  </div>
                  <ul className="flex flex-wrap gap-4 font-mono text-[13px] text-on-surface-variant mb-8">
                    <li>Laravel</li>
                    <li>Vue</li>
                    <li>Sql</li>
                  </ul>
                  <div className="flex items-center gap-4">
                    <a
                      className="text-on-surface hover:text-primary transition-colors"
                      href="https://github.com/ahmedfaheem/Sonesta"
                      title="View Source"
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    </a>
                    <a
                      className="text-on-surface hover:text-primary transition-colors"
                      href="https://www.youtube.com/watch?v=LjwKGJLvgLE"
                      title="Live Demo"
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Project 2 - Pharma */}
              <div className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center reveal">
                <div className={`lg:col-span-5 flex flex-col justify-center ${isRTL ? "lg:pl-8 order-2 lg:order-2 text-right" : "lg:pr-8 order-2 lg:order-1 text-left lg:text-right"}`}>
                  <p className="font-mono text-mono text-secondary mb-2">
                    {t("projects.pharma.number")}
                  </p>
                  <h3 className="font-headline-md text-2xl text-on-surface font-bold mb-4">
                    {t("projects.pharma.title")}
                  </h3>
                  <div className={`glass-panel p-6 rounded-lg mb-6 shadow-lg ${isRTL ? "lg:-ml-12" : "lg:-mr-12"} relative z-20`}>
                    <p className="font-body-md text-on-surface-variant">
                      {t("projects.pharma.desc")}
                    </p>
                  </div>
                  <ul className={`flex flex-wrap gap-4 font-mono text-[13px] text-on-surface-variant mb-8 ${isRTL ? "lg:justify-start" : "lg:justify-end"}`}>
                    <li>Django</li>
                    <li>DRF</li>
                    <li>SQL</li>
                  </ul>
                  <div className={`flex items-center gap-4 ${isRTL ? "lg:justify-start" : "lg:justify-end"}`}>
                    <a
                      className="text-on-surface hover:text-secondary transition-colors"
                      href="https://github.com/K-Sultan/Pharma"
                      title="View Source"
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    </a>
                    <a
                      className="text-on-surface hover:text-secondary transition-colors"
                      href="https://www.youtube.com/watch?v=3LxhjUKvjEI"
                      title="Live Demo"
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                    </a>
                  </div>
                </div>
                <div className={`lg:col-span-7 relative overflow-hidden rounded-xl glass-panel border border-white/10 group-hover:border-secondary/50 transition-colors duration-500 h-[300px] md:h-[450px] order-1 ${isRTL ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
                  <img
                    alt={t("projects.pharma.imgAlt")}
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    src="/Clinic.png"
                  />
                </div>
              </div>

              {/* Project 3 - Nota */}
              <div className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center reveal">
                <div className="lg:col-span-7 relative overflow-hidden rounded-xl glass-panel border border-white/10 group-hover:border-tertiary/50 transition-colors duration-500 h-[300px] md:h-[450px]">
                  <div className="absolute inset-0 bg-tertiary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
                  <img
                    alt={t("projects.nota.imgAlt")}
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    src="/Smart Notes.png"
                  />
                </div>
                <div className={`lg:col-span-5 flex flex-col justify-center ${isRTL ? "lg:pr-8" : "lg:pl-8"}`}>
                  <p className="font-mono text-mono text-tertiary mb-2">
                    {t("projects.nota.number")}
                  </p>
                  <h3 className="font-headline-md text-2xl text-on-surface font-bold mb-4">
                    {t("projects.nota.title")}
                  </h3>
                  <div className={`glass-panel p-6 rounded-lg mb-6 shadow-lg ${isRTL ? "lg:-mr-12" : "lg:-ml-12"} relative z-20`}>
                    <p className="font-body-md text-on-surface-variant">
                      {t("projects.nota.desc")}
                    </p>
                  </div>
                  <ul className="flex flex-wrap gap-4 font-mono text-[13px] text-on-surface-variant mb-8">
                    <li>Node.js</li>
                    <li>Express</li>
                    <li>MongoDB</li>
                    <li>React</li>
                  </ul>
                  <div className="flex items-center gap-4">
                    <a
                      className="text-on-surface hover:text-tertiary transition-colors"
                      href="https://github.com/K-Sultan/Smart-notes-fullStack"
                      title="View Source"
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    </a>
                    <a
                      className="text-on-surface hover:text-tertiary transition-colors"
                      href="#"
                      title="Live Demo"
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= EXPERIENCE SECTION ======================= */}
        <section
          className="py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-lowest relative border-y border-white/5 reveal"
          id="experience"
        >
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="text-center mb-16 reveal">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">
                {t("experience.title")}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {t("experience.subtitle")}
              </p>
            </div>
            <div className="max-w-3xl mx-auto relative">
              <div className={`absolute ${isRTL ? "right-[15px] md:right-1/2 md:-mr-[1px]" : "left-[15px] md:left-1/2 md:-ml-[1px]"} top-0 bottom-0 w-[2px] bg-outline-variant/30 border-l border-dashed border-outline-variant/50`}></div>

              {/* ITI Experience */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between mb-16 reveal group">
                <div className={`md:w-5/12 ${isRTL ? "text-right md:text-left pl-0 pr-12 md:pr-0 md:pl-12" : "text-left md:text-right pr-8 md:pr-12 pl-12 md:pl-0"} mb-4 md:mb-0`}>
                  <h3 className="font-headline-md text-xl text-on-surface font-semibold">
                    {t("experience.iti.title")}
                  </h3>
                  <p className="font-mono text-sm text-primary mb-2">
                    {t("experience.iti.company")}
                  </p>
                  <div className={`font-body-md text-on-surface-variant text-sm space-y-2 mt-3`}>
                    <p><strong className="text-on-surface">{t("experience.iti.track")}</strong> {t("experience.iti.trackValue")}</p>
                    <p><strong className="text-on-surface">{t("experience.iti.projects")}</strong> {t("experience.iti.projectsValue")}</p>
                    <p><strong className="text-on-surface">{t("experience.iti.skills")}</strong> {t("experience.iti.skillsValue")}</p>
                    <p><strong className="text-on-surface">{t("experience.iti.highlights")}</strong> {t("experience.iti.highlightsValue")}</p>
                  </div>
                </div>

                <div className={`absolute ${isRTL ? "right-0 md:right-1/2 md:-mr-[16px]" : "left-0 md:left-1/2 md:-ml-[16px]"} w-8 h-8 rounded-full glass-panel border-2 border-primary bg-surface flex items-center justify-center shadow-[0_0_15px_rgba(173,198,255,0.5)] z-10`}>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                </div>
                <div className={`md:w-5/12 ${isRTL ? "pr-12 md:pr-12 text-right" : "pl-12 md:pl-12 text-left"}`}>
                  <span className="font-mono text-mono bg-surface-container px-3 py-1 rounded text-on-surface-variant border border-outline-variant/30">
                    {t("experience.iti.date")}
                  </span>
                </div>
              </div>

              {/* University Experience */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between reveal">
                <div className={`md:w-5/12 ${isRTL ? "text-right md:text-left pr-0 md:pl-12 order-1 md:order-1" : "text-left md:text-right pr-8 md:pr-12 pl-12 md:pl-0 order-1 md:order-1"} mb-4 md:mb-0`}>
                  <span className={`font-mono text-mono bg-surface-container px-3 py-1 rounded text-on-surface-variant border border-outline-variant/30 hidden md:inline-block`}>
                    {t("experience.uni.date")}
                  </span>
                </div>

                <div className={`absolute ${isRTL ? "right-0 md:right-1/2 md:-mr-[12px]" : "left-0 md:left-1/2 md:-ml-[12px]"} w-6 h-6 rounded-full glass-panel border-2 border-outline-variant bg-surface flex items-center justify-center z-10 transition-colors group-hover:border-secondary`}></div>
                <div className={`md:w-5/12 ${isRTL ? "pr-12 md:pr-12 text-right order-2 md:order-2" : "pl-12 md:pl-12 text-left order-2 md:order-2"}`}>
                  <h3 className="font-headline-md text-xl text-on-surface font-semibold">
                    {t("experience.uni.title")}
                  </h3>
                  <p className="font-mono text-sm text-secondary mb-2">
                    {t("experience.uni.company")}
                  </p>
                  <div className={`font-body-md text-on-surface-variant text-sm space-y-2 mt-3`}>
                    <p><strong className="text-on-surface">{t("experience.uni.degree")}</strong> {t("experience.uni.degreeValue")}</p>
                    <p><strong className="text-on-surface">{t("experience.uni.focus")}</strong> {t("experience.uni.focusValue")}</p>
                    <p><strong className="text-on-surface">{t("experience.uni.coursework")}</strong> {t("experience.uni.courseworkValue")}</p>
                  </div>
                  <span className={`font-mono text-mono bg-surface-container px-3 py-1 rounded text-on-surface-variant border border-outline-variant/30 inline-block md:hidden mt-3`}>
                    {t("experience.uni.date")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= CONTACT SECTION ======================= */}
        <section
          className="py-section-padding-mobile md:py-section-padding-desktop relative overflow-hidden reveal"
          id="contact"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="max-w-container-max mx-auto px-gutter relative z-10">
            <div className="text-center mb-16 reveal">
              <p className="font-mono text-mono text-primary mb-4">
                {t("contact.preTitle")}
              </p>
              <h2 className="font-display-hero-mobile text-4xl md:text-5xl text-on-surface mb-6 font-bold">
                {t("contact.title1")}
                <br />
                {t("contact.title2")}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto mb-10">
                {t("contact.subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
              <div className="lg:col-span-2 space-y-6 reveal">
                <button
                  className="flex items-center gap-4 glass-panel p-6 rounded-xl glow-hover transition-all group block w-full text-left cursor-pointer"
                  onClick={handleCopyEmail}
                  id="email-copy-btn"
                  type="button"
                >
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-label-sm text-on-surface-variant mb-1">
                      {t("contact.email")}
                    </p>
                    <p className="font-body-md text-on-surface font-medium group-hover:text-primary transition-colors truncate">
                      kareemhanysultan2004@gmail.com
                    </p>
                  </div>
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                    <Copy className="w-4 h-4" />
                  </div>
                </button>
                <a
                  className="flex items-center gap-4 glass-panel p-6 rounded-xl glow-hover transition-all group block"
                  href="https://www.linkedin.com/in/kareem-sultan-1b7ba3372/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-secondary group-hover:bg-secondary/10 transition-colors">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-label-sm text-on-surface-variant mb-1">
                      {t("contact.linkedin")}
                    </p>
                    <p className="font-body-md text-on-surface font-medium group-hover:text-secondary transition-colors">
                      /in/kareem-sultan
                    </p>
                  </div>
                </a>
                <a
                  className="flex items-center gap-4 glass-panel p-6 rounded-xl glow-hover transition-all group block"
                  href="https://github.com/K-Sultan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-tertiary group-hover:bg-tertiary/10 transition-colors">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-label-sm text-on-surface-variant mb-1">
                      {t("contact.github")}
                    </p>
                    <p className="font-body-md text-on-surface font-medium group-hover:text-tertiary transition-colors">
                      @K-Sultan
                    </p>
                  </div>
                </a>
              </div>

              <div className="lg:col-span-3 glass-panel p-8 rounded-2xl reveal relative">
                <div
                  className={`absolute inset-0 bg-surface/90 backdrop-blur-sm z-20 rounded-2xl flex flex-col items-center justify-center transition-opacity duration-300 ${
                    isSuccess ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                  }`}
                  id="success-message"
                >
                  <CheckCircle className="w-16 h-16 text-primary mb-4" />
                  <h3 className="font-headline-md text-2xl text-on-surface font-bold mb-2">
                    {t("contact.form.success.title")}
                  </h3>
                  <p className="font-body-md text-on-surface-variant">
                    {t("contact.form.success.desc")}
                  </p>
                </div>
                <form className="space-y-6" id="contact-form" onSubmit={handleContactSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block font-label-sm text-on-surface-variant mb-2"
                        htmlFor="name"
                      >
                        {t("contact.form.name")}
                      </label>
                      <input
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        id="name"
                        name="name"
                        required
                        placeholder={t("contact.form.namePlaceholder")}
                        type="text"
                      />
                    </div>
                    <div>
                      <label
                        className="block font-label-sm text-on-surface-variant mb-2"
                        htmlFor="email"
                      >
                        {t("contact.form.email")}
                      </label>
                      <input
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        id="email"
                        name="email"
                        required
                        placeholder={t("contact.form.emailPlaceholder")}
                        type="email"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block font-label-sm text-on-surface-variant mb-2"
                      htmlFor="subject"
                    >
                      {t("contact.form.subject")}
                    </label>
                    <input
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      id="subject"
                      name="subject"
                      required
                      placeholder={t("contact.form.subjectPlaceholder")}
                      type="text"
                    />
                  </div>
                  <div>
                    <label
                      className="block font-label-sm text-on-surface-variant mb-2"
                      htmlFor="message"
                    >
                      {t("contact.form.message")}
                    </label>
                    <textarea
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                      id="message"
                      name="message"
                      required
                      placeholder={t("contact.form.messagePlaceholder")}
                      rows={4}
                    ></textarea>
                  </div>
                  <button
                    className="w-full bg-primary text-on-primary font-label-sm py-4 rounded-lg hover:bg-primary-fixed transition-colors flex items-center justify-center gap-2"
                    id="submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin inline-block w-5 h-5" /> {t("contact.form.sending")}
                      </>
                    ) : (
                      <>
                        {t("contact.form.send")} <Send className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ======================= FOOTER ======================= */}
      <footer className="w-full py-stack-lg border-t border-white/5 bg-surface dark:bg-surface reveal">
        <div className="max-w-container-max mx-auto px-gutter flex flex-col md:flex-row justify-between items-center gap-6">
          <a
            className="font-headline-md text-headline-md font-bold text-on-surface"
            href="#"
          >
            {t("footer.name")}
          </a>
          <p className="font-body-md text-body-md text-on-surface-variant text-center">
            {t("footer.copyright")}
          </p>
          <div className="flex gap-6">
            <a
              className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-sm"
              href="https://github.com/K-Sultan"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("footer.github")}
            </a>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-sm"
              href="https://www.linkedin.com/in/kareem-sultan-1b7ba3372/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("footer.linkedin")}
            </a>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-sm"
              href="mailto:kareemhanysultan2004@gmail.com"
            >
              {t("footer.email")}
            </a>
          </div>
        </div>
      </footer>

      <a
        className={`fixed bottom-8 ${isRTL ? "left-8" : "right-8"} w-12 h-12 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-300 z-40 shadow-[0_0_15px_rgba(173,198,255,0.2)] hover:shadow-[0_0_20px_rgba(173,198,255,0.5)]`}
        href="#home"
        id="back-to-top"
        title={t("backToTop")}
      >
        <ArrowUp className="w-6 h-6" />
      </a>

      {/* ======================= EMAIL COPIED TOAST ======================= */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
          isCopied
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-live="polite"
      >
        <div className="flex items-center gap-3 bg-surface-container border border-primary/40 shadow-[0_0_30px_rgba(173,198,255,0.25)] backdrop-blur-md px-5 py-3.5 rounded-2xl">
          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="font-label-sm text-on-surface font-semibold text-sm">{t("toast.copied")}</p>
            <p className="font-mono text-[11px] text-on-surface-variant">kareemhanysultan2004@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  );
}
