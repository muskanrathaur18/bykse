import React, { useState } from 'react';

export default function DownloadModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('customer'); // 'customer' or 'captain'

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content-rapido" 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '32px 28px',
          maxWidth: '460px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          position: 'relative'
        }}
      >
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}
        >
          ✕
        </button>

        <h3 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 6px', color: '#111' }}>
          Download BykSe App
        </h3>
        <p style={{ fontSize: '14px', color: '#666', margin: '0 0 20px' }}>
          Scan the QR code or choose your store to start your ride today.
        </p>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', borderBottom: '2px solid #f0f0f0', marginBottom: '24px' }}>
          <button
            onClick={() => setActiveTab('customer')}
            style={{
              flex: 1,
              padding: '12px',
              fontWeight: activeTab === 'customer' ? '700' : '500',
              color: activeTab === 'customer' ? '#000' : '#888',
              borderBottom: activeTab === 'customer' ? '3px solid #F9C935' : '3px solid transparent',
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
              fontSize: '15px'
            }}
          >
            Customer App
          </button>
          <button
            onClick={() => setActiveTab('captain')}
            style={{
              flex: 1,
              padding: '12px',
              fontWeight: activeTab === 'captain' ? '700' : '500',
              color: activeTab === 'captain' ? '#000' : '#888',
              borderBottom: activeTab === 'captain' ? '3px solid #F9C935' : '3px solid transparent',
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
              fontSize: '15px'
            }}
          >
            Captain App
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'customer' ? (
          <div>
            <div style={{ display: 'inline-block', padding: '12px', background: '#f9f9f9', borderRadius: '12px', marginBottom: '18px', border: '1px solid #eee' }}>
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://bykse.com/download" 
                alt="Scan Customer App QR" 
                width="160" 
                height="160" 
                style={{ display: 'block' }}
              />
            </div>
            <p style={{ fontSize: '13px', color: '#555', marginBottom: '18px' }}>
              Scan with your phone camera to install the <strong>BykSe Passenger App</strong>
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <a 
                href="https://play.google.com/store/apps" 
                target="_blank" 
                rel="noreferrer"
              >
                <img src="/images/play_store.svg" alt="Google Play" style={{ height: '40px' }} />
              </a>
              <a 
                href="https://apps.apple.com" 
                target="_blank" 
                rel="noreferrer"
              >
                <img src="/images/app_store.svg" alt="App Store" style={{ height: '40px' }} />
              </a>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'inline-block', padding: '12px', background: '#f9f9f9', borderRadius: '12px', marginBottom: '18px', border: '1px solid #eee' }}>
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://bykse.com/captain-download" 
                alt="Scan Captain App QR" 
                width="160" 
                height="160" 
                style={{ display: 'block' }}
              />
            </div>
            <p style={{ fontSize: '13px', color: '#555', marginBottom: '18px' }}>
              Partner with BykSe &amp; start earning daily. Download the <strong>BykSe Captain App</strong>
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <a 
                href="https://play.google.com/store/apps" 
                target="_blank" 
                rel="noreferrer"
              >
                <img src="/images/play_store.svg" alt="Google Play" style={{ height: '40px' }} />
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
