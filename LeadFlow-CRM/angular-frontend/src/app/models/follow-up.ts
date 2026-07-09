export interface FollowUp {
  id?: number;
  leadId: number;
  followUpDate: string;
  discussion: string;
  nextFollowUpDate?: string;
  status: string;
}