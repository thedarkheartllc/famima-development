export interface Photo {
  id: string;
  personId: string;
  filename: string;
  storagePath: string;
  uploadedAt: Date;
  takenAt?: Date;
  size: number;
  url?: string; // Firebase Storage download URL
}
