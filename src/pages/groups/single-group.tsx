import { GroupLesson, GroupStudent, GroupTeacher } from "@components";
import { useGroup } from "@hooks";
import { useParams } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Space,
  Avatar,
  Spin,
  Alert,
  Descriptions,
  Statistic,
  Tabs,
} from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  BookOutlined,
  TeamOutlined,
  ContainerOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { TabsProps } from "antd";

const { Title, Text } = Typography;

const SingleGroup = () => {
  const { id } = useParams<{ id: string }>();
  const groupId = Number(id);

  // Asosiy useGroup hook'idan barcha kerakli ma'lumot va funksiyalarni olamiz
  const {
    group,
    students,
    lessons,
    teachers,
    isSingleGroupLoading,
    groupByIdError,
    useDeleteStudentFromGroup,
    // useDeleteTeacherFromGroup,
  } = useGroup({}, groupId);

  // O'chirish hook'larini komponent ichida chaqiramiz
  const { mutate: deleteStudentMutate, isPending: isDeletingStudent } =
    useDeleteStudentFromGroup();
  // const { mutate: deleteTeacherMutate, isPending: isDeletingTeacher } =
  //   useDeleteTeacherFromGroup();

  // Status uchun ranglarni belgilash funksiyasi
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "new":
        return { color: "gold", text: "Yangi" };
      case "active":
        return { color: "green", text: "Aktiv" };
      case "completed":
        return { color: "blue", text: "Tugallangan" };
      default:
        return { color: "default", text: status };
    }
  };

  // Ma'lumotlar yuklanishini tekshirish
  if (isSingleGroupLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Spin size="large" tip="Ma'lumotlar yuklanmoqda..." />
      </div>
    );
  }

  // Xatolikni tekshirish
  if (groupByIdError) {
    return (
      <Alert
        message="Xatolik"
        description="Guruh haqida ma'lumot yuklashda xatolik yuz berdi."
        type="error"
        showIcon
      />
    );
  }

  // Ma'lumot kelganidan keyin uning ichidagi 'group' obyektini olamiz
  const groupData = group?.data?.group;

  // Agar ma'lumot muvaffaqiyatli kelsa-yu, lekin ichi bo'sh bo'lsa
  if (!groupData) {
    return (
      <Alert
        message="Ma'lumot topilmadi"
        description="Bu IDga ega guruh mavjud emas."
        type="warning"
        showIcon
      />
    );
  }

  const statusInfo = getStatusInfo(groupData.status);

  // O'ng tarafdagi Tabs uchun kontent
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <Space>
          <TeamOutlined />
          Students
          <Tag color="purple">{students?.data?.length || 0}</Tag>
        </Space>
      ),
      children: (
        <GroupStudent
          students={students?.data || []}
          groupId={groupId}
          onDelete={deleteStudentMutate}
          isDeleting={isDeletingStudent}
        />
      ),
    },
    {
      key: "2",
      label: (
        <Space>
          <UserOutlined />
          Teachers
          <Tag color="cyan">{teachers?.data?.length || 0}</Tag>
        </Space>
      ),
      children: (
        <GroupTeacher
          teachers={teachers?.data || []}
          groupId={groupId}
          // onDelete={deleteTeacherMutate}
          // isDeleting={isDeletingTeacher}
        />
      ),
    },
    {
      key: "3",
      label: (
        <Space>
          <ContainerOutlined />
          Lessons
          <Tag color="blue">{lessons?.data?.lessons?.length || 0}</Tag>
        </Space>
      ),
      children: <GroupLesson lessons={lessons?.data?.lessons || []} />,
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      {/* Guruh sarlavhasi va statusi */}
      <Card style={{ marginBottom: 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Space align="center" size="middle">
            <Avatar
              size={64}
              icon={<BookOutlined />}
              style={{ backgroundColor: "#722ed1" }}
            />
            <div>
              <Title level={3} style={{ marginBottom: 0 }}>
                {groupData.name}
              </Title>
              <Text type="secondary">
                {groupData.course?.title || "Noma'lum kurs"}
              </Text>
            </div>
          </Space>
          <Tag
            color={statusInfo.color}
            style={{ fontSize: "14px", padding: "6px 12px" }}
          >
            {statusInfo.text}
          </Tag>
        </div>
      </Card>

      <Row gutter={[24, 24]}>
        {/* Chap ustun: Asosiy ma'lumotlar */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <Space>
                <InfoCircleOutlined />
                Asosiy ma'lumot
              </Space>
            }
            style={{ height: "100%" }}
          >
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Boshlanish sanasi">
                <Space>
                  <CalendarOutlined />
                  {groupData.start_date}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Tugash sanasi">
                <Space>
                  <CalendarOutlined />
                  {groupData.end_date}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Dars vaqti">
                <Space>
                  <ClockCircleOutlined />
                  {`${groupData.start_time} - ${groupData.end_time}`}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="O'qituvchi(lar)">
                {teachers?.data?.map((t: any) => t.name).join(", ") ||
                  "Biriktirilmagan"}
              </Descriptions.Item>
            </Descriptions>

            <Row gutter={16} style={{ marginTop: 24 }}>
              <Col span={12}>
                <Statistic
                  title="Kurs narxi"
                  value={groupData.course?.price}
                  suffix="so'm"
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Darslar soni"
                  value={lessons?.data?.lessons?.length || 0}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* O'ng ustun: O'quvchilar, o'qituvchilar va darslar */}
        <Col xs={24} lg={16}>
          <Card style={{ height: "100%" }}>
            <Tabs defaultActiveKey="1" items={items} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SingleGroup;