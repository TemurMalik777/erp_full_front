import { GroupLesson, GroupStudent, GroupTeacher } from "@components";
import { useGroup } from "@hooks";
import { useParams } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Typography,
  Statistic,
  Tag,
  Space,
  Avatar,
} from "antd";
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
  const { dataById, students, lessons, teachers } = useGroup({}, Number(id));
  const groupData: any = dataById
    ? dataById.data.group
    : { course: { title: "", price: 0 } };

      if (!groupData) {
    return <div>Loading...</div>; // yoki Spinner qo‘yish mumkin
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
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} lg={12}>
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={6}>
                <Card size="small" className="stat-card">
                  <Statistic
                    title={
                      <Space>
                        <CalendarOutlined />
                        <span>Start Date</span>
                      </Space>
                    }
                    value={groupData.start_date || "--"}
                    valueStyle={{ fontSize: "16px", fontWeight: "bold" }}
                  />
                </Card>
              </Col>
              <Col xs={12} sm={6}>
                <Card size="small" className="stat-card">
                  <Statistic
                    title={
                      <Space>
                        <CalendarOutlined />
                        <span>End Date</span>
                      </Space>
                    }
                    value={groupData.end_date || "--"}
                    valueStyle={{ fontSize: "16px", fontWeight: "bold" }}
                  />
                </Card>
              </Col>
              <Col xs={12} sm={6}>
                <Card size="small" className="stat-card">
                  <Statistic
                    title={
                      <Space>
                        <ClockCircleOutlined />
                        <span>Schedule</span>
                      </Space>
                    }
                    value={
                      groupData.start_time && groupData.end_time
                        ? `${groupData.start_time} - ${groupData.end_time}`
                        : "--"
                    }
                    valueStyle={{ fontSize: "16px", fontWeight: "bold" }}
                  />
                </Card>
              </Col>
              <Col xs={12} sm={6}>
                <Card size="small" className="stat-card">
                  <Statistic
                    title={
                      <Space>
                        <UserOutlined />
                        <span>Students</span>
                      </Space>
                    }
                    value="12/15"
                    valueStyle={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#1890ff",
                    }}
                  />
                </Card>
              </Col>
            </Row>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              style={{
                height: "100%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
              bodyStyle={{ color: "white" }}
            >
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <Title level={3} style={{ color: "white", margin: 0 }}>
                  <BookOutlined style={{ marginRight: "8px" }} />
                  {groupData.course?.title || "Course Title"}
                </Title>
                <Paragraph
                  style={{ color: "rgba(255,255,255,0.9)", margin: 0 }}
                  ellipsis={{ rows: 2, expandable: true }}
                >
                  {groupData.course?.description || "No description available"}
                </Paragraph>

                <Row gutter={16}>
                  <Col span={8}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                        {groupData.course?.duration || "--"}
                      </div>
                      <div style={{ fontSize: "12px", opacity: 0.8 }}>
                        Months
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                        {groupData.course?.lessons_in_a_week || "--"}
                      </div>
                      <div style={{ fontSize: "12px", opacity: 0.8 }}>
                        Per Week
                      </div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                        {groupData.course?.lesson_duration || "--"}
                      </div>
                      <div style={{ fontSize: "12px", opacity: 0.8 }}>
                        Minutes
                      </div>
                    </div>
                  </Col>
                </Row>
              </Space>
            </Card>
          </Col>
        </Row>
      </Card>

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
