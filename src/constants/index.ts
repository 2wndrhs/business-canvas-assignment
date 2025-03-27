import { Field } from '../types/member.type';

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
