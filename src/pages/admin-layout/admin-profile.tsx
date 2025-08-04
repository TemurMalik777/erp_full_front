import React from 'react';
import {
  Card,
  Row,
  Col,
  Avatar,
  Typography,
  Descriptions,
  Button,
  Tabs,
  Form,
  Input,
  Alert,
  Upload,
  Space,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  CameraOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import type { TabsProps } from 'antd';

const { Title, Text } = Typography;

// Namunaviy ma'lumotlar (keyinchalik API'dan keladi)
const adminData = {
  id: 1,
  fullName: 'Ali Valiyev',
  role: 'Administrator',
  email: 'ali.valiyev@example.com',
  phone: '+998 90 123 45 67',
  joinDate: '2024-01-15',
  avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
};

// =============================================================
// Profil ma'lumotlarini ko'rsatish uchun komponent
// =============================================================
const ProfileDetails = () => (
  <Descriptions bordered column={1} labelStyle={{ fontWeight: 600 }}>
    <Descriptions.Item label="To'liq ism">{adminData.fullName}</Descriptions.Item>
    <Descriptions.Item label="Email manzil">{adminData.email}</Descriptions.Item>
    <Descriptions.Item label="Telefon raqam">{adminData.phone}</Descriptions.Item>
    <Descriptions.Item label="Tizimga qo'shilgan sana">{adminData.joinDate}</Descriptions.Item>
  </Descriptions>
);

// =============================================================
// Profil ma'lumotlarini tahrirlash uchun forma
// =============================================================
const EditProfileForm = () => {
  const onFinish = (values: any) => {
    console.log('Yuborilgan ma\'lumotlar:', values);
    // Bu yerda API'ga so'rov yuborish logikasi bo'ladi
  };

  return (
    <Form
      name="edit_profile"
      layout="vertical"
      initialValues={adminData}
      onFinish={onFinish}
    >
      <Form.Item
        name="fullName"
        label="To'liq ism"
        rules={[{ required: true, message: "Iltimos, ismingizni kiriting!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="To'liq ism" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email manzil"
        rules={[{ required: true, type: 'email', message: "Iltimos, to'g'ri email kiriting!" }]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email manzil" />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Telefon raqam"
      >
        <Input prefix={<PhoneOutlined />} placeholder="Telefon raqam" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
          Saqlash
        </Button>
      </Form.Item>
    </Form>
  );
};

// =============================================================
// Parolni o'zgartirish uchun forma
// =============================================================
const ChangePasswordForm = () => {
  const onFinish = (values: any) => {
    console.log('Yangi parol ma\'lumotlari:', values);
    // Bu yerda API'ga so'rov yuborish logikasi bo'ladi
  };

  return (
    <>
      <Alert
        message="Xavfsizlik uchun parolingizni vaqti-vaqti bilan yangilab turishni tavsiya etamiz."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />
      <Form
        name="change_password"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="currentPassword"
          label="Joriy parol"
          rules={[{ required: true, message: "Iltimos, joriy parolni kiriting!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Joriy parol" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="Yangi parol"
          rules={[{ required: true, message: "Iltimos, yangi parolni kiriting!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Yangi parol" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Yangi parolni tasdiqlang"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: "Iltimos, yangi parolni tasdiqlang!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Parollar mos kelmadi!'));
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Yangi parolni tasdiqlang" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" danger htmlType="submit" icon={<SaveOutlined />}>
            Parolni o'zgartirish
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

// =============================================================
// Asosiy Profil Sahifasi Komponenti
// =============================================================
const ProfilePage: React.FC = () => {
  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'Shaxsiy ma\'lumot',
      children: <ProfileDetails />,
    },
    {
      key: '2',
      label: 'Ma\'lumotlarni tahrirlash',
      children: <EditProfileForm />,
    },
    {
      key: '3',
      label: 'Parolni o\'zgartirish',
      children: <ChangePasswordForm />,
    },
  ];

  return (
    <Row gutter={[24, 24]}>
      {/* Chap ustun: Rasm va ism */}
      <Col xs={24} md={8}>
        <Card>
          <Space direction="vertical" align="center" style={{ width: '100%' }}>
            <Upload>
              <Avatar
                size={128}
                src={adminData.avatarUrl}
                icon={<UserOutlined />}
              >
              </Avatar>
            </Upload>
            <Title level={4} style={{ marginTop: 16, marginBottom: 0 }}>{adminData.fullName}</Title>
            <Text type="secondary">{adminData.role}</Text>
          </Space>
        </Card>
      </Col>

      {/* O'ng ustun: Batafsil ma'lumot va formalar */}
      <Col xs={24} md={16}>
        <Card>
          <Tabs defaultActiveKey="1" items={tabItems} />
        </Card>
      </Col>
    </Row>
  );
};

export default ProfilePage;
