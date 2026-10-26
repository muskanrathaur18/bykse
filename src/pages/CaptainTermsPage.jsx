import React, { useState, useEffect } from 'react';

export default function CaptainTermsPage() {
  const [tab, setTab] = useState('bike'); // 'bike' or 'cabs'
  const [activeSection, setActiveSection] = useState('eligibility');

  const bikeSections = [
    { id: 'eligibility', title: '1. Captain Onboarding & KYC', icon: '📋' },
    { id: 'autonomy', title: '2. Independent Partner Autonomy', icon: '🕒' },
    { id: 'earnings', title: '3. Earnings, Incentives & Cashout', icon: '💰' },
    { id: 'safety-helmet', title: '4. ISI Helmet & Pillion Safety', icon: '🪖' },
    { id: 'vehicle-standards', title: '5. Vehicle Condition & RC Fitness', icon: '🛵' },
    { id: 'code-conduct', title: '6. Community Conduct & Ratings', icon: '⭐' },
    { id: 'insurance', title: '7. Partner Ride Insurance Cover', icon: '🛡️' },
    { id: 'termination', title: '8. Account Deactivation & Appeals', icon: '⚖️' },
  ];

  const cabsSections = [
    { id: 'eligibility', title: '1. Commercial Permits & KYC', icon: '📋' },
    { id: 'autonomy', title: '2. Independent Partner Autonomy', icon: '🕒' },
    { id: 'earnings', title: '3. Fare Payouts & Low Commission', icon: '💰' },
    { id: 'cab-safety', title: '4. AC Mandate & Cabin Hygiene', icon: '🚗' },
    { id: 'vehicle-standards', title: '5. Fitness Certificate & Fastag', icon: '🛣️' },
    { id: 'code-conduct', title: '6. Community Conduct & Ratings', icon: '⭐' },
    { id: 'insurance', title: '7. Partner Commercial Cover', icon: '🛡️' },
    { id: 'termination', title: '8. Account Deactivation & Appeals', icon: '⚖️' },
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
            <span>🤝</span> Partner Agreement
          </div>

          <h1 style={{
            fontSize: '42px',
            fontWeight: '800',
            margin: '0 0 16px',
            letterSpacing: '-0.8px',
            lineHeight: 1.2
          }}>
            Captain Terms & Conditions
          </h1>

          <p style={{
            fontSize: '17px',
            color: '#94A3B8',
            maxWidth: '740px',
            lineHeight: 1.6,
            margin: '0 0 28px'
          }}>
            Welcome to the BykSe Captain community. This agreement governs your driver-partner relationship, real-time earnings, flexibility parameters, and vehicle safety guidelines.
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
              💼 <strong>Partner Status:</strong> Independent Contractor
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: '8px' }}>
              🛡️ <strong>Cover:</strong> Active Trip Insurance
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
              <span>🛵</span> Captain - Bike Taxi
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
              <span>🚗</span> Captain - Cabs &amp; Auto
            </button>
          </div>

          <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '500' }}>
            Agreement Category: <strong style={{ color: '#0F172A' }}>{tab === 'bike' ? 'Two-Wheeler Partner (Bike Taxi)' : 'Four-Wheeler & Auto Driver Partner'}</strong>
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
              Partner Clauses
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
              <div style={{ fontSize: '22px', marginBottom: '4px' }}>🪪</div>
              <h4 style={{ fontSize: '13.5px', fontWeight: '700', margin: '0 0 4px', color: '#1E293B' }}>
                Captain Support Desk
              </h4>
              <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 12px', lineHeight: 1.4 }}>
                Instant KYC verification, payouts assistance, or accident escalation.
              </p>
              <a
                href="mailto:captains@bykse.com"
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
                captains@bykse.com
              </a>
            </div>
          </aside>

          {/* Main Legal Clauses */}
          <main style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Section 1 */}
            <section id="eligibility" style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '36px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px', background: '#F1F5F9', padding: '8px', borderRadius: '10px' }}>📋</span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  1. Captain Eligibility &amp; Onboarding Verification
                </h2>
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#475569', margin: '0 0 14px' }}>
                To partner as a BykSe Captain, you must fulfill the statutory legal criteria under Indian Motor Vehicles Regulations:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px' }}>
                  <div style={{ fontWeight: '700', color: '#111827', fontSize: '14.5px', marginBottom: '4px' }}>🪪 Valid Driving License</div>
                  <div style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
                    Active Indian DL without suspensions, endorsement for respective category (MCWG for Bike Taxi / LMV-Commercial for Cabs).
                  </div>
                </div>
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px' }}>
                  <div style={{ fontWeight: '700', color: '#111827', fontSize: '14.5px', marginBottom: '4px' }}>📄 Registration Certificate (RC)</div>
                  <div style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
                    Original vehicle registration certificate with active road tax clearance and commercial transport fitness.
                  </div>
                </div>
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px' }}>
                  <div style={{ fontWeight: '700', color: '#111827', fontSize: '14.5px', marginBottom: '4px' }}>🛡️ Third-Party Insurance &amp; PUC</div>
                  <div style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
                    Mandatory comprehensive or valid third-party motor insurance and active Pollution Under Control certificate.
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="autonomy" style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '36px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px', background: '#F1F5F9', padding: '8px', borderRadius: '10px' }}>🕒</span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  2. Independent Partner Autonomy &amp; Zero Exclusivity
                </h2>
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#475569', margin: '0 0 12px' }}>
                Captains are strictly independent freelance contractors (<strong>"Partners"</strong>) and not employees, agents, or legal representatives of BykSe.
              </p>
              <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14.5px', color: '#334155', lineHeight: 1.6, margin: 0 }}>
                <li><strong>No Mandatory Shifts:</strong> You retain complete liberty to choose when, where, and for how long you log onto the BykSe Captain App.</li>
                <li><strong>Multi-App Freedom:</strong> No exclusivity restrictions; you may partner with other logistics, ride-hailing, or commercial networks simultaneously.</li>
                <li><strong>Ride Acceptance Freedom:</strong> You have the freedom to accept or decline incoming trip notifications based on route suitability.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="earnings" style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '36px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px', background: '#F1F5F9', padding: '8px', borderRadius: '10px' }}>💰</span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  3. Transparent Earnings, Lowest Platform Fees &amp; Instant Cashouts
                </h2>
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#475569', margin: '0 0 14px' }}>
                BykSe is built on the philosophy of maximizing Captain take-home earnings:
              </p>
              <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14.5px', color: '#334155', lineHeight: 1.6, margin: 0 }}>
                <li><strong>Real-time Ledger:</strong> Trip earnings credit to your Captain Wallet immediately upon ride completion with complete breakdown of base fare, distance, and tips.</li>
                <li><strong>Instant UPI Withdrawals:</strong> Withdraw your balance anytime directly to your linked bank account or UPI ID without payout lockups.</li>
                <li><strong>Cash Rides:</strong> For direct cash bookings, Captain collects payment in full from the customer; any platform fee adjustment is deducted seamlessly from digital earnings.</li>
              </ul>
            </section>

            {/* Section 4: Tab specific */}
            {tab === 'bike' ? (
              <section id="safety-helmet" style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #FDE68A',
                padding: '36px',
                boxShadow: '0 4px 16px rgba(245, 158, 11, 0.08)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '24px', background: '#FEF3C7', padding: '8px', borderRadius: '10px' }}>🪖</span>
                  <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#92400E', margin: 0 }}>
                    4. ISI Helmet Protocol &amp; Pillion Safety Mandate
                  </h2>
                </div>
                <div style={{
                  background: '#FFFBEB',
                  border: '1px solid #FCD34D',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  marginBottom: '16px'
                }}>
                  <strong style={{ color: '#B45309', fontSize: '15px' }}>⚠️ Mandatory Pillion Helmet:</strong>
                  <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#78350F', lineHeight: 1.5 }}>
                    Captains must always carry an ISI-certified helmet in immaculate condition dedicated for the passenger, accompanied by hygienic disposable hairnet caps.
                  </p>
                </div>
                <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14.5px', color: '#334155', lineHeight: 1.6, margin: 0 }}>
                  <li>Never start a trip before the passenger has securely fastened their helmet chin strap.</li>
                  <li>Maintain defensive riding speeds; strictly obey all red lights and lane regulations.</li>
                  <li>Do not use mobile phones while driving unless securely mounted on a designated handlebar navigation holder.</li>
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
                    4. AC Mandate, Cabin Hygiene &amp; Commercial Decorum
                  </h2>
                </div>
                <div style={{
                  background: '#EFF6FF',
                  border: '1px solid #93C5FD',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  marginBottom: '16px'
                }}>
                  <strong style={{ color: '#1D4ED8', fontSize: '15px' }}>❄️ Continuous AC Operation:</strong>
                  <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#1E3A8A', lineHeight: 1.5 }}>
                    For all Sedan and Prime bookings, the air conditioner must be kept operating smoothly without charging extra cash surcharges to riders.
                  </p>
                </div>
                <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14.5px', color: '#334155', lineHeight: 1.6, margin: 0 }}>
                  <li>Maintain clean vehicle seat covers, floor mats, and an odor-free cabin.</li>
                  <li>Ensure all 4 passenger seatbelts are fully functional and easily accessible.</li>
                  <li>Provide boot space for reasonable passenger travel luggage without extra friction.</li>
                </ul>
              </section>
            )}

            {/* Section 5: Vehicle Condition */}
            <section id="vehicle-standards" style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '36px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px', background: '#F1F5F9', padding: '8px', borderRadius: '10px' }}>⚙️</span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  5. Vehicle Fitness, Maintenance &amp; Periodic Inspection
                </h2>
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#475569', margin: '0 0 12px' }}>
                Partners are solely responsible for ensuring that their vehicle is maintained in roadworthy mechanical condition:
              </p>
              <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14.5px', color: '#334155', lineHeight: 1.6, margin: 0 }}>
                <li>Braking systems, indicators, headlights, and rearview mirrors must be 100% operational.</li>
                <li>Vehicles with damaged bodywork, broken silencers, or smoke emissions are barred from the network.</li>
                <li>Captains agree to submit periodic photo audits or visit local partner hubs for fitness verification.</li>
              </ul>
            </section>

            {/* Section 6: Conduct & Ratings */}
            <section id="code-conduct" style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '36px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px', background: '#F1F5F9', padding: '8px', borderRadius: '10px' }}>⭐</span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  6. Community Conduct &amp; Minimum Rating Thresholds
                </h2>
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#475569', margin: '0 0 12px' }}>
                Captains maintain a minimum rolling star rating of <strong>4.5 / 5.0</strong>. Zero tolerance applies to:
              </p>
              <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14.5px', color: '#334155', lineHeight: 1.6, margin: 0 }}>
                <li>Driving under the influence of alcohol, drugs, or prescription depressants.</li>
                <li>Harassment, inappropriate remarks, or offline contact with passengers post-ride.</li>
                <li>Demanding cash beyond the app invoice or intentionally taking fraudulent long routes.</li>
              </ul>
            </section>

            {/* Section 7: Insurance */}
            <section id="insurance" style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '36px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px', background: '#F1F5F9', padding: '8px', borderRadius: '10px' }}>🛡️</span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  7. Partner Ride Accidental Insurance Protection
                </h2>
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#475569', margin: 0 }}>
                Every Captain on an active trip (from pickup route acceptance until drop completion) is covered under BykSe’s comprehensive Group Personal Accident Insurance program, providing hospitalization allowances, accidental medical cover, and emergency support.
              </p>
            </section>

            {/* Section 8: Deactivation & Legal */}
            <section id="termination" style={{
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
                  8. Account Deactivation, Appeals &amp; Governing Law
                </h2>
              </div>
              <p style={{ fontSize: '14.5px', color: '#94A3B8', lineHeight: 1.6, margin: '0 0 20px' }}>
                BykSe reserves the right to suspend or deactivate partner access upon verification of serious safety violations, fraud, or legal non-compliance. Captains have the right to appeal any deactivation by submitting an inquiry to the Captain Redressal Committee.
              </p>
              <div style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '12px',
                padding: '16px 20px',
                fontSize: '13.5px',
                color: '#CBD5E1'
              }}>
                📬 Appeal Desk: <a href="mailto:captain-appeals@bykse.com" style={{ color: '#F9C935', fontWeight: '700', textDecoration: 'none' }}>captain-appeals@bykse.com</a>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
