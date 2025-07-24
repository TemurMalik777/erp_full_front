// import { Collapse } from "antd";

// const { Panel } = Collapse;

// function GroupStudents({ students }: any) {
  
  
//   return (
//     <div>
//       <Collapse accordion>
//         {students.map((item: any) => {
//           const student = item.student
//           const fullName = `${student.first_name} ${student.last_name}`;
//           return (
//             <Panel header={fullName} key={student.id}   >
//               <div className="flex gap-[10px]">
//                 <p>
//                   <strong>Name: </strong> {fullName}
//                 </p>
//                 <p>
//                   <strong>Phone:</strong> {student.phone}
//                 </p>
//                 <p>
//                   <strong>Email:</strong> {student.email}
//                 </p>
//               </div>
//             </Panel>
//           );
//         })}
//       </Collapse>
//     </div>
//   );
// }

// export default GroupStudents;





import { Collapse, Avatar, Tag, Space, Typography, Card } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, IdcardOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { Text } = Typography;

// Status colors mapping
const getStatusColor = (status: string) => {
  const statusColors: { [key: string]: string } = {
    'active': 'green',
    'inactive': 'red',
    'pending': 'orange',
    'graduated': 'blue',
    'suspended': 'volcano',
    'enrolled': 'cyan'
  };
  return statusColors[status?.toLowerCase()] || 'default';
};

// Role colors mapping
const getRoleColor = (role: string) => {
  const roleColors: { [key: string]: string } = {
    'student': 'blue',
    'monitor': 'purple',
    'leader': 'gold',
    'assistant': 'green'
  };
  return roleColors[role?.toLowerCase()] || 'default';
};

function GroupStudents({ students }: any) {
  return (
    <div style={{ maxWidth: '100%' }}>
      <Collapse 
        accordion 
        size="large"
        ghost
        expandIconPosition="end"
      >
        {students.map((item: any) => {
          const student = item.student;
          const fullName = `${student.first_name} ${student.last_name}`;
          
          // Generate avatar from first letters of name
          const avatarText = `${student.first_name?.[0] || ''}${student.last_name?.[0] || ''}`.toUpperCase();
          
          return (
            <Panel 
              key={student.id}
              header={
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
                  {/* Avatar */}
                  <Avatar 
                    size={48}
                    style={{ 
                      backgroundColor: '#1890ff',
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }}
                    icon={!avatarText ? <UserOutlined /> : null}
                  >
                    {avatarText}
                  </Avatar>
                  
                  {/* Name and Tags */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                      <Text strong style={{ fontSize: '16px', color: '#262626' }}>
                        {fullName}
                      </Text>
                      
                      {/* Status Tag */}
                      {student.status && (
                        <Tag color={getStatusColor(student.status)} style={{ margin: 0 }}>
                          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        </Tag>
                      )}
                      
                      {/* Role Tag */}
                      {student.role && (
                        <Tag color={getRoleColor(student.role)} style={{ margin: 0 }}>
                          <IdcardOutlined style={{ marginRight: '4px' }} />
                          {student.role.charAt(0).toUpperCase() + student.role.slice(1)}
                        </Tag>
                      )}
                    </div>
                    
                    {/* Quick info */}
                    <Text type="secondary" style={{ fontSize: '13px' }}>
                      {student.phone} • {student.email}
                    </Text>
                  </div>
                </div>
              }
              style={{
                marginBottom: '8px',
                backgroundColor: '#fafafa',
                border: '1px solid #f0f0f0',
                borderRadius: '8px'
              }}
            >
              {/* Panel Content */}
              <Card 
                size="small" 
                style={{ 
                  margin: '12px 0',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                  
                  {/* Personal Info */}
                  <div>
                    <Text strong style={{ color: '#1890ff', marginBottom: '8px', display: 'block' }}>
                      Shaxsiy Ma'lumotlar
                    </Text>
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <UserOutlined style={{ color: '#666', width: '16px' }} />
                        <Text strong>Ism:</Text>
                        <Text>{fullName}</Text>
                      </div>
                      
                      {student.status && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '16px', display: 'flex', justifyContent: 'center' }}>
                            <div style={{ 
                              width: '8px', 
                              height: '8px', 
                              borderRadius: '50%', 
                              backgroundColor: getStatusColor(student.status) === 'green' ? '#52c41a' : 
                                              getStatusColor(student.status) === 'red' ? '#ff4d4f' : 
                                              getStatusColor(student.status) === 'orange' ? '#fa8c16' : '#1890ff'
                            }} />
                          </div>
                          <Text strong>Status:</Text>
                          <Tag color={getStatusColor(student.status)}>
                            {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                          </Tag>
                        </div>
                      )}
                      
                      {student.role && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <IdcardOutlined style={{ color: '#666', width: '16px' }} />
                          <Text strong>Rol:</Text>
                          <Tag color={getRoleColor(student.role)}>
                            {student.role.charAt(0).toUpperCase() + student.role.slice(1)}
                          </Tag>
                        </div>
                      )}
                    </Space>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <Text strong style={{ color: '#1890ff', marginBottom: '8px', display: 'block' }}>
                      Aloqa Ma'lumotlari
                    </Text>
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <PhoneOutlined style={{ color: '#666', width: '16px' }} />
                        <Text strong>Telefon:</Text>
                        <Text copyable style={{ color: '#1890ff' }}>{student.phone}</Text>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MailOutlined style={{ color: '#666', width: '16px' }} />
                        <Text strong>Email:</Text>
                        <Text copyable style={{ color: '#1890ff' }}>{student.email}</Text>
                      </div>
                    </Space>
                  </div>
                </div>
              </Card>
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
}

export default GroupStudents;