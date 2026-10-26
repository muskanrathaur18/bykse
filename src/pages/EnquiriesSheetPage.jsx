import React, { useState, useEffect } from 'react';

export default function EnquiriesSheetPage({ onNavigate }) {
  const [enquiries, setEnquiries] = useState([]);
  const [filterType, setFilterType] = useState('ALL'); // 'ALL' | 'Customer' | 'Captain'
  const [searchTerm, setSearchTerm] = useState('');

  // Load enquiries from localStorage on mount and refresh interval
  const loadEnquiries = () => {
    try {
      const data = JSON.parse(localStorage.getItem('bykse_enquiries') || '[]');
      setEnquiries(data);
    } catch {
      setEnquiries([]);
    }
  };

  useEffect(() => {
    loadEnquiries();
    const interval = setInterval(loadEnquiries, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Kya aap is enquiry ko sheet se delete karna chahte hain?')) {
      const updated = enquiries.filter(item => item.id !== id);
      localStorage.setItem('bykse_enquiries', JSON.stringify(updated));
      setEnquiries(updated);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Warning: Kya aap sach me puri sheet ka data clear karna chahte hain?')) {
      localStorage.setItem('bykse_enquiries', JSON.stringify([]));
      setEnquiries([]);
    }
  };

  // Filtered list
  const filtered = enquiries.filter(item => {
    const matchesType = filterType === 'ALL' || item.userType === filterType;
    const term = searchTerm.toLowerCase();
    const matchesSearch = !term || 
      (item.name && item.name.toLowerCase().includes(term)) ||
      (item.mobile && item.mobile.toLowerCase().includes(term)) ||
      (item.email && item.email.toLowerCase().includes(term)) ||
      (item.area && item.area.toLowerCase().includes(term)) ||
      (item.message && item.message.toLowerCase().includes(term));
    return matchesType && matchesSearch;
  });

  const customerCount = enquiries.filter(e => e.userType === 'Customer').length;
  const captainCount = enquiries.filter(e => e.userType === 'Captain').length;

  return (
    <div style={{ background: '#F3F4F6', minHeight: '100vh', fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>
      
      {/* Excel Title Bar */}
      <header style={{
        background: '#107C41', // Classic Microsoft Excel Green
        color: '#FFFFFF',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            background: '#FFFFFF',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '900',
            fontSize: '22px',
            color: '#107C41',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            X
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '800', letterSpacing: '-0.2px' }}>
                BykSe Enquiries - Live Excel Sheet
              </h1>
              <span style={{
                background: '#0B5A2F',
                fontSize: '11px',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '4px',
                letterSpacing: '0.5px'
              }}>
                ● LIVE SYNC
              </span>
            </div>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#D1E7DD' }}>
              Customer &amp; Captain enquiries real-time data table with exact Date and Time
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => {
              if (onNavigate) {
                onNavigate('/contact');
              } else {
                window.location.href = '/contact';
              }
            }}
            style={{
              background: '#FFFFFF',
              color: '#107C41',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            ← Back to Contact Form
          </button>

          {enquiries.length > 0 && (
            <button
              onClick={handleClearAll}
              style={{
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.5)',
                color: '#FEE2E2',
                padding: '8px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Clear Sheet
            </button>
          )}
        </div>
      </header>

      {/* Spreadsheet Formula & Filter Bar */}
      <div style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #D1D5DB',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Left: Summary Metrics */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <div style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            padding: '6px 14px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '700',
            color: '#166534',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>📊 Total Rows:</span>
            <span style={{ fontSize: '15px' }}>{enquiries.length}</span>
          </div>

          <div style={{
            background: '#FEF3C7',
            border: '1px solid #FDE68A',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '12.5px',
            fontWeight: '600',
            color: '#92400E'
          }}>
            👤 Customers: <strong>{customerCount}</strong>
          </div>

          <div style={{
            background: '#E0E7FF',
            border: '1px solid #C7D2FE',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '12.5px',
            fontWeight: '600',
            color: '#3730A3'
          }}>
            🛵 Captains: <strong>{captainCount}</strong>
          </div>
        </div>

        {/* Right: Search & Type Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Type Filter Buttons */}
          <div style={{ display: 'flex', background: '#F3F4F6', padding: '3px', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
            <button
              onClick={() => setFilterType('ALL')}
              style={{
                background: filterType === 'ALL' ? '#FFFFFF' : 'transparent',
                color: filterType === 'ALL' ? '#111827' : '#6B7280',
                border: 'none',
                padding: '5px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: filterType === 'ALL' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              All ({enquiries.length})
            </button>
            <button
              onClick={() => setFilterType('Customer')}
              style={{
                background: filterType === 'Customer' ? '#FFFFFF' : 'transparent',
                color: filterType === 'Customer' ? '#111827' : '#6B7280',
                border: 'none',
                padding: '5px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: filterType === 'Customer' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              👤 Customers ({customerCount})
            </button>
            <button
              onClick={() => setFilterType('Captain')}
              style={{
                background: filterType === 'Captain' ? '#FFFFFF' : 'transparent',
                color: filterType === 'Captain' ? '#111827' : '#6B7280',
                border: 'none',
                padding: '5px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: filterType === 'Captain' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              🛵 Captains ({captainCount})
            </button>
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search in sheet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '7px 12px 7px 30px',
                borderRadius: '6px',
                border: '1px solid #D1D5DB',
                fontSize: '13px',
                outline: 'none',
                width: '180px',
                background: '#FAFAFA'
              }}
            />
            <span style={{ position: 'absolute', left: '10px', top: '7px', fontSize: '13px', color: '#9CA3AF' }}>🔍</span>
          </div>
        </div>
      </div>

      {/* Spreadsheet Main Grid */}
      <main style={{ padding: '20px 24px', maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{
          background: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid #D1D5DB',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          overflow: 'hidden'
        }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '14px' }}>📋</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#374151', margin: '0 0 6px' }}>
                {enquiries.length === 0 ? 'Sheet Khali Hai (No Enquiries Yet)' : 'No Matching Enquiries Found'}
              </h3>
              <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 20px', maxWidth: '420px', marginLeft: 'auto', marginRight: 'auto' }}>
                {enquiries.length === 0 
                  ? 'Jaise hi koi customer ya captain contact form submit karega, unka data Date aur Time ke saath direct is sheet me live show ho jayega.'
                  : 'Aapne jo filter ya search term daala hai usse koi record match nahi hua.'}
              </p>
              <button
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('/contact');
                  } else {
                    window.location.href = '/contact';
                  }
                }}
                style={{
                  background: '#107C41',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px 22px',
                  borderRadius: '6px',
                  fontSize: '13.5px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                + Submit Test Enquiry Now
              </button>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '13.5px',
                textAlign: 'left'
              }}>
                <thead>
                  {/* Column letter row (like Excel A, B, C...) */}
                  <tr style={{ background: '#E5E7EB', color: '#6B7280', fontSize: '11px', textAlign: 'center', fontWeight: '700' }}>
                    <th style={{ width: '45px', padding: '4px', border: '1px solid #D1D5DB' }}></th>
                    <th style={{ padding: '4px', border: '1px solid #D1D5DB' }}>A</th>
                    <th style={{ padding: '4px', border: '1px solid #D1D5DB' }}>B</th>
                    <th style={{ padding: '4px', border: '1px solid #D1D5DB' }}>C</th>
                    <th style={{ padding: '4px', border: '1px solid #D1D5DB' }}>D</th>
                    <th style={{ padding: '4px', border: '1px solid #D1D5DB' }}>E</th>
                    <th style={{ padding: '4px', border: '1px solid #D1D5DB' }}>F</th>
                    <th style={{ padding: '4px', border: '1px solid #D1D5DB' }}>G</th>
                    <th style={{ padding: '4px', border: '1px solid #D1D5DB' }}>H</th>
                    <th style={{ width: '50px', padding: '4px', border: '1px solid #D1D5DB' }}></th>
                  </tr>

                  {/* Header Row */}
                  <tr style={{ background: '#F9FAFB', color: '#111827', fontWeight: '800', borderBottom: '2px solid #107C41' }}>
                    <th style={{ padding: '12px 8px', textAlign: 'center', width: '45px', border: '1px solid #E5E7EB', background: '#F3F4F6', color: '#6B7280' }}>#</th>
                    <th style={{ padding: '12px 14px', border: '1px solid #E5E7EB', minWidth: '120px' }}>📅 Date</th>
                    <th style={{ padding: '12px 14px', border: '1px solid #E5E7EB', minWidth: '110px' }}>⏰ Time</th>
                    <th style={{ padding: '12px 14px', border: '1px solid #E5E7EB', minWidth: '130px' }}>👤 User Type</th>
                    <th style={{ padding: '12px 14px', border: '1px solid #E5E7EB', minWidth: '160px' }}>Name</th>
                    <th style={{ padding: '12px 14px', border: '1px solid #E5E7EB', minWidth: '130px' }}>Mobile Number</th>
                    <th style={{ padding: '12px 14px', border: '1px solid #E5E7EB', minWidth: '180px' }}>Email Address</th>
                    <th style={{ padding: '12px 14px', border: '1px solid #E5E7EB', minWidth: '160px' }}>Area / Locality</th>
                    <th style={{ padding: '12px 14px', border: '1px solid #E5E7EB', minWidth: '240px' }}>Message / Details</th>
                    <th style={{ padding: '12px 8px', border: '1px solid #E5E7EB', textAlign: 'center', width: '50px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, index) => {
                    const isCustomer = item.userType === 'Customer';
                    return (
                      <tr 
                        key={item.id || index}
                        style={{
                          background: index % 2 === 0 ? '#FFFFFF' : '#F9FAFB',
                          transition: 'background 0.15s ease'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#ECFDF5'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = index % 2 === 0 ? '#FFFFFF' : '#F9FAFB'; }}
                      >
                        {/* Row number */}
                        <td style={{
                          padding: '12px 8px',
                          textAlign: 'center',
                          border: '1px solid #E5E7EB',
                          background: '#F3F4F6',
                          color: '#6B7280',
                          fontWeight: '700',
                          fontSize: '12px'
                        }}>
                          {index + 1}
                        </td>

                        {/* Date */}
                        <td style={{ padding: '12px 14px', border: '1px solid #E5E7EB', fontWeight: '700', color: '#111827', whiteSpace: 'nowrap' }}>
                          {item.date || '—'}
                        </td>

                        {/* Time */}
                        <td style={{ padding: '12px 14px', border: '1px solid #E5E7EB', fontWeight: '700', color: '#059669', whiteSpace: 'nowrap' }}>
                          {item.time || '—'}
                        </td>

                        {/* User Type Badge */}
                        <td style={{ padding: '12px 14px', border: '1px solid #E5E7EB' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: isCustomer ? '#FEF3C7' : '#EEF2FF',
                            color: isCustomer ? '#92400E' : '#3730A3',
                            border: `1px solid ${isCustomer ? '#FDE68A' : '#C7D2FE'}`,
                            padding: '3px 10px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: '700'
                          }}>
                            <span>{isCustomer ? '👤' : '🛵'}</span>
                            {item.userType || 'Customer'}
                          </span>
                        </td>

                        {/* Name */}
                        <td style={{ padding: '12px 14px', border: '1px solid #E5E7EB', fontWeight: '700', color: '#1E293B' }}>
                          {item.name || '—'}
                        </td>

                        {/* Mobile */}
                        <td style={{ padding: '12px 14px', border: '1px solid #E5E7EB', color: '#2563EB', fontWeight: '600', whiteSpace: 'nowrap' }}>
                          <a href={`tel:${item.mobile}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            {item.mobile || '—'}
                          </a>
                        </td>

                        {/* Email */}
                        <td style={{ padding: '12px 14px', border: '1px solid #E5E7EB', color: '#4B5563' }}>
                          <a href={`mailto:${item.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            {item.email || '—'}
                          </a>
                        </td>

                        {/* Area */}
                        <td style={{ padding: '12px 14px', border: '1px solid #E5E7EB', color: '#111827', fontWeight: '500' }}>
                          {item.area || '—'}
                        </td>

                        {/* Message */}
                        <td style={{ padding: '12px 14px', border: '1px solid #E5E7EB', color: '#374151', lineHeight: '1.4' }}>
                          {item.message || '—'}
                        </td>

                        {/* Delete Action */}
                        <td style={{ padding: '12px 8px', border: '1px solid #E5E7EB', textAlign: 'center' }}>
                          <button
                            onClick={() => handleDelete(item.id)}
                            title="Delete this row"
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#9CA3AF',
                              cursor: 'pointer',
                              fontSize: '15px',
                              padding: '4px',
                              borderRadius: '4px',
                              transition: 'color 0.15s ease'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = '#EF4444'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = '#9CA3AF'; }}
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

    </div>
  );
}
