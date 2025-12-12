'use client';

import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Social Links */}
          <div className="flex gap-6">
            <a
              href="https://github.com/Anish-2005"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all transform hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/anishseth"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:anishseth2005@gmail.com"
              className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all transform hover:scale-110"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400">
            <p className="flex items-center gap-2 justify-center">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Anish Seth
            </p>
            <p className="mt-2 text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
