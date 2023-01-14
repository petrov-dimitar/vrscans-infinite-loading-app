import React from 'react';
import './registerForm.css';
import { useLoginMutation } from 'redux/auth.service';
import { toast } from 'react-toastify';
import AppModal from 'modules/common/components/AppModal';

function withReduxHook(Component) {
  return function WrappedComponent(props) {
    const [login, response] = useLoginMutation();
    return <Component {...props} login={[login, response]} />;
  };
}
class RegisterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
      showSignUp: false
    };
  }

  handleChange = (e) => {
    const fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  };

  toggleSignInForm = () => {
    console.log('Here');
    const showSignUpCurrValue = this.state.showSignUp;

    this.setState({
      showSignUp: !showSignUpCurrValue
    });
  };

  submituserRegistrationForm = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      const fields = {};
      fields.fields = '';
      fields.lastName = '';
      fields.email = '';
      fields.mobileno = '';
      fields.password = '';
      this.setState({ fields });
      alert('Form submitted');
    }
  };

  validateForm = () => {
    const fields = this.state.fields;
    const errors = {};
    let formIsValid = true;

    if (!fields.firstName) {
      formIsValid = false;
      errors.firstName = '*Please enter your firstName.';
    }

    if (typeof fields.firstName !== 'undefined') {
      if (!fields.firstName.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors.firstName = '*Please enter alphabet characters only.';
      }
    }

    if (typeof fields.lastName !== 'undefined') {
      if (!fields.lastName.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors.lastName = '*Please enter alphabet characters only.';
      }
    }

    if (!fields.email) {
      formIsValid = false;
      errors.email = '*Please enter your email.';
    }

    // if (typeof fields.email !== "undefined") {
    // regular expression for email validation
    // var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    // if (!fields.email.match(new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i))) {
    // formIsValid = false;
    // errors.email = "*Please enter valid email.";
    // }
    // }

    if (!fields.password) {
      formIsValid = false;
      errors.password = '*Please enter your password.';
    }

    if (typeof fields.password !== 'undefined') {
      if (!fields.password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors.password = '*Please enter secure and strong password.';
      }
    }

    this.setState({
      errors
    });
    return formIsValid;
  };

  sendLoginCredentials = () => {
    console.log('send login credentials');
    console.log('props', this.props);
    this.props.login[0]({
      email: this.state.fields.email,
      password: this.state.fields.password
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.login[1].isSuccess !== this.props.login[1].isSuccess) {
      if (this.props.login[1].isSuccess) {
        toast.success('Successfully logged in');
        this.props.setIsModalOpen(false);
      }
    }

    if (prevProps.login[1].isError !== this.props.login[1].isError) {
      if (this.props.login[1].isError) {
        toast.error('Could not log you in!');
      }
    }
  }

  render() {
    return (
      <AppModal open={this.props.isModalOpen} setOpen={() => this.props.setIsModalOpen(false)}>
        <div id="main-registration-container">
          <div
            style={{
              textAlign: 'center'
            }}
          >
            <input
              type="submit"
              className="button"
              data-cy="switchLoginButton"
              value={this.state.showSignUp ? 'Register' : 'Login'}
              onClick={this.toggleSignInForm}
            />
          </div>

          {this.state.showSignUp ? (
            <div id="login">
              <h3>Login</h3>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px'
                }}
              >
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  data-cy="emailField"
                  value={this.state.fields.email}
                  onChange={this.handleChange}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px'
                }}
              >
                <label>Set a password</label>
                <input
                  type="password"
                  data-cy="passwordField"
                  name="password"
                  value={this.state.fields.password}
                  onChange={this.handleChange}
                />
              </div>
              <div
                style={{
                  textAlign: 'center'
                }}
              >
                <input
                  type="submit"
                  className="button"
                  value="Login"
                  onClick={this.sendLoginCredentials}
                />
              </div>
            </div>
          ) : (
            <div id="register">
              <h3>Register</h3>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px'
                }}
              >
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={this.state.fields.email}
                  onChange={this.handleChange}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px'
                }}
              >
                <label>Set a password</label>
                <input
                  type="password"
                  name="password"
                  value={this.state.fields.password}
                  onChange={this.handleChange}
                />
              </div>
              <div
                style={{
                  textAlign: 'center'
                }}
              >
                <input type="submit" className="button" value="Register" />
              </div>
            </div>
          )}
          <div className="errorMsg">{this.state.errors.password}</div>
          <div className="errorMsg">{this.state.errors.password}</div>
          <div className="errorMsg">{this.state.errors.email}</div>
          <div className="errorMsg">{this.state.errors.email}</div>
        </div>
      </AppModal>
    );
  }
}

export default withReduxHook(RegisterComponent);
