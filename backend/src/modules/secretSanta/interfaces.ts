export interface UpdateGroupStateParams {
  groupId: number;
  newState: string;
}

export interface Member {
  id: number;
  familyId: number;
  photo: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  color: string;
}

export interface PreviousAssignment {
  date: string;
  santaId: number;
  recipientId: number;
}
