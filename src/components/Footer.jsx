import React from 'react';

export default function Footer({ onNavigate }) {
  const handleLink = (path, e) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="footer_sec" style={{ background: '#000000', color: '#ffffff', padding: '48px 0 0' }}>
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px' }}>
        <div className="footer_links" style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between' }}>
          
          {/* Customer App Download */}
          <div style={{ minWidth: '180px' }}>
            <label style={{ display: 'block', fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#ffffff' }}>
              Customer app
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a 
                href="https://play.google.com/store/apps" 
                target="_blank" 
                rel="noreferrer"
                className="appStoreIcon"
              >
                <img 
                  className="appdown" 
                  src="/images/play_store.svg" 
                  alt="BykSe Customer android app" 
                  style={{ height: '42px', display: 'block' }}
                />
              </a>
              <a 
                href="https://apps.apple.com" 
                target="_blank" 
                rel="noreferrer"
                className="appStoreIcon"
              >
                <img 
                  className="appdown" 
                  src="/images/app_store.svg" 
                  alt="BykSe customer ios app" 
                  style={{ height: '42px', display: 'block' }}
                />
              </a>
            </div>
          </div>

          {/* Captain App Download */}
          <div style={{ minWidth: '180px' }}>
            <label style={{ display: 'block', fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#ffffff' }}>
              Captain app
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a 
                href="https://play.google.com/store/apps" 
                target="_blank" 
                rel="noreferrer"
                className="appStoreIcon"
              >
                <img 
                  className="appdown" 
                  src="/images/play_store.svg" 
                  alt="BykSe captain android app" 
                  style={{ height: '42px', display: 'block' }}
                />
              </a>
            </div>
          </div>

          {/* Navigation links - 2 columns */}
          <div className="footer-nav-links" style={{ display: 'flex', gap: '40px', flex: '1', minWidth: '280px', justifyContent: 'center' }}>
            <div className="footer-nav-col footer-nav-col--left" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="/" onClick={(e) => handleLink('/', e)} style={{ color: '#d1d5db', fontSize: '14px', textDecoration: 'none' }}>Home</a>
              <a href="/About" onClick={(e) => handleLink('/About', e)} style={{ color: '#d1d5db', fontSize: '14px', textDecoration: 'none' }}>About Us</a>
              <a href="/Careers" onClick={(e) => handleLink('/Careers', e)} style={{ color: '#d1d5db', fontSize: '14px', textDecoration: 'none' }}>Careers</a>
              <a href="/Safety" onClick={(e) => handleLink('/Safety', e)} style={{ color: '#d1d5db', fontSize: '14px', textDecoration: 'none' }}>Safety</a>
              <a href="/Privacy" onClick={(e) => handleLink('/Privacy', e)} style={{ color: '#d1d5db', fontSize: '14px', textDecoration: 'none' }}>Privacy Policy</a>
            </div>
            
            <div className="footer-nav-col footer-nav-col--right" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="/CustomerTerms" onClick={(e) => handleLink('/CustomerTerms', e)} style={{ color: '#d1d5db', fontSize: '14px', textDecoration: 'none' }}>Customer Terms - Bike Taxi</a>
              <a href="/CustomerTerms" onClick={(e) => handleLink('/CustomerTerms', e)} style={{ color: '#d1d5db', fontSize: '14px', textDecoration: 'none' }}>Customer Terms - Cabs and Auto</a>
              <a href="/CaptainTerms" onClick={(e) => handleLink('/CaptainTerms', e)} style={{ color: '#d1d5db', fontSize: '14px', textDecoration: 'none' }}>Captain Terms - Bike Taxi</a>
              <a href="/CaptainTerms" onClick={(e) => handleLink('/CaptainTerms', e)} style={{ color: '#d1d5db', fontSize: '14px', textDecoration: 'none' }}>Captain Terms - Cabs and Auto</a>
            </div>
          </div>
        </div>

      </div>

      {/* Full-width bottom bar extending edge-to-edge into corners */}
      <div 
        style={{ 
          borderTop: '1px solid #222222', 
          marginTop: '28px', 
          padding: '12px 48px', 
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '12px' 
        }}
      >
        {/* Left Corner: Copyright */}
        <div style={{ flex: '1 1 260px', textAlign: 'left' }}>
          <p style={{ fontSize: '13px', fontWeight: '500', color: '#9ca3af', margin: 0, letterSpacing: '0.4px', textTransform: 'uppercase' }}>
            © 2026 BYKSE. ALL RIGHTS RESERVED.
          </p>
        </div>


        {/* Right Corner: Crafted By */}
        <div style={{ flex: '1 1 260px', textAlign: 'right' }}>
          <p style={{ fontSize: '13px', fontWeight: '500', color: '#9ca3af', margin: 0, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
            CRAFTED BY{' '}
            <a 
              href="https://gauryatechnologies.com" 
              target="_blank" 
              rel="noreferrer" 
              style={{ 
                color: '#F9C935', 
                textDecoration: 'none', 
                fontWeight: '700',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#3b82f6'; e.currentTarget.style.textDecoration = 'underline'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#F9C935'; e.currentTarget.style.textDecoration = 'none'; }}
            >
              GAURYA TECHNOLOGIES PVT LTD
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
