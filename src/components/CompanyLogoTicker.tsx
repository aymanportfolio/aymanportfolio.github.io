import React from 'react';
import { ThemeMode } from '../types';

interface CompanyLogoTickerProps {
  theme: ThemeMode;
}

export const CompanyLogoTicker: React.FC<CompanyLogoTickerProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const companies = [
    {
      name: 'Bangladesh Forest Department',
      badge: 'Forestry Partner',
      url: 'https://bforest.gov.bd/',
      icon: (
        <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="48" fill="#047857" stroke="#34D399" strokeWidth="4" />
          <path d="M50 15L30 50H42L25 78H75L58 50H70L50 15Z" fill="#10B981" />
          <rect x="46" y="78" width="8" height="12" fill="#064E3B" />
        </svg>
      ),
    },
    {
      name: 'University of the People',
      badge: 'CSE Institution',
      url: 'https://www.uopeople.edu/',
      icon: (
        <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="48" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="4" />
          <path d="M50 20L80 38L50 56L20 38L50 20Z" fill="#3B82F6" />
          <path d="M30 46V68C30 68 40 76 50 76C60 76 70 68 70 68V46L50 58L30 46Z" fill="#F43F5E" />
        </svg>
      ),
    },
    {
      name: 'Southern University Bangladesh',
      badge: 'EEE Faculty',
      url: 'https://southern.ac.bd/',
      icon: (
        <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="48" fill="#1E1B4B" stroke="#F59E0B" strokeWidth="4" />
          <path d="M50 18L60 38H82L64 50L71 70L50 58L29 70L36 50L18 38H40L50 18Z" fill="#D97706" />
        </svg>
      ),
    },
    {
      name: 'Microsoft',
      badge: 'Microsoft Certified',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 23 23" fill="none">
          <path fill="#F25022" d="M1 1h10v10H1z" />
          <path fill="#7FBA00" d="M12 1h10v10H12z" />
          <path fill="#00A4EF" d="M1 12h10v10H1z" />
          <path fill="#FFB900" d="M12 12h10v10H12z" />
        </svg>
      ),
    },
    {
      name: 'Google',
      badge: 'Google Career Certs',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.2 1.05-.8 1.95-1.7 2.56v2.13h2.76c1.61-1.49 2.585-3.68 2.585-7.13z" />
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v2.22C3.26 20.48 7.34 24 12 24z" />
          <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V7.49H1.29C.47 9.04 0 10.96 0 12s.47 2.96 1.29 4.51l3.98-2.22z" />
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 3.52 1.29 7.49l3.98 2.22c.95-2.85 3.6-4.96 6.73-4.96z" />
        </svg>
      ),
    },
    {
      name: 'IBM',
      badge: 'IBM Skills Network',
      icon: (
        <svg className="w-8 h-6 flex-shrink-0" viewBox="0 0 100 40" fill="none">
          <path fill="#052FAD" d="M0 0h18v4H0zm0 6h18v4H0zm0 6h6v4H0zm0 6h6v4H0zm0 6h6v4H0zm0 6h18v4H0zm12-18h6v16h-6zM24 0h22v4H24zm0 6h6v4h-6zm0 6h6v4h-6zm0 6h22v4H24zm0 6h6v4h-6zm0 6h22v4H24zm16-24h6v10h-6zm0 16h6v10h-6zM52 0h6v34h-6zm12 0h6v16h6V0h6v34h-6V22h-6v12h-6z" />
        </svg>
      ),
    },
    {
      name: 'Meta',
      badge: 'Meta Professional',
      icon: (
        <svg className="w-8 h-6 flex-shrink-0" viewBox="0 0 100 60" fill="none">
          <path
            d="M71.2 10C63.5 10 56.4 14.1 50 21.1 43.6 14.1 36.5 10 28.8 10 13.9 10 2 21.9 2 36.8s11.9 26.8 26.8 26.8c7.7 0 14.8-4.1 21.2-11.1 6.4 7 13.5 11.1 21.2 11.1 14.9 0 26.8-11.9 26.8-26.8S86.1 10 71.2 10zm0 41.6c-4.8 0-9.6-3.2-14.2-9 4.6-5.8 9.4-9 14.2-9 7.6 0 13.8 6.2 13.8 13.8 0 7.6-6.2 13.8-13.8 13.8zm-42.4 0c-7.6 0-13.8-6.2-13.8-13.8 0-7.6 6.2-13.8 13.8-13.8 4.8 0 9.6 3.2 14.2 9-4.6 5.8-9.4 9-14.2 9z"
            fill="url(#meta-grad-ticker)"
          />
          <defs>
            <linearGradient id="meta-grad-ticker" x1="2" y1="10" x2="98" y2="63.6" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0064E0" />
              <stop offset="0.5" stopColor="#0082FB" />
              <stop offset="1" stopColor="#00A2FF" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      name: 'Coursera',
      badge: 'Coursera Authorized',
      icon: (
        <svg className="w-7 h-6 flex-shrink-0" viewBox="0 0 100 100" fill="none">
          <path
            d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 76.5c-14.6 0-26.5-11.9-26.5-26.5S35.4 23.5 50 23.5c8.3 0 15.7 3.8 20.6 9.8l-10.8 10.8c-2.4-3.1-6-5.1-10.1-5.1-7.2 0-13 5.8-13 13s5.8 13 13 13c4.1 0 7.7-2 10.1-5.1l10.8 10.8c-4.9 6-12.3 9.8-20.6 9.8z"
            fill="#0056D2"
          />
        </svg>
      ),
    },
    {
      name: 'Udemy',
      badge: 'Udemy Academic',
      icon: (
        <svg className="w-7 h-6 flex-shrink-0" viewBox="0 0 100 100" fill="none">
          <path
            d="M50 0L0 28v22l50-28 50 28V28L50 0zm0 40L15 59.6v12.4l35-19.6 35 19.6V59.6L50 40z"
            fill="#A435F0"
          />
        </svg>
      ),
    },
  ];

  // Repeat 4 times for continuous infinite seamless scroll
  const items = [...companies, ...companies, ...companies, ...companies];

  return (
    <div
      className={`relative w-full overflow-hidden py-4 rounded-2xl border backdrop-blur-md ${
        isDark
          ? 'bg-purple-950/20 border-pink-500/20 text-slate-200'
          : 'bg-white/80 border-pink-200 text-slate-800 shadow-sm'
      }`}
    >
      <div className="flex items-center gap-2 px-6 pb-2 text-xs font-mono font-bold tracking-widest text-pink-400 uppercase">
        <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
        <span>Verified Credential Issuers & Organizational Partners</span>
      </div>

      <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused] gap-6">
        {items.map((comp, idx) => {
          const Content = (
            <div
              className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-transform hover:scale-105 ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 hover:border-pink-500/40 text-slate-200'
                  : 'bg-slate-50 border-slate-200 hover:border-pink-400 text-slate-800'
              }`}
            >
              <div className="flex-shrink-0">{comp.icon}</div>
              <div>
                <div className="font-mono font-bold text-xs whitespace-nowrap text-white">
                  {comp.name}
                </div>
                <div className="text-[10px] text-pink-400 font-mono whitespace-nowrap">
                  {comp.badge}
                </div>
              </div>
            </div>
          );

          if (comp.url) {
            return (
              <a
                key={idx}
                href={comp.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit ${comp.name} official website`}
              >
                {Content}
              </a>
            );
          }

          return <div key={idx}>{Content}</div>;
        })}
      </div>
    </div>
  );
};
