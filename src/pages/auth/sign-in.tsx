// import { useNavigate } from "react-router-dom";
// // import { authService } from "@service";
// import { setItem } from "../../helpers";
// import { Button, Card, Typography, message, Select, Input } from "antd";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useAuth } from "@hooks";
// // import Button from "antd";

// const { Title } = Typography;
// const { Option } = Select;

// // Yup validatsiya sxemasi
// const validationSchema = Yup.object().shape({
//   email: Yup.string()
//     .email("Please enter a valid email address!")
//     .required("Please input your email!"),
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters!")
//     .required("Please input your password!"),
//   role: Yup.string().required("Please select your role!"),
// });

// const SignIn = () => {
//   const navigate = useNavigate();
//   const { mutate, isPending } = useAuth();
//   const handleSubmit = async (values: any, { setSubmitting }: any) => {
//     try {
//       const { email, password, role } = values;
//       const payload = { email, password };
//       mutate(
//         { data: payload, role },
//         {
//           onSuccess: (res: any) => {
//             if (res.status === 201) {
//               setItem("access_token", res.data.access_token);
//               setItem("role", role);
//               navigate(`/${role}`);
//             }
//           },
//         }
//       );
//     } catch (error) {
//       console.error("Login failed:", error);
//       message.error("Login failed. Please check your credentials.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="
//     "
//     >
//       <Card>
//         <div className="text-center mb-8 max-w-[50%]">
//           <Title level={2} className="!mb-2">
//             Sign In
//           </Title>
//           <p className="text-gray-500">Please enter your credentials</p>
//         </div>

//         <Formik
//           initialValues={{ email: "", password: "", role: "" }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({
//             //  isSubmitting,
//               setFieldValue, values, errors, touched }) => (
//             <Form>
//               <div className="mb-6">
//                 <label htmlFor="email" >Email</label>
//                 <Field
//                   as={Input}
//                   name="email"
//                   type="email"
//                   size="large"
//                   placeholder="Enter your email"
//                 />
//                 <ErrorMessage
//                   name="email"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="password">Password</label>
//                 <Field
//                   as={Input.Password}
//                   name="password"
//                   size="large"
//                   placeholder="Enter your password"
//                 />
//                 <ErrorMessage
//                   name="password"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="role">Role</label>
//                 <Select
//                   size="large"
//                   placeholder="Select your role"
//                   onChange={(value) => setFieldValue("role", value)}
//                   value={values.role || undefined}
//                 >
//                   <Option value="teacher">Teacher</Option>
//                   <Option value="student">Student</Option>
//                   <Option value="admin">Admin</Option>
//                   <Option value="lid">Lid</Option>
//                 </Select>
//                 {errors.role && touched.role ? (
//                   <div className="text-red-500 text-sm">{errors.role}</div>
//                 ) : null}
//               </div>

//               {/* <Button
//                 type="primary"
//                 htmlType="submit"
//                 size="large"
//                 loading={isSubmitting}
//                 block
//                 className="bg-blue-600 hover:bg-blue-700"
//               >
//                 Sign In
//               </Button> */}
//               <Button type="primary" htmlType="submit" loading={isPending}>Sign In</Button>
//             </Form>
//           )}
//         </Formik>
//       </Card>
//     </div>
//   );
// };

// export default SignIn;

import { useNavigate } from "react-router-dom";
import { setItem } from "../../helpers";
import { Button, Card, Input, Select, message, Typography } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "@hooks";

const { Option } = Select;
const { Title } = Typography;

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

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const { email, password, role } = values;
      mutate(
        { data: { email, password }, role },
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
    } catch (error) {
      message.error("Login failed. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card style={{ maxWidth: 400, margin: "0 auto", marginTop: 100 }}>
      <Title level={3} style={{ textAlign: "center" }}>
        Sign In
      </Title>

      <Formik
        initialValues={{ email: "", password: "", role: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form>
            <div style={{ marginBottom: 16 }}>
              <label>Email</label>
              <Field
                as={Input}
                name="email"
                type="email"
                placeholder="Enter email"
              />
              <ErrorMessage name="email">
                {(msg) => (
                  <div style={{ color: "red", fontSize: 12 }}>{msg}</div>
                )}
              </ErrorMessage>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label>Password</label>
              <Field
                as={Input.Password}
                name="password"
                placeholder="Enter password"
              />
              <ErrorMessage name="email">
                {(msg) => (
                  <div style={{ color: "red", fontSize: 12 }}>{msg}</div>
                )}
              </ErrorMessage>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label>Role</label>
              <Select
                placeholder="Select role"
                onChange={(val) => setFieldValue("role", val)}
                value={values.role || undefined}
                style={{ width: "100%" }}
              >
                <Option value="teacher">Teacher</Option>
                <Option value="student">Student</Option>
                <Option value="admin">Admin</Option>
                <Option value="lid">Lid</Option>
              </Select>
              {errors.role && touched.role && (
                <div style={{ color: "red", fontSize: 12 }}>{errors.role}</div>
              )}
            </div>

            <Button type="primary" htmlType="submit" block loading={isPending}>
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default SignIn;
