export interface Family {
  id: string; // Document ID (user.uid)
  email: string; // Primary contact email
  familyName: string; // "The Smith Family"
  familyImage?: string; // URL to family photo
  createdAt: Date; // When family was created
}

export interface Person {
  id: string;
  personId: string;
  familyId: string; // Reference to the family this person belongs to
  name: string;
  birthDate?: string | null;
  color: string;
  createdAt: Date;
  storageId: string; // Formatted identifier for storage: "name-dateOfCreation"
  relationshipType?:
    | "parent"
    | "child"
    | "partner"
    | "grandchild"
    | "pet"
    | "other";
  partnerId?: string; // ID of partner if this person has a partner
  parentIds?: string[]; // IDs of parents
}

export interface Photo {
  id: string;
  personId?: string; // Optional - photos can belong to people or albums
  albumId?: string; // Optional - photos can belong to albums
  familyId: string; // Reference to the family this photo belongs to
  filename: string;
  storagePath: string;
  uploadedAt: Date;
  takenAt?: Date;
  size: number;
  url?: string; // Firebase Storage download URL
}

export interface Album {
  id: string; // Firestore document ID for updates
  albumId: string; // Formatted identifier: "name-dateOfCreation" (e.g., "christmas-2023-2024-10-18")
  familyId: string; // Reference to the family this album belongs to
  name: string; // Album name (e.g., "Christmas 2023", "Summer Vacation")
  description?: string; // Optional description of the album
  eventDate?: string; // Date of the event (YYYY-MM-DD format)
  color: string; // Color theme for the album
  createdAt: Date;
}

export interface ShareLink {
  id: string;
  shareId: string; // Unique URL identifier
  familyId: string;
  personId: string;
  personName: string;
  createdBy: string;
  createdAt: Date;
  isActive: boolean;
  viewCount: number;
  lastViewedAt?: Date;
}
