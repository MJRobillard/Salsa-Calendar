export interface VenueEvent {
  id: string;
  name: string;
  date: string;
  doorTime?: string;
  startTime?: string;
  endTime?: string;
  minimumAge?: number;
  promoter?: string;
  support?: string;
  description?: string;
  websiteUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  status: string;
  announceArtists: AnnounceArtist[];
  artists: Artist[];
  venue: {
    name: string;
  };
  footerContent?: string;
  ticketsUrl?: string;
  announceImages: AnnounceImage[];
}

export interface AnnounceArtist {
  applemusic?: string;
  bandcamp?: string;
  facebook?: string;
  instagram?: string;
  lastfm?: string;
  name: string;
  songkick?: string;
  spotify?: string;
  twitter?: string;
  website?: string;
  wikipedia?: string;
  youtube?: string;
}

export interface Artist {
  bio?: string;
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
}

export interface AnnounceImage {
  name: string;
  highlighted: boolean;
  versions: {
    thumb: {
      src: string;
    };
    cover: {
      src: string;
    };
  };
}

export interface EventsResponse {
  data: {
    paginatedEvents: {
      collection: VenueEvent[];
      metadata: {
        currentPage: number;
        limitValue: number;
        totalCount: number;
        totalPages: number;
      };
    };
  };
}

export interface FetchEventsParams {
  accountIds?: number[];
  startDate?: string;
  endDate?: string;
  search?: string;
  searchScope?: string;
  limit?: number;
  page?: number;
}

export async function fetchVenueEvents(params: FetchEventsParams = {}): Promise<EventsResponse> {
  const {
    accountIds = [1228], // Ashkenaz default
    startDate = new Date().toISOString().split('T')[0],
    endDate,
    search = '',
    searchScope = '',
    limit,
    page = 1
  } = params;

  const response = await fetch('/api/venue-pilot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accountIds,
      startDate,
      endDate,
      search,
      searchScope,
      limit,
      page
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch venue events: ${response.statusText}`);
  }

  return response.json();
}

// Helper function to get events for a specific date range
export async function fetchEventsInDateRange(
  startDate: string,
  endDate: string,
  accountIds: number[] = [1228]
): Promise<VenueEvent[]> {
  const response = await fetchVenueEvents({
    accountIds,
    startDate,
    endDate
  });
  
  return response.data.paginatedEvents.collection;
}

// Helper function to search for events
export async function searchVenueEvents(
  searchTerm: string,
  accountIds: number[] = [1228]
): Promise<VenueEvent[]> {
  const response = await fetchVenueEvents({
    accountIds,
    search: searchTerm
  });
  
  return response.data.paginatedEvents.collection;
}

// Helper function to get upcoming events
export async function getUpcomingEvents(
  accountIds: number[] = [1228],
  limit?: number
): Promise<VenueEvent[]> {
  const today = new Date().toISOString().split('T')[0];
  const response = await fetchVenueEvents({
    accountIds,
    startDate: today,
    limit
  });
  
  return response.data.paginatedEvents.collection;
} 