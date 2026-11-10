import React from 'react'
import { B } from './parts.jsx'
import { Decor } from './Decor.jsx'
import { ICONS, ChipTarget, ChipShield, ChipRocket } from './Icons.jsx'

export function Header({ user, lang, setLang, logout, login }) {
  const pick = (l) => setLang(lang === l ? 'both' : l)
  return (
    <header className="top">
      <div className="nav2">
        <a href="/" className="brand" aria-label="அறி">
          <img className="logo-small" src="/logo.png" alt="" width="420" height="433" />
          <span><b><span className="ta"><em>அறி</em></span><span className="en"><em>Ari</em></span></b><small><B ta="கற்றுக்கொள் · வளர் · எதிர்காலத்தை உருவாக்கு" en="LEARN · GROW · BUILD YOUR FUTURE" /></small></span>
        </a>
        <div className="navr">
          <span className="pill act"><svg className="ni" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 11.5L12 4l9 7.5" /><path d="M5.5 10v10h13V10" /><path d="M10 20v-5.5h4V20" /></svg> <span><B ta="முகப்பு" en="Home" /></span></span>
          <button className={'pill lang' + (lang === 'ta' ? ' on' : '')} onClick={() => pick('ta')}><svg className="ni" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></svg> <span>தமிழ்</span></button>
          <button className={'pill sm lang' + (lang === 'en' ? ' on' : '')} onClick={() => pick('en')}>EN</button>
          <i className="sep" />
          {user
            ? <button className="pill login" onClick={logout}><svg className="ni" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.500 3.500-7 8-7s8 2.500 8 7" /></svg> <span>{user.name} · <B ta="வெளியேறு" en="Logout" /></span></button>
            : <button className="pill login" onClick={login}><svg className="ni" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.500 3.500-7 8-7s8 2.500 8 7" /></svg> <span><B ta="பதிவு / உள்நுழை" en="Sign Up / Login" /></span> <svg className="ni" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg></button>}
        </div>
      </div>
    </header>
  )
}

// South-Indian temple gate tower (gopuram): 7 tapering carved tiers, gold crown, door
const GT = Array.from({ length: 7 }, (_, i) => ({ y: 150 - i * 19, w: 96 - i * 11 }))

const Gopuram = () => (
  <svg viewBox="0 0 120 200">
    <defs>
      <linearGradient id="gpb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#9A2A08" /><stop offset=".5" stopColor="#C2410C" /><stop offset="1" stopColor="#9A2A08" /></linearGradient>
      <linearGradient id="gpg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FEF08A" /><stop offset="1" stopColor="#F59E0B" /></linearGradient>
    </defs>
    {/* crown: kalasam pots */}
    <g fill="url(#gpg)">
      <path d="M60 0l2.5 9h-5z" />
      {[44, 60, 76].map((x, i) => <g key={x}><ellipse cx={x} cy={i === 1 ? 17 : 21} rx="5" ry="6" /><rect x={x - 1} y={i === 1 ? 8 : 12} width="2" height="6" /></g>)}
      <rect x="38" y="26" width="44" height="5" rx="2" />
    </g>
    {/* tiers */}
    {GT.slice().reverse().map(({ y, w }, k) => {
      const x = 60 - w / 2
      const pillars = Math.floor(w / 9)
      return (
        <g key={k}>
          <path d={'M' + (x - 3) + ' ' + (y - 4) + 'h' + (w + 6) + 'l-3 6h' + -w + 'z'} fill="#F59E0B" />
          <rect x={x} y={y + 2} width={w} height="13" fill="url(#gpb)" />
          <g fill="#FDBA74" opacity=".9">
            {Array.from({ length: pillars }, (_, p) => {
              const px = x + 4 + p * ((w - 8) / pillars)
              return <path key={p} d={'M' + px + ' ' + (y + 14) + 'v-7q3 -4 6 0v7z'} />
            })}
          </g>
          <rect x={x - 2} y={y + 15} width={w + 4} height="3" rx="1" fill="#7C2D12" />
        </g>
      )
    })}
    {/* base + door */}
    <rect x="4" y="170" width="112" height="9" rx="2" fill="#7C2D12" />
    <rect x="0" y="180" width="120" height="10" rx="2" fill="#9A2A08" />
    <path d="M50 170v-16c0-7 4-11 10-11s10 4 10 11v16z" fill="#3B0D03" />
    <path d="M55 170v-14c0-4 2-7 5-7s5 3 5 7v14z" fill="#F59E0B" opacity=".55" />
  </svg>
)

const Chart = () => (
  <svg viewBox="-6 -6 190 150" overflow="visible">
    <g fill="#fff" fillOpacity=".3">
      <rect x="4" y="108" width="24" height="28" rx="4" /><rect x="38" y="96" width="24" height="40" rx="4" /><rect x="72" y="84" width="24" height="52" rx="4" /><rect x="106" y="70" width="24" height="66" rx="4" /><rect x="140" y="56" width="24" height="80" rx="4" />
    </g>
    <path d="M4 82L48 50l32 16L150 14" stroke="#fff" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M122 10l30 3-3 30" stroke="#fff" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
)

const Tower = () => (
  <svg viewBox="0 0 120 200">
    <g fill="#BFDBFE" fillOpacity=".55">
      <path d="M60 0v10" stroke="#BFDBFE" strokeWidth="3" /><circle cx="60" cy="12" r="3.5" />
      <path d="M36 42c0-18 11-28 24-28s24 10 24 28z" />
      <rect x="34" y="42" width="52" height="6" rx="2" />
      <rect x="38" y="48" width="44" height="34" />
      <rect x="32" y="82" width="56" height="7" rx="2" />
      <rect x="28" y="89" width="64" height="54" />
      <rect x="22" y="143" width="76" height="8" rx="2" />
      <rect x="14" y="151" width="92" height="22" />
      <rect x="6" y="173" width="108" height="9" rx="2" /><rect x="0" y="182" width="120" height="10" rx="2" />
    </g>
    <g fill="#2563EB" fillOpacity=".5">
      {[46, 60, 74].map((x) => <path key={'a' + x} d={'M' + (x - 4) + ' 78v-18c0-5 2-8 4-8s4 3 4 8v18z'} />)}
      {[40, 54, 68, 82].map((x) => <path key={'b' + x} d={'M' + (x - 4) + ' 134v-26c0-6 2-9 4-9s4 3 4 9v26z'} />)}
      {[26, 42, 58, 74, 90].map((x) => <path key={'c' + x} d={'M' + (x - 4) + ' 168v-12c0-4 2-6 4-6s4 2 4 6v12z'} />)}
      <path d="M52 192v-16c0-6 4-9 8-9s8 3 8 9v16z" />
    </g>
  </svg>
)

const Leaves = () => (
  <svg viewBox="0 0 160 170"><g fill="#fff"><path d="M80 168C78 120 60 80 20 60c6 44 26 80 60 108z" /><path d="M82 168C86 110 110 70 150 48c-4 50-30 90-68 120z" /><path d="M80 120c-4-30-20-52-46-64 2 28 18 52 46 64z" opacity=".7" /><path d="M84 96c8-26 26-44 52-52-2 26-20 46-52 52z" opacity=".7" /></g></svg>
)

const Mark = ({ t }) => {
  const P = { quiz: <Leaves />, experts: <img src="/emoji/w_experts.png" alt="" />, careers: <Chart />, colleges: <Tower /> }
  return P[t] ? <span className={'mark m-' + t} aria-hidden="true">{P[t]}</span> : null
}

const FX = { quiz: ["✅", "📝"], experts: ["💡", "🎤"], careers: ["⭐", "🚀"], colleges: ["🎓", "🏫"] }

const chips = [
  [ChipTarget, ['சரியான வழிகாட்டல்', 'Right Guidance'], ['உன் இலக்குகளுக்கு', 'for your goals']],
  [ChipShield, ['நம்பகமான தகவல்', 'Trusted Information'], ['சிறந்த முடிவுகளுக்கு', 'for better decisions']],
]

function Art() {
  return (
    <svg viewBox="0 0 640 460" aria-hidden="true" preserveAspectRatio="xMaxYMax meet">
      <defs>
        <radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#FFF7D6" /><stop offset=".45" stopColor="#DBEAFE" /><stop offset="1" stopColor="#EEF2FF" stopOpacity="0" /></radialGradient>
        <linearGradient id="bld" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#60A5FA" /><stop offset="1" stopColor="#DBEAFE" /></linearGradient>
        <linearGradient id="bld2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#93C5FD" /><stop offset="1" stopColor="#EFF6FF" /></linearGradient>
        <linearGradient id="hl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#86EFAC" /><stop offset="1" stopColor="#16A34A" /></linearGradient>
        <linearGradient id="hl2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4ADE80" /><stop offset="1" stopColor="#15803D" /></linearGradient>
        <linearGradient id="rd2" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#FCD34D" /><stop offset="1" stopColor="#FFFBEB" /></linearGradient>
        <linearGradient id="hood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#93C5FD" /><stop offset="1" stopColor="#3B82F6" /></linearGradient>
        <filter id="blur"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>
      <circle cx="400" cy="190" r="215" fill="url(#glow)" />
      {/* clouds */}
      <g fill="#fff" opacity=".9"><ellipse cx="560" cy="150" rx="46" ry="16" /><ellipse cx="590" cy="140" rx="30" ry="14" /><ellipse cx="90" cy="250" rx="52" ry="17" /><ellipse cx="124" cy="240" rx="32" ry="14" /></g>
      {/* city */}
      <g>
        <rect x="318" y="196" width="30" height="86" rx="4" fill="url(#bld2)" />
        <rect x="350" y="150" width="28" height="132" rx="4" fill="url(#bld)" />
        <rect x="380" y="118" width="26" height="164" rx="4" fill="url(#bld)" /><path d="M393 118v-18" stroke="#60A5FA" strokeWidth="3" />
        <rect x="408" y="170" width="34" height="112" rx="4" fill="url(#bld2)" />
        <rect x="444" y="140" width="26" height="142" rx="4" fill="url(#bld)" />
        <rect x="472" y="190" width="32" height="92" rx="4" fill="url(#bld2)" />
        <rect x="506" y="214" width="26" height="68" rx="4" fill="url(#bld)" />
        <g fill="#fff" opacity=".6">{[130, 150, 170, 190, 210].map((y) => <rect key={y} x="388" y={y} width="4" height="8" rx="1" />)}{[160, 185, 210].map((y) => <rect key={y} x="358" y={y} width="4" height="8" rx="1" />)}{[155, 180, 205, 230].map((y) => <rect key={y} x="452" y={y} width="4" height="8" rx="1" />)}</g>
      </g>
      {/* hills */}
      <path d="M170 330c60-60 150-70 250-62 90 6 160 20 220 60v132H170z" fill="url(#hl)" />
      <path d="M250 460c20-70 120-95 190-120 40-14 120-8 200 8v112z" fill="url(#hl2)" opacity=".55" />
      {/* road */}
      <path d="M338 460C410 410 250 380 352 340c46-18 82-44 84-72l8 0c8 30-16 56-60 76-80 36 40 70 36 116z" fill="url(#rd2)" />
      <path d="M338 460C410 410 250 380 352 340c46-18 82-44 84-72l8 0c8 30-16 56-60 76-80 36 40 70 36 116z" fill="#FDE68A" opacity=".5" filter="url(#blur)" />
      <path d="M372 460c24-46-90-76-8-114 40-18 70-42 76-74" stroke="#F59E0B" strokeWidth="3" strokeDasharray="5 12" strokeLinecap="round" fill="none" />
      {/* student (back view) */}
      <g>
        <ellipse cx="196" cy="452" rx="84" ry="10" fill="#15803D" opacity=".35" />
        <path d="M112 460c-6-92-2-178 40-212 18-14 66-14 84 0 42 34 46 120 40 212z" fill="url(#hood)" />
        <path d="M120 460c-6-70-2-140 18-186-24 40-26 130-18 186z" fill="#2563EB" opacity=".35" />
        <path d="M196 262c-44-6-72-26-60-50 14-30 110-30 124 0 12 24-18 44-64 50z" fill="#7DB2F5" />
        <circle cx="196" cy="160" r="40" fill="#1F2937" /><path d="M160 150c4-30 68-30 72 0-14-12-58-12-72 0z" fill="#111827" />
        <rect x="182" y="196" width="28" height="22" rx="10" fill="#A9693A" />
        <rect x="136" y="236" width="120" height="150" rx="36" fill="#111827" />
        <rect x="156" y="318" width="80" height="48" rx="16" fill="#1F2937" /><rect x="170" y="330" width="52" height="5" rx="2.500" fill="#374151" />
        <path d="M150 246c-6 40-4 70 4 92M242 246c6 40 4 70-4 92" stroke="#374151" strokeWidth="9" strokeLinecap="round" fill="none" />
        <circle cx="196" cy="262" r="7" fill="#F59E0B" />
        <path d="M112 300c-14 20-18 56-12 88" stroke="#93C5FD" strokeWidth="26" strokeLinecap="round" fill="none" />
        <path d="M280 300c14 20 18 56 12 88" stroke="#60A5FA" strokeWidth="26" strokeLinecap="round" fill="none" />
        <circle cx="98" cy="396" r="13" fill="#A9693A" /><circle cx="294" cy="396" r="13" fill="#A9693A" />
      </g>
      {/* graduation cap */}
      <g transform="translate(440 52) rotate(-8)">
        <ellipse cx="0" cy="44" rx="46" ry="8" fill="#93C5FD" opacity=".5" />
        <path d="M-52 4L0 -18 52 4 0 26z" fill="#2563EB" /><path d="M-52 4L0 -18 52 4 0 -2z" fill="#60A5FA" />
        <path d="M-30 14v22c0 10 60 10 60 0V14L0 26z" fill="#1E3A8A" />
        <path d="M50 6v34" stroke="#F59E0B" strokeWidth="3.500" strokeLinecap="round" /><path d="M44 40l6 -2 6 2-3 12h-6z" fill="#F59E0B" />
      </g>
      {/* sparkles */}
      <g fill="#FBBF24"><path d="M300 90l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" /><path d="M540 270l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" /></g>
      {/* handwritten caption */}
      <g transform="translate(532 92) rotate(-14)" fontFamily="Poppins,sans-serif" fontWeight="700" fill="#3730A3" fontSize="22" textAnchor="middle">
        <text x="0" y="0">Your</text><text x="6" y="25">Career</text><text x="12" y="50">Starts Here</text>
        <path d="M-12 70c16 10 40 10 56-2" stroke="#3730A3" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  )
}

export function Hero({ cards, gate }) {
  return (
    <>
      <Decor />
      <main className="stage2">
      <div className="bgphoto" aria-hidden="true" />
      <div className="wave" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none"><defs><linearGradient id="wv" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#8B5CF6" /><stop offset=".6" stopColor="#C7D2FE" /><stop offset="1" stopColor="#38BDF8" /></linearGradient></defs><path d="M0 70C200 20 380 30 560 60s360 50 540 10 240-30 340-10v70H0z" fill="url(#wv)" opacity=".55" /></svg>
      </div>
      <section className="heroRow">
        <div className="copy">
          <h1><span className="ta">தேடித் <span className="grad">தெளி</span></span><span className="en">Seek and <span className="grad">Clarify</span></span></h1>
          <svg className="swoosh" width="130" height="14" viewBox="0 0 130 14" aria-hidden="true"><path d="M2 10C30 2 80 2 128 8" stroke="#6D28D9" strokeWidth="3.5" strokeLinecap="round" fill="none" /></svg>
          <p className="lead"><B ta="படிப்பு, கல்லூரி, கட்டணம், தேர்வு, தொழிலைக் கண்டறி." en="Find the right course, college, fees, exam, and career path for your future." /></p>
          <div className="chips">{chips.map(([Ic, t, s]) => (
            <div className="chip" key={t[1]}><span><Ic /></span><div><b><B ta={t[0]} en={t[1]} /></b><small><B ta={s[0]} en={s[1]} /></small></div></div>
          ))}</div>
        </div>
              </section>

      <div className="four">
        {cards.map((c) => { const Ic = ICONS[c.t]; return (
          <button key={c.t} className={'big4 ' + c.k} onClick={() => gate({ t: c.t })}>
            
            <Mark t={c.t} />
            <span className="fx f1" aria-hidden="true">{FX[c.t][0]}</span><span className="fx f2" aria-hidden="true">{FX[c.t][1]}</span>
            <span className="i"><img src={`/emoji/${c.t}.webp`} alt="" width="512" height="512" decoding="async" /></span>
            <h3><B ta={c.ta} en={c.en} /></h3>
            <p><B ta={c.d.ta} en={c.d.en} /></p>
            <span className="go"><B ta="திற" en="Open" /> <b>➜</b></span>
          </button>
        )})}
      </div>
      <div className="dots" aria-hidden="true"><i className="on" /><i /><i /></div>
    </main>
    </>
  )
}
