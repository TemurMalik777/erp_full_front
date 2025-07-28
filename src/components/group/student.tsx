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



// import React, { useState } from "react";
// import { FaPlus } from "react-icons/fa";
// import { CheckCircle, Mail, Phone, User, XCircle } from "lucide-react";

// const GroupStudent = ({ students }: any) => {
// 	const [addingTeacher, setAddingTeacher] = useState(true);

//   console.log(addingTeacher)
// 	return (
// 		<div className="bg-white rounded-lg border border-gray-200">
// 			<div className="p-6 border-b border-gray-200">
// 				<div className="flex items-center justify-between">
// 					<div className="flex items-center gap-3">
// 						<User className="w-5 h-5 text-green-600" />
// 						<h3 className="text-lg font-medium text-gray-900">Students</h3>
// 						<span className="bg-green-50 text-green-700 text-sm px-2 py-1 rounded-md">
// 							{students.filter((s: any) => s.is_active).length}
// 						</span>
// 					</div>
// 					<div className="flex items-center gap-2">
// 						<button
// 							type="button"
// 							className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
// 							onClick={() => setAddingTeacher(true)}
// 						>
// 							<FaPlus className="w-4 h-4" />
// 							Add Teacher
// 						</button>
// 						<button
// 							type="button"
// 							className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 text-sm rounded-md hover:bg-green-700 cursor-pointer"
// 							onClick={() => setAddingTeacher(false)}
// 						>
// 							<FaPlus className="w-4 h-4" />
// 							Add Student
// 						</button>
// 					</div>
// 				</div>
// 			</div>

// 			<div className="overflow-x-auto">
// 				<table className="w-full">
// 					<thead className="bg-gray-50">
// 						<tr>
// 							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// 								Students
// 							</th>
// 							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// 								Phone
// 							</th>
// 							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// 								Mail
// 							</th>
// 							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// 								Status
// 							</th>
// 							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// 								Birth date
// 							</th>
// 						</tr>
// 					</thead>
// 					<tbody className="bg-white divide-y divide-gray-200">
// 						{students.map((student: any) => (
// 							<tr key={student.student.id} className="hover:bg-gray-50">
// 								<td className="px-6 py-4 whitespace-nowrap">
// 									<div className="flex items-center gap-3">
// 										<div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
// 											<span className="text-green-700 font-medium">
// 												{student.student.first_name?.charAt(0)}
// 											</span>
// 										</div>
// 										<div>
// 											<p className="font-medium text-gray-900">
// 												{student.student.first_name} {student.last_name}
// 											</p>
// 											<p className="text-sm text-gray-500 capitalize">
// 												{student.student.gender}
// 											</p>
// 										</div>
// 									</div>
// 								</td>
// 								<td className="px-6 py-4 whitespace-nowrap">
// 									<div className="flex items-center gap-1 text-sm text-gray-900">
// 										<Phone className="w-4 h-4 text-gray-400" />
// 										{student.student.phone}
// 									</div>
// 								</td>
// 								<td className="px-6 py-4 whitespace-nowrap">
// 									<div className="flex items-center gap-1 text-sm text-gray-900">
// 										<Mail className="w-4 h-4 text-gray-400" />
// 										{student.student.email}
// 									</div>
// 								</td>
// 								<td className="px-6 py-4 whitespace-nowrap">
// 									<span
// 										className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
// 											student.status
// 												? "bg-green-50 text-green-700"
// 												: "bg-red-50 text-red-700"
// 										}`}
// 									>
// 										{student.status ? (
// 											<>
// 												<CheckCircle className="w-3 h-3 mr-1" />
// 												Active
// 											</>
// 										) : (
// 											<>
// 												<XCircle className="w-3 h-3 mr-1" />
// 												Disactive
// 											</>
// 										)}
// 									</span>
// 								</td>
// 								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
// 									{new Date(student.student.date_of_birth).toLocaleDateString("uz-UZ")}
// 								</td>
// 							</tr>
// 						))}
// 					</tbody>
// 				</table>
// 			</div>
// 		</div>
// 	);
// };

// export default React.memo(GroupStudent);


