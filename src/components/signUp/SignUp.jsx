import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./signUp.scss";
import axios from "axios";
import { userInfo } from "../../atoms/user";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const Schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  fullName: Yup.string().min(2, "Too Short!").required("Required"),
  password: Yup.string()
    .min(8, "Must Contain 8 Characters")
    .required()
    .matches(/^(?=.*[a-z])/, " Must Contain One Lowercase Character")
    .matches(/^(?=.*[A-Z])/, "  Must Contain One Uppercase Character")
    .matches(/^(?=.*[0-9])/, "  Must Contain One Number Character")
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      "  Must Contain  One Special Case Character"
    ),
  gender: Yup.string().required("Select your gender"),
  terms: Yup.string()
    .matches(/true/, "Accept to continue")
    .required("T&C is Required"),
});

export const Signup = () => {
  let [User, setUser] = useRecoilState(userInfo);
  let redirect = useNavigate();
  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          gender: "",
          terms: "",
          gender: "",
        }}
        validationSchema={Schema}
        onSubmit={async (values) => {
          // same shape as initial values
          let updateToDB = {
            id: values.email,
            role: "normal",
            gender: values.gender,
            fullName: values.fullName,
            password: values.password,
            terms: values.terms,
          };

          /* Steps to Prevent Multiple Signup with Emails 
          > get all users
          > check if the typed email exits
          > if it exists, do not signup
          > else sign up
          */

          try {
            let getUser = await axios.get(`http://localhost:8000/User`);
            console.log(getUser.data);
            /* Loop through the Data */
            let isUnique = false;
            getUser.data.forEach((each) => {
              if (each.id === values.email) {
                isUnique = true;
              }
            });
            if (!isUnique) {
              axios
                .post("http://localhost:8000/User", updateToDB)

                .then((response) => {
                  setUser({
                    isLoggedIn: true,
                    data: response.data,
                  });
                  redirect("/blog");
                })
                .catch((error) => {
                  console.error(error);
                });
            } else {
              alert("The user with this email exists");
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ errors, touched }) => (
          <fieldset>
            <Form>
              <div className="form-group">
                <label htmlFor="fullName">Full Name: </label>
                <div className="form-field">
                  <Field
                    name="fullName"
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                  />
                  {/* If this field has been touched, and it contains an error, display it */}
                  {touched.fullName && errors.fullName && (
                    <div>{errors.fullName}</div>
                  )}
                </div>
              </div>
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
              <div className="form-group">
                <div className="gender">Gender: </div>
                <div className="radio-group">
                  <div className="form-field">
                    <label>
                      <Field type="radio" name="gender" value="Male" />
                      Male
                    </label>
                    <label>
                      <Field type="radio" name="gender" value="Female" />
                      Female
                    </label>
                    {/* If this field has been touched, and it contains an error, display it */}
                    {touched.terms && errors.terms && (
                      <div className="error-terms">{errors.gender}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="terms">
                <Field name="terms" id="terms" type="checkbox" />
                <div className="form-field">
                  <label htmlFor="terms">
                    Ensure to accept our Terms & condition or you get out of
                    this place.{" "}
                  </label>
                  {/* If this field has been touched, and it contains an error, display it */}
                  {touched.terms && errors.terms && (
                    <div className="error-terms">{errors.terms}</div>
                  )}
                </div>
              </div>

              <button type="submit">Sign Up</button>
            </Form>
          </fieldset>
        )}
      </Formik>
      <p style={{ textAlign: "center" }}>
        Have an Acount Already?{" "}
        <span
          onClick={() => redirect("/signin")}
          style={{
            border: "1px solid #a0a0a0",
            padding: "8px",
            borderRadius: "8px",
            cursor: "pointer",
            color: "blue",
          }}
        >
          Sign In
        </span>
      </p>
    </div>
  );
};
export default Signup;
