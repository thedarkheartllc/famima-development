export interface Family {
  id: string; // Document ID (user.uid)
  email: string; // Primary contact email
  familyName: string; // "The Smith Family"
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
  relationshipType?: "parent" | "child" | "partner" | "grandchild" | "other";
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
