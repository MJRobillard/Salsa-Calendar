import { NextRequest, NextResponse } from 'next/server';

const VENUE_PILOT_GRAPHQL_URL = 'https://www.venuepilot.co/graphql';

const EVENTS_QUERY = `
query ($accountIds: [Int!]!, $startDate: String!, $endDate: String, $search: String, $searchScope: String, $limit: Int, $page: Int) {
  paginatedEvents(arguments: {accountIds: $accountIds, startDate: $startDate, endDate: $endDate, search: $search, searchScope: $searchScope, limit: $limit, page: $page}) {
    collection {
      id
      name
      date
      doorTime
      startTime
      endTime
      minimumAge
      promoter
      support
      description
      websiteUrl
      twitterUrl
      instagramUrl
      ...AnnounceImages
      status
      announceArtists {
        applemusic
        bandcamp
        facebook
        instagram
        lastfm
        name
        songkick
        spotify
        twitter
        website
        wikipedia
        youtube
        __typename
      }
      artists {
        bio
        createdAt
        id
        name
        updatedAt
        __typename
      }
      venue {
        name
        __typename
      }
      footerContent
      ticketsUrl
      __typename
    }
    metadata {
      currentPage
      limitValue
      totalCount
      totalPages
      __typename
    }
    __typename
  }
}

fragment AnnounceImages on PublicEvent {
  announceImages {
    name
    highlighted
    versions {
      thumb {
        src
        __typename
      }
      cover {
        src
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  // Extract query parameters with defaults
  const accountIds = searchParams.get('accountIds')?.split(',').map(Number) || [1228]; // Ashkenaz default
  const startDate = searchParams.get('startDate') || new Date().toISOString().split('T')[0];
  const endDate = searchParams.get('endDate') || null;
  const search = searchParams.get('search') || '';
  const searchScope = searchParams.get('searchScope') || '';
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;

  try {
    const response = await fetch(VENUE_PILOT_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Origin': 'https://www.ashkenaz.com',
        'Referer': 'https://www.ashkenaz.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
      },
      body: JSON.stringify({
        operationName: null,
        variables: {
          accountIds,
          startDate,
          endDate,
          search,
          searchScope,
          limit,
          page
        },
        query: EVENTS_QUERY
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching venue events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch venue events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      accountIds = [1228],
      startDate = new Date().toISOString().split('T')[0],
      endDate = null,
      search = '',
      searchScope = '',
      limit,
      page = 1
    } = body;

    const response = await fetch(VENUE_PILOT_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Origin': 'https://www.ashkenaz.com',
        'Referer': 'https://www.ashkenaz.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
      },
      body: JSON.stringify({
        operationName: null,
        variables: {
          accountIds,
          startDate,
          endDate,
          search,
          searchScope,
          limit,
          page
        },
        query: EVENTS_QUERY
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching venue events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch venue events' },
      { status: 500 }
    );
  }
} 