import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../signUp/signUp.scss";
import { useRecoilState } from "recoil";
import { userInfo } from "../../atoms/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string(),
});

export const Signin = () => {
  let [User, setUser] = useRecoilState(userInfo);
  let reDirect = useNavigate();

  return (
    <div>
      <h1>Sign In</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Schema}
        onSubmit={async (values) => {
          // same shape as initial values
          /* Steps to login a user 
          > use the typed email to verify if the user exists
          > if the uesr exists, use the typed password to match the password in the db
          > login, else do no login. 
          */
          try {
            console.log("before await");
            let getUser = await axios.get(
              `http://localhost:8000/User/${values.email}`
            );
            console.log("after await");

            if (
              getUser.data.email === values.email ||
              getUser.data.password === values.password
            ) {
              setUser({ isLoggedIn: true, data: getUser.data });
              reDirect("/blog");
            } else {
              alert("wrong email or password");
            }
            console.log(getUser.data);
          } catch (error) {}
        }}
      >
        {({ errors, touched }) => (
          <fieldset>
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email: </label>
                <div className="form-field">
                  <Field
                    name="email"
                    id="email"
                    type="email"
                    placeholder="johndoe@email.com"
                  />
                  {/* If this field has been touched, and it contains an error, display it */}
                  {touched.email && errors.email && <div>{errors.email}</div>}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password: </label>
                <div className="form-field">
                  <Field
                    name="password"
                    id="password"
                    type="password"
                    placeholder="***********"
                  />
                  {/* If this field has been touched, and it contains an error, display it */}
                  {touched.password && errors.password && (
                    <div>{errors.password}</div>
                  )}
                </div>
              </div>
              <button type="submit">Sign In</button>
            </Form>
          </fieldset>
        )}
      </Formik>
      <p style={{ textAlign: "center" }}>
        Don't have an account?{" "}
        <span
          onClick={() => reDirect("/signup")}
          style={{
            border: "1px solid #a0a0a0",
            padding: "8px",
            borderRadius: "8px",
            cursor: "pointer",
            color: "blue",
          }}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};
export default Signin;
