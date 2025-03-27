import { MoreOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Flex,
  Layout,
  Table,
  TableColumnsType,
  TableColumnType,
  Typography,
} from 'antd';
import { useState } from 'react';

type FieldKey = 'name' | 'address' | 'memo' | 'registrationDate' | 'occupation' | 'emailConsent';
type FieldType = 'text' | 'textarea' | 'date' | 'select' | 'checkbox';
type OccupationType = '개발자' | 'PO' | '디자이너';

interface Field {
  key: FieldKey;
  type: FieldType;
  label: string;
  required: boolean;
}

const MEMBER_FIELDS: Field[] = [
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
  },
  {
    key: 'emailConsent',
    type: 'checkbox',
    label: '이메일 수신 동의',
    required: false,
  },
];

interface DataType {
  key: React.Key;
  name: string;
  address: string;
  memo: string;
  registrationDate: string;
  occupation: OccupationType;
  emailConsent: boolean;
}

function App() {
  const [records, setRecords] = useState<DataType[]>([
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
  ]);

  const getFiltersForField = (field: Field) => {
    if (field.key === 'emailConsent') {
      return [
        { text: '선택됨', value: true },
        { text: '선택 안함', value: false },
      ];
    }

    const uniqueValues = Array.from(
      new Set(records.map((record) => record[field.key])),
    ) as string[];
    return uniqueValues
      .filter((value) => value.length > 0)
      .map((value) => ({ text: value, value }));
  };

  const columns: TableColumnsType<DataType> = [
    ...MEMBER_FIELDS.map<TableColumnType<DataType>>((field) => {
      const column: TableColumnType<DataType> = {
        title: field.label,
        dataIndex: field.key,
        filters: getFiltersForField(field),
        onFilter: (value, record) => {
          if (field.key === 'emailConsent') {
            return record.emailConsent === value;
          }

          return record[field.key] === value;
        },
      };

      // 이메일 수신 동의 필드라면 Checkbox 렌더링
      if (field.key === 'emailConsent') {
        column.render = (value: boolean) => <Checkbox checked={value} />;
      }

      return column;
    }),
    {
      title: '',
      dataIndex: 'action',
      render: () => <Button icon={<MoreOutlined />} type="text" />,
    },
  ];

  return (
    <Layout className="font-pretendard">
      <Layout.Header className="flex h-12 items-center justify-center bg-white px-3.5">
        <Flex justify="space-between" align="center" className="flex-1">
          <Typography.Title className="mb-0 text-base font-semibold">회원 목록</Typography.Title>
          <Button type="primary" icon={<PlusOutlined />}>
            추가
          </Button>
        </Flex>
      </Layout.Header>

      <Layout.Content>
        <Table
          columns={columns}
          dataSource={records}
          pagination={false}
          size="middle"
          rowSelection={{
            type: 'checkbox',
          }}
        />
      </Layout.Content>
    </Layout>
  );
}

export default App;
