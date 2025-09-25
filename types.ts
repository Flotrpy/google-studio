
export type Page = 'Home' | 'Programs' | 'Events' | 'Prayers' | 'Contact' | 'Admin';

export interface AppEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD format
  time: string;
  location: string;
  description?: string;
}
