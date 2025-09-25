
import React, { useState } from 'react';
import type { AppEvent } from '../types';

interface EventsPageProps {
  events: AppEvent[];
}

const Calendar: React.FC<{
  onDateClick: (date: Date) => void;
  events: AppEvent[];
}> = ({ onDateClick, events }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 1)); // Default to August 2025

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  const eventDates = events.map(event => event.date);

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const blanks = Array(firstDay).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const hasEventOnDate = (day: number) => {
     const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
     return eventDates.includes(dateStr);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100">&lt;</button>
        <h2 className="font-bold text-lg">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100">&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-500 mb-2">
        {daysOfWeek.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {blanks.map((_, i) => <div key={`blank-${i}`}></div>)}
        {days.map(day => {
          const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
          const hasEvent = hasEventOnDate(day);
          return (
            <div
              key={day}
              onClick={() => onDateClick(new Date(year, month, day))}
              className={`p-2 rounded-full cursor-pointer hover:bg-blue-100 transition-colors ${
                isToday ? 'bg-blue-500 text-white' : ''
              } ${
                hasEvent ? 'bg-yellow-400 text-white font-bold' : ''
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
      <p className="text-xs text-center text-gray-500 mt-4">Dates with events are highlighted in gold</p>
    </div>
  );
};

const DayView: React.FC<{
  date: Date;
  events: AppEvent[];
  onBack: () => void;
}> = ({ date, events, onBack }) => {
  const dateString = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const eventsForDay = events.filter(e => e.date === formattedDate);

  return (
    <div>
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="flex items-center text-gray-600 hover:text-iscj-blue-dark mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Calendar
        </button>
        <h2 className="text-2xl font-bold text-gray-800">{dateString}</h2>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {eventsForDay.length > 0 ? (
          <ul className="space-y-4">
            {eventsForDay.map(event => (
              <li key={event.id} className="border-b pb-4 last:border-b-0">
                <h3 className="font-bold text-lg text-iscj-blue-dark">{event.title}</h3>
                <p className="text-gray-500">{event.time} at {event.location}</p>
                {event.description && <p className="text-gray-600 mt-2">{event.description}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8">
            <span className="bg-blue-100 text-iscj-blue-light px-4 py-2 rounded-full">
              No events scheduled for this date.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};


const EventsPage: React.FC<EventsPageProps> = ({ events }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleBackToCalendar = () => {
    setSelectedDate(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
       <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-iscj-blue-dark">
          {selectedDate ? 'Event Details' : 'Events Calendar'}
        </h1>
        <p className="text-lg text-gray-500 mt-2">
            {selectedDate ? `Showing events for the selected date.` : 'Click on a date to view events'}
        </p>
      </header>

      {selectedDate ? (
        <DayView date={selectedDate} events={events} onBack={handleBackToCalendar} />
      ) : (
        <Calendar onDateClick={handleDateClick} events={events} />
      )}
    </div>
  );
};

export default EventsPage;
