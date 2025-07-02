// import { useState } from "react";
// import { authService } from "@service";

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const sumbit = () => {
//     const payload = { email, password };
//     authService.signIn(payload);
//   };
//   return (
//     <div>
//       <input
//         type="email"
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button onClick={sumbit}>sumbit</button>
//     </div>
//   );
// };

// export default SignIn;




import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { authService } from "@service";
import { Card, Input, Button } from "antd";

const SignIn = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email("Email noto‘g‘ri kiritilgan").required("Email majburiy"),
    password: Yup.string().min(6, "Parol kamida 6 ta belgidan iborat bo‘lishi kerak").required("Parol majburiy"),
  });

  const handleSubmit = (values: { email: string; password: string }) => {
    authService.signIn(values);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card title="Kirish" style={{ width: 400 }}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, values }) => (
            <Form>
              <div style={{ marginBottom: "16px" }}>
                <label>Email:</label>
                <Field
                  as={Input}
                  name="email"
                  type="email"
                  placeholder="example@mail.com"
                  onChange={handleChange}
                  value={values.email}
                />
                <ErrorMessage
                  name="email"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label>Parol:</label>
                <Field
                  as={Input.Password}
                  name="password"
                  placeholder="Parol"
                  onChange={handleChange}
                  value={values.password}
                />
                <ErrorMessage
                  name="password"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </div>

              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default SignIn;
