import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Award, Sparkles, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                Learn<span className="text-indigo-600">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              Empowering engineers, designers, and data scientists with high-impact curriculum taught by industry leaders.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Verified Certificate Accredited</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/" className="hover:text-indigo-600 transition-colors">Course Catalog</Link>
              </li>
              <li>
                <Link to="/my-learning" className="hover:text-indigo-600 transition-colors">My Learning Dashboard</Link>
              </li>
              <li>
                <Link to="/bookmarks" className="hover:text-indigo-600 transition-colors">Saved Bookmarks</Link>
              </li>
              <li>
                <span className="text-slate-400 cursor-not-allowed">Certificates (Coming Soon)</span>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Top Tracks</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/?category=Web+Development" className="hover:text-indigo-600">Web Development</Link></li>
              <li><Link to="/?category=Programming" className="hover:text-indigo-600">Systems & Algorithms</Link></li>
              <li><Link to="/?category=UI%2FUX+Design" className="hover:text-indigo-600">Design Systems</Link></li>
              <li><Link to="/?category=Data+Science" className="hover:text-indigo-600">Machine Learning</Link></li>
            </ul>
          </div>

          {/* Guarantees */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-2 text-indigo-700 font-semibold text-sm mb-1.5">
              <Award className="w-4 h-4" />
              <span>Lifelong Access</span>
            </div>
            <p className="text-xs text-slate-500 leading-normal">
              Learn at your own pace with persistent client progress tracking, interactive quizzes, and downloadable source code.
            </p>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} LearnHub Inc. Crafted for modern technical education.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-600">
              Built with React, Tailwind & Context API
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

