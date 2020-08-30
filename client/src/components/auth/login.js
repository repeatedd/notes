import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Navlink,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { browserHistory } from "react-router";

class Login extends Component {
  state = {
    modal: false,
    email: "",
    password: "",
    msg: null,
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    if (isAuthenticated) {
      window.location = "./notes";
    }
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChangeName = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onChangeContent = (e) => {
    this.setState({ content: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    this.props.login(user);
  };
  render() {
    return (
      <div className="text-center">
        <div style={{ margin: "auto", width: "550px" }} inline-block>
          <h2>Login</h2>
          {this.state.msg ? (
            <Alert color="danger">{this.state.msg}</Alert>
          ) : null}
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={this.onChangeName}
              />
              <Input
                type="password"
                name="password"
                className="mb-3"
                id="password"
                placeholder="Password"
                onChange={this.onChangeName}
              />
              <div className="text-center">
                <Button
                  color="primary"
                  style={{
                    marginTop: "2rem",
                    alignContent: "center",
                    width: "25%",
                  }}
                  inline
                >
                  Login
                </Button>
              </div>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login })(Login);
