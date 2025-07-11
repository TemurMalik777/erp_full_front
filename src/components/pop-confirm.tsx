import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
interface PopConfirmProps {
  onConfirm: () => void;
  title?: string;
}

const PopConfirm = ({ onConfirm, title }: PopConfirmProps) => {
  return (
      <Popconfirm
    title={title || "Delete the item"}
    description="Are you sure to delete this item?"
    okText="Yes"
    cancelText="No"
    onConfirm={onConfirm}
  >
    <Button type="primary" danger ><DeleteOutlined/></Button>
  </Popconfirm>
);
}

export default PopConfirm