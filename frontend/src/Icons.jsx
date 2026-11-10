import React from 'react'

const sz = { width: '100%', height: '100%' }

export const IcoAssess = () => (
  <svg viewBox="0 0 96 96" style={sz} aria-hidden="true">
    <defs>
      <linearGradient id="a1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#DBEAFE" /></linearGradient>
      <linearGradient id="a2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#60A5FA" /><stop offset="1" stopColor="#2563EB" /></linearGradient>
    </defs>
    <rect x="14" y="14" width="56" height="72" rx="10" fill="#1D4ED8" opacity=".25" transform="translate(4 5)" />
    <rect x="14" y="14" width="56" height="72" rx="10" fill="url(#a1)" stroke="#93C5FD" strokeWidth="3" />
    <rect x="28" y="6" width="28" height="16" rx="6" fill="url(#a2)" /><circle cx="42" cy="12" r="3" fill="#fff" />
    {[34, 50, 66].map((y) => (<g key={y}>
      <path className="ck" style={{ animationDelay: (y / 16) * 0.35 + "s" }} d={`M24 ${y}l5 5 9-10`} stroke="#10B981" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="44" y={y - 4} width="20" height="5" rx="2.500" fill="#93C5FD" /><rect x="44" y={y + 3} width="13" height="4" rx="2" fill="#BFDBFE" />
    </g>))}
    <g transform="rotate(35 74 52)"><rect x="68" y="20" width="12" height="52" rx="3" fill="#FBBF24" /><rect x="68" y="20" width="4" height="52" fill="#F59E0B" /><path d="M68 72l6 14 6-14z" fill="#FDE68A" /><path d="M71.500 80.500l2.500 5.500 2.500-5.500z" fill="#334155" /><rect x="68" y="14" width="12" height="9" rx="3" fill="#F472B6" /></g>
  </svg>
)

export const IcoTalk = () => (
  <svg viewBox="0 0 96 96" style={sz} aria-hidden="true">
    <defs>
      <linearGradient id="t1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#C084FC" /><stop offset=".45" stopColor="#7C3AED" /><stop offset="1" stopColor="#3B82F6" /></linearGradient>
      <linearGradient id="t2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#E2E8F0" /></linearGradient>
      <linearGradient id="t3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".45" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
    </defs>
    <ellipse cx="52" cy="88" rx="34" ry="4" fill="#000" opacity=".12" />
    <path d="M12 74l-4 14 20-10z" fill="url(#t2)" />
    <rect x="4" y="28" width="56" height="48" rx="16" fill="url(#t2)" />
    <path d="M13 46c3-2 6-2 8 0M13 56c3 2 6 2 8 0" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M68 66l14 20 2-22z" fill="#4F46E5" />
    <rect x="26" y="14" width="66" height="54" rx="20" fill="url(#t1)" />
    <rect x="29" y="16" width="60" height="22" rx="11" fill="url(#t3)" />
    {[46, 59, 72].map((x, k) => <circle key={x} className="bd" style={{ animationDelay: k * 0.25 + "s" }} cx={x} cy="41" r="6" fill="#fff" />)}
  </svg>
)

export const IcoRocket = () => (
  <svg viewBox="0 0 96 96" style={sz} aria-hidden="true">
    <defs>
      <linearGradient id="r1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#C7D2FE" /></linearGradient>
      <linearGradient id="r2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FCD34D" /><stop offset="1" stopColor="#EF4444" /></linearGradient>
    </defs>
    <path d="M28 70C16 70 12 80 10 90c10-2 20-6 20-18z" fill="url(#r2)" transform="translate(6 -8)" opacity=".0" />
    <path className="flame" d="M34 66c-8 4-10 12-8 20 8 0 16-2 20-10z" fill="url(#r2)" />
    <g transform="rotate(45 52 48)">
      <path d="M52 6c14 10 20 28 16 46H36C32 34 38 16 52 6z" fill="url(#r1)" stroke="#A5B4FC" strokeWidth="2" />
      <path d="M52 6c14 10 20 28 16 46H60C62 32 58 16 52 6z" fill="#818CF8" opacity=".35" />
      <path d="M36 52L24 66l16-4zM68 52l12 14-16-4z" fill="#EF4444" />
      <circle cx="52" cy="30" r="9" fill="#2563EB" stroke="#fff" strokeWidth="3" /><circle cx="49" cy="27" r="3" fill="#93C5FD" />
      <path d="M44 52h16l-3 10H47z" fill="#6366F1" />
    </g>
    <ellipse cx="22" cy="84" rx="16" ry="7" fill="#fff" /><ellipse cx="34" cy="86" rx="12" ry="6" fill="#EEF2FF" /><ellipse cx="12" cy="86" rx="9" ry="5" fill="#fff" />
  </svg>
)

export const IcoSchool = () => (
  <svg viewBox="0 0 96 96" style={sz} aria-hidden="true">
    <defs>
      <linearGradient id="s1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#DBEAFE" /></linearGradient>
      <linearGradient id="s2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4ADE80" /><stop offset="1" stopColor="#15803D" /></linearGradient>
    </defs>
    <path d="M12 40L48 22l36 18z" fill="#1E3A8A" /><path d="M12 40L48 22l36 18-36 6z" fill="#2563EB" />
    <path d="M36 22V12h24v10" fill="#1D4ED8" /><path d="M30 20l18-12 18 12z" fill="#1E3A8A" />
    <circle cx="48" cy="17" r="3" fill="#FBBF24" />
    <rect x="18" y="40" width="60" height="42" rx="3" fill="url(#s1)" stroke="#93C5FD" strokeWidth="2" />
    <path d="M40 82V62c0-5 4-9 8-9s8 4 8 9v20z" fill="#2563EB" />
    {[24, 66].map((x) => <g key={x}><rect x={x} y="48" width="8" height="12" rx="2" fill="#60A5FA" /><rect x={x} y="66" width="8" height="12" rx="2" fill="#60A5FA" /></g>)}
    <rect x="6" y="82" width="84" height="6" rx="3" fill="#CBD5E1" />
    <g><rect x="6" y="66" width="4" height="18" fill="#92400E" /><circle cx="8" cy="62" r="11" fill="url(#s2)" /></g>
    <g><rect x="86" y="66" width="4" height="18" fill="#92400E" /><circle cx="88" cy="62" r="11" fill="url(#s2)" /></g>
  </svg>
)

export const ICONS = { quiz: IcoAssess, experts: IcoTalk, careers: IcoRocket, colleges: IcoSchool }

export const ChipTarget = () => (
  <svg viewBox="0 0 48 48" style={sz} aria-hidden="true"><circle cx="24" cy="24" r="19" fill="#3B82F6" /><circle cx="24" cy="24" r="13" fill="#fff" /><circle cx="24" cy="24" r="8" fill="#3B82F6" /><circle cx="24" cy="24" r="3.500" fill="#fff" /><path d="M24 24L40 8" stroke="#F59E0B" strokeWidth="3.500" strokeLinecap="round" /><path d="M35 6l1 6 6 1-5 4-3-1z" fill="#F59E0B" /></svg>
)
export const ChipShield = () => (
  <svg viewBox="0 0 48 48" style={sz} aria-hidden="true"><defs><linearGradient id="sh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#A78BFA" /><stop offset="1" stopColor="#6D28D9" /></linearGradient></defs><path d="M24 4l16 6v12c0 11-7 18-16 22C15 40 8 33 8 22V10z" fill="url(#sh)" /><path d="M16 24l6 6 11-12" stroke="#fff" strokeWidth="4.500" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
)
export const ChipRocket = () => (
  <svg viewBox="0 0 48 48" style={sz} aria-hidden="true"><circle cx="24" cy="24" r="20" fill="#10B981" /><g transform="rotate(45 24 24)"><path d="M24 8c6 4 9 12 7 21H17c-2-9 1-17 7-21z" fill="#fff" /><circle cx="24" cy="19" r="3.500" fill="#2563EB" /><path d="M20 29h8l-2 6h-4z" fill="#F59E0B" /></g></svg>
)
