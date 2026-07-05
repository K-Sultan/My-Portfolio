const fs = require('fs');

let html = fs.readFileSync('code.html', 'utf8');

// Extract body content
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (!bodyMatch) {
  console.error("No body found");
  process.exit(1);
}

let bodyHtml = bodyMatch[1];

// Replace class with className
bodyHtml = bodyHtml.replace(/class=/g, 'className=');

// Replace for with htmlFor
bodyHtml = bodyHtml.replace(/for=/g, 'htmlFor=');

// Fix inline styles
bodyHtml = bodyHtml.replace(/style="([^"]*)"/g, (match, styleString) => {
  const styles = styleString.split(';').filter(s => s.trim() !== '').reduce((acc, style) => {
    const [key, value] = style.split(':').map(s => s.trim());
    if (key && value) {
      const reactKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      acc[reactKey] = value;
    }
    return acc;
  }, {});
  return `style={${JSON.stringify(styles)}}`;
});

// Self close input, img, br, path, hr
const voidTags = ['input', 'img', 'br', 'path', 'hr'];
voidTags.forEach(tag => {
  const regex = new RegExp(`<${tag}([^>]*?)(?<!/)>`, 'gi');
  bodyHtml = bodyHtml.replace(regex, `<${tag}$1 />`);
});

// Fix viewbox to viewBox in svg
bodyHtml = bodyHtml.replace(/viewbox=/gi, 'viewBox=');

// Remove the inline scripts and shaders completely
bodyHtml = bodyHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

// Replace Shader comment with the component
bodyHtml = bodyHtml.replace(/<!-- STITCH_SHADER_START:ANIMATION_9[\s\S]*?STITCH_SHADER_END:ANIMATION_9 -->/i, '<ShaderBackground />');

// Remove other comments
bodyHtml = bodyHtml.replace(/<!--[\s\S]*?-->/g, '');

const finalReactCode = `"use client";

import { useEffect } from "react";
import ShaderBackground from "../components/ShaderBackground";

export default function Home() {
  useEffect(() => {
    // Scroll Reveal Logic
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on initial load

    // Back to Top Logic
    const backToTopBtn = document.getElementById('back-to-top');
    const scrollListener = () => {
        if (window.scrollY > 500) {
            backToTopBtn?.classList.add('visible');
        } else {
            backToTopBtn?.classList.remove('visible');
        }
    };
    window.addEventListener('scroll', scrollListener);

    // Contact Form Simulation Logic
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');
    const contactForm = document.getElementById('contact-form') as HTMLFormElement;

    const clickListener = (e) => {
        e.preventDefault();
        if (!submitBtn) return;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span className="material-symbols-outlined animate-spin">refresh</span> Sending...';
        (submitBtn as HTMLButtonElement).disabled = true;
        
        setTimeout(() => {
            successMessage?.classList.remove('opacity-0', 'pointer-events-none');
            contactForm?.reset();
            submitBtn.innerHTML = originalText;
            (submitBtn as HTMLButtonElement).disabled = false;
            
            setTimeout(() => {
                successMessage?.classList.add('opacity-0', 'pointer-events-none');
            }, 4000);
        }, 1500);
    };

    if(submitBtn) {
        submitBtn.addEventListener('click', clickListener);
    }

    return () => {
      window.removeEventListener('scroll', revealOnScroll);
      window.removeEventListener('scroll', scrollListener);
      if(submitBtn) submitBtn.removeEventListener('click', clickListener);
    };
  }, []);

  return (
    <>
      ${bodyHtml}
    </>
  );
}
`;

fs.writeFileSync('src/app/page.tsx', finalReactCode, 'utf8');
console.log('Conversion successful!');
