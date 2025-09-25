
import React, { useState } from 'react';
import type { AppEvent } from '../types';

interface AdminPageProps {
  currentEvents: AppEvent[];
  addEvent: (event: AppEvent) => void;
}

const AdminLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd verify credentials. Here, we just log in.
    onLogin();
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" name="username" id="username" defaultValue="admin" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-iscj-blue-light focus:border-iscj-blue-light" />
          </div>
          <div>
            <label htmlFor="password"className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" name="password" id="password" defaultValue="password" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-iscj-blue-light focus:border-iscj-blue-light" />
          </div>
          <button type="submit" className="w-full bg-iscj-blue-light text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC<{ onLogout: () => void; currentEvents: AppEvent[]; addEvent: (event: AppEvent) => void; }> = ({ onLogout, currentEvents, addEvent }) => {
    const [formState, setFormState] = useState({ title: '', date: '', time: '', location: '', description: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormState(prev => ({...prev, [name]: value}));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newEvent: AppEvent = {
            id: new Date().toISOString(),
            title: formState.title,
            date: formState.date,
            time: formState.time,
            location: formState.location,
            description: formState.description
        };
        addEvent(newEvent);
        setFormState({ title: '', date: '', time: '', location: '', description: '' });
    };

    return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-iscj-blue-dark">Admin Dashboard</h1>
        <button onClick={onLogout} className="bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition">
          Logout
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-green-500 mr-2">+</span> Add New Event
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField label="Event Title" name="title" value={formState.title} onChange={handleChange} placeholder="Event Title" required />
            <InputField label="Date" name="date" type="date" value={formState.date} onChange={handleChange} required />
            <InputField label="Time" name="time" type="time" value={formState.time} onChange={handleChange} required />
            <InputField label="Location" name="location" value={formState.location} onChange={handleChange} placeholder="Location" required/>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (optional)</label>
              <textarea name="description" id="description" value={formState.description} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-iscj-blue-light focus:border-iscj-blue-light"></textarea>
            </div>
            <button type="submit" className="w-full bg-iscj-blue text-white font-bold py-3 px-4 rounded-md hover:bg-iscj-blue-dark transition-colors">
              Add Event
            </button>
          </form>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Current Events ({currentEvents.length})</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {currentEvents.length === 0 ? (
                <p className="text-gray-500">No events added yet.</p>
            ) : (
                currentEvents.map(event => (
                    <div key={event.id} className="p-3 border rounded-md">
                        <p className="font-bold">{event.title}</p>
                        <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString('en-US', { timeZone: 'UTC' })} at {event.time} - {event.location}</p>
                    </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField: React.FC<{label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type?:string, placeholder?:string, required?:boolean}> = ({label, name, value, onChange, type='text', placeholder, required=false}) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        <input type={type} name={name} id={name} value={value} onChange={onChange} required={required} placeholder={placeholder} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-iscj-blue-light focus:border-iscj-blue-light" />
    </div>
);

const AdminPage: React.FC<AdminPageProps> = ({ currentEvents, addEvent }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="max-w-6xl mx-auto">
      {isLoggedIn ? (
        <AdminDashboard onLogout={() => setIsLoggedIn(false)} currentEvents={currentEvents} addEvent={addEvent} />
      ) : (
        <AdminLogin onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
};

export default AdminPage;
