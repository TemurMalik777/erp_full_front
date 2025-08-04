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
  Spin, // Qo'shildi
  Tag,
  Space,    // Qo'shildi
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { useAdmin } from "@hooks"; // Sizning hook'ingiz import qilindi
import dayjs from "dayjs"; // Sanani formatlash uchun

const { Title, Text } = Typography;

// =============================================================
// Profil ma'lumotlarini ko'rsatish uchun komponent
// Endi ma'lumotlarni 'props' orqali qabul qiladi
// =============================================================
const ProfileDetails = ({ admin }: { admin: any }) => (
  <Descriptions bordered column={1} labelStyle={{ fontWeight: 600, width: '200px' }}>
    <Descriptions.Item label="To'liq ism">{admin.first_name} {admin.last_name}</Descriptions.Item>
    <Descriptions.Item label="Email manzil">{admin.email}</Descriptions.Item>
    <Descriptions.Item label="Telefon raqam">{admin.phone}</Descriptions.Item>
    <Descriptions.Item label="Status">
      <Tag color={admin.is_active ? 'green' : 'red'}>
        {admin.is_active ? "Faol" : "Nofaol"}
      </Tag>
    </Descriptions.Item>
    <Descriptions.Item label="Ro'yxatdan o'tgan vaqt">
      {dayjs(admin.created_at).format("DD.MM.YYYY, HH:mm")}
    </Descriptions.Item>
    <Descriptions.Item label="Oxirgi yangilangan">
      {dayjs(admin.updated_at).format("DD.MM.YYYY, HH:mm")}
    </Descriptions.Item>
  </Descriptions>
);

// =============================================================
// Profil ma'lumotlarini tahrirlash uchun forma
// =============================================================
const EditProfileForm = ({ admin }: { admin: any }) => {
  const onFinish = (values: any) => {
    console.log('Yuborilgan ma\'lumotlar:', values);
    // Bu yerda API'ga so'rov yuborish logikasi bo'ladi
  };

  return (
    <Form
      name="edit_profile"
      layout="vertical"
      initialValues={{
        first_name: admin.first_name,
        last_name: admin.last_name,
        email: admin.email,
        phone: admin.phone,
      }}
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="first_name"
            label="Ism"
            rules={[{ required: true, message: "Iltimos, ismingizni kiriting!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Ism" />
          </Form.Item>
        </Col>
        <Col span={12}>
           <Form.Item
            name="last_name"
            label="Familiya"
            rules={[{ required: true, message: "Iltimos, familiyangizni kiriting!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Familiya" />
          </Form.Item>
        </Col>
      </Row>
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
// Parolni o'zgartirish uchun forma (o'zgarishsiz qoldi)
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
      <Form name="change_password" layout="vertical" onFinish={onFinish}>
        {/* Form.Item'lar o'zgarishsiz qoldi */}
        <Form.Item name="currentPassword" label="Joriy parol" rules={[{ required: true, message: "Iltimos, joriy parolni kiriting!" }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Joriy parol" />
        </Form.Item>
        <Form.Item name="newPassword" label="Yangi parol" rules={[{ required: true, message: "Iltimos, yangi parolni kiriting!" }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Yangi parol" />
        </Form.Item>
        <Form.Item name="confirmPassword" label="Yangi parolni tasdiqlang" dependencies={['newPassword']} rules={[{ required: true, message: "Iltimos, yangi parolni tasdiqlang!" }, ({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue('newPassword') === value) { return Promise.resolve(); } return Promise.reject(new Error('Parollar mos kelmadi!')); }, }),]}>
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
  // Haqiqiy ma'lumotlarni hook orqali olamiz
  const { data, isLoading, error } = useAdmin();

  // Yuklanish holatini tekshirish
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  // Xatolikni tekshirish
  if (error || !data?.data) {
    return <Alert message="Xatolik" description="Profil ma'lumotlarini yuklashda xatolik yuz berdi." type="error" showIcon />;
  }

  const admin = data.data; // Haqiqiy admin ma'lumotlari

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'Shaxsiy ma\'lumot',
      children: <ProfileDetails admin={admin} />, // Ma'lumotni props orqali uzatamiz
    },
    {
      key: '2',
      label: 'Ma\'lumotlarni tahrirlash',
      children: <EditProfileForm admin={admin} />, // Ma'lumotni props orqali uzatamiz
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
                icon={<UserOutlined />}
                // src={admin.avatarUrl} // Agar API'dan rasm kelsa, shu yerni ochasiz
              />
            </Upload>
            <Title level={4} style={{ marginTop: 16, marginBottom: 0 }}>
              {admin.first_name} {admin.last_name}
            </Title>
            <Text type="secondary">Administrator</Text>
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
