import React from 'react';
import './registerForm.css';
import { useLoginMutation } from 'redux/auth.service';
import { toast } from 'react-toastify';
import AppModal from 'modules/common/components/AppModal';
import TextField from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

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
      showSignUp: false,
      value: 0
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

  handleChangeTab = (event, newValue) => {
    this.setState({ value: newValue });
    // setValue(newValue);
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
          <div>
            <h1
              style={{
                fontFamily: 'Fira Sans',
                fontStyle: 'italic',
                fontWeight: '275',
                fontSize: '40px',
                lineHeight: '48px',
                color: '#000000'
              }}
            >
              Hi There, welcome to SCAO
            </h1>

            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChangeTab}
                  aria-label="basic tabs example"
                  centered
                >
                  <Tab label="Login" />
                  <Tab label="Register" />
                </Tabs>
              </Box>
              <TabPanel value={this.state.value} index={0}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px'
                  }}
                >
                  <TextField
                    name="email"
                    data-cy="emailField"
                    variant="standard"
                    label="Email"
                    value={this.state.fields.email}
                    onChange={this.handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  ></TextField>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px'
                  }}
                >
                  <TextField
                    type="password"
                    data-cy="passwordField"
                    name="password"
                    value={this.state.fields.password}
                    onChange={this.handleChange}
                    fullWidth
                    variant="standard"
                    label="Password"
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
                <div
                  style={{
                    textAlign: 'center',
                    marginTop: '24px'
                  }}
                >
                  <Button onClick={this.sendLoginCredentials} variant="contained" disableElevation>
                    Login
                  </Button>
                </div>
              </TabPanel>
              <TabPanel value={this.state.value} index={1}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px'
                  }}
                >
                  <TextField
                    name="email"
                    data-cy="emailField"
                    variant="standard"
                    label="Email"
                    value={this.state.fields.email}
                    onChange={this.handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  ></TextField>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px'
                  }}
                >
                  <TextField
                    type="password"
                    data-cy="passwordField"
                    name="password"
                    value={this.state.fields.password}
                    onChange={this.handleChange}
                    fullWidth
                    variant="standard"
                    label="Password"
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
                <div
                  style={{
                    textAlign: 'center',
                    marginTop: '24px'
                  }}
                >
                  <Button variant="contained" disableElevation>
                    Register
                  </Button>
                </div>
              </TabPanel>
            </Box>
          </div>

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
