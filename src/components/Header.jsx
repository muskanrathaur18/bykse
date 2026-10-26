import React, { useState } from 'react';

export default function Header({ currentPath, onNavigate, onOpenDownload }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/About' },
    { label: 'Safety', path: '/Safety' },
    { label: 'Careers', path: '/Careers' },
    { label: 'Contact Us', path: '/Contact' },
  ];

  const handleLinkClick = (path, e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className="rapido-navbar-header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #f0f0f0',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
        width: '100%'
      }}
    >
      <div 
        style={{
          maxWidth: '1380px',
          margin: '0 auto',
          padding: '0 36px',
          height: '88px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '32px'
        }}
      >
        
        {/* Left: BykSe Logo */}
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, minWidth: '220px', paddingLeft: '28px' }}>
          <a 
            href="/" 
            onClick={(e) => handleLinkClick('/', e)} 
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <img 
              src="/images/bykse-logo.png" 
              alt="BykSe Logo" 
              style={{
                height: '70px',
                width: 'auto',
                display: 'block',
                cursor: 'pointer',
                objectFit: 'contain'
              }}
            />
          </a>
        </div>

        {/* Center: Desktop Navigation Links (Centered) */}
        <nav 
          className="desktop-nav-menu"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '34px',
            flex: '1 1 auto',
            height: '100%'
          }}
        >
          {navLinks.map((item) => {
            const isActive = currentPath === item.path || (item.path === '/' && (currentPath === '/Home' || currentPath === ''));
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleLinkClick(item.path, e)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: '15.5px',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? '#000000' : '#4a4a4a',
                  textDecoration: 'none',
                  padding: '8px 2px',
                  position: 'relative',
                  whiteSpace: 'nowrap',
                  lineHeight: '1.2',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#000000';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#4a4a4a';
                }}
              >
                {item.label}
                {isActive && (
                  <span 
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: '0px',
                      right: '0px',
                      height: '3px',
                      backgroundColor: '#000000',
                      borderRadius: '2px'
                    }} 
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Download App Pill Button */}
        <div 
          className="desktop-header-action"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'flex-end', 
            flexShrink: 0, 
            minWidth: '220px',
            paddingRight: '28px'
          }}
        >
          <button
            onClick={onOpenDownload}
            style={{
              backgroundColor: '#000000',
              color: '#ffffff',
              border: 'none',
              borderRadius: '9999px',
              padding: '0 22px',
              fontSize: '13.5px',
              fontWeight: '600',
              height: '40px',
              lineHeight: '40px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#222222';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#000000';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Download App
          </button>
        </div>

        {/* Mobile Hamburger View */}
        <div 
          className="mobile-nav-toggle-wrap" 
          style={{ display: 'none', alignItems: 'center', gap: '14px' }}
        >
          <button 
            onClick={onOpenDownload} 
            style={{
              background: '#000000',
              color: '#ffffff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Download App
          </button>
          <div 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            aria-label="Toggle menu"
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              padding: '6px'
            }}
          >
            <span style={{ width: '22px', height: '2px', background: '#000', borderRadius: '1px' }}></span>
            <span style={{ width: '22px', height: '2px', background: '#000', borderRadius: '1px' }}></span>
            <span style={{ width: '22px', height: '2px', background: '#000', borderRadius: '1px' }}></span>
          </div>
        </div>

      </div>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1001,
            backdropFilter: 'blur(2px)'
          }}
        />
      )}

      {/* Mobile Drawer */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '290px',
          height: '100vh',
          background: '#ffffff',
          zIndex: 1002,
          padding: '24px 20px',
          boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          overflowY: 'auto'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <img src="/images/bykse-logo.png" alt="BykSe" style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
          <button 
            onClick={() => setMobileMenuOpen(false)}
            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#333' }}
          >
            ✕
          </button>
        </div>

        {navLinks.map((item) => (
          <a
            key={item.path}
            href={item.path}
            onClick={(e) => handleLinkClick(item.path, e)}
            style={{
              fontSize: '16px',
              fontWeight: currentPath === item.path ? '700' : '500',
              color: currentPath === item.path ? '#000' : '#444',
              textDecoration: 'none',
              padding: '6px 0'
            }}
          >
            {item.label}
          </a>
        ))}



        <div style={{ borderTop: '1px solid #eee', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <a href="/CustomerTerms" onClick={(e) => handleLinkClick('/CustomerTerms', e)} style={{ fontSize: '13px', color: '#666', textDecoration: 'none' }}>
            Customer Terms - Bike Taxi
          </a>
          <a href="/CustomerTerms" onClick={(e) => handleLinkClick('/CustomerTerms', e)} style={{ fontSize: '13px', color: '#666', textDecoration: 'none' }}>
            Customer Terms - Cabs &amp; Auto
          </a>
          <a href="/CaptainTerms" onClick={(e) => handleLinkClick('/CaptainTerms', e)} style={{ fontSize: '13px', color: '#666', textDecoration: 'none' }}>
            Captain Terms - Bike Taxi
          </a>
          <a href="/CaptainTerms" onClick={(e) => handleLinkClick('/CaptainTerms', e)} style={{ fontSize: '13px', color: '#666', textDecoration: 'none' }}>
            Captain Terms - Cabs &amp; Auto
          </a>
          <a href="/Privacy" onClick={(e) => handleLinkClick('/Privacy', e)} style={{ fontSize: '13px', color: '#666', textDecoration: 'none' }}>
            Privacy Policy
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .desktop-nav-menu {
            display: none !important;
          }
          .desktop-header-action {
            display: none !important;
          }
          .mobile-nav-toggle-wrap {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
