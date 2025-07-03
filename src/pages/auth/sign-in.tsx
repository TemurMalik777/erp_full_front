import { useState } from "react";
import { authService } from "@service";
import { useNavigate } from "react-router-dom";
import { setItem } from "../../helpers";
import { Button, Form, Input, Select, Card, Typography, message } from "antd";

const { Title } = Typography;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    setLoading(true);
    try {
      const payload = { email, password };
      const res = await authService.signIn(payload, role);
      if (res.status === 201) {
        setItem("access_token", res.data.access_token);
        setItem("role", role);
        message.success("Login successful!");
        navigate(`${role}`);
      }
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card
        style={{
          // height: "100vh",
          // display: "flex",

          width: 400,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="text-center mb-8">
          <Title level={2} className="!mb-2">
            Sign In
          </Title>
          <p className="text-gray-500">Please enter your credentials</p>
        </div>

        <Form layout="vertical" onFinish={submit}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <Input
              type="email"
              size="large"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters!",
              },
            ]}
          >
            <Input.Password
              size="large"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select your role!" }]}
          >
            <Select
              size="large"
              onChange={(value) => setRole(value)}
              placeholder="Select your role"
            >
              <Select.Option value="teacher">Teacher</Select.Option>
              <Select.Option value="student">Student</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="lid">Lid</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              block
              className="bg-blue-600 hover:bg-blue-700"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignIn;