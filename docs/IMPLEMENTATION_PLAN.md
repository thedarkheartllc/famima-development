# Family Privacy System Implementation Plan

## Overview

Transform existing single-family app into multi-tenant family system with private galleries.

## Current State

- ✅ Sign up creates family in `families` collection
- ✅ Authentication working
- ✅ Basic photo/people system exists
- ❌ No family isolation (all data shared)

## Step-by-Step Implementation

### Step 1: Update Type Definitions

**Files to modify:**

- `src/types/person.ts`
- `src/types/photo.ts`

**Changes:**

```typescript
// person.ts - ADD familyId field
export interface Person {
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

// photo.ts - ADD familyId field
export interface Photo {
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

### Step 2: Deploy Updated Firestore Rules

**File:** `firestore.rules`

**Current rules already updated, deploy them:**

```bash
firebase deploy --only firestore:rules
```

### Step 3: Update usePeople Hook

**File:** `src/hooks/usePeople.ts`

**Add familyId filtering:**

```typescript
// Before: Get all people
const peopleQuery = query(collection(db, "people"));

// After: Get only current family's people
const peopleQuery = query(
  collection(db, "people"),
  where("familyId", "==", user?.uid)
);
```

### Step 4: Update usePhotos Hook

**File:** `src/hooks/usePhotos.ts`

**Add familyId filtering:**

```typescript
// Before: Get all photos
const photosQuery = query(collection(db, "photos"));

// After: Get only current family's photos
const photosQuery = query(
  collection(db, "photos"),
  where("familyId", "==", user?.uid)
);
```

### Step 5: Update Photo Upload

**File:** `src/app/components/PhotoUpload.tsx`

**Add familyId when creating photos:**

```typescript
const photoData = {
  personId: selectedPersonId,
  familyId: user?.uid, // NEW: Add family reference
  filename: file.name,
  storagePath: `families/${user?.uid}/photos/${file.name}`,
  uploadedAt: new Date(),
  size: file.size,
  url: downloadURL,
};
```

### Step 6: Update Person Creation

**File:** `src/app/components/AddUserForm.tsx`

**Add familyId when creating people:**

```typescript
const personData = {
  personId: generateId(),
  familyId: user?.uid, // NEW: Add family reference
  name: formData.name,
  birthDate: formData.birthDate,
  color: generateColor(),
  createdAt: new Date(),
  relationshipType: formData.relationshipType,
};
```

### Step 7: Add Firebase Indexes

**In Firebase Console:**

1. Go to Firestore → Indexes
2. Add composite index: `people` collection
   - Fields: `familyId` (Ascending), `createdAt` (Ascending)
3. Add composite index: `photos` collection
   - Fields: `familyId` (Ascending), `uploadedAt` (Descending)

### Step 8: Data Migration (Optional)

**If you have existing data, create migration script:**

```typescript
// migration.ts - Run once to update existing data
import { db } from "./lib/firebase";
import { collection, getDocs, updateDoc } from "firebase/firestore";

async function migrateExistingData() {
  // Update existing people
  const peopleSnapshot = await getDocs(collection(db, "people"));
  peopleSnapshot.forEach((doc) => {
    updateDoc(doc.ref, { familyId: "default-family-id" });
  });

  // Update existing photos
  const photosSnapshot = await getDocs(collection(db, "photos"));
  photosSnapshot.forEach((doc) => {
    updateDoc(doc.ref, { familyId: "default-family-id" });
  });
}
```

### Step 9: Test Family Isolation

**Test scenarios:**

1. Create Family A account → Add people/photos
2. Create Family B account → Should see empty gallery
3. Verify Family A can't see Family B's data
4. Verify Family B can't see Family A's data

### Step 10: Update UI Components

**Files to check:**

- `src/app/components/FamilyTree.tsx`
- `src/app/components/GalleryContent.tsx`
- Any other components that display people/photos

**Ensure they use the filtered data from hooks.**

## Implementation Order

1. **Step 1**: Update types (5 min)
2. **Step 2**: Deploy rules (2 min)
3. **Step 3**: Update usePeople hook (10 min)
4. **Step 4**: Update usePhotos hook (10 min)
5. **Step 5**: Update photo upload (5 min)
6. **Step 6**: Update person creation (5 min)
7. **Step 7**: Add indexes (5 min)
8. **Step 8**: Test isolation (10 min)

**Total time: ~1 hour**

## Verification Checklist

- [ ] New families see empty galleries
- [ ] Existing families only see their data
- [ ] Photo uploads include familyId
- [ ] Person creation includes familyId
- [ ] Firestore rules deployed
- [ ] Composite indexes added
- [ ] No cross-family data leakage

## Rollback Plan

If issues arise:

1. Revert Firestore rules to allow all access
2. Remove familyId filtering from hooks
3. Keep familyId fields for future use
