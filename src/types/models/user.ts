import { SelectItem } from '@mantine/core';
import { BaseModel } from '.';

export interface User extends BaseModel {
  fullName?: string;
  userName?: string;
  password?: string;
  email?: string;
  phone?: string;
  role?: Role;
  address?: string;
  city?: string;
  createdDate?: string;
  district?: string;
  modifiedDate?: string;
  status?: number;
  ward?: string;
}

export enum Role {
  admin = 'ADMIN',
  staff = 'STAFF',
  customer = 'CUSTOMER',
}

export const SelectRoleOptions: SelectItem[] = [
  { value: Role.admin, label: 'Admin' },
  {
    value: Role.staff,
    label: 'Nhân viên',
  },
  {
    value: Role.customer,
    label: 'Khách hàng',
  },
];
