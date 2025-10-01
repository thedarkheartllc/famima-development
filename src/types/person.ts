export interface Person {
  id: string;
  personId: string;
  name: string;
  birthDate?: string;
  color: string;
  createdAt: Date;
  relationshipType?: "parent" | "child" | "partner" | "grandchild" | "other";
  partnerId?: string; // ID of partner if this person has a partner
  parentIds?: string[]; // IDs of parents
}
