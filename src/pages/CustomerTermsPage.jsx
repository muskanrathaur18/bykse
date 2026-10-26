import React, { useState, useEffect } from 'react';

export default function CustomerTermsPage() {
  const [tab, setTab] = useState('bike'); // 'bike' or 'cabs'
  const [activeSection, setActiveSection] = useState('relationship');

  const bikeSections = [
    { id: 'relationship', title: '1. Contractual Relationship', icon: '📝' },
    { id: 'platform-role', title: '2. BykSe Marketplace Model', icon: '⚡' },
    { id: 'helmet-safety', title: '3. Mandatory ISI Helmet Protocol', icon: '🪖' },
    { id: 'fares-payment', title: '4. Fares, Pricing & Tolls', icon: '💳' },
    { id: 'cancellations', title: '5. Bookings & Cancellations', icon: '⏱️' },
    { id: 'rider-conduct', title: '6. Rider Conduct & Zero Tolerance', icon: '🤝' },
    { id: 'lost-found', title: '7. Lost & Found Policy', icon: '🎒' },
    { id: 'disputes', title: '8. Liability & Dispute Resolution', icon: '⚖️' },
  ];

  const cabsSections = [
    { id: 'relationship', title: '1. Contractual Relationship', icon: '📝' },
    { id: 'platform-role', title: '2. BykSe Marketplace Model', icon: '⚡' },
    { id: 'cab-safety', title: '3. Vehicle Standards & AC Policy', icon: '🚗' },
    { id: 'fares-payment', title: '4. Fares, Metering & Tolls', icon: '💳' },
    { id: 'cancellations', title: '5. Bookings & Cancellations', icon: '⏱️' },
    { id: 'rider-conduct', title: '6. Luggage & Passenger Capacity', icon: '🧳' },
    { id: 'lost-found', title: '7. Lost & Found Policy', icon: '🎒' },
    { id: 'disputes', title: '8. Liability & Dispute Resolution', icon: '⚖️' },
  ];

  const currentSections = tab === 'bike' ? bikeSections : cabsSections;

  const scrollTo = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (const section of currentSections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tab]);

  return (
    <div className="rapido-terms-page" style={{ background: '#F8FAFC', minHeight: '100vh', color: '#1E293B', fontFamily: 'inherit' }}>
      
      {/* =========================================================================
          HERO BANNER
          ========================================================================= */}
      <section style={{
        background: 'linear-gradient(135deg, #111827 0%, #1F2937 100%)',
        color: '#FFFFFF',
        padding: '70px 24px 50px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '4px solid #F9C935'
      }}>
        {/* Glow decoration */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-50px',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(249, 201, 53, 0.15) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(249, 201, 53, 0.15)',
            border: '1px solid rgba(249, 201, 53, 0.4)',
            color: '#F9C935',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: '700',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            <span>📜</span> Official Agreement
          </div>

          <h1 style={{
            fontSize: '42px',
            fontWeight: '800',
            margin: '0 0 16px',
            letterSpacing: '-0.8px',
            lineHeight: 1.2
          }}>
            Customer Terms & Conditions
          </h1>

          <p style={{
            fontSize: '17px',
            color: '#94A3B8',
            maxWidth: '740px',
            lineHeight: 1.6,
            margin: '0 0 28px'
          }}>
            Please review these terms carefully before booking your rides. They define your rights, passenger safety standards, fare policies, and acceptable platform usage.
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            fontSize: '13px',
            color: '#CBD5E1'
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: '8px' }}>
              📅 <strong>Effective:</strong> January 1, 2026
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: '8px' }}>
              ⚖️ <strong>Jurisdiction:</strong> India
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: '8px' }}>
              🏢 <strong>Platform:</strong> BykSe
            </span>
            <button
              onClick={() => window.print()}
              style={{
                marginLeft: 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#F9C935',
                color: '#111827',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#e5b82e'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#F9C935'; }}
            >
              🖨️ Print / Save PDF
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TAB SELECTION BAR
          ========================================================================= */}
      <section style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', background: '#F1F5F9', padding: '5px', borderRadius: '12px' }}>
            <button
              onClick={() => setTab('bike')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                borderRadius: '9px',
                border: 'none',
                background: tab === 'bike' ? '#111827' : 'transparent',
                color: tab === 'bike' ? '#FFFFFF' : '#475569',
                fontWeight: '700',
                fontSize: '14.5px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span>🛵</span> Bike Taxi Terms
            </button>
            <button
              onClick={() => setTab('cabs')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                borderRadius: '9px',
                border: 'none',
                background: tab === 'cabs' ? '#111827' : 'transparent',
                color: tab === 'cabs' ? '#FFFFFF' : '#475569',
                fontWeight: '700',
                fontSize: '14.5px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span>🚗</span> Cabs &amp; Auto Terms
            </button>
          </div>

          <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '500' }}>
            Showing clauses for: <strong style={{ color: '#0F172A' }}>{tab === 'bike' ? 'Two-Wheeler Rides (Bike Taxi)' : 'Four-Wheeler & Auto Rickshaw'}</strong>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN CONTENT WITH SIDEBAR
          ========================================================================= */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '290px 1fr',
          gap: '40px',
          alignItems: 'start'
        }} className="legal-layout-grid">

          {/* Sticky Table of Contents */}
          <aside style={{
            position: 'sticky',
            top: '80px',
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '24px 20px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
          }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#64748B',
              margin: '0 0 16px',
              paddingLeft: '8px'
            }}>
              Clauses &amp; Navigation
            </h3>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {currentSections.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollTo(sec.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: 'none',
                      background: isActive ? '#FEF9C3' : 'transparent',
                      color: isActive ? '#854D0E' : '#475569',
                      fontWeight: isActive ? '700' : '500',
                      fontSize: '13.5px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      borderLeft: isActive ? '3px solid #CA8A04' : '3px solid transparent'
                    }}
                  >
                    <span>{sec.icon}</span>
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {sec.title}
                    </span>
                  </button>
                );
              })}
            </nav>

            <div style={{
              marginTop: '28px',
              padding: '16px',
              background: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '22px', marginBottom: '4px' }}>💬</div>
              <h4 style={{ fontSize: '13.5px', fontWeight: '700', margin: '0 0 4px', color: '#1E293B' }}>
                Need Help with a Ride?
              </h4>
              <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 12px', lineHeight: 1.4 }}>
                For active booking disputes or receipts, contact our 24/7 support.
              </p>
              <a
                href="/Contact"
                style={{
                  display: 'inline-block',
                  background: '#111827',
                  color: '#FFFFFF',
                  padding: '7px 14px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '700',
                  textDecoration: 'none'
                }}
              >
                Contact Help Center
              </a>
            </div>
          </aside>

          {/* Main Legal Clauses */}
          <main style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Section 1 */}
            <section id="relationship" style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '36px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px', background: '#F1F5F9', padding: '8px', borderRadius: '10px' }}>📝</span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  1. Contractual Relationship &amp; Scope
                </h2>
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#475569', margin: '0 0 12px' }}>
                These Customer Terms and Conditions (<strong>"Terms"</strong>) govern your access to and use of the mobile applications, websites, call-in services, and platform (collectively, the <strong>"Platform"</strong>) provided by <strong>BykSe</strong>.
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#475569', margin: 0 }}>
                By creating a BykSe commuter account or requesting a trip, you agree to comply with and be legally bound by these Terms. If you do not agree, you must immediately cease accessing or utilizing the BykSe platform.
              </p>
            </section>

            {/* Section 2 */}
            <section id="platform-role" style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '36px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px', background: '#F1F5F9', padding: '8px', borderRadius: '10px' }}>⚡</span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  2. BykSe Marketplace Technology Model
                </h2>
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#475569', margin: '0 0 14px' }}>
                You explicitly acknowledge that BykSe operates as an electronic technology marketplace intermediary under Section 79 of the Information Technology Act. BykSe does not operate its own fleet of motor vehicles and does not employ drivers.
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#475569', margin: 0 }}>
                Transportation services are rendered by independent third-party driver partners (<strong>"Captains"</strong>) who utilize BykSe’s intelligent dispatch software to connect with commuters requiring point-to-point urban mobility.
              </p>
            </section>

            {/* Section 3: Tab Specific (Helmet for Bike / AC for Cabs) */}
            {tab === 'bike' ? (
              <section id="helmet-safety" style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #FDE68A',
                padding: '36px',
                boxShadow: '0 4px 16px rgba(245, 158, 11, 0.08)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '24px', background: '#FEF3C7', padding: '8px', borderRadius: '10px' }}>🪖</span>
                  <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#92400E', margin: 0 }}>
                    3. Mandatory ISI Helmet Protocol &amp; Pillion Safety
                  </h2>
                </div>

                <div style={{
                  background: '#FFFBEB',
                  border: '1px solid #FCD34D',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  marginBottom: '20px'
                }}>
                  <strong style={{ color: '#B45309', fontSize: '15px' }}>🚨 Statutory Legal Requirement:</strong>
                  <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#78350F', lineHeight: 1.5 }}>
                    Under Section 129 of the Indian Motor Vehicles Act, 1988, every person riding pillion on a two-wheeler is mandated to wear a protective ISI-certified helmet.
                  </p>
                </div>

                <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14.5px', color: '#334155', lineHeight: 1.6, margin: 0 }}>
                  <li><strong>Sanitized Helmets Provided:</strong> Every BykSe Captain carries a sanitized, clean ISI-marked helmet with a disposable hairnet cap for rider hygiene.</li>
                  <li><strong>Refusal Rights:</strong> If a commuter refuses to wear a helmet, the Captain reserves the statutory right to cancel the ride for mutual safety compliance.</li>
                  <li><strong>Single Passenger Rule:</strong> Bike Taxis permit exactly ONE passenger (no triple riding under any circumstance).</li>
                  <li><strong>Personal Luggage:</strong> Only light personal backpacks or handheld bags (under 8 kg) are permitted that do not destabilize the two-wheeler balance.</li>
                </ul>
              </section>
            ) : (
              <section id="cab-safety" style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #BFDBFE',
                padding: '36px',
                boxShadow: '0 4px 16px rgba(59, 130, 246, 0.06)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '24px', background: '#EFF6FF', padding: '8px', borderRadius: '10px' }}>🚗</span>
                  <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1E40AF', margin: 0 }}>
                    3. Vehicle Standards, AC Policy &amp; Seating
                  </h2>
                </div>

                <div style={{
                  background: '#EFF6FF',
                  border: '1px solid #93C5FD',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  marginBottom: '20px'
                }}>
                  <strong style={{ color: '#1D4ED8', fontSize: '15px' }}>❄️ Air Conditioning Standard:</strong>
                  <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#1E3A8A', lineHeight: 1.5 }}>
                    For BykSe Sedan and Prime rides, Air Conditioning is included throughout the entire journey without additional surcharge.
                  </p>
                </div>

                <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14.5px', color: '#334155', lineHeight: 1.6, margin: 0 }}>
                  <li><strong>Passenger Capacity:</strong> Auto Rickshaws seat maximum 3 passengers. Hatchback/Sedans seat maximum 4 passengers as specified by vehicle RTO registration.</li>
                  <li><strong>Cleanliness &amp; Comfort:</strong> Vehicles undergo periodic spot inspections to maintain hygiene, operational seatbelts, and non-smoking cabins.</li>
                  <li><strong>Luggage Space:</strong> Standard boot space is available for travel suitcases in cabs; excess commercial cargo is strictly prohibited.</li>
                </ul>
              </section>
            )}

            {/* Section 4: Fares, Pricing & Tolls */}
            <section id="fares-payment" style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '36px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px', background: '#F1F5F9', padding: '8px', borderRadius: '10px' }}>💳</span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  4. Upfront Fares, Pricing &amp; Payment Settlement
                </h2>
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#475569', margin: '0 0 14px' }}>
                BykSe operates on transparent pricing principles:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px' }}>
                  <div style={{ fontWeight: '700', color: '#111827', fontSize: '15px', marginBottom: '6px' }}>💰 Upfront Estimates</div>
                  <div style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
                    Fare displayed upon route selection represents the calculated cost based on route distance, estimated travel time, and prevailing demand.
                  </div>
                </div>
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px' }}>
                  <div style={{ fontWeight: '700', color: '#111827', fontSize: '15px', marginBottom: '6px' }}>🛣️ Tolls &amp; Parking</div>
                  <div style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
                    Toll charges (FASTag) along the designated trip route are added transparently to the digital final invoice without hidden markups.
                  </div>
                </div>
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px' }}>
                  <div style={{ fontWeight: '700', color: '#111827', fontSize: '15px', marginBottom: '6px' }}>📲 Cashless &amp; Cash</div>
                  <div style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
                    Settle invoices smoothly via UPI, Credit/Debit cards, in-app BykSe Wallet, or direct cash payment to the Captain.
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Bookings & Cancellations */}
            <section id="cancellations" style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '36px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px', background: '#F1F5F9', padding: '8px', borderRadius: '10px' }}>⏱️</span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  5. Bookings, Wait Time &amp; Cancellation Fee Policy
                </h2>
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#475569', margin: '0 0 14px' }}>
                To respect Captain fuel and transit time:
              </p>
              <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14.5px', color: '#334155', lineHeight: 1.6, margin: 0 }}>
                <li><strong>Grace Period:</strong> Riders may cancel without fee within 3 minutes of ride confirmation.</li>
                <li><strong>Driver Arrival Waiting:</strong> Captains will wait at the designated pickup pin for up to 5 minutes. Beyond this, a nominal waiting fee may apply or Captain may cancel the trip.</li>
                <li><strong>Cancellation Surcharge:</strong> Cancellations initiated after Captain has arrived at pickup may incur a compensation cancellation fee credited to the driver.</li>
              </ul>
            </section>

            {/* Section 6: Conduct */}
            <section id="rider-conduct" style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '36px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px', background: '#F1F5F9', padding: '8px', borderRadius: '10px' }}>🤝</span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  6. Community Code of Conduct &amp; Zero Tolerance
                </h2>
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#475569', margin: '0 0 14px' }}>
                Every commuter is expected to treat Captains and fellow passengers with dignity and mutual respect. The following activities result in permanent deactivation and legal escalation:
              </p>
              <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14.5px', color: '#334155', lineHeight: 1.6, margin: 0 }}>
                <li>Physical aggression, verbal abuse, sexual harassment, or discriminatory slurs.</li>
                <li>Carrying firearms, hazardous chemicals, narcotics, or contraband substances.</li>
                <li>Smoking, consuming alcohol, or damaging vehicle upholstery / equipment.</li>
              </ul>
            </section>

            {/* Section 7: Lost & Found */}
            <section id="lost-found" style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '36px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px', background: '#F1F5F9', padding: '8px', borderRadius: '10px' }}>🎒</span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  7. Lost &amp; Found Protocol
                </h2>
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#475569', margin: '0 0 14px' }}>
                If you inadvertently leave a personal item behind, submit a ticket immediately through your BykSe trip history. Our team connects you with the Captain via masked calling to arrange retrieval. Riders are encouraged to compensate the Captain fairly for fuel spent delivering returned belongings.
              </p>
            </section>

            {/* Section 8: Disputes */}
            <section id="disputes" style={{
              background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
              color: '#FFFFFF',
              borderRadius: '16px',
              padding: '36px',
              border: '1px solid #334155',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <span style={{ fontSize: '26px' }}>⚖️</span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#F9C935', margin: 0 }}>
                  8. Limitation of Liability &amp; Dispute Resolution
                </h2>
              </div>
              <p style={{ fontSize: '14.5px', color: '#94A3B8', lineHeight: 1.6, margin: '0 0 20px' }}>
                These Terms are governed by the laws of India. Any legal disputes arising out of the platform services shall be subject to the exclusive jurisdiction of the competent civil courts at Bengaluru, Karnataka.
              </p>
              <div style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '12px',
                padding: '16px 20px',
                fontSize: '13.5px',
                color: '#CBD5E1'
              }}>
                📧 For regulatory inquiries: <a href="mailto:legal@bykse.com" style={{ color: '#F9C935', fontWeight: '700', textDecoration: 'none' }}>legal@bykse.com</a>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
