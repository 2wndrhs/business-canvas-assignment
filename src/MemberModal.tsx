import { CloseOutlined } from '@ant-design/icons';
import { Checkbox, DatePicker, Flex, Form, Input, Modal, Select, Typography } from 'antd';
import { ReactNode, useEffect } from 'react';
import { MEMBER_FIELDS } from './constants';
import { DataType, Field, FieldType } from './types/member.type';

const FIELD_TYPE_COMPONENTS: Record<FieldType, (field: Field) => React.ReactNode> = {
  text: () => <Input placeholder="Input" />,
  textarea: () => <Input.TextArea placeholder="Textarea" rows={2} />,
  date: () => <DatePicker placeholder="Select date" />,
  select: (field) => (
    <Select
      className="w-[85px]"
      options={field.options?.map((option) => ({
        label: option,
        value: option,
      }))}
    />
  ),
  checkbox: () => <Checkbox />,
};

interface MemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MemberModal({ open, onOpenChange }: MemberModalProps) {
  const [form] = Form.useForm<DataType>();

  useEffect(() => {
    form.setFieldValue('occupation', '개발자');
  }, [form]);

  const handleSubmit = (fields) => {
    fields.registrationDate = fields.registrationDate.format('YYYY-MM-DD');
    onOpenChange(false); // 모달 닫기
  };

  return (
    <Modal
      forceRender
      open={open}
      title={<Typography.Text>회원 추가</Typography.Text>}
      width={520}
      okText="저장"
      cancelText="취소"
      closeIcon={<CloseOutlined />}
      onOk={() => form.submit()}
      onCancel={() => onOpenChange(false)}
      destroyOnClose
      styles={{
        content: {
          padding: 0,
        },
        header: {
          borderBottom: '1px solid #f0f0f0',
          padding: '12px 16px',
        },
        body: {
          padding: '0px 24px',
        },
        footer: {
          borderTop: '1px solid #0000000F',
          backgroundColor: '#00000005',
          padding: '12px 16px',
        },
      }}
    >
      <Form
        form={form}
        layout="vertical"
        variant="outlined"
        requiredMark={(label: React.ReactNode, { required }: { required: boolean }) => (
          <>
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </>
        )}
        onFinish={handleSubmit}
        clearOnDestroy
      >
        <Flex vertical gap={20}>
          {MEMBER_FIELDS.map((field) => (
            <Form.Item
              className="m-0"
              key={field.key}
              name={field.key}
              valuePropName={field.key === 'emailConsent' ? 'checked' : undefined}
              required={field.required}
              label={
                <Typography.Text className="text-territory text-base font-semibold">
                  {field.label}
                </Typography.Text>
              }
            >
              {FIELD_TYPE_COMPONENTS[field.type](field) as ReactNode}
            </Form.Item>
          ))}
        </Flex>
      </Form>
    </Modal>
  );
}
