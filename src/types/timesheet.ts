export interface Timesheet {
  id: string;
  contractorId: string;
  contractorName: string;
  date: string;
  project: string;
  hoursWorked: number;
  comments: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface TimesheetFormData {
  id: number;
  contractorId: number;
  contractorName: string;
  date: string;
  project: string;
  hoursWorked: number;
  comments: string;
}