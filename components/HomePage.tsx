
import React from 'react';

const events = [
  { title: 'Friday Khutbah', description: 'Weekly congregational prayer', schedule: 'Every Friday' },
  { title: 'Youth Program', description: 'Educational activities for children', schedule: 'Saturdays' },
  { title: 'Community Dinner', description: 'Monthly community gathering', schedule: 'First Sunday' },
];

const EventCard: React.FC<{ title: string; description: string; schedule: string }> = ({ title, description, schedule }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center hover:shadow-xl transition-shadow">
    <div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-1">{description}</p>
    </div>
    <span className="bg-blue-100 text-iscj-blue-light text-sm font-medium px-3 py-1 rounded-full">{schedule}</span>
  </div>
);

const HomePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-iscj-blue-dark">Welcome to ISCJ</h1>
        <p className="text-xl text-gray-600 mt-2">Islamic Society of Central Jersey - Building community through faith, knowledge, and service</p>
      </header>
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Upcoming Events</h2>
        <p className="text-lg text-gray-500 mb-6">Join us for these upcoming community events</p>
        <div className="space-y-4">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
