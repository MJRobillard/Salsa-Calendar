import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const icsUrl = 'https://calendar.google.com/calendar/ical/salsaatcal%40gmail.com/public/basic.ics';
    
    const response = await fetch(icsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SalsaCal/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ICS feed: ${response.status}`);
    }

    const icsData = await response.text();
    
    return new NextResponse(icsData, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      },
    });
  } catch (error) {
    console.error('Error fetching ICS feed:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch calendar data' },
      { status: 500 }
    );
  }
}
