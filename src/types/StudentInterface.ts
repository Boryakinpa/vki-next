interface StudentInterface {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  groupName: string;
  isDeleted: boolean;
  groupId: number;
  contacts: string;
  uuid?: string;
}

export default StudentInterface;
