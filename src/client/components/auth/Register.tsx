import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

export interface RegisterState {
  email: string;
  password: string;
}

class Register extends Component<{}, RegisterState> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    const state = this.state
    state[e.target.id] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password,
    };

    console.log(newUser);
    this.props.registerUser(newUser, this.props.history); 
  };

  render() {
    return (
      <div>
        <div>
          Register Page
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
        
        <form noValidate onSubmit={this.onSubmit}>
          <div>
            <input
              onChange={this.onChange} required
              value={this.state.email}
              id="email"
              type="email"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <input
              onChange={this.onChange} required
              value={this.state.password}
              id="password"
              type="password"
            />
            <label htmlFor="password">Password</label>
          </div>
          <div>
            <button type="submit">
              Sign up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));