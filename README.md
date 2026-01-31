# React + Vite
How It Works
1. Create a Secret
Go to: https://share-secret-front-end.vercel.app

Paste your text in the box

Set time limit (optional) - e.g., "3600" = 1 hour

Set view limit (optional) - e.g., "5" = maximum 5 views

Click "Create Paste"

Copy the generated link

2. Share the Link
Send the link to anyone

They can view the secret content

After time limit OR view limit is reached → Content disappears forever

3. View a Secret
Open the shared link

Content appears once

Each view reduces remaining views

No login required

API Functions
Create Secret
javascript
POST https://share-secret-backend.onrender.com/api/pastes

// Example
{
  "content": "My secret password",
  "ttl_seconds": 3600,    // Delete after 1 hour
  "max_views": 3          // Delete after 3 views
}
Get Secret
javascript
GET https://share-secret-backend.onrender.com/api/pastes/{id}

// Example response
{
  "content": "My secret password",
  "remaining_views": 2,
  "expires_at": "2024-01-01T12:00:00.000Z"
}
Database Fields
Each secret has:

content: The secret text

createdAt: When created (timestamp)

expiresAt: When it will delete (timestamp)

maxViews: Maximum allowed views

views: How many times viewed

Features
✅ No registration needed

✅ Text disappears automatically

✅ Mobile-friendly design

✅ Copy link with one click

✅ Real-time view counter

Error Messages
"Invalid content" → Text is empty or wrong format

"Not found" → Link doesn't exist

"Expired" → Time limit reached

"View limit exceeded" → Too many views

"Server error" → Technical problem

Time Format
All times in milliseconds (JavaScript timestamp)

TTL in seconds (converted to milliseconds)

Example: ttl_seconds: 60 = 1 minute = 60,000 ms

Security Notes
No one can edit existing secrets

Content deleted permanently when expired

No user data stored

Links are random and hard to guess

Quick Start
Visit the website

Type your secret

Set limits (optional)

Click Create

Copy and share link

Secret disappears automatically

Support
If a link doesn't work:

It may have expired

It may have reached view limit

Try creating a new one
