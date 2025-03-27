import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Layout, Typography } from 'antd';

function App() {
  return (
    <main className="font-pretendard">
      <Layout>
        <Layout.Header className="flex h-12 items-center justify-center bg-white px-3.5">
          <Flex justify="space-between" align="center" className="flex-1">
            <Typography.Title className="mb-0 text-base font-semibold">회원 목록</Typography.Title>
            <Button type="primary" icon={<PlusOutlined />}>
              추가
            </Button>
          </Flex>
        </Layout.Header>
        <Layout.Content></Layout.Content>
      </Layout>
    </main>
  );
}

export default App;
