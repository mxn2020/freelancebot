import { useState, useCallback } from 'react';
import { useAction, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

interface Proposal { coverLetter: string; keyPoints: string[]; estimatedBid: string; }

function ProposalPage() {
  const [jobTitle, setJobTitle] = useState(''); const [jobDesc, setJobDesc] = useState(''); const [skills, setSkills] = useState('');
  const [loading, setLoading] = useState(false); const [result, setResult] = useState<Proposal | null>(null); const [copied, setCopied] = useState(false);
  const generate = useAction(api.ai.generateProposal); const save = useMutation(api.functions.saveProposal);

  const handleGenerate = useCallback(async () => {
    if (!jobTitle.trim() || !jobDesc.trim() || !skills.trim()) return; setLoading(true);
    try {
      const r = await generate({ jobTitle: jobTitle.trim(), jobDescription: jobDesc.trim(), yourSkills: skills.trim() }); setResult(r); await save({ jobTitle, jobDescription: jobDesc, yourSkills: skills, ...r });
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }, [jobTitle, jobDesc, skills, generate, save]);

  const handleCopy = () => { if (result) { navigator.clipboard.writeText(result.coverLetter); setCopied(true); setTimeout(() => setCopied(false), 2000); } };

  return (
    <div className="mc"><div className="pg">
      <h1 className="title">Win <span className="a">Freelance</span> Gigs</h1>
      <p className="sub">Paste a job listing and your skills — get a winning proposal in seconds.</p>
      <input className="inp" value={jobTitle} onChange={e => setJobTitle(e.target.value)} placeholder="Job title (e.g. React Developer for SaaS Dashboard)" />
      <textarea className="ta" value={jobDesc} onChange={e => setJobDesc(e.target.value)} placeholder="Paste the full job description here..." rows={4} />
      <textarea className="ta" value={skills} onChange={e => setSkills(e.target.value)} placeholder="Your skills & experience (e.g. 5 years React, TypeScript, Node.js, built 3 SaaS apps...)" rows={3} />
      <button className="btn" disabled={!jobTitle.trim() || !jobDesc.trim() || !skills.trim() || loading} onClick={handleGenerate}>{loading ? '⏳ Writing...' : '🚀 Generate Proposal'}</button>
      {loading && <div className="ld"><span /><span /><span /></div>}
      {result && !loading && (
        <div className="res">
          <div className="res-hdr"><h2>📝 Your Proposal</h2></div>
          <div className="res-body">
            <div className="proposal-text">{result.coverLetter}</div>
            <div className="kp-title">🎯 Key Differentiators</div>
            <div className="kp-list">{result.keyPoints.map((p, i) => <div key={i} className="kp-item">✓ {p}</div>)}</div>
            <div className="bid-box">💰 Suggested Bid: {result.estimatedBid}</div>
            <button className="copy-btn" onClick={handleCopy}>{copied ? '✅ Copied!' : '📋 Copy Proposal'}</button>
          </div>
        </div>
      )}
    </div></div>
  );
}

function App() {
  return (<BrowserRouter><div className="app">
    <header className="hdr"><a href="/"><span style={{ fontSize: '1.5rem' }}>🚀</span><div><h1>FreelanceBot</h1></div></a></header>
    <Routes><Route path="/" element={<ProposalPage />} /></Routes>
    <footer className="ftr">© {new Date().getFullYear()} FreelanceBot — An AVS Media App.</footer>
  </div></BrowserRouter>);
}
export default App;
