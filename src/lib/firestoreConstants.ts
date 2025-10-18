// Firestore Collections
export const COLLECTIONS = {
  FAMILIES: "families",
  PEOPLE: "people",
  PHOTOS: "photos",
  ALBUMS: "albums",
  SHARE_LINKS: "shareLinks",
} as const;

// Family Fields
export const FAMILY_FIELDS = {
  ID: "id",
  EMAIL: "email",
  FAMILY_NAME: "familyName",
  FAMILY_IMAGE: "familyImage",
  CREATED_AT: "createdAt",
} as const;

// Person Fields
export const PERSON_FIELDS = {
  ID: "id",
  PERSON_ID: "personId",
  FAMILY_ID: "familyId",
  NAME: "name",
  BIRTH_DATE: "birthDate",
  COLOR: "color",
  CREATED_AT: "createdAt",
  STORAGE_ID: "storageId",
  RELATIONSHIP_TYPE: "relationshipType",
  PARTNER_ID: "partnerId",
  PARENT_IDS: "parentIds",
} as const;

// Photo Fields
export const PHOTO_FIELDS = {
  ID: "id",
  PERSON_ID: "personId",
  ALBUM_ID: "albumId",
  FAMILY_ID: "familyId",
  FILENAME: "filename",
  STORAGE_PATH: "storagePath",
  UPLOADED_AT: "uploadedAt",
  TAKEN_AT: "takenAt",
  SIZE: "size",
  URL: "url",
} as const;

// Album Fields
export const ALBUM_FIELDS = {
  ALBUM_ID: "albumId",
  FAMILY_ID: "familyId",
  NAME: "name",
  DESCRIPTION: "description",
  EVENT_DATE: "eventDate",
  COLOR: "color",
  CREATED_AT: "createdAt",
} as const;

// Common Field Values
export const RELATIONSHIP_TYPES = {
  PARENT: "parent",
  CHILD: "child",
  PARTNER: "partner",
  GRANDCHILD: "grandchild",
  OTHER: "other",
} as const;
