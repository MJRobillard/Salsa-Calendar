# QR Code Scanner Implementation

## Overview
This implementation adds QR code scanning functionality to the Salsa Calendar application, allowing users to scan QR codes and record their check-in time.

## Features

### 1. Camera Permission Request
- The scanner automatically requests camera permission when activated
- Graceful fallback if camera access is denied
- Clear user feedback about permission status

### 2. QR Code Scanning
- Uses the `html5-qrcode` library for reliable scanning
- Real-time camera feed with QR code detection
- Configurable scanning parameters (FPS, QR box size, aspect ratio)

### 3. Time Recording
- Integrates with World Time API to get accurate current time
- Fallback to local time if API is unavailable
- Records exact timestamp of successful QR scan

### 4. User Interface
- Modal-based scanner interface
- Success confirmation with scan details
- Check-in history tracking
- Responsive design matching the app's theme

## Components

### QRScanner Component (`src/app/components/QRScanner.tsx`)
- Main scanner component with camera integration
- Handles camera permissions and scanning lifecycle
- Provides user feedback and error handling

### Profile Page Integration
- Added "Scan QR Code" button in Quick Actions
- QR Check-in History section showing last scan time
- Seamless integration with existing profile functionality

## Usage

### For Users
1. Navigate to Profile page
2. Click "Scan QR Code" in Quick Actions
3. Grant camera permission when prompted
4. Point camera at any QR code
5. View check-in confirmation with timestamp
6. Check scan history in the QR Check-in History section

### For Developers
1. Import the QRScanner component
2. Use the `onScanComplete` callback to handle successful scans
3. The callback receives the scan timestamp as a string
4. Handle the `onClose` callback for modal management

## API Integration

### World Time API
- Endpoint: `http://worldtimeapi.org/api/ip`
- Provides accurate current time based on user's IP location
- Fallback to local time if API fails

## Dependencies

- `html5-qrcode`: QR code scanning library
- `lucide-react`: Icon components
- React hooks for state management

## Browser Compatibility

- Requires HTTPS in production (camera access)
- Modern browsers with WebRTC support
- Mobile-friendly with responsive design

## Security Considerations

- Camera access requires explicit user permission
- No persistent storage of camera data
- QR code content is displayed but not stored
- Time API calls are made over HTTP (consider HTTPS for production)

## Testing

A test page is available at `/test-qr` to verify scanner functionality:
- Isolated testing environment
- No authentication required
- Clear success/failure feedback

## Future Enhancements

- Persistent storage of check-in history
- QR code generation for events
- Integration with event management system
- Analytics and reporting features
