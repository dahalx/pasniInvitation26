export interface OrnamentMessage {
  id: number | string;
  author: string;
  note: string;
  color: string;
  x: number;
  y: number;
  time: string;
}

export interface RSVPRecord {
  id: string;
  name: string;
  attending: 'yes' | 'no';
  guests: number;
  dietaryNotes?: string;
  createdAt: string;
}

export interface RsvpSummaryResponse {
  status: string;
  authorized: boolean;
  totalAttending: number;
  count: number;
  attendingCount: number;
  declinedCount: number;
  rsvps?: RSVPRecord[];
}

export type TabKey = 'countdown' | 'where' | 'registry' | 'tree';
export type Language = 'en' | 'ne';
