import React, { useEffect } from "react";
import { Button, Col, Form, Input, message, Row } from "antd";
import "../Resources/authentication.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch({ type: "showloading" });
    axios
      .post("/api/users/register", values)
      .then((res) => {
        dispatch({ type: "hideloading" });
        message.success(
          "Registration successfull , please wait for verifaction"
        );
      })
      .catch(() => {
        dispatch({ type: "hideloading" });

        message.error("sOMTHING WENT WRONG");
      });
  };

  useEffect(() => {
    if (localStorage.getItem("pos-user")) navigate("/home");
  }, []);

  return (
    <div className="authentication">
      <Row>
        <Col lg={8} xs={22}>
          <Form layout="vertical" onFinish={onFinish}>
            <h1>
              <b> Vaultify </b>
            </h1>
            <hr />
            <h3>Register</h3>
            <Form.Item name="name" label="Username">
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item name="userId" label="User ID">
              <Input placeholder=" " />
            </Form.Item>

            <Form.Item name="password" label="Password">
              <Input type="password" placeholder="Price" />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login"> Already Registerd ? Click here to login</Link>
              <Button htmlType="submit" type="primary">
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
