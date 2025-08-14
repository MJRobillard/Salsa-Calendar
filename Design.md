Salsa @ Cal — Dashboard Design Spec (AI-Ready)
0) Tech & Conventions

Framework: Next.js (App Router, TypeScript, Server Actions for Firestore writes where safe)

Auth: Firebase Auth (Google)

DB: Firestore (rules below)

Storage: Firebase Storage (media)

UI: TailwindCSS (design tokens + utility classes)

Charts: react-chartjs-2 or recharts

QR: qrcode.react for generating; native camera + @zxing/browser for scanning

State: Minimal local state + Firestore listeners; lightweight zustand allowed for UI only

Icons: lucide-react

Accessibility: WCAG 2.1 AA, keyboard-first nav, prefers-reduced-motion respected

1) Visual System
1.1 Design Tokens (Tailwind theme.extend)
// tailwind.config.ts (excerpt)
extend: {
  colors: {
    brand: {
      maroon:  '#800000',
      charcoal:'#1A1A1A',
      gold:    '#FFD700',
      sand:    '#F5E6C8',
      paper:   '#0F0F10'
    }
  },
  gradientColorStops: ({ theme }) => ({
    ...theme('colors'),
    accentFrom: '#800000',
    accentTo:   '#FF9A3E' // warm gold-orange
  }),
  boxShadow: {
    card: '0 8px 24px rgba(0,0,0,.25)',
    glow: '0 0 0 2px rgba(255,215,0,.25)'
  },
  borderRadius: { xl2: '1.25rem' }
}

1.2 Aesthetic Rules

Base: charcoal panels on paper background; cards use maroon headers or borders

Accent: gold for interactive states (focus, hover, KPI numbers, chart strokes)

Gradients: bg-gradient-to-tr from-accentFrom to-accentTo for CTAs/hover

Cards: rounded (rounded-xl2) with subtle shadow (shadow-card)

Charts: 1–2 lines max per chart; gold for primary; desaturate others; gridlines muted

Typography:

Headings: Montserrat or Poppins (700)

Body: Inter (400/500)

Line-height ≥ 1.5; letter-spacing normal

1.3 Accessibility & Motion

Color contrast ≥ 4.5:1 for text on maroon/charcoal; provide focus rings in gold

prefers-reduced-motion: reduce → disable chart animations & large parallax

Keyboard loops: Sidebar → Content → Header → return; visible focus at all times

2) IA & Routes (App Router)
/                -> Public Home (signed-out)
/dashboard       -> Member dashboard (protected)
/events          -> Public events calendar (also nested modals for RSVP)
/media           -> Public gallery (signed-in can upload)
/about           -> RSO/DeCal/Team
/contact         -> Simple form / mailto
/settings        -> Member settings (role, styles, notifications)


Route Guards

If !user and path starts with /dashboard|/settings, redirect → / with sign-in CTA

3) Component Inventory (with props & acceptance)
3.1 Global

<Sidebar items=[{icon,label,href}] activeHref />
AC: Collapses at <md; keyboard navigable; active state in gold; hover gold icon.

<TopBar user avatar onSignOut />
AC: Shows user avatar & quick actions; loading skeleton present.

3.2 Public Home (Signed-out)

<HeroCTA onSignIn />
AC: Maroon→gold gradient CTA “Join Salsa @ Cal”; contrast ok; mobile readable.

<PublicCalendar eventsSource="google:XXXX" />
AC: Month/week toggle; click to open details (time, location, description).

<AboutPreview />
AC: 3 cards: RSO, DeCal, Competitive Team; links to /about.

3.3 Dashboard (Signed-in)

Row A

<NextEventCard event rsvpStatus onRSVP />
AC: Shows date/time/location; RSVP change persists to Firestore; success toast.

Row B (3 cards)

<QRCheckinCard mode="scan|show" userId />
AC: scan: opens camera, decodes; show: renders personal QR with UID; network & permission errors handled.

<ProgressSummary styles={[Salsa,Bachata,Cumbia]} data />
AC: Bars/dials with weekly deltas; tooltips; empty state explains how to earn progress.

<LatestPhotos thumbnails onOpenGallery />

Row C

<JourneyLineChart data=[{date,attended}] />
AC: Line trends attendance or lessons/week; empty state skeleton.

<SkillMixDonut data=[{style,minutes}]/[{style,sessions}] />
AC: Donut with legend; keyboard focus on segments; percent labels.

Row D

<EventHistory items=[{date,type,role,location}] />
AC: Sortable by date; paginated; export CSV client-side.

3.4 Settings

<RoleSelector value onChange /> (Lead/Follow/Both)

<StyleSelector values onChange /> (Salsa/Bachata/Cumbia)

Notification toggles (email, calendar reminders)

4) Data Model (Firestore)
users/{uid}
  displayName: string
  email: string
  photoURL: string
  role: 'lead'|'follow'|'both'
  styles: string[] // ['salsa','bachata','cumbia']
  createdAt: ts
  metrics:
    totalSessions: number
    minutesByStyle: { salsa: number, bachata: number, cumbia: number }

events/{eventId}
  title: string
  start: ts
  end: ts
  location: string
  type: 'lesson'|'social'|'performance'
  public: boolean
  qrCode: string // payload or short id used for check-in

rsvps/{eventId}_{uid}
  eventId: string
  uid: string
  status: 'going'|'interested'|'not_going'
  updatedAt: ts

attendance/{eventId}_{uid}
  eventId: string
  uid: string
  scannedAt: ts
  roleAtEvent: 'lead'|'follow'
  minutes: number // optional, defaults by event type

media/{mediaId}
  url: string
  uploadedBy: uid
  createdAt: ts
  caption: string
  tags: string[]
  public: boolean


Derived Collections/Views

user_attendance/{uid}/events/{eventId} (optional mirror for fast profile loads)

Cloud Function can aggregate metrics.minutesByStyle on new attendance.

5) Security Rules (minimum viable)
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {

    function isSignedIn() { return request.auth != null; }
    function isOwner(uid) { return isSignedIn() && request.auth.uid == uid; }

    match /users/{uid} {
      allow read: if isSignedIn();
      allow create: if isOwner(uid);
      allow update: if isOwner(uid);
    }

    match /events/{eventId} {
      allow read: if true; // public events visible
      allow create, update, delete: if false; // restrict to admins later
    }

    match /rsvps/{docId} {
      allow read: if isSignedIn();
      allow create, update: if isSignedIn() && request.resource.data.uid == request.auth.uid;
    }

    match /attendance/{docId} {
      allow read: if isSignedIn() && (resource.data.uid == request.auth.uid);
      allow create: if isSignedIn() && request.resource.data.uid == request.auth.uid;
      allow update, delete: if false; // immutable entries
    }

    match /media/{mediaId} {
      allow read: if resource.data.public == true || isSignedIn();
      allow create: if isSignedIn();
      allow update, delete: if isSignedIn() && request.resource.data.uploadedBy == request.auth.uid;
    }
  }
}

6) Signed-out vs Signed-in Specifications
6.1 Signed-out (Public)

Hero: maroon→gold CTA “Join Salsa @ Cal” + 1-line value prop

Calendar: embed Google Calendar; event click opens detail drawer

About Preview: three cards; link to /about

Sign-in Prompt: gold button → Google sign-in
AC: No private data; layout passes Lighthouse a11y ≥ 90.

6.2 Signed-in (Member)

Show full Dashboard with all modules

Personalized greeting, avatar

Real-time updates from Firestore listeners
AC: First paint < 2.5s on mid-tier mobile; spinners/skeletons present.

7) First-time User Path (Acceptance)

Visit / signed-out → Sees hero, calendar, About preview

Click CTA → Google sign-in modal; on success, create users/{uid}

Onboarding modal → choose role + styles → persisted to users/{uid}

Arrive /dashboard → Sees NextEvent, QR card, Progress; empty states explain next steps

At event → Opens QR scanner; scans → attendance write succeeds; progress updates within 2s

8) Attendance QR Flow (Guardrails)

QR payload format: SALSA@CAL|eventId|isoDate|nonce

Validation:

event exists + within ±6h window

nonce unused (prevent replays)

write attendance/{eventId}_{uid} if not present

Edge cases: camera denied, offline (queue write and retry), duplicate scan (toast: “Already checked in”)

9) Charts & Data Viz

Journey Line: x = week start; y = sessions (0–5); tooltip shows dates & event types

Skill Mix Donut: slices = style minutes or sessions; center number = total this month

Color Use: primary stroke/fill = gold; comparative = maroon at 60% opacity

Empty States: friendly copy + “How to make this move” tips

10) Responsiveness

Mobile (<640px): Sidebar collapses to bottom nav; cards stack 1-col; charts switch to sparkline variant

Tablet (≥640px): 2-col grid; sidebar overlay on toggle

Desktop (≥1024px): 12-col grid; standard sidebar

Performance Budgets

JS < 220KB gz on first load (route-level code splitting)

Images lazy-loaded; next/image used everywhere

11) Content & Tone (microcopy)

Warm, welcoming, concise.

Button verbs: Join, Scan to Check-in, RSVP, Upload, Edit Preferences

Error copy offers recovery (“Try again,” “Check camera permissions”)

12) Analytics & Telemetry

page_view, sign_in_success, rsvp_update, qr_scan_success|fail, attendance_write_success|dup

Use Google Analytics 4 or privacy-friendly alternative; never log email/UID in analytics

13) QA Checklist (definition of done)

 All routes render with mock data (Storybook or local fixtures)

 Auth redirect logic tested (signed-in/out)

 Firestore rules simulation passes for CRUD paths above

 Keyboard nav through sidebar, cards, modals

 High-contrast mode & prefers-reduced-motion verified

 Mobile scan flow works on iOS + Android (Safari/Chrome)

 Lighthouse (mobile): Performance ≥ 80, A11y ≥ 90, Best Practices ≥ 90