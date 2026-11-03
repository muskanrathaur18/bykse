export const weddingCarModels = [
  { id: 'innova', name: 'Innova Crysta', type: 'Luxury 7-Seater', pricePerDay: 3500 },
  { id: 'fortuner', name: 'Fortuner Legender', type: 'VIP Royal SUV', pricePerDay: 4500 },
  { id: 'audi', name: 'Audi A6', type: 'Luxury Sedan', pricePerDay: 5500 },
  { id: 'bmw', name: 'BMW 5-Series', type: 'Executive Luxury', pricePerDay: 6000 },
  { id: 'mercedes', name: 'Mercedes E-Class', type: 'Signature Bridal', pricePerDay: 6500 },
  { id: 'vintage', name: 'Royal Vintage Open', type: 'Classic Baraat', pricePerDay: 8000 },
];

export const weddingCarColors = [
  { id: 'white', label: 'Royal White', hex: '#FFFFFF', border: '#94A3B8' },
  { id: 'black', label: 'Phantom Black', hex: '#111827', border: '#111827' },
  { id: 'silver', label: 'Silver Metallic', hex: '#64748B', border: '#64748B' },
  { id: 'gold', label: 'Royal Gold', hex: '#EAB308', border: '#CA8A04' },
  { id: 'wine_red', label: 'Wine Red', hex: '#991B1B', border: '#7F1D1D' },
];

export const getPresetDates = () => {
  const dates = [];
  const now = new Date();

  const d1 = new Date(now);
  d1.setDate(d1.getDate() + 1);
  dates.push({
    id: 'tomorrow',
    label: 'Tomorrow (' + d1.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) + ')',
    iso: d1.toISOString().split('T')[0],
  });

  const d2 = new Date(now);
  d2.setDate(d2.getDate() + 2);
  dates.push({
    id: '2days',
    label: d2.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
    iso: d2.toISOString().split('T')[0],
  });

  const d3 = new Date(now);
  d3.setDate(d3.getDate() + 7);
  dates.push({
    id: '1week',
    label: 'Next Week (' + d3.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) + ')',
    iso: d3.toISOString().split('T')[0],
  });

  return dates;
};

export const searchableDelhiPlaces = [
  { title: 'Tivoli Grand Resort Hotel', address: 'Main GT Karnal Road, Alipur, Delhi' },
  { title: 'The Umrao Luxury Banquet', address: 'NH-48, Rajokri, Near Aerocity, New Delhi' },
  { title: 'Vegas Mall', address: 'North, Pocket 1, Sector 14 Dwarka, Dwarka, Delhi' },
  { title: 'Dwarka Mor Metro Station', address: 'Roshan Garden, Bhagwati Garden, Nawada, Delhi' },
  { title: 'Metro Station Dwarka Sector 13', address: 'Sector 13, Dwarka, Delhi, India' },
  { title: 'Connaught Place', address: 'Inner Circle, Block C, Connaught Place, New Delhi' },
  { title: 'DLF Cyber City', address: 'Phase 2, Sector 24, Gurugram, Haryana' },
  { title: 'Sector 18 Market Noida', address: 'Wave Silver Tower, Sector 18, Noida' },
  { title: 'Karol Bagh Market', address: 'Arya Samaj Road, Karol Bagh, New Delhi' },
  { title: 'Saket Select Citywalk', address: 'Press Enclave Road, Saket, New Delhi' },
  { title: 'Janakpuri District Centre', address: 'District Centre, Janakpuri, New Delhi' },
];
