import { Modal, Select, Input, Typography, Space, Tag, Card, Button } from "antd";
import React from "react";

const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

interface LessonModalProps {
  open: boolean;
  lesson: any;
  status: string;
  description: string;
  onChangeStatus: (value: string) => void;
  onChangeDescription: (value: string) => void;
  onOk: () => void;
  onCancel: () => void;
}

const LessonModal: React.FC<LessonModalProps> = ({
  open,
  lesson,
  status,
  description,
  onChangeStatus,
  onChangeDescription,
  onOk,
  onCancel,
}) => {
  return (
    <Modal
      title={
        <Space>
          {/* <BookOutlined style={{ color: "#1890ff" }} /> */}
          <span>Dars {lesson?.index + 1} - {lesson?.title || "Nomsiz"}</span>
        </Space>
      }
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="Saqlash"
      cancelText="Bekor qilish"
      width={700}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Bekor qilish
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={onOk}
        >
          Saqlash
        </Button>,
      ]}
    >
      <div style={{ padding: "20px 0" }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Basic Info */}
          <Card size="small" style={{ background: "#f8f9fa" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <Space>
                  <Text strong style={{ color: "#666" }}>Sarlavha</Text>
                </Space>
                <div style={{ marginTop: "8px" }}>
                  <Title level={4} style={{ margin: 0 }}>
                    {lesson?.title || "Sarlavha yo'q"}
                  </Title>
                </div>
              </div>
              <div>
                <Space>
                  <Text strong style={{ color: "#666" }}>Sana</Text>
                </Space>
                <div style={{ marginTop: "8px" }}>
                  <Title level={4} style={{ margin: 0 }}>
                    {lesson?.date || "Sana kiritilmagan"}
                  </Title>
                </div>
              </div>
            </div>
          </Card>

          <Card
            title={
              <Space>
                <span>Dars holati</span>
              </Space>
            }
            size="small"
          >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <div>
                <Text strong>Holatni tanlang:</Text>
                <Select
                  value={status}
                  onChange={onChangeStatus}
                  className="w-full mt-1"
                  style={{ width: "100%", marginTop: 8 }}
                  size="large"
                >
                  <Option value="new">
                    <Tag color="blue">Yangi</Tag>
                  </Option>
                  <Option value="cancelled">
                    <Tag color="red">Bekor qilingan</Tag>
                  </Option>
                  <Option value="completed">
                    <Tag color="green">Yakunlangan</Tag>
                  </Option>
                  <Option value="in_progress">
                    <Tag color="orange">Jarayonda</Tag>
                  </Option>
                </Select>
              </div>
            </Space>
          </Card>

          {/* Notes */}
          <Card
            title={
              <Space>
                <span>Izoh</span>
              </Space>
            }
            size="small"
          >
            <TextArea
              rows={4}
              value={description}
              onChange={(e) => onChangeDescription(e.target.value)}
              placeholder="Darsga oid izoh yozing..."
              className="mt-1"
            />
            <div style={{ marginTop: "12px", padding: "12px", background: "#f0f2f5", borderRadius: "6px" }}>
              <Text type="secondary" style={{ fontSize: "13px" }}>
                Korinish: {description || "Izoh yo'q"}
              </Text>
            </div>
          </Card>
        </Space>
      </div>
    </Modal>
  );
};

export default LessonModal;
