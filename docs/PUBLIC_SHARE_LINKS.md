# Public Share Links Implementation

## Overview

Add public share links for family galleries. Authenticated users get full access, public viewers get read-only access.

## Implementation

### Routes

```
/gallery/[name]    # Authenticated view (current)
/share/[shareId]   # Public share view (new)
```

### Database Schema

```typescript
interface ShareLink {
  id: string;
  shareId: string; // Unique URL identifier
  familyId: string;
  personId: string;
  personName: string;
  createdBy: string;
  createdAt: Date;
  isActive: boolean;
  viewCount: number;
}
```

### Security Rules

```javascript
// Allow public read access
match /shareLinks/{shareId} {
  allow read: if true;
  allow write: if request.auth != null &&
    request.auth.uid == resource.data.createdBy;
}

match /photos/{photoId} {
  allow read: if true;
  allow write: if request.auth != null &&
    resource.data.familyId == request.auth.uid;
}
```

### Implementation Steps

1. **Create share link hook** (`src/hooks/useShareLinks.ts`)

   - Generate unique share IDs
   - Create/manage share links
   - Track analytics

2. **Update gallery component** (`src/app/components/GalleryContent.tsx`)

   - Add `isPublicView` prop
   - Hide upload/delete for public view

3. **Create public route** (`src/app/share/[shareId]/page.tsx`)

   - Fetch share link details
   - Display read-only gallery

4. **Add share management** (`src/app/components/ShareLinkManager.tsx`)

   - Generate share links
   - Copy URLs to clipboard
   - Manage existing shares

5. **Update admin dashboard** (`src/app/admin/page.tsx`)
   - Add share link management section

### User Flow

- **Family members**: Generate share links from admin dashboard
- **Public viewers**: Click share link → read-only gallery with attribution

## Next Steps

1. Create share link database schema
2. Implement public viewing route
3. Update gallery for read-only mode
4. Add share management UI
