import {
  Modal,
  Select,
  Input,
  Typography,
  Space,
  Tag,
  Card,
  Button,
} from "antd";
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
          <span>
            Dars {lesson?.index + 1} - {lesson?.title || "No Name"}
          </span>
        </Space>
      }
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="Save"
      cancelText="Cancel"
      width={700}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={onOk}>
          Save
        </Button>,
      ]}
    >
      <div style={{ padding: "20px 0" }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Card size="small" style={{ background: "#f8f9fa" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div>
                <Space>
                  <Text strong style={{ color: "#666" }}>
                    Title
                  </Text>
                </Space>
                <div style={{ marginTop: "8px" }}>
                  <Title level={4} style={{ margin: 0 }}>
                    {lesson?.title || "No title"}
                  </Title>
                </div>
              </div>
              <div>
                <Space>
                  <Text strong style={{ color: "#666" }}>
                    Date
                  </Text>
                </Space>
                <div style={{ marginTop: "8px" }}>
                  <Title level={4} style={{ margin: 0 }}>
                    {lesson?.date || "Date is not entered"}
                  </Title>
                </div>
              </div>
            </div>
          </Card>

          <Card
            title={
              <Space>
                <span>Lesson status</span>
              </Space>
            }
            size="small"
          >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <div>
                <Text strong>Select status:</Text>
                <Select
                  value={status}
                  onChange={onChangeStatus}
                  className="w-full mt-1"
                  style={{ width: "100%", marginTop: 8 }}
                  size="large"
                >
                  <Option value="new">
                    <Tag color="blue">New</Tag>
                  </Option>
                  <Option value="cancelled">
                    <Tag color="red">Cancelled</Tag>
                  </Option>
                  <Option value="completed">
                    <Tag color="green">Completed</Tag>
                  </Option>
                  <Option value="in_progress">
                    <Tag color="orange">In Progress</Tag>
                  </Option>
                </Select>
              </div>
            </Space>
          </Card>

          <Card
            title={
              <Space>
                <span>Note</span>
              </Space>
            }
            size="small"
          >
            <TextArea
              rows={4}
              value={description}
              onChange={(e) => onChangeDescription(e.target.value)}
              placeholder="Write a comment about the lesson..."
              className="mt-1"
            />
            <div
              style={{
                marginTop: "12px",
                padding: "12px",
                background: "#f0f2f5",
                borderRadius: "6px",
              }}
            >
              <Text type="secondary" style={{ fontSize: "13px" }}>
                View:{description || "No title"}
              </Text>
            </div>
          </Card>
        </Space>
      </div>
    </Modal>
  );
};

export default LessonModal;
