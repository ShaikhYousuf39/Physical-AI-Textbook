/**
 * Root component - Integrates all custom components into Docusaurus
 */
import React, { useState, useEffect } from 'react';
import ChatWidget from '../components/ChatWidget';
import TextSelectionChat from '../components/TextSelectionChat';
// import AuthForms from '../components/AuthForms'; // Disabled - Python 3.13 compatibility

export default function Root({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleOpenAuth = (e: CustomEvent) => {
      // Trigger the AuthForms modal to open
      const authButton = document.querySelector('.auth-btn') as HTMLButtonElement;
      if (authButton) {
        authButton.click();
      }
    };

    window.addEventListener('openAuthModal', handleOpenAuth as EventListener);
    return () => window.removeEventListener('openAuthModal', handleOpenAuth as EventListener);
  }, []);

  return (
    <>
      {children}
      <ChatWidget />
      <TextSelectionChat />
      {/* AuthForms disabled - Python 3.13 compatibility issue */}
      {/*
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
        <AuthForms />
      </div>
      */}
    </>
  );
}
