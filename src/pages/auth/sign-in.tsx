import { useNavigate } from "react-router-dom";
// import { authService } from "@service";
import { setItem } from "../../helpers";
import { Button, Card, Typography, message, Select, Input } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "@hooks";
// import Button from "antd";

const { Title } = Typography;
const { Option } = Select;

// Yup validatsiya sxemasi
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address!")
    .required("Please input your email!"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters!")
    .required("Please input your password!"),
  role: Yup.string().required("Please select your role!"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useAuth();
  // const submit = () => {
  //   const payload = { email, password };
  //   mutate(
  //     { data: payload, role },
  //     {
  //       onSuccess: (res: any) => {
  //         if (res.status === 201) {
  //           setItem("access_token", res.data.access_token);
  //           setItem("role", role);
  //           navigate(`/${role}`);
  //         }
  //       },
  //     }
  //   );
  // };

  // Submit funksiyasi
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const { email, password, role } = values;
      const payload = { email, password };
      mutate(
        { data: payload, role },
        {
          onSuccess: (res: any) => {
            if (res.status === 201) {
              setItem("access_token", res.data.access_token);
              setItem("role", role);
              navigate(`/${role}`);
            }
          },
        }
      );
      // const res = await authService.signIn(payload, role);
      // if (res.status === 201) {
      //   setItem("access_token", res.data.access_token);
      //   setItem("role", role);
      //   message.success("Login successful!");
      //   navigate(`${role}`);
      // }
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Login failed. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // flex items-center 
    // justify-center min-h-[50%] max-h-[50%] max-w-[50%] 
    <div className="
    "
      // bg-gray-50
    >
      <Card>
        <div className="text-center mb-8 max-w-[50%]">
          <Title level={2} className="!mb-2">
            Sign In
          </Title>
          <p className="text-gray-500">Please enter your credentials</p>
        </div>

        <Formik
          initialValues={{ email: "", password: "", role: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            //  isSubmitting,
              setFieldValue, values, errors, touched }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="email">Email</label>
                <Field
                  as={Input}
                  name="email"
                  type="email"
                  size="large"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password">Password</label>
                <Field
                  as={Input.Password}
                  name="password"
                  size="large"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role">Role</label>
                <Select
                  size="large"
                  placeholder="Select your role"
                  onChange={(value) => setFieldValue("role", value)}
                  value={values.role || undefined}
                >
                  <Option value="teacher">Teacher</Option>
                  <Option value="student">Student</Option>
                  <Option value="admin">Admin</Option>
                  <Option value="lid">Lid</Option>
                </Select>
                {errors.role && touched.role ? (
                  <div className="text-red-500 text-sm">{errors.role}</div>
                ) : null}
              </div>

              {/* <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isSubmitting}
                block
                className="bg-blue-600 hover:bg-blue-700"
              >
                Sign In
              </Button> */}
              <Button type="primary" htmlType="submit" loading={isPending}>Sign In</Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default SignIn;
