import React, { useState } from 'react';

export default function CareersPage() {
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Gallery Office Images matching exact BykSe assets
  const galleryImages = [
    { src: '/images/career_carousel_1.png', alt: 'BykSe team in meeting room' },
    { src: '/images/career_carousel_2.png', alt: 'BykSe team brainstorming session' },
    { src: '/images/career_carousel_3.png', alt: 'Engineer developing BykSe systems' },
    { src: '/images/career_carousel_4.png', alt: 'Collaborative work pods at BykSe' },
  ];

  const handlePrevGallery = () => {
    setGalleryIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextGallery = () => {
    setGalleryIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  // 3-slice visible window for gallery
  const visibleGallery = [
    galleryImages[galleryIndex % galleryImages.length],
    galleryImages[(galleryIndex + 1) % galleryImages.length],
    galleryImages[(galleryIndex + 2) % galleryImages.length],
  ];

  return (
    <div className="rapido-careers-page" style={{ background: '#ffffff', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      
      {/* =========================================================================
          BACKGROUND DECORATIVE ACCENTS (Screenshot Match)
          ========================================================================= */}
      
      {/* Top-Right Soft Yellow Curved Blob */}
      <div 
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-50px',
          width: '450px',
          height: '400px',
          background: '#FEF9E7',
          borderRadius: '40% 60% 60% 40% / 50% 40% 60% 50%',
          filter: 'blur(6px)',
          pointerEvents: 'none',
          zIndex: 0,
        }} 
      />

      {/* Middle-Left Subtle Dot Grid Pattern */}
      <div 
        style={{
          position: 'absolute',
          top: '560px',
          left: '40px',
          width: '90px',
          height: '110px',
          backgroundImage: 'radial-gradient(#D1D5DB 1.8px, transparent 1.8px)',
          backgroundSize: '14px 14px',
          opacity: 0.7,
          pointerEvents: 'none',
          zIndex: 0,
        }} 
      />

      {/* Bottom-Right Subtle Yellow Dot Grid Pattern */}
      <div 
        style={{
          position: 'absolute',
          bottom: '80px',
          right: '50px',
          width: '90px',
          height: '110px',
          backgroundImage: 'radial-gradient(#FDE68A 2px, transparent 2px)',
          backgroundSize: '14px 14px',
          opacity: 0.85,
          pointerEvents: 'none',
          zIndex: 0,
        }} 
      />


      <div style={{ maxWidth: '1220px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        
        {/* =========================================================================
            1. HERO SECTION: "Be a part of our team." (Exact Screenshot Match)
            ========================================================================= */}
        <section style={{ padding: '64px 0 72px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '48px', flexWrap: 'wrap' }}>
            
            {/* Left Column: Heading, Subtitle & "View Jobs" CTA Button */}
            <div style={{ flex: '1 1 440px', maxWidth: '480px' }}>
              <h1 style={{ 
                fontSize: '44px', 
                fontWeight: '800', 
                color: '#111827', 
                margin: '0 0 14px', 
                lineHeight: '1.18', 
                letterSpacing: '-0.5px' 
              }}>
                Be a part of our team
              </h1>
              
              <p style={{ 
                fontSize: '15px', 
                color: '#6b7280', 
                lineHeight: '1.65', 
                margin: '0 0 28px', 
                maxWidth: '410px' 
              }}>
                We are excited to welcome passionate builders and innovators to BykSe. Let's find the perfect spot for your talents.
              </p>

              <button
                type="button"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#F9C935',
                  color: '#111827',
                  fontSize: '13px',
                  fontWeight: '700',
                  padding: '12px 28px',
                  borderRadius: '9999px',
                  border: 'none',
                  boxShadow: '0 4px 14px rgba(249, 201, 53, 0.35)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(249, 201, 53, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(249, 201, 53, 0.35)';
                }}
              >
                View Jobs
              </button>
            </div>

            {/* Right Column: Dynamic Overlapping Photo Collage (Exact Screenshot Match) */}
            <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: '380px', height: '340px' }}>
                
                {/* Photo 1 (Left Top Capsule Arch): BykSe leadership */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '0px',
                    left: '10px',
                    width: '140px',
                    height: '185px',
                    borderRadius: '80px 80px 18px 18px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 24px rgba(0, 0, 0, 0.08)',
                    zIndex: 2,
                    background: '#f3f4f6',
                  }}
                >
                  <img 
                    src="/images/career_carousel_4.png" 
                    alt="BykSe work pods" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>

                {/* Yellow Accent Capsule Behind Photo 2 (Exact Screenshot Detail) */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '160px',
                    left: '110px',
                    width: '16px',
                    height: '140px',
                    background: '#F9C935',
                    borderRadius: '9999px',
                    zIndex: 1,
                  }}
                />

                {/* Photo 2 (Right Tall Rounded Rectangle): BykSe team group photo */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '28px',
                    right: '15px',
                    width: '215px',
                    height: '300px',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
                    zIndex: 3,
                    background: '#f3f4f6',
                  }}
                >
                  <img 
                    src="/images/career_carousel_2.png" 
                    alt="BykSe team brainstorm session" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>

              </div>
            </div>

          </div>
        </section>


        {/* =========================================================================
            2. "Why work with us" SECTION (Exact Screenshot Match)
            ========================================================================= */}
        <section style={{ padding: '36px 0 60px' }}>
          
          <div style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#111827', margin: '0 0 8px' }}>
              Why work with us
            </h2>
            <div style={{ width: '40px', height: '3.5px', background: '#F9C935', borderRadius: '2px' }} />
          </div>

          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
              gap: '40px 32px',
              maxWidth: '960px',
            }}
          >
            {/* Benefit 1: Compensation */}
            <div>
              <div style={{ marginBottom: '14px' }}>
                <img 
                  src="/images/work_1.png" 
                  alt="Competitive compensation" 
                  style={{ height: '56px', width: 'auto', display: 'block' }}
                />
              </div>
              <p style={{ fontSize: '13.5px', color: '#6b7280', lineHeight: '1.6', margin: 0, maxWidth: '260px' }}>
                We pride ourselves on rewarding great work with great compensation.
              </p>
            </div>

            {/* Benefit 2: Flexibility */}
            <div>
              <div style={{ marginBottom: '14px' }}>
                <img 
                  src="/images/work_2.png" 
                  alt="Flexible hours" 
                  style={{ height: '56px', width: 'auto', display: 'block' }}
                />
              </div>
              <p style={{ fontSize: '13.5px', color: '#6b7280', lineHeight: '1.6', margin: 0, maxWidth: '260px' }}>
                Flexible hours and vacation. Night owls welcome.
              </p>
            </div>

            {/* Benefit 3: Culture */}
            <div>
              <div style={{ marginBottom: '14px' }}>
                <img 
                  src="/images/work_3.png" 
                  alt="Diverse global crew" 
                  style={{ height: '56px', width: 'auto', display: 'block' }}
                />
              </div>
              <p style={{ fontSize: '13.5px', color: '#6b7280', lineHeight: '1.6', margin: 0, maxWidth: '260px' }}>
                Meet new cultures and enjoy our crew from all over the world.
              </p>
            </div>

          </div>
        </section>


        {/* =========================================================================
            3. OFFICE LIFE GALLERY / CAROUSEL (Exact Screenshot Match)
            ========================================================================= */}
        <section style={{ padding: '20px 0 84px', position: 'relative' }}>
          
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            
            {/* Prev Arrow Button */}
            <button
              onClick={handlePrevGallery}
              aria-label="Previous photos"
              style={{
                position: 'absolute',
                left: '-22px',
                zIndex: 10,
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                color: '#6b7280',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F9C935';
                e.currentTarget.style.color = '#111827';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              ‹
            </button>

            {/* 3 Photos Grid Row */}
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '20px', 
                width: '100%',
              }}
            >
              {visibleGallery.map((item, idx) => (
                <div 
                  key={idx}
                  style={{
                    height: '240px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#f3f4f6',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              ))}
            </div>

            {/* Next Arrow Button */}
            <button
              onClick={handleNextGallery}
              aria-label="Next photos"
              style={{
                position: 'absolute',
                right: '-22px',
                zIndex: 10,
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                color: '#6b7280',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F9C935';
                e.currentTarget.style.color = '#111827';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              ›
            </button>

          </div>

          {/* Carousel Indicators */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '22px' }}>
            <span style={{ width: '18px', height: '4px', borderRadius: '4px', background: '#F9C935' }} />
            <span style={{ width: '6px', height: '4px', borderRadius: '4px', background: '#D1D5DB' }} />
            <span style={{ width: '6px', height: '4px', borderRadius: '4px', background: '#D1D5DB' }} />
          </div>

        </section>

      </div>

    </div>
  );
}
