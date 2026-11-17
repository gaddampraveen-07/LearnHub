import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  BookOpen, 
  Bookmark, 
  Menu, 
  X, 
  Compass, 
  CheckCircle,
  Sparkles
} from 'lucide-react';

export const Navbar = () => {
  const { enrolledCourseIds, bookmarkedCourseIds } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const enrolledCount = enrolledCourseIds.length;
  const bookmarkCount = bookmarkedCourseIds.length;

  const closeMenu = () => setMobileMenuOpen(false);

  const navLinkClass = ({ isActive }) => 
    `flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-xl transition-all ${
      isActive 
        ? 'text-indigo-600 bg-indigo-50/80 font-bold' 
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group focus:outline-none" onClick={closeMenu}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                Learn<span className="text-indigo-600">Hub</span>
              </span>
              <span className="hidden sm:block text-[10px] uppercase font-bold tracking-wider text-slate-400 -mt-1">
                Learning Redefined
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <NavLink to="/" end className={navLinkClass}>
              <Compass className="w-4 h-4" />
              <span>Explore Courses</span>
            </NavLink>

            <NavLink to="/my-learning" className={navLinkClass}>
              <BookOpen className="w-4 h-4" />
              <span>My Learning</span>
              {enrolledCount > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs font-bold rounded-full bg-indigo-100 text-indigo-700">
                  {enrolledCount}
                </span>
              )}
            </NavLink>

            <NavLink to="/bookmarks" className={navLinkClass}>
              <Bookmark className="w-4 h-4" />
              <span>Bookmarks</span>
              {bookmarkCount > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs font-bold rounded-full bg-amber-100 text-amber-800">
                  {bookmarkCount}
                </span>
              )}
            </NavLink>
          </nav>

          {/* User profile / Status badge */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full ring-2 ring-indigo-500/20 bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-inner">
                AM
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-xs font-semibold text-slate-800 leading-tight">Alex Miller</p>
                <p className="text-[11px] text-slate-400 font-medium">Pro Student</p>
              </div>
            </div>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/98 px-4 pt-2 pb-6 space-y-3 animate-fade-in">
          <nav className="flex flex-col space-y-1">
            <NavLink
              to="/"
              end
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm ${
                  isActive ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5 text-indigo-500" />
                <span>Explore Catalog</span>
              </div>
            </NavLink>

            <NavLink
              to="/my-learning"
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm ${
                  isActive ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-indigo-500" />
                <span>My Learning</span>
              </div>
              {enrolledCount > 0 && (
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-indigo-100 text-indigo-700">
                  {enrolledCount} enrolled
                </span>
              )}
            </NavLink>

            <NavLink
              to="/bookmarks"
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm ${
                  isActive ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Bookmark className="w-5 h-5 text-indigo-500" />
                <span>Bookmarks</span>
              </div>
              {bookmarkCount > 0 && (
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-100 text-amber-800">
                  {bookmarkCount} saved
                </span>
              )}
            </NavLink>
          </nav>

          <div className="pt-4 border-t border-slate-100 flex items-center gap-3 px-3">
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              AM
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Alex Miller</p>
              <p className="text-xs text-slate-500">alex.miller@learnhub.edu</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

