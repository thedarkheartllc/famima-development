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
  birthDate?: string;
  color: string;
  createdAt: Date;
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
  personId: string;
  familyId: string; // Reference to the family this photo belongs to
  filename: string;
  storagePath: string;
  uploadedAt: Date;
  takenAt?: Date;
  size: number;
  url?: string; // Firebase Storage download URL
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
