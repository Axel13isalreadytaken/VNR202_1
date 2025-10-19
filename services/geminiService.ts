import { TIMELINE_DATA } from '../data/timelineData';
import type { TimelineEvent } from '../types';

// The function is kept async to maintain compatibility with the App component's structure,
// but it now resolves instantly with static data.
export const fetchTimelineData = async (): Promise<TimelineEvent[]> => {
  try {
    // Simply return the statically imported data.
    return Promise.resolve(TIMELINE_DATA);
  } catch (error) {
    console.error("Error loading static timeline data:", error);
    return Promise.resolve([]); // Return empty array on error.
  }
};
