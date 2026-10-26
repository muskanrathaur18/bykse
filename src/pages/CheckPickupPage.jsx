import React, { useState } from 'react';

export default function CheckPickupPage({ onNavigate }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);
      setConfirmed(true);
    }, 1000);
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 70px)',
      backgroundColor: '#f1f5f9',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '16px 0'
    }}>
      {/* Mobile container to match user screenshot pixel-perfect */}
      <div style={{
        width: '100%',
        maxWidth: '430px',
        height: '840px',
        maxHeight: '94vh',
        backgroundColor: '#FFFFFF',
        borderRadius: '28px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        border: '1px solid #E2E8F0'
      }}>

        {/* MAP SECTION */}
        <div style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#E2E8F0',
          backgroundImage: 'url(/images/real_delhi_map.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>

          {/* Floating Back Button (Bottom-left of map) */}
          <button
            onClick={() => onNavigate ? onNavigate('/') : window.history.back()}
            style={{
              position: 'absolute',
              bottom: '18px',
              left: '18px',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 20,
              transition: 'transform 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>

          {/* Blue Route Polyline connecting Pickup to Drop */}
          <div style={{
            position: 'absolute',
            top: '46%',
            left: '49%',
            width: '4px',
            height: '110px',
            backgroundColor: '#2563EB',
            borderRadius: '2px',
            transform: 'rotate(-25deg)',
            zIndex: 6,
            boxShadow: '0 0 6px rgba(37, 99, 235, 0.4)'
          }} />

          {/* Drop Pin Marker */}
          <div style={{
            position: 'absolute',
            top: '64%',
            left: '60%',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            zIndex: 9,
            pointerEvents: 'none'
          }}>
            <div style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              backgroundColor: 'rgba(239, 68, 68, 0.25)',
              border: '3px solid #DC2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#DC2626' }} />
            </div>
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              padding: '3px 8px',
              fontSize: '11.5px',
              fontWeight: '700',
              color: '#0F172A',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}>
              Nangal Dewat...
            </div>
          </div>

          {/* Center Marker: "Pickup Point" Tooltip + Blue Nav Circle */}
          <div style={{
            position: 'absolute',
            top: '44%',
            left: '46%',
            transform: 'translate(-50%, -100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none',
            zIndex: 10
          }}>
            {/* Green Tooltip Pill */}
            <div style={{
              backgroundColor: '#15803D',
              color: '#FFFFFF',
              fontWeight: '800',
              fontSize: '13.5px',
              padding: '6px 15px',
              borderRadius: '20px',
              boxShadow: '0 3px 8px rgba(0,0,0,0.22)',
              letterSpacing: '0.2px',
              whiteSpace: 'nowrap'
            }}>
              Pickup Point
            </div>

            {/* Triangle Downward Pointer */}
            <div style={{
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '7px solid #15803D',
              marginBottom: '3px'
            }} />

            {/* Blue Navigation Pin */}
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#2563EB',
              border: '2px solid #FFFFFF',
              boxShadow: '0 3px 8px rgba(37, 99, 235, 0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF" style={{ transform: 'rotate(45deg)' }}>
                <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
              </svg>
            </div>
          </div>
        </div>

        {/* BOTTOM SHEET / CARD: "Check your pickup point" */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          padding: '20px 18px 24px',
          boxShadow: '0 -4px 16px rgba(0,0,0,0.08)',
          zIndex: 15
        }}>
          {/* Header Row with Green Location Pin Icon */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: '#DCFCE7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#15803D">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>

            <div>
              <h2 style={{
                fontSize: '17.5px',
                fontWeight: '800',
                color: '#0F172A',
                margin: '0 0 3px 0',
                letterSpacing: '-0.2px'
              }}>
                Check your pickup point
              </h2>
              <p style={{
                fontSize: '13.5px',
                color: '#64748B',
                margin: 0,
                fontWeight: '500'
              }}>
                Select a nearby point for easier pickup
              </p>
            </div>
          </div>

          {/* Green Bordered Address Box */}
          <div style={{
            border: '1.5px solid #15803D',
            borderRadius: '12px',
            padding: '12px 14px',
            marginBottom: '18px',
            backgroundColor: '#FFFFFF'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: '800',
              color: '#0F172A',
              marginBottom: '3px'
            }}>
              B34
            </div>
            <div style={{
              fontSize: '13px',
              color: '#334155',
              fontWeight: '500',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              Sainik Nagar, Mansa Ram Park, Uttam Nagar, New ...
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '8px',
              paddingTop: '8px',
              borderTop: '1px solid #F1F5F9'
            }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#DC2626' }} />
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>
                Drop: Nangal Dewat, Vasant Kunj
              </div>
            </div>
          </div>

          {/* Yellow "Confirm pickup" Button */}
          <button
            onClick={handleConfirm}
            disabled={isConfirming}
            style={{
              width: '100%',
              height: '52px',
              backgroundColor: confirmed ? '#10B981' : '#FBBF24',
              color: confirmed ? '#FFFFFF' : '#0F172A',
              border: 'none',
              borderRadius: '26px',
              fontSize: '16px',
              fontWeight: '800',
              cursor: isConfirming ? 'not-allowed' : 'pointer',
              boxShadow: confirmed ? '0 4px 14px rgba(16, 185, 129, 0.35)' : '0 4px 14px rgba(245, 158, 11, 0.3)',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {isConfirming ? (
              <span>Confirming...</span>
            ) : confirmed ? (
              <span>✓ Pickup Confirmed!</span>
            ) : (
              <span>Confirm pickup</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
