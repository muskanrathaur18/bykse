import React, { useState } from 'react';

// Configure your Google Sheets Webhook URL here or via .env (VITE_GOOGLE_SHEET_URL)
const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL || '';

export default function ContactPage({ onNavigate }) {
  const [userType, setUserType] = useState('Customer'); // 'Customer' | 'Captain'
  const [area, setArea] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const now = new Date();

    // Exact Date: e.g. "09 Oct 2026"
    const formattedDate = now.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    // Exact Time: e.g. "09:45:12 PM"
    const formattedTime = now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    const newEnquiry = {
      id: Date.now(),
      date: formattedDate,
      time: formattedTime,
      userType,
      name: name.trim(),
      mobile: mobile.trim(),
      email: email.trim(),
      area: area.trim(),
      message: comment.trim()
    };

    // 1. Direct Save to live Excel Enquiries Sheet store (localStorage)
    try {
      const existing = JSON.parse(localStorage.getItem('bykse_enquiries') || '[]');
      existing.unshift(newEnquiry);
      localStorage.setItem('bykse_enquiries', JSON.stringify(existing));
    } catch (err) {
      console.warn('Sheet save warning:', err);
    }

    // 2. Post to external Google Sheet Webhook if configured
    if (GOOGLE_SHEET_URL) {
      try {
        await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newEnquiry),
        });
      } catch (err) {
        console.error('Google Sheet error:', err);
      }
    }

    setLastSubmissionTime(`${formattedDate} at ${formattedTime}`);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <div
      className="rapido-contact-page"
      style={{
        background: '#ffffff',
        minHeight: '100vh',
        padding: '50px 20px 90px',
        position: 'relative',
        overflowX: 'hidden'
      }}
    >
      {/* Decorative Background Blob */}
      <div
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '380px',
          height: '340px',
          background: '#FEF9E7',
          borderRadius: '50% 50% 60% 40% / 60% 40% 60% 40%',
          filter: 'blur(10px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '38px', fontWeight: '800', color: '#111827', margin: '0 0 10px', letterSpacing: '-0.5px' }}>
            Reach Us
          </h1>
          <div style={{ width: '48px', height: '4px', background: '#F9C935', margin: '0 auto 16px', borderRadius: '2px' }}></div>
          <p style={{ fontSize: '15px', color: '#6b7280', margin: 0, lineHeight: '1.6' }}>
            Customer or Captain? Drop your query below and our team will get back to you.
          </p>
        </div>

        {/* Centered Modern Form Card */}
        <div
          style={{
            background: '#ffffff',
            padding: '40px 36px',
            borderRadius: '24px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 20px 48px rgba(0, 0, 0, 0.06)',
          }}
        >
          {submitted ? (
            <div style={{ padding: '40px 20px', textAlign: 'center' }}>
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: '#ECFDF5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '36px',
                  margin: '0 auto 20px',
                  border: '2px solid #A7F3D0'
                }}
              >
                ✓
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#111827', margin: '0 0 10px' }}>
                Thank You, {name || 'User'}!
              </h3>
              <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.6', margin: '0 0 16px', maxWidth: '460px', marginLeft: 'auto', marginRight: 'auto' }}>
                Aapki enquiry successfully record ho gayi hai. Hamari team jald hi aapke mobile number <strong>{mobile}</strong> par sampark karegi.
              </p>

              {lastSubmissionTime && (
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#F1F5F9',
                  color: '#475569',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  marginBottom: '24px'
                }}>
                  <span>⏰ Logged at:</span> {lastSubmissionTime}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setArea('');
                    setEmail('');
                    setMobile('');
                    setComment('');
                  }}
                  style={{
                    background: '#111827',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '9999px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '14px',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#000000'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#111827'; }}
                >
                  Send Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

              {/* User Type Selection: Customer or Captain */}
              <div>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>
                  I am a <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setUserType('Customer')}
                    style={{
                      padding: '13px 16px',
                      borderRadius: '12px',
                      border: userType === 'Customer' ? '2px solid #F9C935' : '1.5px solid #E5E7EB',
                      background: userType === 'Customer' ? '#FFFBEB' : '#F9FAFB',
                      color: userType === 'Customer' ? '#92400E' : '#4B5563',
                      fontWeight: userType === 'Customer' ? '800' : '600',
                      fontSize: '14.5px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>👤</span> Customer (Rider)
                  </button>

                  <button
                    type="button"
                    onClick={() => setUserType('Captain')}
                    style={{
                      padding: '13px 16px',
                      borderRadius: '12px',
                      border: userType === 'Captain' ? '2px solid #F9C935' : '1.5px solid #E5E7EB',
                      background: userType === 'Captain' ? '#FFFBEB' : '#F9FAFB',
                      color: userType === 'Captain' ? '#92400E' : '#4B5563',
                      fontWeight: userType === 'Captain' ? '800' : '600',
                      fontSize: '14.5px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>🛵</span> Captain (Driver)
                  </button>
                </div>
              </div>

              {/* 2-Column: Full Name & Mobile Number */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>
                    Full Name <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '13px 16px',
                      borderRadius: '12px',
                      border: '1.5px solid #E5E7EB',
                      fontSize: '14.5px',
                      background: '#F9FAFB',
                      color: '#111827',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#F9C935'; e.target.style.background = '#ffffff'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.background = '#F9FAFB'; }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>
                    Mobile Number <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your 10-digit mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '13px 16px',
                      borderRadius: '12px',
                      border: '1.5px solid #E5E7EB',
                      fontSize: '14.5px',
                      background: '#F9FAFB',
                      color: '#111827',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#F9C935'; e.target.style.background = '#ffffff'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.background = '#F9FAFB'; }}
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>
                  Email Address <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    borderRadius: '12px',
                    border: '1.5px solid #E5E7EB',
                    fontSize: '14.5px',
                    background: '#F9FAFB',
                    color: '#111827',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#F9C935'; e.target.style.background = '#ffffff'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.background = '#F9FAFB'; }}
                />
              </div>

              {/* Your Area Section */}
              <div>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>
                  Your Area <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Enter your area / locality (e.g. Indiranagar, Bengaluru)"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '13px 16px 13px 44px',
                      borderRadius: '12px',
                      border: '1.5px solid #E5E7EB',
                      fontSize: '14.5px',
                      background: '#F9FAFB',
                      color: '#111827',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#F9C935'; e.target.style.background = '#ffffff'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.background = '#F9FAFB'; }}
                  />
                  <div style={{
                    position: 'absolute',
                    left: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9CA3AF',
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Comment / Details Textarea */}
              <div>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>
                  Message / Issue Details <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder={userType === 'Customer' ? "Write your trip issue or query here..." : "Write your vehicle, KYC or captain earnings query here..."}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    borderRadius: '12px',
                    border: '1.5px solid #E5E7EB',
                    fontSize: '14.5px',
                    background: '#F9FAFB',
                    color: '#111827',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    lineHeight: '1.5',
                    transition: 'border-color 0.2s ease',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#F9C935'; e.target.style.background = '#ffffff'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.background = '#F9FAFB'; }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: '#F9C935',
                  color: '#111827',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '16px',
                  fontSize: '16px',
                  fontWeight: '800',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.8 : 1,
                  marginTop: '6px',
                  boxShadow: '0 6px 20px rgba(249, 201, 53, 0.35)',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(249, 201, 53, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(249, 201, 53, 0.35)';
                }}
              >
                {isSubmitting ? (
                  <>
                    <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
                    Adding to Sheet...
                  </>
                ) : (
                  <>Submit Query →</>
                )}
              </button>

              <div style={{ textAlign: 'center', marginTop: '6px' }}>
                <span style={{ fontSize: '12.5px', color: '#9CA3AF' }}>
                  🔒 We respect your privacy. All enquiries are logged securely.
                </span>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
