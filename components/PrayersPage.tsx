
import React from 'react';
import { SunIcon, MoonIcon } from './icons/Icons';

const prayerTimes = [
  { name: 'Fajr', time: '5:30 AM', icon: <MoonIcon /> },
  { name: 'Dhuhr', time: '12:45 PM', icon: <SunIcon /> },
  { name: 'Asr', time: '4:15 PM', icon: <SunIcon className="text-orange-400" /> },
  { name: 'Maghrib', time: '6:30 PM', icon: <SunIcon className="text-orange-600" /> },
  { name: 'Isha', time: '8:00 PM', icon: <MoonIcon /> },
];

const PrayerTimeCard: React.FC<typeof prayerTimes[0]> = ({ name, time, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow-md text-center flex-1 hover:shadow-lg transition-shadow">
    <div className="text-yellow-500 w-8 h-8 mx-auto mb-2">{icon}</div>
    <p className="font-semibold text-lg text-gray-800">{name}</p>
    <p className="text-gray-600">{time}</p>
  </div>
);

const PrayersPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-iscj-blue-dark">Prayer Times</h1>
        <p className="text-lg text-gray-500 mt-2">Daily prayer times and information about our prayer facilities.</p>
      </header>

      <section className="bg-white p-8 rounded-lg shadow-lg mb-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Today's Prayer Times</h2>
        <p className="text-center text-gray-500 mb-6">Times are approximate and may vary by season</p>
        <div className="flex flex-wrap justify-center gap-4">
          {prayerTimes.map(prayer => (
            <PrayerTimeCard key={prayer.name} {...prayer} />
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Prayer Guidelines</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Arrive 10 minutes before prayer time</li>
            <li>Perform wudu in designated areas</li>
            <li>Maintain silence in prayer hall</li>
            <li>Follow imam's lead during congregation</li>
          </ul>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Facilities</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Separate prayer areas for men and women</li>
            <li>Wudu facilities available</li>
            <li>Prayer rugs provided</li>
            <li>Wheelchair accessible</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default PrayersPage;
