import { Button, Popconfirm as AntPopconfirm } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

interface PopConfirmProps {
  onConfirm: () => void;
  title?: string;
  loading?: boolean;
}

const PopConfirmLogout = ({ onConfirm, title }: PopConfirmProps) => {
  return (
    <AntPopconfirm
      title={title || "Log out"}
      description="Are you sure you want to log out?"
      okText="Yes"
      cancelText="No"
      onConfirm={onConfirm}
    >
      <Button type="primary" >
        <LogoutOutlined />
      </Button>
    </AntPopconfirm>
  );
};

export default PopConfirmLogout;
