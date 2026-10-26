import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DownloadModal from './components/DownloadModal';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SafetyPage from './pages/SafetyPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import CustomerTermsPage from './pages/CustomerTermsPage';
import CaptainTermsPage from './pages/CaptainTermsPage';
import PrivacyPage from './pages/PrivacyPage';
import EnquiriesSheetPage from './pages/EnquiriesSheetPage';
import CheckPickupPage from './pages/CheckPickupPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route selector
  const renderCurrentPage = () => {
    switch (currentPath.toLowerCase()) {
      case '/':
      case '/home':
        return <HomePage onOpenDownload={() => setIsDownloadOpen(true)} onNavigate={navigateTo} />;
      case '/about':
        return <AboutPage onNavigate={navigateTo} />;
      case '/safety':
        return <SafetyPage onOpenDownload={() => setIsDownloadOpen(true)} />;
      case '/careers':
        return <CareersPage />;
      case '/contact':
        return <ContactPage onNavigate={navigateTo} />;
      case '/sheet':
      case '/enquiries':
      case '/admin/sheet':
        return <EnquiriesSheetPage onNavigate={navigateTo} />;
      case '/customerterms':
        return <CustomerTermsPage />;
      case '/captainterms':
        return <CaptainTermsPage />;
      case '/privacy':
        return <PrivacyPage />;
      case '/pickup':
      case '/check-pickup':
        return <CheckPickupPage onNavigate={navigateTo} />;
      default:
        return <HomePage onOpenDownload={() => setIsDownloadOpen(true)} onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="rapido-application" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Header 
        currentPath={currentPath} 
        onNavigate={navigateTo} 
        onOpenDownload={() => setIsDownloadOpen(true)} 
      />

      {/* Main Page Body */}
      <main style={{ flex: 1 }}>
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Download App Modal */}
      <DownloadModal 
        isOpen={isDownloadOpen} 
        onClose={() => setIsDownloadOpen(false)} 
      />
    </div>
  );
}
