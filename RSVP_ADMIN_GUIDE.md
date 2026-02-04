# RSVP Admin Dashboard Guide

## Overview
The RSVP Admin Dashboard allows you to view all wedding guest RSVPs and export the data to Excel for easy management and record keeping.

## Accessing the Admin Dashboard
Navigate to: `https://your-domain.com/rsvp-admin`

## Features

### 1. Dashboard Statistics
The dashboard displays three key metrics:
- **Total RSVPs**: Total number of RSVP submissions
- **Attending**: Number of guests who confirmed attendance
- **Total Guests**: Combined count of primary guests and additional guests

### 2. Search Functionality
Search for RSVPs using:
- Guest name (primary or additional guests)
- Phone number
- Any partial match from the database

### 3. RSVP Display
Each RSVP entry shows:
- Primary guest name
- Attendance status (Attending/Not Attending) with color coding
- Phone number (if provided)
- Date submitted
- Special message (if provided)
- List of additional guests with their names

### 4. Excel Export
Click "Export to Excel" to download all RSVP data in a spreadsheet format.

**Export includes:**
- Primary guest names
- Additional guest names
- Attendance status
- Phone numbers
- Special messages
- Submission dates

**File naming:** `RSVP-List-YYYY-MM-DD.xlsx`

## Data Structure

### Database Tables
1. **rsvp** - Primary guest information
   - id (UUID)
   - primary_guest_name (VARCHAR)
   - phone_number (VARCHAR)
   - will_attend (BOOLEAN)
   - special_message (TEXT)
   - created_at (TIMESTAMP)

2. **rsvp_guests** - Additional guests
   - id (UUID)
   - rsvp_id (UUID - foreign key)
   - guest_name (VARCHAR)
   - created_at (TIMESTAMP)

## API Endpoint
The dashboard uses the `/api/rsvp-list` endpoint to fetch all RSVP data.

**Method:** GET
**Response:**
```json
{
  "success": true,
  "data": [...],
  "total": number
}
```

## Excel Export Functionality
The export uses the `xlsx` library to create properly formatted Excel files with:
- Column headers
- Formatted guest information
- Optimized column widths for readability

## Notes
- The dashboard automatically refreshes on load
- Search results are filtered in real-time
- All timestamps are displayed in your local date format
- Additional guests are indented and grouped under their primary guest
