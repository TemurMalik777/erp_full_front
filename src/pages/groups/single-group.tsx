// import { GroupLesson, GroupStudent, GroupTeacher } from "@components";
// import { useGroup } from "@hooks";
// import { useParams } from "react-router-dom";
// import {
//   Card,
//   Row,
//   Col,
//   Typography,
//   Statistic,
//   Tag,
//   Space,
//   Avatar,
// } from "antd";
// import {
//   CalendarOutlined,
//   ClockCircleOutlined,
//   UserOutlined,
//   BookOutlined,
// } from "@ant-design/icons";

// const { Title, Paragraph } = Typography;

// const SingleGroup = () => {
//   const { id } = useParams<{ id: string }>();
//   const groupId = Number(id);
//   const { dataById, students, lessons, teachers } = useGroup({}, Number(id));
//   const groupData: any = dataById
//     ? dataById.data.group
//     : { course: { title: "", price: 0 } };

//       if (!groupData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div
//       style={{
//         padding: "24px",
//         backgroundColor: "#f5f5f5",
//         minHeight: "100vh",
//       }}
//     >
//       <Card style={{ marginBottom: "24px" }} bodyStyle={{ padding: "32px" }}>
//         <Row gutter={[24, 24]} align="middle">
//           <Col xs={24} lg={12}>
//             <Row gutter={[16, 16]}>
//               <Col xs={12} sm={6}>
//                 <Card size="small" className="stat-card">
//                   <Statistic
//                     title={
//                       <Space>
//                         <CalendarOutlined />
//                         <span>Start Date</span>
//                       </Space>
//                     }
//                     value={groupData.start_date || "--"}
//                     valueStyle={{ fontSize: "16px", fontWeight: "bold" }}
//                   />
//                 </Card>
//               </Col>
//               <Col xs={12} sm={6}>
//                 <Card size="small" className="stat-card">
//                   <Statistic
//                     title={
//                       <Space>
//                         <CalendarOutlined />
//                         <span>End Date</span>
//                       </Space>
//                     }
//                     value={groupData.end_date || "--"}
//                     valueStyle={{ fontSize: "16px", fontWeight: "bold" }}
//                   />
//                 </Card>
//               </Col>
//               <Col xs={12} sm={6}>
//                 <Card size="small" className="stat-card">
//                   <Statistic
//                     title={
//                       <Space>
//                         <ClockCircleOutlined />
//                         <span>Schedule</span>
//                       </Space>
//                     }
//                     value={
//                       groupData.start_time && groupData.end_time
//                         ? `${groupData.start_time} - ${groupData.end_time}`
//                         : "--"
//                     }
//                     valueStyle={{ fontSize: "16px", fontWeight: "bold" }}
//                   />
//                 </Card>
//               </Col>
//               <Col xs={12} sm={6}>
//                 <Card size="small" className="stat-card">
//                   <Statistic
//                     title={
//                       <Space>
//                         <UserOutlined />
//                         <span>Students</span>
//                       </Space>
//                     }
//                     value="12/15"
//                     valueStyle={{
//                       fontSize: "16px",
//                       fontWeight: "bold",
//                       color: "#1890ff",
//                     }}
//                   />
//                 </Card>
//               </Col>
//             </Row>
//           </Col>

//           <Col xs={24} lg={12}>
//             <Card
//               style={{
//                 height: "100%",
//                 background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//               }}
//               bodyStyle={{ color: "white" }}
//             >
//               <Space
//                 direction="vertical"
//                 size="middle"
//                 style={{ width: "100%" }}
//               >
//                 <Title level={3} style={{ color: "white", margin: 0 }}>
//                   <BookOutlined style={{ marginRight: "8px" }} />
//                   {groupData.course?.title || "Course Title"}
//                 </Title>
//                 <Paragraph
//                   style={{ color: "rgba(255,255,255,0.9)", margin: 0 }}
//                   ellipsis={{ rows: 2, expandable: true }}
//                 >
//                   {groupData.course?.description || "No description available"}
//                 </Paragraph>

//                 <Row gutter={16}>
//                   <Col span={8}>
//                     <div style={{ textAlign: "center" }}>
//                       <div style={{ fontSize: "24px", fontWeight: "bold" }}>
//                         {groupData.course?.duration || "--"}
//                       </div>
//                       <div style={{ fontSize: "12px", opacity: 0.8 }}>
//                         Months
//                       </div>
//                     </div>
//                   </Col>
//                   <Col span={8}>
//                     <div style={{ textAlign: "center" }}>
//                       <div style={{ fontSize: "24px", fontWeight: "bold" }}>
//                         {groupData.course?.lessons_in_a_week || "--"}
//                       </div>
//                       <div style={{ fontSize: "12px", opacity: 0.8 }}>
//                         Per Week
//                       </div>
//                     </div>
//                   </Col>
//                   <Col span={8}>
//                     <div style={{ textAlign: "center" }}>
//                       <div style={{ fontSize: "24px", fontWeight: "bold" }}>
//                         {groupData.course?.lesson_duration || "--"}
//                       </div>
//                       <div style={{ fontSize: "12px", opacity: 0.8 }}>
//                         Minutes
//                       </div>
//                     </div>
//                   </Col>
//                 </Row>
//               </Space>
//             </Card>
//           </Col>
//         </Row>
//       </Card>

//       <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
//         {teachers?.data && teachers.data.length > 0 && (
//           <Card
//             title={
//               <Space>
//                 <Avatar
//                   icon={<UserOutlined />}
//                   style={{ backgroundColor: "#52c41a" }}
//                 />
//                 <span>Teachers</span>
//                 <Tag color="green">{teachers.data.length}</Tag>
//               </Space>
//             }
//             headStyle={{ borderBottom: "2px solid #52c41a" }}
//           >
//             <GroupTeacher teachers={teachers.data} groupId={groupId} />
//           </Card>
//         )}

//         {lessons?.data?.lessons && lessons.data.lessons.length > 0 && (
//           <Card
//             title={
//               <Space>
//                 <Avatar
//                   icon={<BookOutlined />}
//                   style={{ backgroundColor: "#1890ff" }}
//                 />
//                 <span>Lessons</span>
//                 <Tag color="blue">{lessons.data.lessons.length}</Tag>
//               </Space>
//             }
//             headStyle={{ borderBottom: "2px solid #1890ff" }}
//           >
//             <GroupLesson lessons={lessons.data.lessons} />
//           </Card>
//         )}

//         {students?.data && students.data.length > 0 && (
//           <Card
//             title={
//               <Space>
//                 <Avatar
//                   icon={<UserOutlined />}
//                   style={{ backgroundColor: "#722ed1" }}
//                 />
//                 <span>Students</span>
//                 <Tag color="purple">{students.data.length}</Tag>
//               </Space>
//             }
//             headStyle={{ borderBottom: "2px solid #722ed1" }}
//           >
//             <GroupStudent students={students.data} groupId={groupId} />
//           </Card>
//         )}
//       </div>

//       <style>{`
//         .stat-card .ant-card-body {
//           padding: 16px !important;
//         }
//         .stat-card {
//           transition: all 0.3s ease;
//           border: 1px solid #f0f0f0;
//         }
//         .stat-card:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0,0,0,0.1);
//           border-color: #1890ff;
//         }
//         .ant-statistic-title {
//           font-size: 12px !important;
//           margin-bottom: 4px !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SingleGroup;

import { GroupLesson, GroupStudent, GroupTeacher } from "@components";
import { useGroup } from "@hooks";
import { useParams } from "react-router-dom";
import { Card, Row, Col, Typography, Tag, Space, Avatar } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  BookOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const SingleGroup = () => {
  const { id } = useParams<{ id: string }>();
  const groupId = Number(id);
  const { dataById, students, lessons, teachers } = useGroup({}, groupId);

  const groupData: any = dataById
    ? dataById.data.group
    : {
        name: "",
        start_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
        status: "",
        course: {
          title: "",
          description: "",
          duration: 0,
          lessons_in_a_week: 0,
          lesson_duration: 0,
          price: 0,
        },
      };

  // Status ranglarini xaritalash
  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "gold";
      case "active":
        return "green";
      case "completed":
        return "blue";
      case "cancelled":
        return "red";
      case "pending":
        return "orange";
      default:
        return "default";
    }
  };

  if (!groupData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Card style={{ marginBottom: "24px" }} bodyStyle={{ padding: "32px" }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={24} className="helllooo">
            <Card
              style={{
                height: "100%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "12px",
                boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
              }}
              bodyStyle={{ color: "white", padding: "32px" }}
            >
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                {/* Kurs ma'lumotlari - Tepada */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Title level={3} style={{ color: "white", margin: 0 }}>
                    <BookOutlined style={{ marginRight: "8px" }} />
                    {groupData.course?.title || "Course Title"}
                  </Title>
                  <Paragraph
                    style={{
                      color: "rgba(255,255,255,0.9)",
                      margin: 0,
                      fontSize: "16px",
                    }}
                    ellipsis={{ rows: 2, expandable: true }}
                  >
                    {groupData.course?.description ||
                      "No description available"}
                  </Paragraph>
                </div>

                {/* Asosiy statistikalar - Gradient cardlar */}
                <Row gutter={16}>
                  <Col span={6}>
                    <div
                      style={{
                        textAlign: "center",
                        padding: "20px",
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
                        borderRadius: "12px",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "28px",
                          fontWeight: "bold",
                          color: "#fff",
                        }}
                      >
                        {groupData.course?.duration || "--"}
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          opacity: 0.8,
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        Months
                      </div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div
                      style={{
                        textAlign: "center",
                        padding: "20px",
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
                        borderRadius: "12px",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "28px",
                          fontWeight: "bold",
                          color: "#fff",
                        }}
                      >
                        {groupData.course?.lessons_in_a_week || "--"}
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          opacity: 0.8,
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        Per Week
                      </div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div
                      style={{
                        textAlign: "center",
                        padding: "20px",
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
                        borderRadius: "12px",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "28px",
                          fontWeight: "bold",
                          color: "#fff",
                        }}
                      >
                        {groupData.course?.lesson_duration || "--"}
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          opacity: 0.8,
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        Minutes
                      </div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div
                      style={{
                        textAlign: "center",
                        padding: "20px",
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
                        borderRadius: "12px",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "28px",
                          fontWeight: "bold",
                          color: "#fff",
                        }}
                      >
                        {groupData.course?.price?.toLocaleString() || "--"}
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          opacity: 0.8,
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        Price (sum)
                      </div>
                    </div>
                  </Col>
                </Row>

                {/* Statistika kartalari - Uyg'unlashgan ranglar */}
                {/* <Row gutter={[16, 16]}>
            <Col xs={12} sm={4}>
              <Card 
                size="small" 
                className="stat-card"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "8px"
                }}
                bodyStyle={{ padding: "16px" }}
              >
                <Statistic
                  title={
                    <Space>
                      <CalendarOutlined style={{ color: "rgba(255,255,255,0.8)" }} />
                      <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px" }}>
                        Start Date
                      </span>
                    </Space>
                  }
                  value={groupData.start_date || "--"}
                  valueStyle={{ 
                    fontSize: "14px", 
                    fontWeight: "bold", 
                    color: "#fff" 
                  }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={4}>
              <Card 
                size="small" 
                className="stat-card"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "8px"
                }}
                bodyStyle={{ padding: "16px" }}
              >
                <Statistic
                  title={
                    <Space>
                      <CalendarOutlined style={{ color: "rgba(255,255,255,0.8)" }} />
                      <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px" }}>
                        End Date
                      </span>
                    </Space>
                  }
                  value={groupData.end_date || "--"}
                  valueStyle={{ 
                    fontSize: "14px", 
                    fontWeight: "bold", 
                    color: "#fff" 
                  }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={4}>
              <Card 
                size="small" 
                className="stat-card"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "8px"
                }}
                bodyStyle={{ padding: "16px" }}
              >
                <Statistic
                  title={
                    <Space>
                      <ClockCircleOutlined style={{ color: "rgba(255,255,255,0.8)" }} />
                      <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px" }}>
                        Schedule
                      </span>
                    </Space>
                  }
                  value={
                    groupData.start_time && groupData.end_time
                      ? `${groupData.start_time} - ${groupData.end_time}`
                      : "--"
                  }
                  valueStyle={{ 
                    fontSize: "14px", 
                    fontWeight: "bold", 
                    color: "#fff" 
                  }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={4}>
              <Card 
                size="small" 
                className="stat-card"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "8px"
                }}
                bodyStyle={{ padding: "16px" }}
              >
                <Statistic
                  title={
                    <Space>
                      <UserOutlined style={{ color: "rgba(255,255,255,0.8)" }} />
                      <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px" }}>
                        Students
                      </span>
                    </Space>
                  }
                  value={`${students?.data?.length || 0}`}
                  valueStyle={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#91d5ff", // Uyg'unlashgan ko'k rang
                  }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={4}>
              <Card 
                size="small" 
                className="stat-card"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "8px"
                }}
                bodyStyle={{ padding: "16px" }}
              >
                <Statistic
                  title={
                    <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px" }}>
                      Status
                    </span>
                  }
                  valueRender={() => (
                    <Tag 
                      color={getStatusColor(groupData.status)}
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        color: "#fff",
                        fontWeight: "bold"
                      }}
                    >
                      {groupData.status
                        ? groupData.status.charAt(0).toUpperCase() +
                          groupData.status.slice(1)
                        : "Unknown"}
                    </Tag>
                  )}
                />
              </Card>
            </Col>
          </Row> */}

                <Row gutter={[16, 16]} align="middle" justify="center">
                  <Col xs={24} sm={12} md={8} lg={4}>
                    <Card
                      size="small"
                      className="stat-card"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: "8px",
                        height: "120px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      bodyStyle={{
                        padding: "16px",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{ textAlign: "center", width: "100%" }}>
                        <div
                          style={{
                            marginBottom: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                          }}
                        >
                          <CalendarOutlined
                            style={{
                              color: "rgba(255,255,255,0.8)",
                              fontSize: "14px",
                            }}
                          />
                          <span
                            style={{
                              color: "rgba(255,255,255,0.8)",
                              fontSize: "12px",
                            }}
                          >
                            Start Date
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "#fff",
                          }}
                        >
                          {groupData.start_date || "--"}
                        </div>
                      </div>
                    </Card>
                  </Col>

                  <Col xs={24} sm={12} md={8} lg={4}>
                    <Card
                      size="small"
                      className="stat-card"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: "8px",
                        height: "120px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      bodyStyle={{
                        padding: "16px",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{ textAlign: "center", width: "100%" }}>
                        <div
                          style={{
                            marginBottom: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                          }}
                        >
                          <CalendarOutlined
                            style={{
                              color: "rgba(255,255,255,0.8)",
                              fontSize: "14px",
                            }}
                          />
                          <span
                            style={{
                              color: "rgba(255,255,255,0.8)",
                              fontSize: "12px",
                            }}
                          >
                            End Date
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "#fff",
                          }}
                        >
                          {groupData.end_date || "--"}
                        </div>
                      </div>
                    </Card>
                  </Col>

                  <Col xs={24} sm={12} md={8} lg={4}>
                    <Card
                      size="small"
                      className="stat-card"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: "8px",
                        height: "120px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      bodyStyle={{
                        padding: "16px",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{ textAlign: "center", width: "100%" }}>
                        <div
                          style={{
                            marginBottom: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                          }}
                        >
                          <ClockCircleOutlined
                            style={{
                              color: "rgba(255,255,255,0.8)",
                              fontSize: "14px",
                            }}
                          />
                          <span
                            style={{
                              color: "rgba(255,255,255,0.8)",
                              fontSize: "12px",
                            }}
                          >
                            Schedule
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "#fff",
                          }}
                        >
                          {groupData.start_time && groupData.end_time
                            ? `${groupData.start_time} - ${groupData.end_time}`
                            : "--"}
                        </div>
                      </div>
                    </Card>
                  </Col>

                  <Col xs={24} sm={12} md={8} lg={4}>
                    <Card
                      size="small"
                      className="stat-card"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: "8px",
                        height: "120px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      bodyStyle={{
                        padding: "16px",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{ textAlign: "center", width: "100%" }}>
                        <div
                          style={{
                            marginBottom: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                          }}
                        >
                          <UserOutlined
                            style={{
                              color: "rgba(255,255,255,0.8)",
                              fontSize: "14px",
                            }}
                          />
                          <span
                            style={{
                              color: "rgba(255,255,255,0.8)",
                              fontSize: "12px",
                            }}
                          >
                            Students
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "#91d5ff",
                          }}
                        >
                          {`${students?.data?.length || 0}`}
                        </div>
                      </div>
                    </Card>
                  </Col>

                  <Col xs={24} sm={12} md={8} lg={4}>
                    <Card
                      size="small"
                      className="stat-card"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: "8px",
                        height: "120px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      bodyStyle={{
                        padding: "16px",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{ textAlign: "center", width: "100%" }}>
                        <div
                          style={{
                            marginBottom: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                          }}
                        >
                          <span
                            style={{
                              color: "rgba(255,255,255,0.8)",
                              fontSize: "12px",
                            }}
                          >
                            Status
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Tag
                            color={getStatusColor(groupData.status)}
                            style={{
                              background: "rgba(255,255,255,0.15)",
                              border: "1px solid rgba(255,255,255,0.3)",
                              color: "#fff",
                              fontWeight: "bold",
                              fontSize: "14px",
                              padding: "4px 12px",
                              borderRadius: "6px",
                            }}
                          >
                            {groupData.status
                              ? groupData.status.charAt(0).toUpperCase() +
                                groupData.status.slice(1)
                              : "Unknown"}
                          </Tag>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Space>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* //----------------------------------------- */}

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {teachers?.data && teachers.data.length > 0 && (
          <Card
            title={
              <Space>
                <Avatar
                  icon={<UserOutlined />}
                  style={{ backgroundColor: "#52c41a" }}
                />
                <span>Teachers</span>
                <Tag color="green">{teachers.data.length}</Tag>
              </Space>
            }
            headStyle={{ borderBottom: "2px solid #52c41a" }}
          >
            <GroupTeacher teachers={teachers.data} groupId={groupId} />
          </Card>
        )}

        {lessons?.data?.lessons && lessons.data.lessons.length > 0 && (
          <Card
            title={
              <Space>
                <Avatar
                  icon={<BookOutlined />}
                  style={{ backgroundColor: "#1890ff" }}
                />
                <span>Lessons</span>
                <Tag color="blue">{lessons.data.lessons.length}</Tag>
              </Space>
            }
            headStyle={{ borderBottom: "2px solid #1890ff" }}
          >
            <GroupLesson lessons={lessons.data.lessons} />
          </Card>
        )}

        {students?.data && students.data.length > 0 && (
          <Card
            title={
              <Space>
                <Avatar
                  icon={<UserOutlined />}
                  style={{ backgroundColor: "#722ed1" }}
                />
                <span>Students</span>
                <Tag color="purple">{students.data.length}</Tag>
              </Space>
            }
            headStyle={{ borderBottom: "2px solid #722ed1" }}
          >
            <GroupStudent students={students.data} groupId={groupId} />
          </Card>
        )}
      </div>

      <style>{`
        .stat-card .ant-card-body {
          padding: 16px !important;
        }
        .stat-card {
          transition: all 0.3s ease;
          border: 1px solid #f0f0f0;
        }
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border-color: #1890ff;
        }
        .ant-statistic-title {
          font-size: 12px !important;
          margin-bottom: 4px !important;
        }
      `}</style>
    </div>
  );
};

export default SingleGroup;
