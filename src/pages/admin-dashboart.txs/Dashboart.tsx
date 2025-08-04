import React from 'react';
import { Card, Col, Row, Statistic, Typography, Table, Tag } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  BankOutlined,
  CalendarOutlined,
  UserSwitchOutlined, // O'zgardi
  StarOutlined,       // Yangi
} from '@ant-design/icons';
import { Line, Column } from '@ant-design/charts';

const { Title } = Typography;

// Dashboard komponenti
const Dashboard: React.FC = () => {

  // O'quvchilar statistikasi uchun namunaviy ma'lumotlar (API dan keladi)
  const studentData = [
    { month: 'Yanvar', count: 150 },
    { month: 'Fevral', count: 230 },
    { month: 'Mart', count: 224 },
    { month: 'Aprel', count: 280 },
    { month: 'May', count: 310 },
    { month: 'Iyun', count: 290 },
    { month: 'Iyul', count: 350 },
  ];

  // To'lovlar statistikasi uchun namunaviy ma'lumotlar (API dan keladi)
  const paymentData = [
    { type: 'Naqd', amount: 12000000 },
    { type: 'PayMe', amount: 25000000 },
    { type: 'Click', amount: 18500000 },
    { type: 'Bank o\'tkazma', amount: 8000000 },
  ];

  // Chiziqli grafik (Line chart) uchun konfiguratsiya
  const studentChartConfig = {
    data: studentData,
    xField: 'month',
    yField: 'count',
    height: 250, // Grafik balandligi
    point: { size: 5, shape: 'diamond' },
    color: '#1890ff',
  };

  // Ustunli grafik (Column chart) uchun konfiguratsiya
  const paymentChartConfig = {
    data: paymentData,
    xField: 'type',
    yField: 'amount',
    height: 250, // Grafik balandligi
    meta: {
      type: { alias: 'To\'lov turi' },
      amount: { alias: 'Summa (so\'m)' },
    },
    color: '#2ca02c',
  };

  // So'nggi faolliklar uchun namunaviy ma'lumotlar (API dan keladi)
  const adminActivityData = [
    {
      key: '1',
      adminName: 'Ali Valiyev',
      action: 'Yangi guruh qo\'shdi',
      details: 'Guruh #105 - "Frontend React"',
      timestamp: '2025-08-04 06:15:12',
      actionType: 'add',
    },
    {
      key: '2',
      adminName: 'Hasan Normurodov',
      action: 'O\'quvchi ma\'lumotini tahrirladi',
      details: 'ID: 1120 - "Aziz Ortiqov"',
      timestamp: '2025-08-04 05:45:03',
      actionType: 'edit',
    },
    {
      key: '3',
      adminName: 'Ali Valiyev',
      action: 'To\'lovni tasdiqladi',
      details: 'ID: 1120 - 500,000 so\'m',
      timestamp: '2025-08-03 18:20:45',
      actionType: 'payment',
    },
    {
      key: '4',
      adminName: 'Admin Superuser',
      action: 'O\'qituvchini o\'chirdi',
      details: 'ID: 35 - "Sobir Ahmedov"',
      timestamp: '2025-08-03 15:10:00',
      actionType: 'delete',
    },
     {
      key: '5',
      adminName: 'Hasan Normurodov',
      action: 'Filial sozlamalarini o\'zgartirdi',
      details: 'Filial: "Chilonzor"',
      timestamp: '2025-08-02 11:05:19',
      actionType: 'edit',
    },
  ];

  // Faolliklar jadvali uchun ustunlar
  const activityColumns = [
    {
      title: 'Admin',
      dataIndex: 'adminName',
      key: 'adminName',
    },
    {
      title: 'Harakat',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: { actionType: string }) => {
        let color = 'geekblue';
        if (record.actionType === 'delete') {
          color = 'volcano';
        } else if (record.actionType === 'add') {
          color = 'green';
        } else if (record.actionType === 'payment') {
            color = 'gold';
        }
        return <Tag color={color}>{text.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Tafsilotlar',
      dataIndex: 'details',
      key: 'details',
    },
    {
      title: 'Vaqt',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
  ];


  return (
    <>
      <Title level={3}>Boshqaruv Paneli</Title>
      
      {/* Yuqori qatordagi statistik ma'lumotlar */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card hoverable style={{ height: '100%' }}>
            <Statistic title="All Student" value={1245} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card hoverable style={{ height: '100%' }}>
            <Statistic title="Active Student" value={892} prefix={<UserSwitchOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card hoverable style={{ height: '100%' }}>
            <Statistic title="Jami Guruhlar" value={56} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card hoverable style={{ height: '100%' }}>
            <Statistic title="Faol Guruhlar" value={42} prefix={<StarOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card hoverable style={{ height: '100%' }}>
            <Statistic title="Filiallar" value={8} prefix={<BankOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card hoverable style={{ height: '100%' }}>
            <Statistic title="Yaqin Tadbirlar" value={3} prefix={<CalendarOutlined />} />
          </Card>
        </Col>
      </Row>

      {/* Ikkinchi qatordagi grafiklar */}
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="O'quvchilar statistikasi (oylik)">
            <Line {...studentChartConfig} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="To'lovlar statistikasi">
            <Column {...paymentChartConfig} />
          </Card>
        </Col>
      </Row>

      {/* Uchinchi qator - So'nggi Faolliklar */}
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card title="So'nggi Faolliklar (Admin)">
            <Table columns={activityColumns} dataSource={adminActivityData} pagination={{ pageSize: 5 }} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;