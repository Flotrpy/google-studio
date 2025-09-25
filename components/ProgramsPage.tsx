
import React from 'react';
import { BookIcon, UsersIcon, HeartIcon, ClockIcon, PersonIcon } from './icons/Icons';

const programs = [
  {
    title: 'Islamic Studies',
    category: 'Education',
    icon: <BookIcon />,
    description: 'Comprehensive Islamic education for all ages',
    time: 'Sundays 10:00 AM - 12:00 PM',
    ages: 'All Ages',
  },
  {
    title: 'Youth Group',
    category: 'Youth',
    icon: <UsersIcon />,
    description: 'Activities and mentorship for teenagers',
    time: 'Saturdays 2:00 PM - 4:00 PM',
    ages: 'Ages 13-18',
  },
  {
    title: 'Community Service',
    category: 'Service',
    icon: <HeartIcon />,
    description: 'Volunteer opportunities to serve the community',
    time: 'Monthly Projects',
    ages: 'All Ages',
  },
  {
    title: 'Arabic Classes',
    category: 'Education',
    icon: <BookIcon />,
    description: 'Learn to read and understand Arabic',
    time: 'Wednesdays 7:00 PM - 8:30 PM',
    ages: 'Adults',
  },
];

const ProgramCard: React.FC<typeof programs[0]> = ({ title, category, icon, description, time, ages }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl hover:border-iscj-blue-light transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center space-x-3">
         <div className="text-yellow-500">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">{category}</span>
    </div>
    <p className="text-gray-600 mb-6">{description}</p>
    <div className="space-y-3 text-gray-500">
      <div className="flex items-center">
        <ClockIcon className="w-5 h-5 mr-2" />
        <span>{time}</span>
      </div>
      <div className="flex items-center">
        <PersonIcon className="w-5 h-5 mr-2" />
        <span>{ages}</span>
      </div>
    </div>
  </div>
);


const ProgramsPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-iscj-blue-dark">Programs</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {programs.map((program, index) => (
          <ProgramCard key={index} {...program} />
        ))}
      </div>
    </div>
  );
};

export default ProgramsPage;
