import React, { useState } from 'react';
import { Play, Volume2, Maximize, AlertCircle } from 'lucide-react';

export const VideoPlayer = ({ videoUrl, title, duration }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // If a valid youtube embed or video link is provided
  if (videoUrl && (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be'))) {
    return (
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 shadow-elevated border border-slate-800">
        <iframe
          src={`${videoUrl}?autoplay=0&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    );
  }

  // Interactive simulated video player for lessons without external video URL
  return (
    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-elevated flex flex-col justify-between p-6 group">
      {/* Background visual texture */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/80 via-slate-900 to-slate-950 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          Interactive Lesson Stream
        </span>
        <span className="text-xs font-mono text-slate-400">
          {duration || "15:00"}
        </span>
      </div>

      {/* Center Play Button */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/40 hover:scale-105 active:scale-95 transition-all mb-4 focus:outline-none"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
        </button>
        <p className="text-white font-semibold text-sm sm:text-base max-w-md line-clamp-1">
          {title}
        </p>
        <p className="text-xs text-slate-400 mt-1">
          {isPlaying ? "Playing interactive lesson stream" : "Click to stream audio commentary"}
        </p>
      </div>

      {/* Bottom Mock Controls */}
      <div className="relative z-10 pt-4 flex items-center justify-between text-slate-400 text-xs">
        <div className="flex items-center gap-3">
          <Volume2 className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
          <span className="font-mono">00:00 / {duration || "15:00"}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300 font-medium">1080p HD</span>
          <Maximize className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  );
};

