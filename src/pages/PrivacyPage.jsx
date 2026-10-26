import React, { useState, useEffect } from 'react';

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('info-collect');

  const sections = [
    { id: 'overview', title: '1. Overview & Scope', icon: '📋' },
    { id: 'info-collect', title: '2. Information We Collect', icon: '📥' },
    { id: 'how-we-use', title: '3. How We Use Your Data', icon: '⚙️' },
    { id: 'data-sharing', title: '4. Data Sharing & Third Parties', icon: '🤝' },
    { id: 'security', title: '5. Data Security & Phone Masking', icon: '🛡️' },
    { id: 'user-rights', title: '6. Your Privacy Rights & Controls', icon: '⚖️' },
    { id: 'retention', title: '7. Data Retention & Deletion', icon: '🗄️' },
    { id: 'grievance', title: '8. Grievance Officer Contact', icon: '📬' },
  ];

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
      for (const section of sections) {
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
  }, []);

  return (
    <div className="rapido-privacy-page" style={{ background: '#F8FAFC', minHeight: '100vh', color: '#1E293B', fontFamily: 'inherit' }}>
      
      {/* =========================================================================
          HERO BANNER
          ========================================================================= */}
      <section style={{
        background: 'linear-gradient(135deg, #111827 0%, #1F2937 100%)',
        color: '#FFFFFF',
        padding: '70px 24px 60px',
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
            <span>🔒</span> Transparency & Data Security
          </div>

          <h1 style={{
            fontSize: '42px',
            fontWeight: '800',
            margin: '0 0 16px',
            letterSpacing: '-0.8px',
            lineHeight: 1.2
          }}>
            BykSe Privacy Policy
          </h1>

          <p style={{
            fontSize: '17px',
            color: '#94A3B8',
            maxWidth: '740px',
            lineHeight: 1.6,
            margin: '0 0 28px'
          }}>
            We believe your commute data belongs to you. This policy outlines how we responsibly collect, process, and protect your personal information across our ride-sharing platform.
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
              📅 <strong>Last Updated:</strong> January 2026
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: '8px' }}>
              ⏱️ <strong>Reading Time:</strong> ~4 min read
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: '8px' }}>
              🏢 <strong>Entity:</strong> BykSe
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
                transition: 'transform 0.2s ease, background 0.2s ease'
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
          MAIN CONTENT WITH STICKY SIDEBAR
          ========================================================================= */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '290px 1fr',
          gap: '40px',
          alignItems: 'start'
        }} className="legal-layout-grid">

          {/* Left Sticky Navigation Sidebar */}
          <aside style={{
            position: 'sticky',
            top: '90px',
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
              Table of Contents
            </h3>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {sections.map((sec) => {
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
                      fontSize: '14px',
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

            {/* Quick Contact Card */}
            <div style={{
              marginTop: '28px',
              padding: '18px 16px',
              background: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '6px' }}>🛡️</div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', margin: '0 0 4px', color: '#1E293B' }}>
                Privacy Concerns?
              </h4>
              <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 12px', lineHeight: 1.4 }}>
                Our Data Protection Officer is ready to assist you.
              </p>
              <a
                href="mailto:grievance@bykse.com"
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
                Email Grievance Team
              </a>
            </div>
          </aside>

          {/* Right Main Legal Clauses Content */}
          <main style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Important Notice Callout */}
            <div style={{
              background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
              border: '1px solid #FCD34D',
              borderRadius: '14px',
              padding: '20px 24px',
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start'
            }}>
              <span style={{ fontSize: '26px', lineHeight: 1 }}>💡</span>
              <div>
                <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '700', color: '#92400E' }}>
                  Our Promise: We Never Sell Your Personal Information
                </h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#B45309', lineHeight: 1.5 }}>
                  BykSe does not sell, rent, or trade your personal commuting patterns, contact coordinates, or live locations to third-party advertisers or data brokers. Your safety and trust come first.
                </p>
              </div>
            </div>

            {/* Section 1: Overview */}
            <section id="overview" style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '36px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px', background: '#F1F5F9', padding: '8px', borderRadius: '10px' }}>📋</span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  1. Overview & Scope
                </h2>
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#475569', margin: '0 0 14px' }}>
                BykSe (<strong>"we"</strong>, <strong>"our"</strong>, or <strong>"us"</strong>) is committed to protecting the privacy of riders, captains, and delivery enterprise users across our mobile applications, APIs, and online websites.
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#475569', margin: 0 }}>
                This Privacy Policy explains what information we collect when you request rides, partner as a Captain, access customer support, or interact with our digital platforms, and the strict controls implemented to safeguard that information under the Information Technology Act, 2000 and Digital Personal Data Protection (DPDP) Act.
              </p>
            </section>

            {/* Section 2: Information We Collect */}
            <section id="info-collect" style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '36px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <span style={{ fontSize: '24px', background: '#F1F5F9', padding: '8px', borderRadius: '10px' }}>📥</span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  2. Information We Collect
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginTop: '16px' }}>
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ fontSize: '20px', marginBottom: '8px' }}>👤</div>
                  <h4 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: '700', color: '#1E293B' }}>Personal Identifiers</h4>
                  <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                    Name, verified mobile number via OTP, email address, profile photo, emergency contacts, and saved home/work destination addresses.
                  </p>
                </div>

                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ fontSize: '20px', marginBottom: '8px' }}>📍</div>
                  <h4 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: '700', color: '#1E293B' }}>Real-time GPS Location</h4>
                  <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                    High-precision foreground and background GPS telematics data collected to dispatch nearby Captains, calculate routes, and trigger SOS crash safety alerts.
                  </p>
                </div>

                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ fontSize: '20px', marginBottom: '8px' }}>💳</div>
                  <h4 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: '700', color: '#1E293B' }}>Transactions & Payments</h4>
                  <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                    Trip invoices, transaction timestamps, payment method tokens (UPI VPA / Card tokens managed by RBI-authorized payment gateways, BykSe does not store raw CVV).
                  </p>
                </div>

                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ fontSize: '20px', marginBottom: '8px' }}>📱</div>
                  <h4 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: '700', color: '#1E293B' }}>Device & Telemetry</h4>
                  <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                    Device model, operating system version, unique device tokens for push notifications, IP addresses, network carrier, and crash diagnostics.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: How We Use Your Data */}
            <section id="how-we-use" style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '36px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px', background: '#F1F5F9', padding: '8px', borderRadius: '10px' }}>⚙️</span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  3. How We Use Your Information
                </h2>
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#475569', margin: '0 0 16px' }}>
                We use collected data solely for legitimate service operations, driver safety, and legal compliance:
              </p>
              <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14.5px', color: '#334155', lineHeight: 1.6, margin: 0 }}>
                <li><strong>Rapid Ride Matching:</strong> Pairing commuters with nearby verified Captains in under 3 minutes with optimal GPS route guidance.</li>
                <li><strong>Safety Shield & Incident Assistance:</strong> Enabling live trip sharing with loved ones, proactive route deviation alerts, and 24x7 Emergency SOS escalation.</li>
                <li><strong>Transparent Billing:</strong> Calculating accurate distance, toll charges, and dynamic upfront rates, and issuing digital tax receipts.</li>
                <li><strong>Fraud Detection:</strong> Preventing account hijacking, fraudulent GPS spoofing, and ensuring community safety guidelines are respected.</li>
                <li><strong>Customer Support:</strong> Resolving rider-captain disputes, lost item inquiries, and service tickets efficiently.</li>
              </ul>
            </section>

            {/* Section 4: Data Sharing & Third Parties */}
            <section id="data-sharing" style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '36px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px', background: '#F1F5F9', padding: '8px', borderRadius: '10px' }}>🤝</span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  4. Data Sharing & Third Parties
                </h2>
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#475569', margin: '0 0 14px' }}>
                We share personal details only in limited, strictly governed situations:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ padding: '14px 18px', background: '#F8FAFC', borderRadius: '10px', borderLeft: '4px solid #F9C935' }}>
                  <strong style={{ color: '#0F172A', fontSize: '14px' }}>Between Rider and Captain:</strong>
                  <p style={{ margin: '4px 0 0', fontSize: '13.5px', color: '#64748B' }}>
                    When a ride is accepted, the Captain sees your first name, pickup pin, and rating. Your actual telephone number is NEVER displayed.
                  </p>
                </div>
                <div style={{ padding: '14px 18px', background: '#F8FAFC', borderRadius: '10px', borderLeft: '4px solid #3B82F6' }}>
                  <strong style={{ color: '#0F172A', fontSize: '14px' }}>Verified Service Providers:</strong>
                  <p style={{ margin: '4px 0 0', fontSize: '13.5px', color: '#64748B' }}>
                    Cloud infrastructure hosting (AWS/Google Cloud), SMS OTP gateways, and RBI-regulated payment aggregators under strict NDA contracts.
                  </p>
                </div>
                <div style={{ padding: '14px 18px', background: '#F8FAFC', borderRadius: '10px', borderLeft: '4px solid #EF4444' }}>
                  <strong style={{ color: '#0F172A', fontSize: '14px' }}>Law Enforcement & Emergency Assistance:</strong>
                  <p style={{ margin: '4px 0 0', fontSize: '13.5px', color: '#64748B' }}>
                    In case of an SOS trigger or valid court order / official police inquiry to safeguard life and public safety.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: Data Security & Phone Masking */}
            <section id="security" style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '36px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px', background: '#F1F5F9', padding: '8px', borderRadius: '10px' }}>🛡️</span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  5. Data Security & Phone Masking
                </h2>
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#475569', margin: '0 0 16px' }}>
                BykSe adheres to bank-grade technical standards to ensure customer privacy remains uncompromised:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px', background: '#FAFAFA' }}>
                  <div style={{ fontWeight: '700', color: '#111827', fontSize: '15px', marginBottom: '6px' }}>🔒 End-to-End TLS 1.3</div>
                  <div style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
                    All communications between mobile apps, driver consoles, and central servers use 256-bit AES encryption.
                  </div>
                </div>
                <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px', background: '#FAFAFA' }}>
                  <div style={{ fontWeight: '700', color: '#111827', fontSize: '15px', marginBottom: '6px' }}>📞 Number Masking Proxy</div>
                  <div style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
                    In-app calls between riders and Captains use cloud virtual phone numbers so neither party sees the other's real phone number.
                  </div>
                </div>
                <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px', background: '#FAFAFA' }}>
                  <div style={{ fontWeight: '700', color: '#111827', fontSize: '15px', marginBottom: '6px' }}>🛡️ Strict Access Control</div>
                  <div style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
                    Role-based data access with audit logging prevents unauthorized employee visibility into ride logs or customer coordinates.
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: User Privacy Rights */}
            <section id="user-rights" style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '36px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px', background: '#F1F5F9', padding: '8px', borderRadius: '10px' }}>⚖️</span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  6. Your Privacy Rights & Controls
                </h2>
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#475569', margin: '0 0 14px' }}>
                You have full control over your personal data:
              </p>
              <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14.5px', color: '#334155', lineHeight: 1.6, margin: 0 }}>
                <li><strong>Access & Correction:</strong> Review and update your name, profile picture, and email directly inside the BykSe mobile app settings.</li>
                <li><strong>Location Permissions:</strong> Toggle location permissions via iOS or Android device settings anytime (note: disabling location prevents real-time ride booking).</li>
                <li><strong>Marketing Opt-Out:</strong> Unsubscribe from promotional SMS or email announcements via one-tap links in messages.</li>
                <li><strong>Right to Erasure / Deletion:</strong> Request permanent deletion of your BykSe account and associated telemetry data by submitting an in-app ticket.</li>
              </ul>
            </section>

            {/* Section 7: Data Retention */}
            <section id="retention" style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '36px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px', background: '#F1F5F9', padding: '8px', borderRadius: '10px' }}>🗄️</span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  7. Data Retention & Deletion
                </h2>
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#475569', margin: 0 }}>
                We retain user account information as long as your account remains active. After account deletion, trip telemetry and financial logs are securely archived or pseudonymized for statutory tax and audit periods required under Indian commercial and transportation laws, following which they are permanently purged.
              </p>
            </section>

            {/* Section 8: Grievance Redressal Officer */}
            <section id="grievance" style={{
              background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
              color: '#FFFFFF',
              borderRadius: '16px',
              padding: '36px',
              border: '1px solid #334155',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <span style={{ fontSize: '26px' }}>📬</span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#F9C935', margin: 0 }}>
                  8. Grievance Redressal Officer
                </h2>
              </div>
              <p style={{ fontSize: '14.5px', color: '#94A3B8', lineHeight: 1.6, margin: '0 0 20px' }}>
                In accordance with the Information Technology Act, 2000 and the DPDP rules, any questions, complaints, or grievance escalations regarding personal data processing can be directed to our designated officer:
              </p>

              <div style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '12px',
                padding: '20px 24px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                fontSize: '14px'
              }}>
                <div>
                  <div style={{ color: '#94A3B8', fontSize: '12px', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>Designation</div>
                  <div style={{ fontWeight: '600', color: '#FFFFFF' }}>Grievance & Data Protection Officer</div>
                </div>
                <div>
                  <div style={{ color: '#94A3B8', fontSize: '12px', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>Email Address</div>
                  <div>
                    <a href="mailto:grievance@bykse.com" style={{ color: '#F9C935', fontWeight: '700', textDecoration: 'none' }}>
                      grievance@bykse.com
                    </a>
                  </div>
                </div>
                <div>
                  <div style={{ color: '#94A3B8', fontSize: '12px', textTransform: 'uppercase', fontWeight: '700', marginBottom: '4px' }}>Response Timeline</div>
                  <div style={{ fontWeight: '600', color: '#FFFFFF' }}>Within 24-48 business hours</div>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
