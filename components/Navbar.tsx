import React from 'react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  setView: (view: View) => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView, cartCount = 0, onOpenCart }) => {
  return (
    <nav className="sticky top-0 z-50 bg-ivory/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => setView('home')}>
            <h1 className="text-2xl md:text-3xl font-light tracking-widest text-eucalyptus uppercase">
              Espace Naturaē
            </h1>
          </div>
          
          <div className="hidden md:flex space-x-12">
            <button 
              onClick={() => setView('shop')}
              className={`text-sm tracking-widest uppercase transition-colors ${currentView === 'shop' ? 'text-eucalyptus font-semibold' : 'text-gray-500 hover:text-eucalyptus'}`}
            >
              Boutique
            </button>
            <button 
              onClick={() => setView('glossary')}
              className={`text-sm tracking-widest uppercase transition-colors ${currentView === 'glossary' ? 'text-eucalyptus font-semibold' : 'text-gray-500 hover:text-eucalyptus'}`}
            >
              Glossaire Botanique
            </button>
            <button 
              onClick={() => setView('about')}
              className={`text-sm tracking-widest uppercase transition-colors ${currentView === 'about' ? 'text-eucalyptus font-semibold' : 'text-gray-500 hover:text-eucalyptus'}`}
            >
              À Propos
            </button>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="flex items-center space-x-3 border-r border-gray-100 pr-4 mr-2 hidden sm:flex">
              <a href="https://www.facebook.com/Espacenaturae/" target="_blank" rel="noopener noreferrer" className="text-eucalyptus/60 hover:text-eucalyptus transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg>
              </a>
              <a href="https://www.instagram.com/espacenaturae/" target="_blank" rel="noopener noreferrer" className="text-eucalyptus/60 hover:text-eucalyptus transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.607.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.365-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.607 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.365-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.607-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.607-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.28-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.44-.645 1.44-1.44s-.645-1.44-1.44-1.44z"/></svg>
              </a>
            </div>
            
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-eucalyptus hover:text-gray-900 transition-colors"
              aria-label="Voir le panier"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-eucalyptus rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};