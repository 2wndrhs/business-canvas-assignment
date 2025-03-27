import { Field, RecordType } from '../types/member.type';

export const MEMBER_FIELDS: Field[] = [
  {
    key: 'name',
    type: 'text',
    label: '이름',
    required: true,
  },
  {
    key: 'address',
    type: 'text',
    label: '주소',
    required: false,
  },
  {
    key: 'memo',
    type: 'textarea',
    label: '메모',
    required: false,
  },
  {
    key: 'registrationDate',
    type: 'date',
    label: '가입일',
    required: true,
  },
  {
    key: 'occupation',
    type: 'select',
    label: '직업',
    required: false,
    options: ['개발자', 'PO', '디자이너'],
  },
  {
    key: 'emailConsent',
    type: 'checkbox',
    label: '이메일 수신 동의',
    required: false,
  },
];

export const INITIAL_RECORDS: RecordType[] = [
  {
    key: '1',
    name: 'John Doe',
    address: '서울 강남구',
    memo: '외국인',
    registrationDate: '2024-10-02',
    occupation: '개발자',
    emailConsent: true,
  },
  {
    key: '2',
    name: 'Foo Bar',
    address: '서울 서초구',
    memo: '한국인',
    registrationDate: '2024-10-01',
    occupation: 'PO',
    emailConsent: false,
  },
];
