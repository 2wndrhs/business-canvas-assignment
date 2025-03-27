import { CloseOutlined } from '@ant-design/icons';
import { Checkbox, DatePicker, Flex, Form, Input, Modal, Select, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { ReactNode, useEffect, useState } from 'react';
import { MEMBER_FIELDS } from './constants';
import { Field, FieldType, RecordType } from './types/member.type';

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
  initialValues: RecordType | null;
}

export default function MemberModal({ open, onOpenChange, initialValues }: MemberModalProps) {
  const [form] = Form.useForm<RecordType>();
  const fields = Form.useWatch([], form);
  const [submittable, setSubmittable] = useState(false);

  useEffect(() => {
    if (open) {
      form.setFieldValue('occupation', '개발자');

      if (initialValues) {
        const values = { ...initialValues };
        values.registrationDate = dayjs(values.registrationDate);
        form.setFieldsValue(values);
      }
    }
  }, [form, open, initialValues]);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, fields]);

  const handleSubmit = (fields: RecordType) => {
    fields.registrationDate = (fields.registrationDate as Dayjs).format('YYYY-MM-DD');
    console.log(fields);
    onOpenChange(false); // 모달 닫기
    form.resetFields();
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
      okButtonProps={{
        disabled: !submittable,
      }}
      onCancel={() => {
        onOpenChange(false);
        form.resetFields();
      }}
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
      >
        <Flex vertical gap={20}>
          {MEMBER_FIELDS.map((field) => (
            <Form.Item
              className="m-0"
              key={field.key}
              name={field.key}
              valuePropName={field.key === 'emailConsent' ? 'checked' : undefined}
              required={field.required}
              rules={[{ required: field.required, message: `${field.label}을 입력해주세요.` }]}
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
