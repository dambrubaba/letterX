export interface Newsletter {
  _id: string;
  title: string;
  description: string;
  sampleIssue: string;
  creator: string;
  subscribers: string[];
  createdAt: Date;
}
