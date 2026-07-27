import React, { useState } from 'react';
import { PageRoute, ThemeMode } from '../types';
import { STUDY_MATERIALS, StudyMaterial } from '../data/studyData';
import {
  GraduationCap,
  BookOpen,
  Search,
  ExternalLink,
  ShieldCheck,
  Lock,
  Unlock,
  CheckCircle2,
  FileText,
  FolderGit2,
  Cpu,
  Trees,
  Code2,
  Calculator,
  RefreshCw,
  X,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

interface StudyMaterialsPageProps {
  onNavigate: (route: PageRoute, params?: any) => void;
  theme: ThemeMode;
}

export const StudyMaterialsPage: React.FC<StudyMaterialsPageProps> = ({ onNavigate, theme }) => {
  const isDark = theme === 'dark';
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Verification Gate State
  const [activeMaterial, setActiveMaterial] = useState<StudyMaterial | null>(null);
  const [isVerifiedSession, setIsVerifiedSession] = useState<boolean>(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState<boolean>(false);
  
  // Challenge Math State
  const [num1, setNum1] = useState<number>(Math.floor(Math.random() * 8) + 3);
  const [num2, setNum2] = useState<number>(Math.floor(Math.random() * 9) + 2);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [humanChecked, setHumanChecked] = useState<boolean>(false);
  const [verifyError, setVerifyError] = useState<string>('');
  const [unlockedLinkId, setUnlockedLinkId] = useState<string | null>(null);

  const categories = ['All', 'EEE', 'Forestry', 'CSE', 'Math & Basic Science'];

  const filteredMaterials = STUDY_MATERIALS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const refreshMathChallenge = () => {
    setNum1(Math.floor(Math.random() * 8) + 3);
    setNum2(Math.floor(Math.random() * 9) + 2);
    setUserAnswer('');
    setVerifyError('');
  };

  const handleInitiateDownload = (item: StudyMaterial) => {
    setActiveMaterial(item);
    if (isVerifiedSession || unlockedLinkId === item.id) {
      // Already verified, open link immediately
      window.open(item.driveLink, '_blank');
    } else {
      // Open Security Verification Dialogue
      refreshMathChallenge();
      setHumanChecked(false);
      setVerificationModalOpen(true);
    }
  };

  const handleConfirmVerification = () => {
    if (!humanChecked) {
      setVerifyError('Please check "I confirm I am human" box first.');
      return;
    }

    if (parseInt(userAnswer.trim(), 10) !== num1 + num2) {
      setVerifyError(`Incorrect security answer (${num1} + ${num2}). Please retry.`);
      return;
    }

    // Success!
    setVerifyError('');
    setIsVerifiedSession(true);
    if (activeMaterial) {
      setUnlockedLinkId(activeMaterial.id);
      const linkToOpen = activeMaterial.driveLink;
      setVerificationModalOpen(false);
      window.open(linkToOpen, '_blank');
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden p-8 sm:p-10 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border border-purple-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <GraduationCap className="w-80 h-80 text-purple-400" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 font-mono text-xs font-bold">
            <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
            <span>ACADEMIC STUDY VAULT & RESOURCES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Educational <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">Books, Slides & Lecture Notes</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Curated list of standard engineering textbooks, reference manuals, field workbooks, and research lecture notes across <strong>Electrical & Electronic Engineering (EEE)</strong>, <strong>Forestry & Environmental Science</strong>, and <strong>Computer Science (CSE)</strong> linked directly with demo Google Drive folders.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Security Verified Vault</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-cyan-300">
              <FolderGit2 className="w-4 h-4 text-cyan-400" />
              <span>Google Drive Linked</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-pink-300">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>{STUDY_MATERIALS.length} Total Textbooks & Resources</span>
            </span>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 scale-105'
                    : isDark
                    ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {cat === 'EEE' && <Cpu className="w-3.5 h-3.5 text-cyan-400" />}
                {cat === 'Forestry' && <Trees className="w-3.5 h-3.5 text-emerald-400" />}
                {cat === 'CSE' && <Code2 className="w-3.5 h-3.5 text-pink-400" />}
                {cat === 'Math & Basic Science' && <Calculator className="w-3.5 h-3.5 text-amber-400" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search books, author, topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-mono transition-all border focus:outline-none ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-white focus:border-purple-500'
                : 'bg-white border-slate-200 text-slate-900 focus:border-purple-500'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Materials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((item) => {
          const isUnlocked = isVerifiedSession || unlockedLinkId === item.id;

          return (
            <div
              key={item.id}
              className={`p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-4 backdrop-blur-xl ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 hover:border-purple-500/40 hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)]'
                  : 'bg-white border-slate-200 hover:border-purple-300 hover:shadow-lg'
              }`}
            >
              <div className="space-y-3">
                {/* Header Tag Bar */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border ${
                      item.category === 'EEE'
                        ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                        : item.category === 'Forestry'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : item.category === 'CSE'
                        ? 'bg-pink-500/10 border-pink-500/30 text-pink-300'
                        : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                    }`}
                  >
                    {item.category} • {item.fileType}
                  </span>

                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/50">
                    {item.fileSize}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Author & Edition */}
                <div className="text-xs font-mono text-purple-300 space-y-0.5">
                  <p>By {item.author}</p>
                  {item.edition && <p className="text-[11px] text-slate-400">{item.edition}</p>}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-sans">
                  {item.description}
                </p>

                {/* Recommendation */}
                <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                  <span className="text-slate-500">Target Level: </span>
                  <span className="text-slate-300 font-semibold">{item.recommendedFor}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button & Verification Lock */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  {isUnlocked ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      <Unlock className="w-3.5 h-3.5" />
                      <span>Unlocked</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Verification Required</span>
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleInitiateDownload(item)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isUnlocked
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-md scale-105'
                      : 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40'
                  }`}
                >
                  <span>{isUnlocked ? 'Open Google Drive' : 'Unlock Drive Link'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-300">No Study Materials Found</h3>
          <p className="text-xs font-mono text-slate-500">
            Try adjusting your search filter or selecting another subject category.
          </p>
        </div>
      )}

      {/* HARD HUMAN VERIFICATION DIALOGUE MODAL */}
      {verificationModalOpen && activeMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto p-5 sm:p-8 rounded-3xl bg-slate-900 border border-purple-500/40 shadow-2xl space-y-5 sm:space-y-6 text-white">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-500/20 border border-purple-400/40 text-purple-300">
                  <ShieldCheck className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-mono">Human Security Verification</h3>
                  <p className="text-[11px] font-mono text-slate-400">Random Anti-Bot Security Gate</p>
                </div>
              </div>
              <button
                onClick={() => setVerificationModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Target Book details */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">Requesting Resource:</span>
              <p className="text-xs font-bold text-white">{activeMaterial.title}</p>
              <p className="text-[11px] font-mono text-slate-400">Author: {activeMaterial.author}</p>
            </div>

            {/* Challenge box */}
            <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={humanChecked}
                  onChange={(e) => {
                    setHumanChecked(e.target.checked);
                    setVerifyError('');
                  }}
                  className="mt-1 w-4 h-4 rounded text-purple-500 focus:ring-purple-400 bg-slate-900 border-slate-700"
                />
                <span className="text-xs font-mono text-slate-200">
                  I confirm that I am a human user requesting academic reference materials.
                </span>
              </label>

              {humanChecked && (
                <div className="space-y-3 pt-2 border-t border-purple-500/20 animate-fade-in">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">
                      Solve Security Problem: <strong className="text-amber-400 text-sm">{num1} + {num2} = ?</strong>
                    </span>
                    <button
                      type="button"
                      onClick={refreshMathChallenge}
                      className="p-1 text-slate-400 hover:text-purple-300 transition-colors flex items-center gap-1 text-[10px]"
                      title="New Math Problem"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Refresh</span>
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Answer"
                      value={userAnswer}
                      onChange={(e) => {
                        setUserAnswer(e.target.value);
                        setVerifyError('');
                      }}
                      className="w-32 px-3 py-2 text-xs font-mono rounded-xl bg-slate-950 border border-purple-500/40 text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>
              )}

              {verifyError && (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{verifyError}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setVerificationModalOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmVerification}
                className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white shadow-lg shadow-purple-500/25 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify & Open Drive Link</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
