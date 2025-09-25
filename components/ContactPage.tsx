
import React, { useState } from 'react';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon } from './icons/Icons';

const ContactInfoItem: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="flex items-start">
    <div className="text-iscj-blue-light mt-1 mr-4">{icon}</div>
    <div>
      <h4 className="font-semibold text-gray-700">{title}</h4>
      <div className="text-gray-600">{children}</div>
    </div>
  </div>
);

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: ''});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formState);
    setSubmitted(true);
  };
  
  return (
    <div className="max-w-6xl mx-auto">
       <header className="mb-10">
        <h1 className="text-4xl font-bold text-iscj-blue-dark">Contact Us</h1>
        <p className="text-lg text-gray-500 mt-2">Get in touch with us. We're here to help.</p>
      </header>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-8">
          <ContactInfoItem icon={<MapPinIcon />} title="Address">
            <p>123 Main Street</p>
            <p>Central Jersey, NJ 08901</p>
          </ContactInfoItem>
          <ContactInfoItem icon={<PhoneIcon />} title="Phone">
            <p>(732) 555-0123</p>
          </ContactInfoItem>
          <ContactInfoItem icon={<MailIcon />} title="Email">
            <p>info@iscj.org</p>
          </ContactInfoItem>
          <ContactInfoItem icon={<ClockIcon />} title="Office Hours">
            <p>Mon-Fri: 9:00 AM - 5:00 PM</p>
            <p>Sat-Sun: 10:00 AM - 3:00 PM</p>
          </ContactInfoItem>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Send us a Message</h3>
          <p className="text-gray-500 mb-6">We'll get back to you as soon as possible.</p>
          {submitted ? (
             <div className="text-center p-8 bg-green-100 text-green-800 rounded-lg">
                <h4 className="font-bold text-xl">Thank You!</h4>
                <p>Your message has been sent successfully.</p>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" name="name" id="name" value={formState.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-iscj-blue-light focus:border-iscj-blue-light" placeholder="Your full name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" id="email" value={formState.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-iscj-blue-light focus:border-iscj-blue-light" placeholder="your.email@example.com" />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
              <input type="text" name="subject" id="subject" value={formState.subject} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-iscj-blue-light focus:border-iscj-blue-light" placeholder="What is this regarding?" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea name="message" id="message" rows={4} value={formState.message} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-iscj-blue-light focus:border-iscj-blue-light" placeholder="Your message here..."></textarea>
            </div>
            <button type="submit" className="w-full bg-iscj-blue-light text-white font-bold py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              Send Message
            </button>
          </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
