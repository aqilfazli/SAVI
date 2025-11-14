import { Role } from '../utils/permissions';

export interface UserData {
  fullName: string;
  email: string;
  role: Role;
  joinDate: string;
}

export default UserData;
