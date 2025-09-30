# Firebase Integration Plan

## 1. Firebase Project Setup

```bash
npm install firebase
```

- Create Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
- Enable Authentication, Firestore, and Storage
- Get config keys and add to `.env.local`

## 2. Firebase Configuration

- Create `src/lib/firebase.ts` with config
- Initialize Firebase app, auth, firestore, storage
- Set up security rules for Storage and Firestore

## 3. Database Schema (Firestore)

```typescript
// Collections:
/people/{personId} {
  name: string
  birthDate?: string
  color: string
  createdAt: timestamp
}

/photos/{photoId} {
  personId: string
  filename: string
  storagePath: string
  uploadedAt: timestamp
  takenAt?: timestamp
  size: number
}
```

## 4. Storage Structure

```
/photos/
  /{personId}/
    /{photoId}.jpg
```

## 5. Implementation Steps

### Step 1: Replace File System with Firebase

- Update `gallery/[name]/page.tsx` to fetch from Firestore
- Create `src/hooks/usePhotos.ts` for photo data fetching
- Remove `fs` and `path` imports

### Step 2: Upload Interface

- Create `src/components/PhotoUpload.tsx`
- Add upload page at `/admin/upload`
- Use `react-dropzone` for drag-and-drop
- Process images with `sharp` before upload

### Step 3: Authentication

- Add `src/components/Auth.tsx`
- Protect admin routes with middleware
- Guest users see read-only galleries

### Step 4: Admin Dashboard

- Create `/admin` page with person management
- Add photo deletion/editing capabilities
- Bulk upload interface

## 6. Security Rules

```javascript
// Storage rules
match /photos/{personId}/{photoId} {
  allow read: if true;
  allow write: if request.auth != null;
}

// Firestore rules
match /photos/{photoId} {
  allow read: if true;
  allow write: if request.auth != null;
}
```

## 7. Migration Strategy

- All photos now stored in Firebase Storage
- No fallback to public directory needed

## 8. Performance Optimizations

- Use Firebase Storage CDN for fast delivery
- Implement image resizing for thumbnails
- Add pagination for large photo collections
- Cache frequently accessed data

## 9. Environment Variables

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## 10. Success Criteria

- [ ] Photos upload to Firebase Storage
- [ ] Gallery loads from Firestore
- [ ] Admin authentication works
- [ ] Mobile uploads function
- [ ] Existing photos still display during migration
