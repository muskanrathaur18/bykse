import React, { useState } from 'react';

export default function SafetyPage({ onOpenDownload }) {
  const [activeTab, setActiveTab] = useState('overviews'); // 'overviews' | 'customers' | 'captains'
  const [openAccordion, setOpenAccordion] = useState(null); // index of open accordion item in Customers tab
  const [selectedModal, setSelectedModal] = useState(null); // 'customer' | 'captain' | null

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const verificationSteps = [
    {
      title: 'Hiring Process',
      detail: 'Mandatory verification of valid driving license, vehicle commercial registration, minimum age requirements, and national identity checks before onboarding.'
    },
    {
      title: 'Verification through third party vendor',
      detail: 'Certified third-party agency background checks including criminal record scrutiny, court database cross-referencing, and residential address validation.'
    },
    {
      title: 'Captain Training Process',
      detail: 'Comprehensive behavioral workshops, defensive two-wheeler driving modules, passenger etiquette, and emergency escalation training.'
    },
    {
      title: 'Captain Monitoring Process',
      detail: 'Continuous GPS telematics monitoring, real-time speed checking, harsh braking detection, and ongoing rider rating reviews.'
    },
    {
      title: 'Captain Retention Process',
      detail: 'Safety incentive rewards, regular re-verification audits every six months, and strict zero-tolerance deplatforming for misconduct.'
    }
  ];

  return (
    <div className="rapido-safety-page" style={{ background: '#ffffff', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* =========================================================================
          TOP SAFETY SUB-NAV TABS (Overviews | Customers | Captains)
          Exact screenshot match: clean natural text sitting directly on white background
          ========================================================================= */}
      <section style={{ padding: '24px 24px 16px', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '36px',
            paddingLeft: '4px'
          }}>
            <button
              onClick={() => handleTabClick('overviews')}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                fontSize: '18px',
                fontWeight: activeTab === 'overviews' ? '800' : '400',
                color: activeTab === 'overviews' ? '#111827' : '#4b5563',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit'
              }}
            >
              Overviews
            </button>
            <button
              onClick={() => handleTabClick('customers')}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                fontSize: '18px',
                fontWeight: activeTab === 'customers' ? '800' : '400',
                color: activeTab === 'customers' ? '#111827' : '#4b5563',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit'
              }}
            >
              Customers
            </button>
            <button
              onClick={() => handleTabClick('captains')}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                fontSize: '18px',
                fontWeight: activeTab === 'captains' ? '800' : '400',
                color: activeTab === 'captains' ? '#111827' : '#4b5563',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit'
              }}
            >
              Captains
            </button>
          </div>
        </div>
      </section>


      {/* #########################################################################
          TAB 1: CUSTOMERS SAFETY PAGE (User's Exact 5 Screenshot Design - 100% Coded!)
          ######################################################################### */}
      {activeTab === 'customers' && (
        <div className="tab-customers-safety-view">
          
          {/* =====================================================================
              1. CUSTOMERS SAFETY HERO (Image 1 - Fully Coded)
              ===================================================================== */}
          <section style={{ padding: '24px 24px 60px', background: '#ffffff', borderBottom: '1px solid #f6f6f6' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '48px', flexWrap: 'wrap' }}>
              
              {/* Left Headline & Text */}
              <div style={{ flex: '1 1 500px', maxWidth: '540px' }}>
                <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#111827', margin: '0 0 2px', lineHeight: '1.14', letterSpacing: '-0.5px' }}>
                  Customers
                </h1>
                <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#111827', margin: '0 0 24px', lineHeight: '1.14', letterSpacing: '-0.5px' }}>
                  Safety
                </h2>
                <p style={{ fontSize: '15.5px', color: '#4b5563', lineHeight: '1.65', margin: 0, maxWidth: '480px' }}>
                  By leveraging the latest safety technologies and onboarding/ training process for our Captains. Every ride is tracked in real-time by BykSe, backed by granular live telemetry and precision route tracking.
                </p>
              </div>

              {/* Right Portrait with Offset Yellow Accent Card (Exact Image 1 Match) */}
              <div style={{ flex: '1 1 420px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '380px', height: '390px' }}>
                  
                  {/* Yellow Offset Rounded Rectangle Card Behind */}
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '-12px',
                    width: '330px',
                    height: '360px',
                    background: '#F9C935',
                    borderRadius: '24px',
                    zIndex: 1
                  }} />

                  {/* Customer Photo Card */}
                  <div style={{
                    position: 'relative',
                    width: '340px',
                    height: '370px',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
                    zIndex: 2,
                    backgroundColor: '#f3f4f6'
                  }}>
                    <img 
                      src="/images/customer-photo.jpg" 
                      alt="Customer checking BykSe safety on phone" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={(e) => { e.target.onerror = null; e.target.src = '/images/customer-photo.jpg'; }}
                    />
                  </div>

                </div>
              </div>

            </div>
          </section>


          {/* =====================================================================
              2. CAPTAIN VERIFICATION WITH ACCORDION (Image 2 - Fully Coded)
              ===================================================================== */}
          <section style={{ padding: '72px 24px 80px', background: '#ffffff', borderBottom: '1px solid #f6f6f6' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              
              <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#111827', margin: '0 0 44px', letterSpacing: '-0.5px' }}>
                Captain Verification
              </h2>

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '56px', flexWrap: 'wrap' }}>
                
                {/* Left Captain Verified Badge Graphic */}
                <div style={{ flex: '1 1 380px', maxWidth: '420px', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ 
                    position: 'relative', 
                    width: '100%', 
                    maxWidth: '360px', 
                    height: '420px',
                    borderRadius: '28px',
                    overflow: 'hidden',
                    boxShadow: '0 16px 36px rgba(0, 0, 0, 0.1)',
                    background: '#F9FAFB'
                  }}>
                    <img 
                      src="/images/test_rider3.jpg" 
                      alt="BykSe Verified Captain" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '18px',
                      right: '18px',
                      background: '#10B981',
                      borderRadius: '50%',
                      width: '46px',
                      height: '46px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
                      border: '3px solid #ffffff'
                    }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div style={{
                      position: 'absolute',
                      bottom: '18px',
                      left: '18px',
                      right: '18px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: '16px',
                      padding: '12px 16px',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', flexShrink: 0 }}></div>
                      <span style={{ fontSize: '13px', fontWeight: '800', color: '#111827' }}>100% Background Verified Captain</span>
                    </div>
                  </div>
                </div>

                {/* Right Verification Details & Interactive Accordion */}
                <div style={{ flex: '1 1 520px', maxWidth: '620px' }}>
                  <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: '1.65', margin: '0 0 32px' }}>
                    In line with our Safety First philosophy, we have been conducting a stringent Four-step Background Verification of every Captain on our platform since inception.
                  </p>

                  {/* Accordion List */}
                  <div style={{ borderTop: '1px solid #E5E7EB' }}>
                    {verificationSteps.map((step, idx) => {
                      const isOpen = openAccordion === idx;
                      return (
                        <div key={idx} style={{ borderBottom: '1px solid #E5E7EB' }}>
                          <button
                            onClick={() => toggleAccordion(idx)}
                            style={{
                              width: '100%',
                              padding: '20px 0',
                              background: 'none',
                              border: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                              textAlign: 'left'
                            }}
                          >
                            <span style={{ fontSize: '17px', fontWeight: '700', color: '#111827' }}>
                              {step.title}
                            </span>
                            <span style={{ 
                              fontSize: '18px', 
                              fontWeight: '700', 
                              color: '#111827',
                              transition: 'transform 0.2s ease',
                              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                            }}>
                              ↓
                            </span>
                          </button>
                          
                          {isOpen && (
                            <div style={{ padding: '0 0 20px', color: '#6b7280', fontSize: '14.5px', lineHeight: '1.6' }}>
                              {step.detail}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                </div>

              </div>

            </div>
          </section>


          {/* =====================================================================
              3. APP SAFETY FEATURES (Images 3 & 4 - Yellow Background - Fully Coded)
              ===================================================================== */}
          <section style={{ padding: '40px 24px 44px', background: '#F9C935' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              
              <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#111827', margin: '0 0 24px', letterSpacing: '-0.5px' }}>
                App Safety Features
              </h2>

              {/* 4 Feature Items Grid (Image 3) */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '24px 32px',
                marginBottom: '24px'
              }}>

                {/* 1. Trip Sharing */}
                <div>
                  <div style={{ width: '38px', height: '38px', marginBottom: '8px', color: '#111827' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#111827', margin: '0 0 6px' }}>
                    Trip Sharing
                  </h3>
                  <p style={{ fontSize: '14px', color: '#111827', lineHeight: '1.5', margin: 0, opacity: 0.9 }}>
                    Riders can share their trip status with their respective emergency contacts on the BykSe app right after their ride starts.
                  </p>
                </div>

                {/* 2. Information Masking */}
                <div>
                  <div style={{ width: '38px', height: '38px', marginBottom: '8px', color: '#111827' }}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect>
                      <line x1="12" y1="18" x2="12.01" y2="18"></line>
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#111827', margin: '0 0 6px' }}>
                    Information Masking
                  </h3>
                  <p style={{ fontSize: '14px', color: '#111827', lineHeight: '1.5', margin: 0, opacity: 0.9 }}>
                    Every woman rider’s contact number is masked to protect their privacy and their interaction with the Captain happens only through app encryption.
                  </p>
                </div>

                {/* 3. SOS Button */}
                <div>
                  <div style={{ width: '38px', height: '38px', marginBottom: '8px', color: '#111827' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1s-1-.45-1-1V3c0-.55.45-1 1-1zm6.36 3.64c.39.39.39 1.02 0 1.41l-1.41 1.41c-.39.39-1.02.39-1.41 0s-.39-1.02 0-1.41l1.41-1.41c.39-.39 1.02-.39 1.41 0zM5.64 7.05c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41l1.41 1.41c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41L5.64 7.05zM12 7c3.31 0 6 2.69 6 6v4H6v-4c0-3.31 2.69-6 6-6zm-8 12h16c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1z"/>
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#111827', margin: '0 0 6px' }}>
                    SOS Button
                  </h3>
                  <p style={{ fontSize: '14px', color: '#111827', lineHeight: '1.5', margin: 0, opacity: 0.9 }}>
                    The app has an SOS button which is a 24*7 in-app support feature. This helps riders instantly alert the emergency response team.
                  </p>
                </div>

                {/* 4. Captain Information */}
                <div>
                  <div style={{ width: '38px', height: '38px', marginBottom: '8px', color: '#111827' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      <rect x="15" y="6" width="6" height="2" rx="1" fill="currentColor"/>
                      <rect x="15" y="10" width="6" height="2" rx="1" fill="currentColor"/>
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#111827', margin: '0 0 6px' }}>
                    Captain Information
                  </h3>
                  <p style={{ fontSize: '14px', color: '#111827', lineHeight: '1.5', margin: 0, opacity: 0.9 }}>
                    Once the ride is booked, the following details of the Captain are accessible: photo, vehicle registration number, and verified rating.
                  </p>
                </div>

              </div>

              {/* 5. On Ground Support (Image 4 - Same Yellow Section) */}
              <div style={{ maxWidth: '640px', paddingTop: '14px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                <div style={{ width: '38px', height: '38px', marginBottom: '8px', color: '#111827' }}>
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#111827', margin: '0 0 6px' }}>
                  On ground support
                </h3>
                <p style={{ fontSize: '14px', color: '#111827', lineHeight: '1.5', margin: 0, opacity: 0.9 }}>
                  In line with our Safety First philosophy, we have been conducting a stringent Four-step Background Verification of every Captain on our platform since inception. Dedicated patrol response vehicles stand by in city corridors.
                </p>
              </div>

            </div>
          </section>


          {/* =====================================================================
              4. WAY FORWARD ON SAFETY (Image 5 - Fully Coded)
              ===================================================================== */}
          <section style={{ padding: '72px 24px 80px', background: '#ffffff' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              
              <div style={{ marginBottom: '44px', maxWidth: '780px' }}>
                <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#111827', margin: '0 0 14px', letterSpacing: '-0.5px' }}>
                  Way forward on Safety
                </h2>
                <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: '1.65', margin: '0 0 12px' }}>
                  To further substantiate our commitment to Safety First towards customers &amp; captains, we will be incorporating new features on our platform very soon.
                </p>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#111827', display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                  Know More ↓
                </div>
              </div>

              {/* Two Feature Columns (Image 5) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px 40px' }}>
                
                {/* 1. Ride Completion Check */}
                <div>
                  <div style={{ 
                    width: '56px', 
                    height: '56px', 
                    borderRadius: '50%', 
                    background: '#111827', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '20px',
                    color: '#ffffff'
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#111827', margin: '0 0 12px' }}>
                    Ride Completion Check
                  </h3>
                  <p style={{ fontSize: '14.5px', color: '#4b5563', lineHeight: '1.65', margin: 0, maxWidth: '440px' }}>
                    Anyone who takes a ride between 10 pm and 6 am will be contacted by BykSe Safety Support for a check-in after the ride is completed.
                  </p>
                </div>

                {/* 2. Proactive Check-In */}
                <div>
                  <div style={{ 
                    width: '56px', 
                    height: '56px', 
                    borderRadius: '50%', 
                    background: '#111827', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '20px',
                    color: '#ffffff'
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#111827', margin: '0 0 12px' }}>
                    Proactive Check-In
                  </h3>
                  <p style={{ fontSize: '14.5px', color: '#4b5563', lineHeight: '1.65', margin: 0, maxWidth: '440px' }}>
                    Every rider will be alerted on the system and called by BykSe Safety Command Desk when there is any unusual activity or deviation from the set protocol.
                  </p>
                </div>

              </div>

            </div>
          </section>

        </div>
      )}


      {/* #########################################################################
          TAB 2: CAPTAINS SAFETY PAGE (User's Exact 2 Screenshot Design - 100% Coded!)
          ######################################################################### */}
      {activeTab === 'captains' && (
        <div className="tab-captains-safety-view">
          
          {/* =====================================================================
              1. CAPTAINS SAFETY HERO (Screenshot 1 Match - 100% Real Code)
              ===================================================================== */}
          <section style={{ padding: '24px 24px 60px', background: '#ffffff', borderBottom: '1px solid #f6f6f6' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '48px', flexWrap: 'wrap' }}>
              
              {/* Left Headline & Text */}
              <div style={{ flex: '1 1 500px', maxWidth: '540px' }}>
                <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#111827', margin: '0 0 2px', lineHeight: '1.14', letterSpacing: '-0.5px' }}>
                  Captains
                </h1>
                <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#111827', margin: '0 0 24px', lineHeight: '1.14', letterSpacing: '-0.5px' }}>
                  Safety
                </h2>
                <p style={{ fontSize: '15.5px', color: '#4b5563', lineHeight: '1.65', margin: 0, maxWidth: '480px' }}>
                  All rides are insured. Accidental coverage and medical benefits covered up to Rs 5 Lakh for Captain &amp; family.
                </p>
              </div>

              {/* Right Captain Bike Rider Photo with Offset Yellow Accent Card (Exact Image 1 Match) */}
              <div style={{ flex: '1 1 420px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '380px', height: '390px' }}>
                  
                  {/* Yellow Offset Rounded Rectangle Card Behind */}
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '-12px',
                    width: '330px',
                    height: '360px',
                    background: '#F9C935',
                    borderRadius: '24px',
                    zIndex: 1
                  }} />

                  {/* Captain Photo Card in Front */}
                  <div style={{
                    position: 'relative',
                    width: '340px',
                    height: '370px',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
                    zIndex: 2,
                    backgroundColor: '#f3f4f6'
                  }}>
                    <img 
                      src="/images/bykse-captain-hero.jpg" 
                      alt="BykSe Captain riding bike safely with helmet" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                      onError={(e) => { e.target.onerror = null; e.target.src = '/images/bykse-captain-hero.jpg'; }}
                    />
                  </div>

                </div>
              </div>

            </div>
          </section>


          {/* =====================================================================
              2. MEASURES TO ENSURE THE WELL-BEING... (Screenshot 2 Match - Yellow Background - 100% Coded)
              ===================================================================== */}
          <section style={{ padding: '40px 24px 44px', background: '#F9C935' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                gap: '28px 40px'
              }}>

                {/* 1. Measures to ensure the well-being (Top-Left) */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', marginBottom: '10px', color: '#111827' }}>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      <path d="M12 8v4"></path>
                      <path d="M12 16h.01"></path>
                    </svg>
                  </div>
                  <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#111827', margin: 0, lineHeight: '1.25', letterSpacing: '-0.5px' }}>
                    Measures to ensure the well-being of both, our Captains and Customers
                  </h2>
                </div>

                {/* 2. Insurance (Top-Right) */}
                <div>
                  <div style={{ width: '40px', height: '40px', marginBottom: '10px', color: '#111827' }}>
                    {/* Classic Umbrella SVG matching screenshot */}
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2a10 10 0 0 0-10 10h9v7a1.5 1.5 0 0 1-3 0 .75.75 0 0 0-1.5 0 3 3 0 0 0 6 0v-7h9A10 10 0 0 0 12 2z"/>
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111827', margin: '0 0 6px' }}>
                    Insurance
                  </h3>
                  <p style={{ fontSize: '14px', color: '#111827', lineHeight: '1.5', margin: 0, opacity: 0.9 }}>
                    Insurance can be claimed for any accident that occurs during the ride covering OPD treatment, hospitalisation, and accidental benefit with a maximum sum insured of ₹5 Lakh. It can be claimed as soon as the ride is completed or reported.
                  </p>
                </div>

                {/* 3. 24 x 7 Customer Support (Bottom-Left) */}
                <div>
                  <div style={{ width: '40px', height: '40px', marginBottom: '10px', color: '#111827' }}>
                    {/* Headset support agent icon matching screenshot */}
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="11" r="3.5" />
                      <path d="M12 2C7.03 2 3 6.03 3 11v3a3 3 0 0 0 3 3h1v-6H4.5v-1c0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5v1H17v6h1a3 3 0 0 0 3-3v-3c0-4.97-4.03-9-9-9z" />
                      <path d="M5 21v-1c0-2.2 3.13-3.5 7-3.5s7 1.3 7 3.5v1H5z" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111827', margin: '0 0 6px' }}>
                    24 x 7 Customer Support
                  </h3>
                  <p style={{ fontSize: '14px', color: '#111827', lineHeight: '1.5', margin: 0, opacity: 0.9 }}>
                    Both our Captains and customers can report any kind of issues to BykSe through the 24*7 support feature on the app post &amp; during the ride.
                  </p>
                </div>

                {/* 4. Two-way Rating System (Bottom-Right) */}
                <div>
                  <div style={{ width: '40px', height: '40px', marginBottom: '10px' }}>
                    {/* Black speech bubble with star cutout matching screenshot */}
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                      <path d="M3 3h18v14h-6.5l-2.5 3.5-2.5-3.5H3V3z" fill="#111827" />
                      <polygon points="12,6.5 13.5,9.8 17,10.2 14.4,12.5 15.2,16 12,14.1 8.8,16 9.6,12.5 7,10.2 10.5,9.8" fill="#F9C935" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111827', margin: '0 0 6px' }}>
                    Two-way Rating System
                  </h3>
                  <p style={{ fontSize: '14px', color: '#111827', lineHeight: '1.5', margin: 0, opacity: 0.9 }}>
                    Post the ride, both parties can give a rating to each other and any rating below 3 is flagged from BykSe’s end. BykSe reaches out to them in 10 minutes to address their concern. The Captains/riders rated poorly are delisted.
                  </p>
                </div>

              </div>

            </div>
          </section>


          {/* =====================================================================
              3. CAPTAIN ON-ROAD PROTECTION & WELFARE (Complementary Section)
              ===================================================================== */}
          <section style={{ padding: '72px 24px 80px', background: '#ffffff', borderBottom: '1px solid #f6f6f6' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              
              <div style={{ marginBottom: '44px', maxWidth: '780px' }}>
                <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#111827', margin: '0 0 14px', letterSpacing: '-0.5px' }}>
                  Captain Safety &amp; On-Road Protection
                </h2>
                <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: '1.65', margin: 0 }}>
                  We empower our Captain community with dedicated roadside support, fair resolution, and transparent earnings protection on every ride.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
                <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '20px', padding: '28px' }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>🔧</div>
                  <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#111827', margin: '0 0 8px' }}>
                    24x7 Roadside Assistance
                  </h3>
                  <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                    Instant help for flat tires, mechanical breakdowns, and fuel emergencies across all operational cities.
                  </p>
                </div>

                <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '20px', padding: '28px' }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>⚖️</div>
                  <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#111827', margin: '0 0 8px' }}>
                    Fair Appeal Resolution
                  </h3>
                  <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                    Every rider grievance is verified with trip telematics so captains are never unfairly penalized.
                  </p>
                </div>

                <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '20px', padding: '28px' }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>🏥</div>
                  <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#111827', margin: '0 0 8px' }}>
                    Hospitalization &amp; OPD Cover
                  </h3>
                  <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                    Direct cashless tie-ups with partner hospitals for immediate treatment without delay.
                  </p>
                </div>
              </div>

            </div>
          </section>

        </div>
      )}


      {/* #########################################################################
          TAB 3: OVERVIEWS SAFETY PAGE
          ######################################################################### */}
      {activeTab === 'overviews' && (
        <div className="tab-overviews-safety-view">
          
          {/* =========================================================================
              SECTION 1: HERO SECTION (Exact Image 1 Match)
              ========================================================================= */}
          <section style={{ padding: '24px 24px 28px', background: '#ffffff', borderBottom: '1px solid #f6f6f6' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  gap: '24px', 
                  flexWrap: 'wrap',
                  textAlign: 'left'
                }}
              >
                <div style={{ flex: '1 1 500px', maxWidth: '560px' }}>
                  <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#111827', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
                    Safety for all
                  </h1>
                  <p style={{ fontSize: '15.5px', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                    At BykSe, the safety and well-being of both our riders and Captains is our topmost priority. We are constantly in pursuit of enhancing our safety measures to ensure every BykSe ride is a secure, pleasant, and comfortable experience.
                  </p>
                </div>
                <div style={{ flex: '1 1 340px', textAlign: 'center' }}>
                  <img 
                    src="/images/captain_home_safety.png" 
                    alt="Safety Shield" 
                    style={{ width: '100%', maxWidth: '260px', borderRadius: '16px' }} 
                  />
                </div>
              </div>
            </div>
          </section>


          {/* =========================================================================
              SECTION 2: COVERS EVERYONE (Modern Attractive Cards Design)
              ========================================================================= */}
          <section id="section-covers-everyone" style={{ padding: '44px 24px 52px', background: '#ffffff', scrollMarginTop: '140px' }}>
            <div style={{ maxWidth: '980px', margin: '0 auto' }}>
              
              <div style={{ marginBottom: '28px', textAlign: 'left' }}>
                <h2 style={{ 
                  fontSize: '34px', 
                  fontWeight: '800', 
                  color: '#111827', 
                  margin: '0 0 6px', 
                  letterSpacing: '-0.5px' 
                }}>
                  Covers Everyone
                </h2>
                <p style={{ fontSize: '15px', color: '#6b7280', margin: 0, maxWidth: '580px' }}>
                  Comprehensive safety measures thoughtfully crafted for both commuters and our ride partners.
                </p>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'stretch',
                gap: '30px',
                flexWrap: 'wrap'
              }}>
                
                {/* Card 1: For Customers (Click switches to Customers view!) */}
                <div 
                  className="safety-modern-card"
                  style={{
                    width: '100%',
                    maxWidth: '380px',
                    background: '#ffffff',
                    borderRadius: '24px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleTabClick('customers')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(249, 201, 53, 0.22)';
                    e.currentTarget.style.borderColor = '#F9C935';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.borderColor = '#E5E7EB';
                  }}
                >
                  <div style={{ position: 'relative', height: '210px', overflow: 'hidden', background: '#F3F4F6' }}>
                    <img 
                      src="/images/customer-photo.jpg" 
                      alt="Customer using BykSe safely" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={(e) => { e.target.onerror = null; e.target.src = '/images/customer-photo.jpg'; }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      background: 'rgba(255, 255, 255, 0.94)',
                      backdropFilter: 'blur(8px)',
                      color: '#111827',
                      fontSize: '11px',
                      fontWeight: '800',
                      padding: '5px 12px',
                      borderRadius: '9999px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                      PASSENGER SHIELD
                    </div>
                  </div>

                  <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F59E0B' }}></span>
                        <span style={{ fontSize: '11px', fontWeight: '800', color: '#B45309', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                          Real-Time GPS Tracking
                        </span>
                      </div>

                      <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#111827', margin: '0 0 10px' }}>
                        For Customers
                      </h3>

                      <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.6', margin: '0 0 18px' }}>
                        Every ride is tracked in real-time by BykSe, backed by granular live telemetry and precision route tracking.
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '22px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#374151', fontWeight: '600' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Granular Latitudinal GPS Tracking
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#374151', fontWeight: '600' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          100% Encrypted Number Masking
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#374151', fontWeight: '600' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          1-Tap SOS Emergency Response
                        </div>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '16px',
                      borderTop: '1px solid #F3F4F6'
                    }}>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#111827' }}>
                        View Customer Safety Page
                      </span>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: '#111827',
                        color: '#F9C935',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: '800'
                      }}>
                        →
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2: For Captains */}
                <div 
                  className="safety-modern-card"
                  style={{
                    width: '100%',
                    maxWidth: '380px',
                    background: '#ffffff',
                    borderRadius: '24px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleTabClick('captains')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(249, 201, 53, 0.22)';
                    e.currentTarget.style.borderColor = '#F9C935';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.borderColor = '#E5E7EB';
                  }}
                >
                  <div style={{ position: 'relative', height: '210px', overflow: 'hidden', background: '#F3F4F6' }}>
                    <img 
                      src="/images/bykse-captain-hero.jpg" 
                      alt="Captain riding bike safely" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                      onError={(e) => { e.target.onerror = null; e.target.src = '/images/bykse-captain-hero.jpg'; }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      background: 'rgba(255, 255, 255, 0.94)',
                      backdropFilter: 'blur(8px)',
                      color: '#111827',
                      fontSize: '11px',
                      fontWeight: '800',
                      padding: '5px 12px',
                      borderRadius: '9999px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                      CAPTAIN WELFARE
                    </div>
                  </div>

                  <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F59E0B' }}></span>
                        <span style={{ fontSize: '11px', fontWeight: '800', color: '#B45309', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                           Welfare & On-Road Care
                        </span>
                      </div>

                      <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#111827', margin: '0 0 10px' }}>
                        For Captains
                      </h3>

                      <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.6', margin: '0 0 18px' }}>
                        From hiring to training to monitoring to ongoing checks, we take all necessary steps to ensure our Captains safety.
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '22px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#374151', fontWeight: '600' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Multi-Tier Verified Background Checks
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#374151', fontWeight: '600' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          ₹5 Lakh Accidental & Family Coverage
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#374151', fontWeight: '600' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          24x7 Breakdown Roadside Assistance
                        </div>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '16px',
                      borderTop: '1px solid #F3F4F6'
                    }}>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#111827' }}>
                        View Captain Safety Page
                      </span>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: '#111827',
                        color: '#F9C935',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: '800'
                      }}>
                        →
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </section>


          {/* =========================================================================
              SECTION 3: MEASURES TO ENSURE WELL-BEING
              ========================================================================= */}
          <section style={{ 
            padding: '28px 24px 32px', 
            background: 'linear-gradient(180deg, #FFFDF5 0%, #FFFBEA 50%, #FFF8D6 100%)',
            position: 'relative',
            overflow: 'hidden',
            borderTop: '1px solid #FDF0B5',
            borderBottom: '1px solid #FDF0B5'
          }}>
            <div style={{ maxWidth: '1180px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '14px', 
                marginBottom: '18px',
                maxWidth: '820px'
              }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  minWidth: '42px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #F9C935 0%, #EAB308 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(249, 201, 53, 0.35)'
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="M12 8v4"></path>
                    <path d="M12 16h.01"></path>
                  </svg>
                </div>

                <div>
                  <h2 style={{ 
                    fontSize: '24px', 
                    fontWeight: '900', 
                    color: '#111827', 
                    margin: 0, 
                    lineHeight: '1.25',
                    letterSpacing: '-0.4px'
                  }}>
                    Measures to ensure the well-being of both, our Captains and Customers
                  </h2>
                </div>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '16px' 
              }}>

                {/* Feature 1: Insurance */}
                <div 
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '18px 20px',
                    border: '1px solid rgba(249, 201, 53, 0.4)',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: '#FEF3C7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#B45309',
                        boxShadow: '0 3px 8px rgba(245, 158, 11, 0.15)'
                      }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                          <line x1="12" y1="8" x2="12" y2="14"></line>
                          <line x1="9" y1="11" x2="15" y2="11"></line>
                        </svg>
                      </div>
                      <span style={{ 
                        background: '#FEF3C7', 
                        color: '#92400E', 
                        fontSize: '11px', 
                        fontWeight: '800', 
                        padding: '4px 8px', 
                        borderRadius: '8px' 
                      }}>
                        Up to ₹5 Lakh
                      </span>
                    </div>

                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827', margin: '0 0 6px' }}>
                      Insurance
                    </h3>
                    <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.5', margin: 0 }}>
                      Insurance can be claimed for any accident that occurs during the ride covering OPD treatment, hospitalisation, and accidental benefit with a maximum sum insured of ₹5 Lakh.
                    </p>
                  </div>
                </div>

                {/* Feature 2: 24 x 7 Customer Support */}
                <div 
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '18px 20px',
                    border: '1px solid rgba(249, 201, 53, 0.4)',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: '#DEF7EC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#03543F',
                        boxShadow: '0 3px 8px rgba(16, 185, 129, 0.15)'
                      }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          <path d="M14 2a8 8 0 0 1 8 8"></path>
                          <path d="M14 6a4 4 0 0 1 4 4"></path>
                        </svg>
                      </div>
                      <span style={{ 
                        background: '#DEF7EC', 
                        color: '#03543F', 
                        fontSize: '11px', 
                        fontWeight: '800', 
                        padding: '4px 8px', 
                        borderRadius: '8px'
                      }}>
                        Always Live
                      </span>
                    </div>

                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827', margin: '0 0 6px' }}>
                      24 x 7 Customer Support
                    </h3>
                    <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.5', margin: 0 }}>
                      Both our Captains and customers can report any kind of issues to BykSe through the 24*7 support feature on the app post &amp; during the ride.
                    </p>
                  </div>
                </div>

                {/* Feature 3: Two-way Rating System */}
                <div 
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '18px 20px',
                    border: '1px solid rgba(249, 201, 53, 0.4)',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: '#EFF6FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#1D4ED8',
                        boxShadow: '0 3px 8px rgba(37, 99, 235, 0.15)'
                      }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m16 18 6-6-6-6"></path>
                          <path d="M8 6l-6 6 6 6"></path>
                          <circle cx="12" cy="12" r="3" fill="#3B82F6"></circle>
                        </svg>
                      </div>
                      <span style={{ 
                        background: '#E1EFFE', 
                        color: '#1E429F', 
                        fontSize: '11px', 
                        fontWeight: '800', 
                        padding: '4px 8px', 
                        borderRadius: '8px' 
                      }}>
                        10-Min Action
                      </span>
                    </div>

                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827', margin: '0 0 6px' }}>
                      Two-way Rating System
                    </h3>
                    <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.5', margin: 0 }}>
                      Post the ride, both parties can give a rating to each other and any rating below 3 is flagged from BykSe’s end with immediate 10-minute outreach.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </section>


          {/* =========================================================================
              SECTION 4: WAY FORWARD ON SAFETY (Overview View)
              ========================================================================= */}
          <section style={{ padding: '40px 24px 46px', background: '#ffffff', borderBottom: '1px solid #f1f3f5' }}>
            <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
              
              <div style={{ marginBottom: '24px', maxWidth: '780px' }}>
                <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#111827', margin: '0 0 6px', letterSpacing: '-0.4px' }}>
                  Way forward on Safety
                </h2>
                <p style={{ fontSize: '14.5px', color: '#4b5563', lineHeight: '1.5', margin: 0 }}>
                  To further substantiate our commitment to Safety First towards customers &amp; captains, we are continually rolling out smart technology advancements.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div style={{ background: '#F9FAFB', borderRadius: '16px', padding: '18px 18px', border: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>🪖</div>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111827', margin: '0 0 4px' }}>AI Helmet Verification</h3>
                  <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.5', margin: 0 }}>Real-time facial &amp; helmet AI scanning before Captains can accept any commuter trip.</p>
                </div>
                <div style={{ background: '#F9FAFB', borderRadius: '16px', padding: '18px 18px', border: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>🌙</div>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111827', margin: '0 0 4px' }}>Night Guardian Protocol</h3>
                  <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.5', margin: 0 }}>Special routing scrutiny and live audio checks for rides taken between 10 PM and 6 AM.</p>
                </div>
                <div style={{ background: '#F9FAFB', borderRadius: '16px', padding: '18px 18px', border: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚡</div>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111827', margin: '0 0 4px' }}>IoT Speed &amp; Telematics</h3>
                  <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.5', margin: 0 }}>Sensor monitoring for harsh braking and over-speeding with automatic de-prioritization.</p>
                </div>
                <div style={{ background: '#F9FAFB', borderRadius: '16px', padding: '18px 18px', border: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔒</div>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111827', margin: '0 0 4px' }}>End-to-End Privacy</h3>
                  <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.5', margin: 0 }}>Encrypted masked calling so neither rider nor Captain ever sees personal contact info.</p>
                </div>
              </div>

            </div>
          </section>

        </div>
      )}


      {/* =========================================================================
          COMMON SECTION: 24X7 EMERGENCY SOS CALLOUT BANNER (Appears on all views)
          ========================================================================= */}
      <section style={{ padding: '64px 24px', background: '#111827', color: '#ffffff' }}>
        <div style={{ 
          maxWidth: '1180px', 
          margin: '0 auto', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          gap: '36px',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: '1 1 560px' }}>
            <span style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#EF4444', 
              color: '#ffffff', 
              fontSize: '12px', 
              fontWeight: '800', 
              padding: '5px 12px', 
              borderRadius: '9999px',
              marginBottom: '14px',
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffffff' }}></span>
              Emergency Response Ready
            </span>
            <h2 style={{ fontSize: '34px', fontWeight: '800', color: '#ffffff', margin: '0 0 10px', letterSpacing: '-0.5px' }}>
              Your Safety is Non-Negotiable
            </h2>
            <p style={{ fontSize: '15.5px', color: '#9CA3AF', lineHeight: '1.6', margin: 0, maxWidth: '600px' }}>
              Every ride is backed by BykSe's 24/7 dedicated Safety Command Center. Access one-tap SOS assistance and live trip sharing directly in the app.
            </p>
          </div>

          <div>
            <button
              onClick={onOpenDownload}
              style={{
                backgroundColor: '#F9C935',
                color: '#111827',
                border: 'none',
                borderRadius: '9999px',
                padding: '14px 34px',
                fontSize: '15px',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(249, 201, 53, 0.3)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(249, 201, 53, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(249, 201, 53, 0.3)';
              }}
            >
              Ride Safely on BykSe
            </button>
          </div>
        </div>
      </section>


      {/* =========================================================================
          INTERACTIVE "KNOW MORE" MODAL (FOR CAPTAIN WELFARE)
          ========================================================================= */}
      {selectedModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(5px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setSelectedModal(null)}
        >
          <div 
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              maxWidth: '560px',
              width: '100%',
              padding: '36px',
              position: 'relative',
              boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedModal(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#f3f4f6',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4b5563'
              }}
            >
              ✕
            </button>

            <div>
              <span style={{ background: '#FFF3C4', color: '#855E00', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' }}>
                Captain Welfare
              </span>
              <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#111827', margin: '12px 0 16px' }}>
                Safety Measures for Captains
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#4b5563', lineHeight: '1.8', fontSize: '15px' }}>
                <li><strong>Strict Identity Verification:</strong> Multi-point background, license, and fitness checks prevent fraudulent riders and bad actors.</li>
                <li><strong>24x7 Roadside Assistance:</strong> Instant mechanical, puncture, or towing help anywhere across 400+ operational cities.</li>
                <li><strong>₹5 Lakh Accident Cover:</strong> Complete family medical and injury protection covering hospitalization and OPD benefits.</li>
                <li><strong>Zero-Tolerance Misconduct:</strong> Instant suspension and legal support against abusive or non-paying commuters.</li>
                <li><strong>Defensive Driving Modules:</strong> Regular interactive skill-building safety sessions hosted in local centers.</li>
              </ul>
            </div>

            <button
              onClick={() => setSelectedModal(null)}
              style={{
                width: '100%',
                backgroundColor: '#111827',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                padding: '14px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                marginTop: '24px'
              }}
            >
              Got it, close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
