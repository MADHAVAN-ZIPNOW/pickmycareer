import React, { useEffect, useState } from 'react'
import { api, setToken } from './api.js'

export const B = ({ ta, en }) => (<><span className="ta">{ta}</span><span className="en">{en}</span></>)

export function AuthModal({ onClose, onAuthed, toast }) {
  const [tab, setTab] = useState('s')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const submit = async (e) => {
    e.preventDefault(); const v = Object.fromEntries(new FormData(e.target)); setErr('')
    if (tab === 's') {
      if (!v.name.trim()) return setErr('Please enter your name.')
      if (!/^[6-9]\d{9}$/.test(v.mob)) return setErr('Please enter a valid 10-digit mobile number.')
      if (!v.cls) return setErr('Please choose your class.')
      if (v.pw.length < 6) return setErr('Password needs at least 6 characters.')
    } else if (!v.id.trim() || !v.pw) return setErr('Please enter mobile/email and password.')
    setBusy(true)
    try {
      const r = tab === 's'
        ? await api('/auth/signup', { method: 'POST', body: { name: v.name, mobile: v.mob, village: v.vil, qualification: v.cls, password: v.pw } })
        : await api('/auth/login', { method: 'POST', body: { id: v.id, password: v.pw } })
      setToken(r.token); onAuthed(r.user)
    } catch (x) { setErr(x.message) } finally { setBusy(false) }
  }
  return (
    <div className="ov show" onClick={(e) => e.target === e.currentTarget && onClose()} role="dialog" aria-modal="true" aria-labelledby="authT">
      <div className="modal">
        <button className="x" onClick={onClose} aria-label="Close">✕</button>
        <h2 id="authT">உன் எதிர்காலத்திற்கு சேர் <span className="en" style={{ display: 'block', fontSize: '.65em', color: 'var(--mut)' }}>Join Your Future</span></h2>
        <div className="tabs"><button className={tab === 's' ? 'on' : ''} onClick={() => { setTab('s'); setErr('') }}>Sign Up</button><button className={tab === 'l' ? 'on' : ''} onClick={() => { setTab('l'); setErr('') }}>Login</button></div>
        <form className="form" onSubmit={submit} noValidate key={tab}>
          {tab === 's' ? (<>
            <label>பெயர் / Name<input className="inp" name="name" autoComplete="name" autoFocus /></label>
            <label>மொபைல் / Mobile Number<input className="inp" name="mob" type="tel" inputMode="numeric" maxLength={10} autoComplete="tel" /></label>
            <label>ஊர், மாவட்டம் / Village, District<input className="inp" name="vil" /></label>
            <label>வகுப்பு / Class or Qualification<select className="inp" name="cls"><option value="">Select…</option><option>10th</option><option>12th</option><option>Diploma</option><option>Degree</option><option>Other</option></select></label>
            <label>கடவுச்சொல் / Password<input className="inp" name="pw" type="password" autoComplete="new-password" /></label>
          </>) : (<>
            <label>மொபைல் / Mobile or Email<input className="inp" name="id" autoComplete="username" autoFocus /></label>
            <label>கடவுச்சொல் / Password<input className="inp" name="pw" type="password" autoComplete="current-password" /></label>
          </>)}
          <div className="err" role="alert">{err}</div>
          <button className={'btn ' + (tab === 's' ? 'b-ok' : 'b-pri')} style={{ minHeight: 54 }} type="submit" disabled={busy}>
            {busy ? <><span className="spin" /> Please wait…</> : tab === 's' ? 'Create Free Account' : 'Login'}
          </button>
          {tab === 'l' && <a href="#" style={{ textAlign: 'center', color: 'var(--acc)', fontWeight: 600, padding: 8 }} onClick={(e) => { e.preventDefault(); toast('Password reset will be added soon.') }}>Forgot Password?</a>}
        </form>
        <div className="or">— or —</div>
        <button className="gbtn" onClick={() => toast('Google login will be connected soon. Please use mobile sign up for now.')}>
          <svg width="22" height="22" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.7 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.6 17.7 9.5 24 9.5z" /><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" /><path fill="#FBBC05" d="M10.4 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.9-4.7l-7.8-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.8-6.1z" /><path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.7 2.3-7.7 2.3-6.3 0-11.7-4.1-13.6-9.8l-7.8 6.1C6.5 42.6 14.6 48 24 48z" /></svg>
          Continue with Google
        </button>
        <p className="priv">🔒 Your information is safe. We use it only to give you better career guidance.</p>
      </div>
    </div>
  )
}


export function Quiz({ onClose, setA }) {
  const [careers, setCareers] = useState([])
  useEffect(() => { api('/careers').then(setCareers).catch(() => {}) }, [])
  const [qs, setQs] = useState(null)
  const [i, setI] = useState(0)
  const [score, setScore] = useState({})
  const [res, setRes] = useState(null)
  const [err, setErr] = useState('')
  useEffect(() => { api('/quiz/questions').then(setQs).catch((e) => setErr(e.message)) }, [])
  const answer = async (v) => {
    const s = { ...score, [qs[i].area]: (score[qs[i].area] || 0) + v }
    setScore(s)
    if (i + 1 < qs.length) return setI(i + 1)
    try { setRes((await api('/quiz/submit', { method: 'POST', body: { scores: s } })).top) } catch (e) { setErr(e.message) }
  }
  return (
    <div className="ov show" role="dialog" aria-modal="true">
      <div className="modal big"><button className="x" onClick={onClose} aria-label="Close">✕</button>
        {err && <div className="err" role="alert">⚠ {err}</div>}
        {!qs && !err && <p><span className="spin" style={{ borderColor: 'var(--acc)', borderTopColor: 'transparent' }} /> Loading…</p>}
        {qs && !res && (<>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--mut)' }}><span>Question {i + 1} of {qs.length}</span><span>{i}%</span></div>
          <div className="prog"><div style={{ width: (i / qs.length) * 100 + '%' }} /></div>
          <div className="qtxt" style={{ fontSize: 24, margin: '24px 0' }}>{qs[i].text}</div>
          <div className="ans">
            <button className="y" onClick={() => answer(2)}>👍 ஆம்<br /><small>Yes</small></button>
            <button onClick={() => answer(1)}>🤔 ஒருவேளை<br /><small>Maybe</small></button>
            <button className="n" onClick={() => answer(0)}>👎 இல்லை<br /><small>No</small></button>
          </div></>)}
        {res && (<>
          <h2>🎉 உன் முதல் 3 தொழில்கள்<span className="en" style={{ display: 'block', fontSize: '.65em', color: 'var(--mut)' }}>Your Top 3 Careers</span></h2>
          <div className="res">{res.map((r, k) => {
            const c = careers.find((x) => x.id === r.career_id) || {}
            return <div key={r.career_id}><span className="m">{['🥇', '🥈', '🥉'][k]}</span>
              <span style={{ flex: 1 }}><b>{c.ic} {c.en} · {c.ta}</b>{r.percent}% match<span className="bar"><i style={{ width: r.percent + '%' }} /></span></span>
              <button className="btn b-pri" style={{ minHeight: 44, padding: '0 12px' }} onClick={() => setA({ t: 'career', id: r.career_id })}>Explore</button></div>
          })}</div></>)}
      </div>
    </div>
  )
}
