'use client';
import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, Check, ChevronRight, Copy, HeartHandshake, Link2, Menu, Mic2, MonitorSmartphone, Plus, ShieldCheck, Sparkles, Video, Users, Wifi } from 'lucide-react';

export default function Home() {
  const [joinCode, setJoinCode] = useState('');
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [installed, setInstalled] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  useEffect(() => {
    const handler = (e: Event) => { e.preventDefault(); setInstallPrompt(e); };
    window.addEventListener('beforeinstallprompt', handler);
    setRecent(JSON.parse(localStorage.getItem('gospelRecent') || '[]'));
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);
  function newMeeting() {
    const id = crypto.randomUUID().split('-').slice(0, 3).join('-').toUpperCase();
    saveRecent(id); window.location.href = `/meeting/${id}`;
  }
  function saveRecent(id: string) {
    const next = [id, ...JSON.parse(localStorage.getItem('gospelRecent') || '[]').filter((x: string) => x !== id)].slice(0, 4);
    localStorage.setItem('gospelRecent', JSON.stringify(next));
  }
  function join() {
    const value = joinCode.trim(); if (!value) return;
    const match = value.match(/\/meeting\/([^/?#]+)/i);
    const id = (match ? match[1] : value).replace(/[^a-zA-Z0-9-]/g, '');
    if (id) { saveRecent(id); window.location.href = `/meeting/${encodeURIComponent(id)}`; }
  }
  async function install() {
    if (installPrompt) { await installPrompt.prompt(); setInstallPrompt(null); }
    else alert('To install: open your browser menu and choose “Install app” or “Add to Home Screen”. On iPhone, use Safari → Share → Add to Home Screen.');
  }
  return <main className="home-shell">
    <nav className="topbar wrap">
      <a className="brand" href="/"><span className="brand-mark"><BookOpen size={22}/><span className="mark-cross">✦</span></span><span>Godswell <b>Updates</b><small>GATHER IN FAITH</small></span></a>
      <div className="nav-links"><a href="#how">How it works</a><a href="#features">Features</a><button className="install-small" onClick={install}><MonitorSmartphone size={16}/> Install app</button></div>
      <button className="mobile-install" aria-label="Install app" onClick={install}><MonitorSmartphone size={19}/></button>
    </nav>
    <section className="hero wrap">
      <div className="hero-copy">
        <div className="eyebrow"><span className="live-dot"/> YOUR COMMUNITY, CLOSER</div>
        <h1>Faith grows<br/>when we <em>gather.</em></h1>
        <p className="hero-desc">Bring your church, prayer group, family, and friends together in one simple video call — wherever life finds you.</p>
        <div className="hero-actions"><button className="primary-btn" onClick={newMeeting}><Video size={19}/> Start a new meeting <ArrowRight size={17}/></button><a className="text-btn" href="#join">Join with a code <ChevronRight size={17}/></a></div>
        <div className="trust-row"><span><ShieldCheck size={16}/> Simple to join</span><span><Wifi size={16}/> Works across devices</span></div>
      </div>
      <div className="hero-art" aria-label="Illustration of a community gathering">
        <div className="art-glow"/><div className="sun-disc"/><div className="cross-shape"><span/></div>
        <div className="art-quote"><span className="quote-mark">“</span><p>For where two or three gather in my name, there am I with them.</p><small>MATTHEW 18:20</small></div>
        <div className="art-bottom"><span className="tiny-avatar a1">J</span><span className="tiny-avatar a2">M</span><span className="tiny-avatar a3">A</span><span className="tiny-avatar a4">+</span><div><b>Better together</b><small>Every voice matters</small></div></div>
        <div className="floating-leaf leaf-one"/><div className="floating-leaf leaf-two"/>
      </div>
    </section>
    <section className="join-section wrap" id="join">
      <div className="join-heading"><span className="section-kicker">COME ON IN</span><h2>Ready to connect?</h2><p>Start a gathering or join one that’s already happening.</p></div>
      <div className="meeting-cards">
        <article className="action-card create-card"><div className="card-icon green-icon"><Plus size={24}/></div><div className="card-content"><h3>Create a meeting</h3><p>Start a room and invite everyone with one link.</p></div><button className="card-arrow" onClick={newMeeting} aria-label="Create a meeting"><ArrowRight size={19}/></button></article>
        <article className="action-card join-card"><div className="card-icon cream-icon"><Link2 size={22}/></div><div className="card-content"><h3>Join a meeting</h3><p>Have a link or room code? Enter it below.</p><div className="join-input-row"><input value={joinCode} onChange={e=>setJoinCode(e.target.value)} onKeyDown={e=>e.key==='Enter'&&join()} placeholder="Paste meeting link or code" aria-label="Meeting link or code"/><button onClick={join} disabled={!joinCode.trim()}>Join <ArrowRight size={15}/></button></div></div></article>
      </div>
    </section>
    {recent.length > 0 && <section className="recent-section wrap"><div><span className="section-kicker">PICK UP WHERE YOU LEFT OFF</span><h2>Recent rooms</h2></div><div className="recent-list">{recent.map(id=><button key={id} onClick={()=>window.location.href=`/meeting/${id}`}><span className="recent-icon"><Video size={17}/></span><span><b>{id}</b><small>Open meeting room</small></span><ChevronRight size={17}/></button>)}</div></section>}
    <section className="features-section" id="features"><div className="wrap"><div className="feature-intro"><span className="section-kicker">MADE FOR YOUR COMMUNITY</span><h2>Everything you need<br/>to come together.</h2><p>Less time figuring things out. More time sharing what matters.</p></div><div className="feature-grid"><div className="feature-item"><span><Users size={22}/></span><h3>Room for everyone</h3><p>Invite multiple people into one shared gathering.</p></div><div className="feature-item"><span><Mic2 size={22}/></span><h3>Clear conversations</h3><p>Choose when your microphone and camera are on.</p></div><div className="feature-item"><span><HeartHandshake size={22}/></span><h3>Share the invitation</h3><p>Send your meeting link to a group through WhatsApp.</p></div><div className="feature-item"><span><MonitorSmartphone size={22}/></span><h3>Meet on your terms</h3><p>Use a phone, tablet, laptop, or desktop browser.</p></div></div></div></section>
    <section className="how-section wrap" id="how"><div className="how-copy"><span className="section-kicker">THREE SIMPLE STEPS</span><h2>A gathering is<br/>just moments away.</h2><p>No complicated setup for your guests. Create a room, share the invitation, and meet.</p><button className="primary-btn" onClick={newMeeting}>Create your first meeting <ArrowRight size={17}/></button></div><div className="steps"><div className="step"><span>01</span><div><h3>Create your room</h3><p>One click gives you a unique meeting link.</p></div><Check size={18}/></div><div className="step"><span>02</span><div><h3>Invite your people</h3><p>Copy the link or send it directly on WhatsApp.</p></div><Check size={18}/></div><div className="step"><span>03</span><div><h3>Gather and connect</h3><p>Allow your camera and microphone, then join in.</p></div><Check size={18}/></div></div></section>
    <footer className="footer"><div className="wrap footer-inner"><a className="brand footer-brand" href="/"><span className="brand-mark"><BookOpen size={20}/><span className="mark-cross">✦</span></span><span>Godswell <b>Updates</b><small>GATHER IN FAITH</small></span></a><p>Bringing people together, one gathering at a time.</p><span className="copyright">© {new Date().getFullYear()} Godswell Updates</span></div></footer>
  </main>;
}
