import { Card, Avatar, Tag, Space, Typography, Divider } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  IdcardOutlined,
  CrownOutlined,
  BookOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

// Status colors mapping
const getStatusColor = (status: string) => {
  const statusColors: { [key: string]: string } = {
    'active': 'green',
    'inactive': 'red',
    'on_leave': 'orange',
    'retired': 'blue',
    'probation': 'volcano',
    'permanent': 'cyan'
  };
  return statusColors[status?.toLowerCase()] || 'default';
};

// Role colors mapping
const getRoleColor = (role: string) => {
  const roleColors: { [key: string]: string } = {
    'teacher': 'blue',
    'senior_teacher': 'purple',
    'head_teacher': 'gold',
    'assistant': 'green',
    'coordinator': 'magenta',
    'principal': 'red'
  };
  return roleColors[role?.toLowerCase()] || 'default';
};

// Role icons mapping
const getRoleIcon = (role: string) => {
  const roleIcons: { [key: string]: any } = {
    'teacher': BookOutlined,
    'senior_teacher': CrownOutlined,
    'head_teacher': CrownOutlined,
    'principal': CrownOutlined,
    'coordinator': IdcardOutlined,
    'assistant': UserOutlined
  };
  return roleIcons[role?.toLowerCase()] || IdcardOutlined;
};

function GroupTeachers({ teachers }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {teachers.map((item: any) => {
        const { teacher, start_date, end_date } = item;
        const fullName = `${teacher.first_name} ${teacher.last_name}`;
        const avatar = teacher.avatar_url || "";
        
        // Generate avatar from first letters of name if no image
        const avatarText = `${teacher.first_name?.[0] || ''}${teacher.last_name?.[0] || ''}`.toUpperCase();
        
        const RoleIcon = getRoleIcon(teacher.role);

        return (
          <Card
            key={teacher.id}
            hoverable
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}
            bodyStyle={{ padding: '24px' }}
          >
            {/* Header with Avatar */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                  size={80}
                  src={avatar || undefined}
                  style={{
                    backgroundColor: avatar ? undefined : '#1890ff',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    border: '4px solid #f0f2f5'
                  }}
                  icon={!avatar && !avatarText ? <UserOutlined /> : null}
                >
                  {!avatar && avatarText}
                </Avatar>
                
                {/* Status indicator */}
                {teacher.status && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '8px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: getStatusColor(teacher.status) === 'green' ? '#52c41a' : 
                                      getStatusColor(teacher.status) === 'red' ? '#ff4d4f' : 
                                      getStatusColor(teacher.status) === 'orange' ? '#fa8c16' : '#1890ff',
                      border: '2px solid white',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                  />
                )}
              </div>
              
              {/* Name */}
              <Title level={4} style={{ margin: '12px 0 8px 0', color: '#262626' }}>
                {fullName}
              </Title>
              
              {/* Tags */}
              <Space size="small" style={{ marginBottom: '16px' }}>
                {teacher.role && (
                  <Tag 
                    color={getRoleColor(teacher.role)} 
                    icon={<RoleIcon />}
                    style={{ borderRadius: '12px', padding: '2px 8px' }}
                  >
                    {teacher.role.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                  </Tag>
                )}
                
                {teacher.status && (
                  <Tag 
                    color={getStatusColor(teacher.status)}
                    style={{ borderRadius: '12px', padding: '2px 8px' }}
                  >
                    {teacher.status.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                  </Tag>
                )}
              </Space>
            </div>

            <Divider style={{ margin: '16px 0' }} />

            {/* Contact Information */}
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              
              {/* Work Period */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CalendarOutlined style={{ color: '#1890ff', fontSize: '14px', width: '16px' }} />
                <Text strong style={{ color: '#595959', fontSize: '13px' }}>Time to work:</Text>
              </div>
              <div style={{ marginLeft: '24px', marginTop: '-8px' }}>
                <Text style={{ fontSize: '13px', color: '#262626' }}>
                  {start_date} - {end_date}
                </Text>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MailOutlined style={{ color: '#1890ff', fontSize: '14px', width: '16px' }} />
                <Text strong style={{ color: '#595959', fontSize: '13px' }}>Email:</Text>
              </div>
              <div style={{ marginLeft: '24px', marginTop: '-8px' }}>
                <Text 
                  copyable 
                  style={{ fontSize: '13px', color: '#1890ff' }}
                >
                  {teacher.email}
                </Text>
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PhoneOutlined style={{ color: '#1890ff', fontSize: '14px', width: '16px' }} />
                <Text strong style={{ color: '#595959', fontSize: '13px' }}>Telefon:</Text>
              </div>
              <div style={{ marginLeft: '24px', marginTop: '-8px' }}>
                <Text 
                  copyable 
                  style={{ fontSize: '13px', color: '#1890ff' }}
                >
                  {teacher.phone}
                </Text>
              </div>

            </Space>

            {/* Footer with additional info */}
            <div 
              style={{ 
                marginTop: '20px', 
                padding: '12px', 
                backgroundColor: '#fafafa', 
                borderRadius: '8px',
                textAlign: 'center'
              }}
            >
              <Text type="secondary" style={{ fontSize: '12px' }}>
                O'qituvchi ID: {teacher.id}
              </Text>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default GroupTeachers;



