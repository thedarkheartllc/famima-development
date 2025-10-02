# Famima Database Schema - MVP

## Overview

Simple family photo sharing with private galleries per family.

## Collections

### 1. `families` Collection

```typescript
interface Family {
  id: string; // Document ID (user.uid)
  email: string;
  familyName: string;
  createdAt: Timestamp;
}
```

### 2. `people` Collection

Uses existing `Person` interface + `familyId`:

```typescript
interface Person {
  id: string;
  personId: string;
  familyId: string; // NEW: Reference to family
  name: string;
  birthDate?: string;
  color: string;
  createdAt: Date;
  relationshipType?: "parent" | "child" | "partner" | "grandchild" | "other";
  partnerId?: string;
  parentIds?: string[];
}
```

### 3. `photos` Collection

Uses existing `Photo` interface + `familyId`:

```typescript
interface Photo {
  id: string;
  personId: string;
  familyId: string; // NEW: Reference to family
  filename: string;
  storagePath: string;
  uploadedAt: Date;
  takenAt?: Date;
  size: number;
  url?: string;
}
```

## Simple Rules

### Family Isolation

- Query: `people` where `familyId == currentUser.uid`
- Query: `photos` where `familyId == currentUser.uid`

### Firestore Rules

```javascript
// families
match /families/{familyId} {
  allow read, write: if request.auth != null && request.auth.uid == familyId;
}

// people
match /people/{personId} {
  allow read, write: if request.auth != null &&
    resource.data.familyId == request.auth.uid;
}

// photos
match /photos/{photoId} {
  allow read, write: if request.auth != null &&
    resource.data.familyId == request.auth.uid;
}
```

## MVP Changes Needed

1. Add `familyId` to existing `Person` and `Photo` interfaces
2. Update queries to filter by `familyId`
3. Deploy Firestore rules
4. Add composite index: `(familyId, createdAt)`
