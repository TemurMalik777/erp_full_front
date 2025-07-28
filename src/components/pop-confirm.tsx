import { Button, Popconfirm as AntPopconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
interface PopConfirmProps {
  onConfirm: () => void;
  title?: string;
  loading?: boolean;
}

const PopConfirm = ({ onConfirm, title }: PopConfirmProps) => {
  return (
    <AntPopconfirm
      title={title || "Delete the item"}
      description="Are you sure to delete this item?"
      okText="Yes"
      cancelText="No"
      onConfirm={onConfirm}
    >
      <Button type="primary" danger>
        <DeleteOutlined />
      </Button>
    </AntPopconfirm>
  );
};

export default PopConfirm;
