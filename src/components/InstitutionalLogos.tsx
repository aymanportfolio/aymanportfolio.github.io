import React from 'react';
import { ExternalLink, ShieldCheck, Building2, Trees, GraduationCap, Cpu } from 'lucide-react';

export const InstitutionalLogos: React.FC = () => {
  const institutions = [
    {
      id: 'bforest',
      name: 'Bangladesh Forest Department',
      shortName: 'BFOREST',
      tag: 'Forestry, GIS & Remote Sensing',
      url: 'https://bforest.gov.bd/',
      role: 'Research & Biodiversity Conservation Partner',
      gradient: 'from-emerald-950/60 via-slate-900 to-green-950/40',
      borderColor: 'border-emerald-500/30 hover:border-emerald-400',
      tagColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      iconColor: 'text-emerald-400',
      badgeIcon: <Trees className="w-4 h-4 text-emerald-400" />,
      logoSvg: (
        <svg className="w-10 h-10 shrink-0" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="48" fill="#047857" stroke="#34D399" strokeWidth="3" />
          <path d="M50 15L30 50H42L25 78H75L58 50H70L50 15Z" fill="#10B981" />
          <rect x="46" y="78" width="8" height="12" fill="#064E3B" />
          <circle cx="50" cy="35" r="4" fill="#F59E0B" />
        </svg>
      ),
    },
    {
      id: 'uopeople',
      name: 'University of the People',
      shortName: 'UoPeople',
      tag: 'Computer Science (BCS / CSE)',
      url: 'https://www.uopeople.edu/',
      role: 'Accredited US Higher Education Institution',
      gradient: 'from-sky-950/60 via-slate-900 to-indigo-950/40',
      borderColor: 'border-sky-500/30 hover:border-sky-400',
      tagColor: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
      iconColor: 'text-sky-400',
      badgeIcon: <GraduationCap className="w-4 h-4 text-sky-400" />,
      logoSvg: (
        <svg className="w-10 h-10 shrink-0" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="48" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="3" />
          <path d="M50 20L80 38L50 56L20 38L50 20Z" fill="#3B82F6" />
          <path d="M30 46V68C30 68 40 76 50 76C60 76 70 68 70 68V46L50 58L30 46Z" fill="#F43F5E" />
          <path d="M78 42V68" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'southern',
      name: 'Southern University Bangladesh',
      shortName: 'SUB',
      tag: 'Electrical & Electronic Engineering (EEE)',
      url: 'https://southern.ac.bd/',
      role: 'Faculty of Science & Engineering Academic Base',
      gradient: 'from-amber-950/40 via-slate-900 to-cyan-950/40',
      borderColor: 'border-amber-500/30 hover:border-amber-400',
      tagColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      iconColor: 'text-amber-400',
      badgeIcon: <Cpu className="w-4 h-4 text-amber-400" />,
      logoSvg: (
        <svg className="w-10 h-10 shrink-0" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="48" fill="#1E1B4B" stroke="#F59E0B" strokeWidth="3" />
          <path d="M50 18L60 38H82L64 50L71 70L50 58L29 70L36 50L18 38H40L50 18Z" fill="#D97706" />
          <circle cx="50" cy="46" r="12" fill="#0284C7" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            Official Academic & Institutional Partners
          </h3>
        </div>
        <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified Institutions</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {institutions.map((inst) => (
          <a
            key={inst.id}
            href={inst.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 rounded-2xl bg-gradient-to-br ${inst.gradient} border ${inst.borderColor} backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group flex flex-col justify-between space-y-3 cursor-pointer`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {inst.logoSvg}
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {inst.name}
                  </h4>
                  <p className="text-[11px] font-mono text-slate-400">{inst.role}</p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${inst.tagColor} flex items-center gap-1`}>
                {inst.badgeIcon}
                <span>{inst.tag}</span>
              </span>

              <span className="text-slate-400 group-hover:text-white flex items-center gap-1 text-[11px] transition-colors">
                <span>Visit Site</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
