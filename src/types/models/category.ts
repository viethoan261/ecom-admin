import { BaseModel } from '.';

export interface Category extends BaseModel {
  name?: string;
  description?: string;
  status?: CategoryStatus;
  categoryParentID?: number;
}

export enum CategoryStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export const CategoryStatusStrategy = {
  [CategoryStatus.ACTIVE]: {
    label: 'Hoạt động',
  },
  [CategoryStatus.INACTIVE]: {
    label: 'Không hoạt động',
  },
};
