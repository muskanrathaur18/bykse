import React from 'react';

export default function AboutPage({ onNavigate }) {
  const coreValues = [
    {
      icon: '🛡️',
      title: 'Safety at the Core',
      desc: 'Real-time GPS ride tracking, verified Captains, mandatory two-wheeler helmets, and 24x7 Emergency SOS response.'
    },
    {
      icon: '⚡',
      title: 'Speed & Agility',
      desc: 'Helping millions beat peak-hour traffic bottlenecks with rapid doorstep pickups in under 3 minutes.'
    },
    {
      icon: '🤝',
      title: 'Captain First Approach',
      desc: 'Flexible work hours, transparent fares, zero pressure rides, and instant bank earnings for over a million Captains.'
    },
    {
      icon: '💰',
      title: 'Affordable for Everyone',
      desc: 'Ditching surge haggling with honest, predictable fixed fares that make daily commutes affordable across India.'
    }
  ];

  return (
    <div className="rapido-about-page" style={{ background: '#ffffff', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>

      {/* =========================================================================
          HERO SECTION (Exact match with user image)
          ========================================================================= */}
      <section style={{ position: 'relative', padding: '64px 24px 72px', background: '#ffffff', overflow: 'hidden' }}>

        {/* Soft decorative background blobs matching screenshot */}
        <div style={{
          position: 'absolute',
          left: '-80px',
          top: '25%',
          width: '240px',
          height: '340px',
          background: '#FDF7DF',
          borderRadius: '50% 50% 60% 40% / 60% 40% 60% 40%',
          filter: 'blur(4px)',
          opacity: 0.85,
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div style={{
          position: 'absolute',
          right: '-90px',
          top: '5%',
          width: '320px',
          height: '420px',
          background: '#FDF7DF',
          borderRadius: '40% 60% 40% 60% / 50% 60% 40% 50%',
          filter: 'blur(4px)',
          opacity: 0.85,
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '50px', flexWrap: 'wrap' }}>

          {/* Left Hero Text matching screenshot */}
          <div style={{ flex: '1 1 480px', maxWidth: '520px' }}>
            <h1 style={{ fontSize: '42px', fontWeight: '400', color: '#111827', margin: '0 0 2px', lineHeight: '1.14', letterSpacing: '-0.5px' }}>
              India’s Beloved
            </h1>
            <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#111827', margin: '0 0 32px', lineHeight: '1.14', letterSpacing: '-0.5px' }}>
              Bike Taxi Service
            </h2>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#111827', margin: '0 0 6px 0' }}>
                We are not an option, we are a choice
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: '1.6', maxWidth: '440px' }}>
                We are the preferred commute partner for millions across India because we solve everyday city gridlocks with assured safety and genuinely economical fares.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#111827', margin: '0 0 6px 0' }}>
                What makes us different?
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: '1.6', maxWidth: '440px' }}>
                Our agile two-wheelers zip past bumper-to-bumper traffic during peak rush hours, getting you to your destination with ease. Whenever you plan to commute, choose BykSe.
              </p>
            </div>
          </div>

          {/* Right Hero Images Montage (Pill Layout matching screenshot) */}
          <div
            className="about-hero-montage"
            style={{
              flex: '1 1 420px',
              maxWidth: '460px',
              position: 'relative',
              height: '360px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Yellow Accent Pill behind images */}
            <div style={{
              position: 'absolute',
              left: '200px',
              top: '120px',
              width: '40px',
              height: '160px',
              background: '#F9C935',
              borderRadius: '24px',
              zIndex: 1
            }} />

            {/* Top-Left Pill Image (about_us_1.png) */}
            <div style={{
              position: 'absolute',
              left: '40px',
              top: '20px',
              width: '160px',
              height: '210px',
              borderRadius: '80px',
              overflow: 'hidden',
              boxShadow: '0 10px 24px rgba(0,0,0,0.08)',
              zIndex: 2,
              border: '4px solid #ffffff',
              backgroundColor: '#f3f4f6'
            }}>
              <img
                src="/images/offers/never_too_far.jpg"
                alt="BykSe rider"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => { e.target.onerror = null; e.target.src = '/images/bykse-logo.png'; }}
              />
            </div>

            {/* Bottom-Right Pill Image (about_us_2.png) */}
            <div style={{
              position: 'absolute',
              left: '180px',
              top: '65px',
              width: '210px',
              height: '270px',
              borderRadius: '105px',
              overflow: 'hidden',
              boxShadow: '0 14px 32px rgba(0,0,0,0.1)',
              zIndex: 3,
              border: '4px solid #ffffff',
              backgroundColor: '#f3f4f6'
            }}>
              <img
                src="/images/about_us_2.png"
                alt="BykSe smartphone booking"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => { e.target.onerror = null; e.target.src = '/images/bykse-logo.png'; }}
              />
            </div>
          </div>

        </div>
      </section>



      {/* =========================================================================
          ADDITIONAL SECTION 1: WHAT DRIVES US (OUR CORE PILLARS)
          ========================================================================= */}
      <section style={{ padding: '64px 24px 72px', background: '#FAFAFB', borderTop: '1px solid #f1f3f5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <div style={{ textAlign: 'left', marginBottom: '36px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#FFF3C4', color: '#855E00', padding: '5px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '700', marginBottom: '8px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E5A000' }}></span>
              Our Guiding Principles
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#111827', margin: 0, letterSpacing: '-0.5px' }}>
              What Drives Us
            </h2>
            <div style={{ width: '80px', height: '4px', background: '#F9C935', marginTop: '10px', borderRadius: '2px' }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '22px' }}>
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '24px 20px',
                  border: '1px solid #E8ECEF',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.07)';
                  e.currentTarget.style.borderColor = '#F9C935';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.03)';
                  e.currentTarget.style.borderColor = '#E8ECEF';
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '14px' }}>{val.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827', margin: '0 0 8px 0' }}>
                  {val.title}
                </h3>
                <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0, lineHeight: '1.55' }}>
                  {val.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>



      {/* =========================================================================
          JOBS @ BYKSE BANNER (Exact match with user image)
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          padding: '100px 24px',
          background: 'linear-gradient(rgba(215, 160, 5, 0.82), rgba(180, 130, 0, 0.88)), url(/images/bykse-team-office.webp) center top / cover no-repeat',
          color: '#ffffff',
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: '44px', fontWeight: '800', color: '#ffffff', margin: '0 0 12px', letterSpacing: '-0.5px', textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
            Jobs @ BykSe
          </h2>
          <p style={{ fontSize: '17px', color: '#ffffff', lineHeight: '1.55', margin: '0 auto 32px', maxWidth: '580px', textShadow: '0 1px 6px rgba(0,0,0,0.2)' }}>
            Build the future of shared urban transit alongside exceptional minds. Discover your next role at BykSe.
          </p>
          <button
            onClick={() => { onNavigate('/Careers'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{
              backgroundColor: '#000000',
              color: '#ffffff',
              border: 'none',
              borderRadius: '9999px',
              padding: '14px 42px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
            }}
          >
            Work with us
          </button>
        </div>
      </section>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 860px) {
          .about-hero-montage {
            margin: 20px auto 0 !important;
            transform: scale(0.9);
          }
        }
      `}</style>

    </div>
  );
}
