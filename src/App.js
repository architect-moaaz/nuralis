import React, { useEffect, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react"

/**
 * Nuralis.ai – Lead‑Gen Landing Page (bug‑free build)
 * --------------------------------------------------------------
 *  • Removes stray duplicate JSX after hero section (fixed parse error)
 *  • Replaces lingering `slides.length` with `phrases.length`
 *  • Keeps constant gold CTA button overlay & split headline animation
 * --------------------------------------------------------------
 */

/* -------------------- Static Data -------------------- */
const goldPhrases = [
  "Operations",
  "Business",
  "Automation",
  "Data Analysis",
  "Future",
];

const solutions = [
  {
    icon: "🧠",
    title: "Agentic RAG",
    desc: "Retrieval‑Augmented Generation super‑charged with autonomy. Our agents pull live data, reason across sources, and craft answers that cite where every fact came from—no hallucinations, just truth on demand."
  },
  {
    icon: "🔊",
    title: "Voice AI Agents",
    desc: "Natural, human‑sounding voices that hold context‑rich conversations, schedule meetings, triage support calls, and close deals while your team sleeps."
  },
  {
    icon: "⚙️",
    title: "Workflow Automators",
    desc: "Drag‑and‑drop any business process—finance approvals, HR onboarding, IT ops—and watch an intelligent agent run it end‑to‑end, 24 × 7, with full audit trails."
  },
];

const useCases = [
  {
    icon: "💬",
    title: "24×7 Customer Support & Ticket Resolution",
    detail: "Deploy chat or voice agents that understand context, pull answers from your knowledge base, resolve 80 % of tickets autonomously, and seamlessly escalate edge‑cases to humans—reducing average handle time by 60 %."
  },
  {
    icon: "📚",
    title: "Enterprise Knowledge‑Base Q&A",
    detail: "Semantic search across scattered PDFs, Confluence spaces, and SharePoint libraries. Employees get one authoritative answer with source links instead of wading through pages of docs."
  },
  {
    icon: "🚀",
    title: "Sales Enablement & Personalized Outreach",
    detail: "Agents that read CRM notes, craft hyper‑personalized emails, and follow‑up at the perfect moment—boosting reply rates by 3× and freeing reps to close big deals."
  },
  {
    icon: "🔄",
    title: "Self‑Healing IT & Ops",
    detail: "Agents monitor logs and metrics, predict incidents, trigger playbooks, and remediate issues before customers notice—cutting downtime to near‑zero."
  },
  {
    icon: "📊",
    title: "Conversational BI & Data Analysis",
    detail: "Ask natural‑language questions and receive charts, insights, and narrative summaries. No SQL required—just answers."
  },
];

export default function App() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [flipIdx, setFlipIdx] = useState(null);
  const [shrink, setShrink] = useState(false);

  /* cycle dynamic headline */
  useEffect(() => {
    const id = setInterval(() => setPhraseIdx(i => (i + 1) % goldPhrases.length), 6000);
    return () => clearInterval(id);
  }, []);

  /* sticky‑header shrink */
  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const toggleFlip = i => setFlipIdx(flipIdx === i ? null : i);

  return (
    <>
      {/* ---------------- Inline CSS ---------------- */}
      <style>{`
        :root{--black:#000;--white:#fff;--gray-100:#f5f5f7;--gray-200:#e9e9ec;--gray-700:#6b6b6b;--gold:#b89b5e;--radius:24px;--space:160px;--space-m:96px}
        @media(max-width:640px){:root{--space:var(--space-m)}
        .hero-line { flex-direction: column; align-items: center; font-size: 2rem; text-align: center; }
        .hero-cta { position: static; margin-top: 2rem; transform: none; }
        .header-inner { flex-direction: column; gap: 1rem; height: auto; padding: 1rem 0; }
        .logo { height: 150px; }
        .grid { grid-template-columns: 1fr !important; }
        .ucard { height: auto; }
        .ucard-inner { height: auto; min-height: 260px; }
        .ucard-face { padding: 1.2rem; font-size: 0.95rem; }
        .nav-links a { display: none; }
        .header-cta { margin-left: 0; }
        .container { padding: 0 1rem; }
        .cta p { padding: 0 1rem; }
        .footer-logo { width: 100px; }
      }
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:-apple-system,BlinkMacSystemFont,'SF Pro','Segoe UI',Roboto,sans-serif;background:var(--gray-100);color:var(--black);line-height:1.6;-webkit-font-smoothing:antialiased}
        h1,h2{font-weight:700;letter-spacing:-.45px;margin-bottom:1rem}
        h1{font-size:clamp(2.8rem,7vw,4.2rem)}h2{font-size:clamp(1.9rem,4.5vw,2.6rem)}
        p{color:var(--gray-700)}
        a{text-decoration:none;color:inherit}
        /* Buttons */
        .btn{font:inherit;cursor:pointer;border:none;border-radius:9999px;padding:1rem 2.8rem;background:var(--black);color:var(--white);transition:transform .15s ease,box-shadow .15s ease,background .15s ease}
        .btn:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.08);background:var(--gold);color:var(--black)}
        .btn-gold{background:var(--gold);color:var(--black)}
        .btn-gold:hover{background:var(--black);color:var(--white)}
        .container{max-width:1200px;margin:auto;padding:0 1.5rem}
        section{padding:var(--space) 0}

        /* Header */
        .header{background:var(--white);position:sticky;top:0;z-index:1000;border-bottom:1px solid var(--gray-200);transition:height .3s ease}
        .header-inner{display:flex;align-items:center;justify-content:space-between;height:72px;transition:height .3s ease}
        .header.shrink .header-inner{height:56px}
        .logo{height:40px;transition:height .3s ease}
        .header.shrink .logo{height:100px}
        .nav-links{display:flex;align-items:center}
        .nav-links a{margin-left:2rem;font-weight:500;position:relative}
        .nav-links a::after{content:"";position:absolute;left:0;bottom:-6px;width:0;height:2px;background:var(--gold);transition:width .25s ease}
        .nav-links a:hover::after{width:100%}
        .header-cta{margin-left:2.5rem}
        @media(max-width:640px){.nav-links a{display:none}.header-cta{margin-left:0}}

        /* Hero */
        .hero{background:var(--black);color:var(--white);text-align:center;min-height:480px;overflow:hidden;position:relative;display:flex;flex-direction:column;justify-content:center;align-items:center}
        .hero::before{content:"";position:absolute;inset:0;background:url('/nuralis-logo.png') center/22% no-repeat;opacity:0.03;filter:invert(1);pointer-events:none}
        .hero-line{display:flex;gap:.5rem;font-size:clamp(2.8rem,7vw,4.2rem);font-weight:700;z-index:1;flex-wrap:nowrap;white-space:nowrap}
        .static{white-space:nowrap}
        .gold{color:var(--gold)}
        .dynamic-wrapper{position:relative;display:inline-block;min-width:240px}
        .phrase{position:absolute;left:0;top:0;opacity:0;transition:opacity 3s ease-in-out;white-space:nowrap}
        .phrase.active{opacity:1}
        .white{color:var(--white)}
        .phrase.active{opacity:1}
        .hero-cta{position:absolute;left:50%;bottom:40px;transform:translateX(-50%);z-index:1}

        /* CTA */
        .cta{background:var(--white);text-align:center}
        .cta h2{font-size:clamp(2.2rem,5vw,3rem);margin-bottom:1.2rem}
        .cta p{font-size:1.1rem;margin-bottom:2rem;color:var(--gray-700)}

        /* Grid */
        .grid{display:grid;gap:2rem}
        @media(min-width:640px){.grid{grid-template-columns:repeat(auto-fit,minmax(280px,1fr))}}

        /* Solution card */
        .card{background:var(--white);padding:2.8rem 2.2rem;border-radius:var(--radius);box-shadow:0 10px 30px rgba(0,0,0,.05);transition:transform .25s cubic-bezier(.4,.2,.2,1),box-shadow .25s cubic-bezier(.4,.2,.2,1);display:flex;flex-direction:column;align-items:center;text-align:center}
        .card:hover{transform:translateY(-6px);box-shadow:0 18px 40px rgba(0,0,0,.07)}
        .card-icon{font-size:2.5rem;margin-bottom:1.4rem;color:var(--black);transition:transform .25s ease}
        .card:hover .card-icon{transform:scale(1.05)}
        .card strong{font-size:1.25rem;margin-bottom:.6rem;color:var(--black)}
        #solutions{background:linear-gradient(135deg,var(--gray-100) 0%,var(--gray-200) 100%)}

        /* Use‑case card */
        #usecases{background:var(--white)}
        .ucard{perspective:1200px;height:240px;cursor:pointer}
        .ucard-inner{position:relative;width:100%;height:100%;transition:transform .7s cubic-bezier(.4,.2,.2,1);transform-style:preserve-3d}
        .ucard.flipped .ucard-inner{transform:rotateY(180deg)}
        .ucard-face{position:absolute;inset:0;border-radius:var(--radius);box-shadow:0 6px 20px rgba(0,0,0,.04);display:flex;align-items:center;justify-content:center;padding:2rem;backface-visibility:hidden;background:rgba(255,255,255,0.72);backdrop-filter:saturate(180%) blur(24px)}
        .ucard-front{gap:1.2rem}
        .ucard-icon{font-size:2rem;color:var(--black);transition:transform .25s ease}
        .ucard:hover .ucard-icon,.ucard.flipped .ucard-icon{transform:scale(1.1)}
        .ucard-front p{font-weight:600;color:var(--black)}
        .ucard-back{transform:rotateY(180deg);text-align:left;line-height:1.6;color:var(--black);font-size:.95rem}

        /* Contact */
        #contact form{display:flex;flex-direction:column;gap:1rem;max-width:480px;margin:auto}
        #contact input,#contact textarea{padding:1rem;border:1px solid var(--gray-200);border-radius:12px;font-size:1rem}
        #contact button{background:var(--black);color:var(--white)}
        #contact button:hover{background:var(--gold);color:var(--black)}

        /* Footer */
        footer{background:var(--black);color:var(--white);text-align:center;padding:4rem 1rem}
        .footer-logo{width:150px;margin-bottom:1.5rem;filter: none}
      `}</style>

      {/* Header */}
      <header className={`header${shrink ? ' shrink' : ''}`}>
        <div className="container header-inner">
          <img src="nuralis-logo.png" alt="Nuralis" className="logo" />
          <nav className="nav-links">
            <a href="#solutions" onClick={e=>{e.preventDefault();scrollTo('solutions')}}>Solutions</a>
            <a href="#usecases" onClick={e=>{e.preventDefault();scrollTo('usecases')}}>Use Cases</a>
            <a href="#contact" onClick={e=>{e.preventDefault();scrollTo('contact')}}>Contact</a>
          </nav>
          <button className="btn header-cta" onClick={()=>scrollTo('contact')}>Know More</button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero" id="hero">
        <div className="hero-line">
          <span className="static">AI&nbsp;<span className="gold">A</span>gents&nbsp;</span>
          <span className="dynamic-wrapper">
            {goldPhrases.map((g,i)=>(
              <span key={i} className={`phrase${i===phraseIdx?' active':''}`}> 
                <span className="white">{i===4 ? 'for the ' : 'for '}</span><span className="gold">{g}</span>
              </span>
            ))}
          </span>
        </div>
        <button className="btn btn-gold hero-cta" onClick={()=>scrollTo('contact')}>Know More</button>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>Automate the work nobody wants to do</h2>
          <p>From frontline support to back‑office ops, Nuralis Agents handle the repetitive, rules‑based grind—so your people can invent, create, and delight customers.</p>
          <button className="btn" onClick={()=>scrollTo('contact')}>Book My Demo</button>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions">
        <div className="container">
          <h2 style={{textAlign:'center',marginBottom:'3rem'}}>AI Agents as a Service — Your On‑Demand Digital Workforce</h2>
          <div className="grid">
            {solutions.map((s,i)=>(
              <div key={i} className="card">
                <div className="card-icon" aria-hidden="true">{s.icon}</div>
                <strong>{s.title}</strong>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section id="usecases">
        <div className="container">
          <h2 style={{textAlign:'center',marginBottom:'3rem'}}>Real‑World Wins Powered by Nuralis Agents</h2>
          <div className="grid">
            {useCases.map((uc,i)=>(
              <div key={i} className={`ucard${flipIdx===i?' flipped':''}`} onClick={()=>toggleFlip(i)}>
                <div className="ucard-inner">
                  <div className="ucard-face ucard-front">
                    <span className="ucard-icon" aria-hidden="true">{uc.icon}</span>
                    <p>{uc.title}</p>
                  </div>
                  <div className="ucard-face ucard-back"><p>{uc.detail}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <div className="container">
          <h2 style={{textAlign:'center',marginBottom:'2rem'}}>Let’s Map Your First Automation</h2>
          <form onSubmit={e=>{e.preventDefault();alert('Thank you! Our team will reach out shortly.');e.target.reset();}}>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Work Email" required />
            <textarea placeholder="Briefly describe the process you’d like to automate" rows="4" required></textarea>
            <button type="submit" className="btn">Submit</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <img src="nuralis-logo.png" alt="Nuralis Logo" className="footer-logo" />
        <p>© 2025 Nuralis.ai — All rights reserved.</p>
      </footer>
    </>
  );
}
