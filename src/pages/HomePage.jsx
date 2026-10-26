import React, { useState } from 'react';

export default function HomePage({ onOpenDownload, onNavigate }) {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [selectedRide, setSelectedRide] = useState('bike');
  const [pickupFocused, setPickupFocused] = useState(false);
  const [dropFocused, setDropFocused] = useState(false);

  const sampleLocations = [
    { name: 'Koramangala 5th Block', desc: 'Bengaluru, Karnataka' },
    { name: 'Indiranagar 100ft Road', desc: 'Bengaluru, Karnataka' },
    { name: 'HSR Layout Sector 6', desc: 'Bengaluru, Karnataka' },
    { name: 'MG Road Metro Station', desc: 'Bengaluru, Karnataka' },
    { name: 'Electronic City Phase 1', desc: 'Bengaluru, Karnataka' },
  ];

  const rideTypes = [
    { id: 'bike', label: 'Bike', time: '2 mins away', icon: '🏍️' },
    { id: 'auto', label: 'Auto', time: '3 mins away', icon: '🛺' },
    { id: 'cab', label: 'Cab Economy', time: '5 mins away', icon: '🚗' },
    { id: 'parcel', label: 'Parcel', time: 'Instant pickup', icon: '📦' },
  ];

  const servicesList = [
    {
      id: 'bike',
      title: 'Bike-Taxi',
      desc: 'Zip past heavy city traffic with rapid, pocket-friendly doorstep bike rides.',
      img: '/images/services/bike_new.jpg',
      imgWidth: '105px',
      imgHeight: '105px',
    },
    {
      id: 'auto',
      title: 'Auto',
      desc: 'Daily city commutes with meter-free honest rates and zero bargaining hassles.',
      img: '/images/services/auto_new.jpg',
      imgWidth: '105px',
      imgHeight: '105px',
    },
    {
      id: 'cab',
      title: 'Cab',
      desc: 'Spacious air-conditioned cabs with vetted drivers for daily & airport journeys.',
      img: '/images/services/cab_new.jpg',
      imgWidth: '110px',
      imgHeight: '105px',
    },
    {
      id: 'parcel',
      title: 'Parcel',
      desc: 'Swift, secure doorstep deliveries with live GPS package tracking in real time.',
      img: '/images/services/parcel_new.jpg',
      imgWidth: '100px',
      imgHeight: '100px',
    },
    {
      id: 'wedding',
      title: 'Wedding Package',
      desc: 'Chauffeured premium cars and dedicated fleets for special guest celebrations.',
      img: '/images/services/wedding_car.jpg',
      imgWidth: '115px',
      imgHeight: '100px',
    },
  ];

  return (
    <div className="rapido-home-page" style={{ background: '#ffffff', minHeight: '100vh' }}>
      
      {/* HERO BOOKING SECTION */}
      <section 
        className="hero-booking-sec" 
        style={{
          background: 'linear-gradient(135deg, #fdfdfd 0%, #FFFDF2 50%, #FFF9E6 100%)',
          padding: '36px 24px 44px',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid #f2f2f2'
        }}
      >
        <div className="hero-two-column-layout" style={{ maxWidth: '1180px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(340px, 440px) 1fr', alignItems: 'center', justifyContent: 'center', gap: '56px', width: '100%' }}>
          
          {/* Left Hero Content & Booking Card */}
          <div style={{ width: '100%', maxWidth: '440px' }}>

            {/* Headline */}
            <h1 style={{ fontSize: '42px', fontWeight: '800', lineHeight: '1.14', color: '#1a1f2c', margin: '0 0 6px', letterSpacing: '-0.5px' }}>
              Your Daily Rides,<br />
              <span style={{ color: '#111827' }}>Made Super Simple</span>
            </h1>

            {/* Subtitle */}
            <p style={{ fontSize: '16px', lineHeight: '1.45', color: '#4b5563', margin: '0 0 20px', fontWeight: '400' }}>
              Book Bike-Taxi, Auto &amp; Cabs in seconds with transparent pricing and zero hassle
            </p>

            {/* Ride Type Selector Pills */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '14px' }}>
              {rideTypes.map(r => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRide(r.id)}
                  style={{
                    background: selectedRide === r.id ? '#FFF9E6' : '#ffffff',
                    border: selectedRide === r.id ? '2px solid #F9C935' : '1px solid #e5e7eb',
                    borderRadius: '10px',
                    padding: '10px 4px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    boxShadow: selectedRide === r.id ? '0 4px 12px rgba(249, 201, 53, 0.25)' : '0 1px 3px rgba(0,0,0,0.04)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ fontSize: '20px', marginBottom: '2px' }}>{r.icon}</div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>{r.label}</div>
                </button>
              ))}
            </div>

            {/* Location Inputs Group */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
              
              {/* Pickup Input */}
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#111827"/>
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Enter Pickup Location"
                  value={pickup}
                  onFocus={() => setPickupFocused(true)}
                  onChange={(e) => setPickup(e.target.value)}
                  style={{
                    width: '100%',
                    height: '50px',
                    padding: '0 40px 0 46px',
                    borderRadius: '9px',
                    border: '1.5px solid #d1d5db',
                    backgroundColor: '#ffffff',
                    fontSize: '14.5px',
                    color: '#111827',
                    outline: 'none',
                    boxSizing: 'border-box',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onFocusCapture={(e) => e.target.style.borderColor = '#111827'}
                  onBlurCapture={(e) => e.target.style.borderColor = '#d1d5db'}
                />
                {pickup && (
                  <button 
                    onClick={() => setPickup('')}
                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: '18px', padding: 0 }}
                  >
                    ✕
                  </button>
                )}
                {pickupFocused && !pickup && (
                  <div style={{ position: 'absolute', top: '105%', left: 0, right: 0, background: '#fff', borderRadius: '10px', boxShadow: '0 12px 28px rgba(0,0,0,0.12)', zIndex: 10, padding: '8px', border: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#9ca3af', padding: '6px 10px', letterSpacing: '0.5px' }}>POPULAR PICKUP LOCATIONS</div>
                    {sampleLocations.slice(0, 3).map((loc, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => { setPickup(loc.name); setPickupFocused(false); }}
                        style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #f3f4f6', borderRadius: '6px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#FFFDF5'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <span style={{ fontSize: '14px' }}>📍</span>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{loc.name}</div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>{loc.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drop Input */}
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#111827" strokeWidth="2.5"/>
                    <circle cx="12" cy="12" r="4" fill="#111827"/>
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Enter Drop Location"
                  value={drop}
                  onFocus={() => setDropFocused(true)}
                  onChange={(e) => setDrop(e.target.value)}
                  style={{
                    width: '100%',
                    height: '50px',
                    padding: '0 40px 0 46px',
                    borderRadius: '9px',
                    border: '1.5px solid #d1d5db',
                    backgroundColor: '#ffffff',
                    fontSize: '14.5px',
                    color: '#111827',
                    outline: 'none',
                    boxSizing: 'border-box',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onFocusCapture={(e) => e.target.style.borderColor = '#111827'}
                  onBlurCapture={(e) => e.target.style.borderColor = '#d1d5db'}
                />
                {drop && (
                  <button 
                    onClick={() => setDrop('')}
                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: '18px', padding: 0 }}
                  >
                    ✕
                  </button>
                )}
                {dropFocused && !drop && (
                  <div style={{ position: 'absolute', top: '105%', left: 0, right: 0, background: '#fff', borderRadius: '10px', boxShadow: '0 12px 28px rgba(0,0,0,0.12)', zIndex: 10, padding: '8px', border: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#9ca3af', padding: '6px 10px', letterSpacing: '0.5px' }}>SUGGESTED DESTINATIONS</div>
                    {sampleLocations.slice(2, 5).map((loc, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => { setDrop(loc.name); setDropFocused(false); }}
                        style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #f3f4f6', borderRadius: '6px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#FFFDF5'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <span style={{ fontSize: '14px' }}>🎯</span>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{loc.name}</div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>{loc.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Big Yellow "Book Ride" Button - matching the user image with modern pop */}
              <button
                onClick={() => onNavigate ? onNavigate('/pickup') : onOpenDownload()}
                style={{
                  backgroundColor: '#F9C935',
                  color: '#111827',
                  border: 'none',
                  borderRadius: '9px',
                  height: '50px',
                  fontSize: '17px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  marginTop: '4px',
                  boxShadow: '0 4px 14px rgba(249, 201, 53, 0.35)',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  letterSpacing: '0.2px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5be18';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 22px rgba(249, 201, 53, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#F9C935';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(249, 201, 53, 0.4)';
                }}
              >
                Book Ride
              </button>

            </div>

            {/* Trust highlights below button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ color: '#10b981' }}>✓</span> Lowest Fares Guaranteed
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ color: '#10b981' }}>✓</span> 100% Insured Rides
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ color: '#10b981' }}>✓</span> Zero Surge Haggling
              </span>
            </div>

          </div>

          {/* Right Hero Visuals - Attractive, Multi-Layered Tech Showcase */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', padding: '16px 8px' }}>
            
            {/* Ambient Warm Golden Halo Glow */}
            <div 
              style={{
                position: 'absolute',
                width: '420px',
                height: '340px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(249, 201, 53, 0.32) 0%, rgba(254, 240, 138, 0.16) 45%, rgba(255, 255, 255, 0) 70%)',
                filter: 'blur(32px)',
                zIndex: 0,
                pointerEvents: 'none',
                transform: 'translate(10px, -10px)'
              }}
            />

            {/* Decorative Subtle Dash Tech Ring */}
            <div 
              style={{
                position: 'absolute',
                top: '-12px',
                right: '16px',
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                border: '2px dashed rgba(249, 201, 53, 0.45)',
                zIndex: 0,
                pointerEvents: 'none',
                opacity: 0.7
              }}
            />

            {/* Main Image Frame Container */}
            <div 
              className="hero-image-showcase-frame"
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '520px',
                height: '370px',
                borderRadius: '24px',
                overflow: 'visible',
                transition: 'transform 0.35s ease'
              }}
            >
              
              {/* Outer Glass Card & Image Wrapper */}
              <div 
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: '#ffffff',
                  border: '2px solid #ffffff',
                  outline: '1px solid rgba(249, 201, 53, 0.35)',
                  boxShadow: '0 24px 60px -12px rgba(17, 24, 39, 0.16), 0 8px 24px -4px rgba(249, 201, 53, 0.14)',
                  transition: 'box-shadow 0.3s ease, transform 0.3s ease'
                }}
              >
                <img 
                  src="/images/rapido_hero_vehicles.jpg" 
                  alt="BykSe Bike, Auto, and Cab Fleet" 
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'cover',
                    objectPosition: 'center 62%',
                    transition: 'transform 0.4s ease'
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/about_us_1.png';
                  }}
                />

                {/* Subtle bottom vignette to ground the vehicles */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '60px',
                    background: 'linear-gradient(to top, rgba(17, 24, 39, 0.32) 0%, rgba(0, 0, 0, 0) 100%)',
                    pointerEvents: 'none'
                  }}
                />

                {/* Live Activity Pill inside bottom right of photo */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    zIndex: 2,
                    background: 'rgba(17, 24, 39, 0.82)',
                    backdropFilter: 'blur(10px)',
                    color: '#ffffff',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }}></span>
                  <span>100K+ Rides Today</span>
                </div>
              </div>

              {/* Floating Stat Card 1 - Top Right: "⚡ Pickup in Under 3 Mins" */}
              <div 
                className="hero-floating-badge-top"
                style={{
                  position: 'absolute',
                  top: '-14px',
                  right: '-14px',
                  zIndex: 3,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(12px)',
                  padding: '9px 16px',
                  borderRadius: '16px',
                  boxShadow: '0 14px 32px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '11px',
                  cursor: 'default'
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#FFF3C4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                  ⚡
                </div>
                <div>
                  <div style={{ fontSize: '10.5px', fontWeight: '700', color: '#926004', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Avg Pickup</div>
                  <div style={{ fontSize: '14.5px', fontWeight: '800', color: '#111827', lineHeight: '1.2' }}>Under 3 Mins</div>
                </div>
              </div>

              {/* Floating Stat Card 2 - Bottom Left: "🛡️ Lowest Price Guaranteed" */}
              <div 
                className="hero-floating-badge-bottom"
                style={{
                  position: 'absolute',
                  bottom: '-16px',
                  left: '-16px',
                  zIndex: 3,
                  background: 'rgba(255, 255, 255, 0.96)',
                  backdropFilter: 'blur(14px)',
                  padding: '11px 18px',
                  borderRadius: '18px',
                  boxShadow: '0 18px 36px rgba(0, 0, 0, 0.14), 0 3px 8px rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.95)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'default'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: '#F9C935', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', boxShadow: '0 4px 10px rgba(249, 201, 53, 0.35)' }}>
                    🛡️
                  </div>
                  <span style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '11px', height: '11px', background: '#10b981', border: '2px solid #ffffff', borderRadius: '50%' }}></span>
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#111827', lineHeight: '1.2' }}>Lowest Price Guarantee</div>
                  <div style={{ fontSize: '11.5px', color: '#4b5563', fontWeight: '600', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>Zero Surge</span>
                    <span style={{ color: '#d1d5db' }}>•</span>
                    <span style={{ color: '#10b981', fontWeight: '700' }}>Live Matching</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        <style>{`
          .hero-two-column-layout {
            display: grid !important;
            grid-template-columns: minmax(340px, 440px) 1fr !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 56px !important;
          }
          @keyframes floatTop {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }
          @keyframes floatBottom {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(6px); }
          }
          .hero-floating-badge-top {
            animation: floatTop 4s ease-in-out infinite;
          }
          .hero-floating-badge-bottom {
            animation: floatBottom 4.5s ease-in-out infinite 0.4s;
          }
          .hero-image-showcase-frame:hover {
            transform: translateY(-3px);
          }
          @media (max-width: 960px) {
            .hero-two-column-layout {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
            }
            .hero-floating-badge-top {
              right: 0px !important;
            }
            .hero-floating-badge-bottom {
              left: 0px !important;
            }
          }
        `}</style>
      </section>

      {/* OUR SERVICES SECTION (Exact Match with Provided Image) */}
      <section style={{ padding: '64px 24px 72px', background: '#ffffff' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          
          {/* Left-aligned Title matching image */}
          <div style={{ textAlign: 'left', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#1a1f2c', margin: 0, letterSpacing: '-0.5px' }}>
              Our Services
            </h2>
            <div style={{ width: '96px', height: '4px', background: '#F9C935', marginTop: '10px', borderRadius: '2px' }}></div>
          </div>

          {/* 3x2 Grid matching image */}
          <div className="services-exact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '22px' }}>
            {servicesList.map((service) => (
              <div 
                key={service.id}
                onClick={onOpenDownload}
                style={{
                  backgroundColor: '#F6F7F9',
                  borderRadius: '18px',
                  padding: '24px 20px 24px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  minHeight: '150px',
                  boxSizing: 'border-box',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 10px 24px rgba(0, 0, 0, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ flex: 1, paddingRight: '14px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111827', margin: '0 0 8px 0', lineHeight: '1.2' }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#4b5563', margin: 0, lineHeight: '1.5', fontWeight: '400' }}>
                    {service.desc}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexShrink: 0 }}>
                  <img 
                    src={service.img} 
                    alt={service.title} 
                    style={{
                      width: service.imgWidth,
                      height: service.imgHeight,
                      objectFit: 'contain',
                      display: 'block',
                      mixBlendMode: 'multiply',
                      borderRadius: '10px'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>

        <style>{`
          @media (max-width: 992px) {
            .services-exact-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (max-width: 640px) {
            .services-exact-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* WHAT WE OFFER SECTION */}
      <section style={{ padding: '36px 24px 64px', background: '#FAFAFB' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          
          {/* Section Header */}
          <div style={{ textAlign: 'left', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '40px', fontWeight: '800', color: '#1a1f2c', margin: 0, letterSpacing: '-0.5px' }}>
              What we offer
            </h2>
            <div style={{ width: '80px', height: '4px', background: '#F9C935', marginTop: '8px', borderRadius: '2px' }}></div>
            <p style={{ fontSize: '15px', color: '#64748b', margin: '8px 0 0', maxWidth: '620px', lineHeight: '1.45' }}>
              Designed for your everyday comfort, lightning-fast pick ups, and maximum savings.
            </p>
          </div>

          {/* 3 Columns Grid */}
          <div className="what-we-offer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
            
            {/* Card 1: Quick Pickup */}
            <div 
              onClick={() => onNavigate ? onNavigate('/pickup') : onOpenDownload()}
              style={{ 
                background: '#ffffff',
                borderRadius: '24px',
                padding: '16px 16px 24px',
                border: '1px solid #E8ECEF',
                boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)',
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = '#F9C935';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 0, 0, 0.03)';
                e.currentTarget.style.borderColor = '#E8ECEF';
              }}
            >
              <div 
                style={{ 
                  width: '100%', 
                  height: '210px', 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  position: 'relative',
                  backgroundColor: '#f3f4f6'
                }}
              >
                <img 
                  src="/images/offers/quick_pickup.jpg" 
                  alt="Quick Pickup" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    display: 'block',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
                <span style={{ 
                  position: 'absolute', 
                  top: '12px', 
                  left: '12px', 
                  background: 'rgba(255, 255, 255, 0.92)', 
                  backdropFilter: 'blur(8px)', 
                  padding: '5px 12px', 
                  borderRadius: '20px', 
                  fontSize: '12px', 
                  fontWeight: '700', 
                  color: '#111827', 
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)' 
                }}>
                  ⚡ In 2-3 mins
                </span>
              </div>

              <div style={{ padding: '2px 4px 0' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111827', margin: '12px 0 6px', letterSpacing: '-0.3px' }}>
                  Quick Pickup
                </h3>
                <p style={{ fontSize: '14px', color: '#556987', margin: 0, lineHeight: '1.55', fontWeight: '400' }}>
                  Doorstep arrivals in 2-3 minutes so you keep moving without delays. A BykSe Captain is always right around the corner.
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '14px', color: '#111827', fontWeight: '700', fontSize: '13.5px' }}>
                  Book ride <span style={{ color: '#E5A000', fontWeight: '800' }}>→</span>
                </div>
              </div>
            </div>

            {/* Card 2: Best Fares */}
            <div 
              onClick={onOpenDownload}
              style={{ 
                background: '#ffffff',
                borderRadius: '24px',
                padding: '16px 16px 24px',
                border: '1px solid #E8ECEF',
                boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)',
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = '#F9C935';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 0, 0, 0.03)';
                e.currentTarget.style.borderColor = '#E8ECEF';
              }}
            >
              <div 
                style={{ 
                  width: '100%', 
                  height: '210px', 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  position: 'relative',
                  backgroundColor: '#f3f4f6'
                }}
              >
                <img 
                  src="/images/offers/best_fares.jpg?v=2" 
                  alt="Best Fares" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    objectPosition: 'center 38%',
                    display: 'block',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
                <span style={{ 
                  position: 'absolute', 
                  top: '12px', 
                  left: '12px', 
                  background: 'rgba(255, 255, 255, 0.94)', 
                  backdropFilter: 'blur(8px)', 
                  padding: '5px 12px', 
                  borderRadius: '20px', 
                  fontSize: '12px', 
                  fontWeight: '700', 
                  color: '#111827', 
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)' 
                }}>
                  🏷️ Best Fares (₹)
                </span>
              </div>

              <div style={{ padding: '2px 4px 0' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111827', margin: '12px 0 6px', letterSpacing: '-0.3px' }}>
                  Best Fares
                </h3>
                <p style={{ fontSize: '14px', color: '#556987', margin: 0, lineHeight: '1.55', fontWeight: '400' }}>
                  Honest, transparent rates designed for daily commuters. Travel further, spend less without compromising comfort.
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '14px', color: '#111827', fontWeight: '700', fontSize: '13.5px' }}>
                  Compare fares <span style={{ color: '#E5A000', fontWeight: '800' }}>→</span>
                </div>
              </div>
            </div>

            {/* Card 3: Never Too Far */}
            <div 
              onClick={onOpenDownload}
              style={{ 
                background: '#ffffff',
                borderRadius: '24px',
                padding: '16px 16px 24px',
                border: '1px solid #E8ECEF',
                boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)',
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = '#F9C935';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 0, 0, 0.03)';
                e.currentTarget.style.borderColor = '#E8ECEF';
              }}
            >
              <div 
                style={{ 
                  width: '100%', 
                  height: '210px', 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  position: 'relative',
                  backgroundColor: '#f3f4f6'
                }}
              >
                <img 
                  src="/images/offers/never_too_far.jpg" 
                  alt="Never Too Far" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    display: 'block',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
                <span style={{ 
                  position: 'absolute', 
                  top: '12px', 
                  left: '12px', 
                  background: 'rgba(255, 255, 255, 0.92)', 
                  backdropFilter: 'blur(8px)', 
                  padding: '5px 12px', 
                  borderRadius: '20px', 
                  fontSize: '12px', 
                  fontWeight: '700', 
                  color: '#111827', 
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)' 
                }}>
                  📍 400+ Cities
                </span>
              </div>

              <div style={{ padding: '2px 4px 0' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111827', margin: '12px 0 6px', letterSpacing: '-0.3px' }}>
                  Never Too Far
                </h3>
                <p style={{ fontSize: '14px', color: '#556987', margin: 0, lineHeight: '1.55', fontWeight: '400' }}>
                  Operating across 400+ cities and nationwide routes. Wherever life takes you, count on a BykSe ride nearby.
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '14px', color: '#111827', fontWeight: '700', fontSize: '13.5px' }}>
                  Find Captain <span style={{ color: '#E5A000', fontWeight: '800' }}>→</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .what-we-offer-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 20px !important;
            }
          }
          @media (max-width: 600px) {
            .what-we-offer-grid {
              grid-template-columns: 1fr !important;
              gap: 24px !important;
            }
          }
        `}</style>
      </section>

      {/* EARN WITH BYKSE SECTION (Exact match with user image) */}
      <section style={{ padding: '48px 24px 32px', background: '#1E4B82' }}>
        <div 
          className="earn-rapido-container"
          style={{ 
            maxWidth: '1140px', 
            margin: '0 auto', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '64px',
            flexWrap: 'wrap'
          }}
        >
          {/* Left: Captains & Vehicles Image */}
          <div 
            style={{ 
              flex: '1 1 380px', 
              maxWidth: '460px', 
              borderRadius: '24px', 
              overflow: 'hidden',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.28)'
            }}
          >
            <img 
              src="/images/bykse-captain-hero.jpg" 
              alt="Earn with BykSe Captain" 
              style={{ 
                width: '100%', 
                height: '380px', 
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
                borderRadius: '24px'
              }}
            />
          </div>

          {/* Right: Text & CTA Button */}
          <div style={{ flex: '1 1 420px', maxWidth: '520px' }}>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>
                Drive, Deliver &amp; Earn Daily
              </h2>
              <div style={{ width: '84px', height: '4px', background: '#F9C935', marginTop: '10px', borderRadius: '2px' }}></div>
            </div>

            <p style={{ fontSize: '18px', color: '#ffffff', lineHeight: '1.55', margin: '0 0 22px 0', fontWeight: '400', opacity: 0.95 }}>
              Turn your two-wheeler, auto, or cab into a reliable daily income. Ride on your own schedule with zero pressure and instant bank transfers.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '30px', color: '#FFF3C4', fontSize: '13.5px', fontWeight: '600' }}>
              <span>✓ Instant Daily Payouts</span>
              <span>✓ Zero Joining Fee</span>
              <span>✓ 24x7 Roadside Safety</span>
            </div>

            <button
              onClick={onOpenDownload}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#F9C935',
                color: '#000000',
                padding: '14px 34px',
                borderRadius: '9999px',
                fontSize: '18px',
                fontWeight: '800',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(249, 201, 53, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
              }}
            >
              Become a Captain <span style={{ fontSize: '20px', transition: 'transform 0.2s' }}>→</span>
            </button>
          </div>
        </div>

        <style>{`
          @media (max-width: 860px) {
            .earn-rapido-container {
              flex-direction: column !important;
              gap: 40px !important;
              text-align: center !important;
            }
            .earn-rapido-container div[style*="textAlign"] {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .earn-rapido-container h2 {
              font-size: 34px !important;
            }
            .earn-rapido-container p {
              font-size: 17px !important;
            }
          }
        `}</style>
      </section>


      {/* WHAT OUR DAILY RIDERS SAY (TESTIMONIALS) */}
      <section style={{ padding: '8px 20px 10px', background: '#fafafa' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#111', margin: '0 0 8px' }}>
            What Our Daily Riders Say
          </h2>
          <div style={{ width: '44px', height: '3px', background: '#F9C935', margin: '0 auto 30px', borderRadius: '2px' }}></div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', textAlign: 'left' }}>
            
            {/* Review 1 */}
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '22px 20px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0' }}>
              <div style={{ color: '#F9C935', fontSize: '20px', marginBottom: '14px' }}>★★★★★</div>
              <p style={{ fontSize: '15px', color: '#444', lineHeight: '1.6', margin: '0 0 20px', fontStyle: 'italic' }}>
                "BykSe has completely transformed my daily morning rush. I used to spend 45 mins stuck in cab traffic, now a bike-taxi gets me there in 15 mins flat at one-third the cost!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#F9C935', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '18px' }}>
                  P
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#111' }}>Pooja Nair</div>
                  <div style={{ fontSize: '13px', color: '#777' }}>Marketing Lead, Gurgaon</div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '22px 20px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0' }}>
              <div style={{ color: '#F9C935', fontSize: '20px', marginBottom: '14px' }}>★★★★★</div>
              <p style={{ fontSize: '15px', color: '#444', lineHeight: '1.6', margin: '0 0 20px', fontStyle: 'italic' }}>
                "What I love most is the upfront transparency—no surge price shocks in peak hours and zero bargaining. The Auto arrives in under 3 minutes right at my doorstep."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#F9C935', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '18px' }}>
                  A
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#111' }}>Aditya Mehta</div>
                  <div style={{ fontSize: '13px', color: '#777' }}>Fintech Consultant, Mumbai</div>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '22px 20px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0' }}>
              <div style={{ color: '#F9C935', fontSize: '20px', marginBottom: '14px' }}>★★★★★</div>
              <p style={{ fontSize: '15px', color: '#444', lineHeight: '1.6', margin: '0 0 20px', fontStyle: 'italic' }}>
                "Safe, hygienic, and extremely prompt. As someone commuting after late shifts, live trip sharing and verified captains give my family complete peace of mind."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#000000', color: '#F9C935', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '18px' }}>
                  S
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#111' }}>Sneha Roy</div>
                  <div style={{ fontSize: '13px', color: '#777' }}>UI/UX Designer, Pune</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* DOWNLOAD APP BOTTOM CTA BANNER (Ultra-Compact Slim Banner) */}
      <section style={{ padding: '14px 20px', background: '#111111', color: '#ffffff' }}>
        <div 
          className="container" 
          style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            flexWrap: 'wrap', 
            gap: '12px' 
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', margin: 0, letterSpacing: '-0.2px' }}>
              Ready to travel easy with BykSe?
            </h2>
            <span style={{ fontSize: '13px', color: '#9ca3af' }}>
              Instant pickups &amp; zero surge hassle. Get ₹50 off with code <strong style={{ color: '#F9C935' }}>BYKSE50</strong>
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={onOpenDownload}
              style={{
                backgroundColor: '#F9C935',
                color: '#000000',
                border: 'none',
                borderRadius: '9999px',
                padding: '7px 18px',
                fontSize: '12.5px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Download BykSe App
            </button>
            <button
              onClick={onOpenDownload}
              style={{
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.4)',
                borderRadius: '9999px',
                padding: '7px 18px',
                fontSize: '12.5px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.borderColor = '#ffffff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
            >
              Drive with BykSe
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
