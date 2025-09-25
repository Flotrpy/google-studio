
import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import ProgramsPage from './components/ProgramsPage';
import EventsPage from './components/EventsPage';
import PrayersPage from './components/PrayersPage';
import ContactPage from './components/ContactPage';
import AdminPage from './components/AdminPage';
import type { Page, AppEvent } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Home');
  const [events, setEvents] = useState<AppEvent[]>([]);

  const addEvent = useCallback((newEvent: AppEvent) => {
    setEvents(prevEvents => [...prevEvents, newEvent].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <HomePage />;
      case 'Programs':
        return <ProgramsPage />;
      case 'Events':
        return <EventsPage events={events} />;
      case 'Prayers':
        return <PrayersPage />;
      case 'Contact':
        return <ContactPage />;
      case 'Admin':
        return <AdminPage currentEvents={events} addEvent={addEvent} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex h-screen bg-iscj-gray font-sans">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1 p-8 overflow-y-auto">
        <button className="bg-white p-2 rounded-full shadow-md mb-6 hover:bg-gray-100 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
