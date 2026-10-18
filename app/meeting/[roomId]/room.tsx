'use client';
import { useEffect, useState } from 'react';
import { LiveKitRoom, VideoConference, RoomAudioRenderer, StartAudio } from '@livekit/components-react';
import { ArrowLeft, BookOpen, Copy, Link2, LoaderCircle, MessageCircle, ShieldAlert, Video, Wifi } from 'lucide-react';
import '@livekit/components-styles';

export default function MeetingRoom({ roomId }: { roomId: string }) {
  const [name, setName] = useState('');
  const [draftName, setDraftName] = useState('');
  const [token, setToken] = useState('');
  const [serverUrl, setServerUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [joined, setJoined] = useState(false);
  useEffect(()=>{ const n=localStorage.getItem('gospelName')||''; setDraftName(n); },[]);
  const meetingUrl = typeof window !== 'undefined' ? window.location.href : '';
  async function enterMeeting(e?: React.FormEvent) {
    e?.preventDefault(); const chosen = draftName.trim(); if (!chosen) { setError('Please enter your name first.'); return; }
    setLoading(true); setError('');
    try {
      const response = await fetch('/api/token', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ roomName: roomId, participantName: chosen }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not prepare the meeting.');
      localStorage.setItem('gospelName', chosen); setName(chosen); setToken(data.token); setServerUrl(data.url); setJoined(true);
    } catch (err: any) { setError(err.message || 'Could not connect. Please try again.'); }
    finally { setLoading(false); }
  }
  async function copyLink() { try { await navigator.clipboard.writeText(meetingUrl); setCopied(true); setTimeout(()=>setCopied(false),1800); } catch { setError('Copy failed. Please copy the address from your browser.'); } }
  function whatsapp() { window.open(`https://wa.me/?text=${encodeURIComponent(`Join my Godswell Updates meeting: ${meetingUrl}`)}`, '_blank', 'noopener,noreferrer'); }
  if (joined) return <main className="meeting-live"><header className="meeting-top"><a className="brand meeting-brand" href="/"><span className="brand-mark"><BookOpen size={20}/><span className="mark-cross">✦</span></span><span>Godswell <b>Updates</b><small>GATHER IN FAITH</small></span></a><div className="room-pill"><span className="live-dot"/> Room {roomId}</div><div className="meeting-top-actions"><button className="share-button" onClick={copyLink}><Copy size={16}/>{copied?'Copied!':'Copy invite'}</button><button className="share-button whatsapp-button" onClick={whatsapp}><MessageCircle size={16}/> WhatsApp</button></div></header><div className="conference-wrap"><LiveKitRoom token={token} serverUrl={serverUrl} connect={true} video={true} audio={true} onDisconnected={()=>setJoined(false)} onError={(e)=>setError(e.message)} data-lk-theme="default" style={{height:'100%',background:'#101a17'}}><VideoConference/><RoomAudioRenderer/><StartAudio label="Tap to enable meeting audio"/></LiveKitRoom></div>{error&&<div className="meeting-toast" role="alert">{error}</div>}</main>;
  return <main className="prejoin-shell"><header className="meeting-top prejoin-top"><a className="brand meeting-brand" href="/"><span className="brand-mark"><BookOpen size={20}/><span className="mark-cross">✦</span></span><span>Godswell <b>Updates</b><small>GATHER IN FAITH</small></span></a><a className="back-link" href="/"><ArrowLeft size={16}/> Home</a></header><section className="prejoin-card"><div className="prejoin-icon"><Video size={27}/></div><span className="section-kicker">YOU'RE INVITED</span><h1>Join the gathering.</h1><p className="prejoin-sub">You’re joining room <strong>{roomId}</strong>. Add your name and get ready to connect.</p><form onSubmit={enterMeeting} className="prejoin-form"><label htmlFor="displayName">Your name</label><input id="displayName" value={draftName} onChange={e=>setDraftName(e.target.value)} placeholder="Enter your name" autoComplete="name" maxLength={60} required/><button className="primary-btn join-now" disabled={loading}>{loading?<><LoaderCircle className="spin" size={18}/> Preparing meeting…</>:<>Join meeting <ArrowRight size={17}/></>}</button></form>{error&&<div className="error-note"><ShieldAlert size={17}/><span>{error}</span></div>}<div className="prejoin-divider"><span/>OR INVITE OTHERS<span/></div><div className="prejoin-share"><button onClick={copyLink}><Copy size={17}/>{copied?'Link copied':'Copy meeting link'}</button><button onClick={whatsapp}><MessageCircle size={17}/>Share on WhatsApp</button></div><p className="privacy-note"><Wifi size={14}/> Your browser will ask permission to use your camera and microphone.</p></section><footer className="prejoin-footer">Godswell Updates · Gather in faith</footer></main>;
}
