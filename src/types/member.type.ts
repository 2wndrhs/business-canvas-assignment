import { Dayjs } from 'dayjs';

export type FieldKey =
  | 'name'
  | 'address'
  | 'memo'
  | 'registrationDate'
  | 'occupation'
  | 'emailConsent';
export type FieldType = 'text' | 'textarea' | 'date' | 'select' | 'checkbox';
export type OccupationType = '개발자' | 'PO' | '디자이너';

export interface Field {
  key: FieldKey;
  type: FieldType;
  label: string;
  required: boolean;
  options?: string[];
}

export interface RecordType {
  key: React.Key;
  name: string;
  address: string;
  memo: string;
  registrationDate: string | Dayjs;
  occupation: OccupationType;
  emailConsent: boolean;
}
