import { MoreOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Dropdown,
  Flex,
  Layout,
  Table,
  TableColumnsType,
  TableColumnType,
  Typography,
} from 'antd';
import { useState } from 'react';
import { INITIAL_RECORDS, MEMBER_FIELDS } from './constants';
import MemberModal from './MemberModal';
import { Field, RecordType } from './types/member.type';

function App() {
  const [open, setOpen] = useState(false);

  const [records, setRecords] = useState<RecordType[]>(INITIAL_RECORDS);
  const [currentRecord, setCurrentRecord] = useState<RecordType | null>(null);

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

  const columns: TableColumnsType<RecordType> = [
    ...MEMBER_FIELDS.map<TableColumnType<RecordType>>((field) => {
      const column: TableColumnType<RecordType> = {
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
      align: 'center',
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'edit',
                label: <Typography.Text>수정</Typography.Text>,
                onClick: () => {
                  setCurrentRecord(record);
                  setOpen(true);
                },
              },
              {
                type: 'divider',
              },
              {
                key: 'delete',
                label: <Typography.Text type="danger">삭제</Typography.Text>,
                onClick: () => console.log('delete', record),
              },
            ],
            className: 'min-w-45',
          }}
          trigger={['click']}
        >
          <Button icon={<MoreOutlined />} type="text" />
        </Dropdown>
      ),
    },
  ];

  return (
    <Layout className="font-pretendard">
      <Layout.Header className="flex h-12 items-center justify-center bg-white px-3.5">
        <Flex justify="space-between" align="center" className="flex-1">
          <Typography.Title className="mb-0 text-base font-semibold">회원 목록</Typography.Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setCurrentRecord(null);
              setOpen(true);
            }}
          >
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
      <MemberModal open={open} onOpenChange={setOpen} initialValues={currentRecord} />
    </Layout>
  );
}

export default App;
