import React from 'react';
import './registerForm.css';

class RegisterComponent extends React.Component {
    constructor() {
      super();
      this.state = {
        fields: {},
        errors: {},
        showSignUp: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
      this.toggleSignInForm = this.toggleSignInForm.bind(this);
    };

    handleChange(e) {
      const fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });

    }

    toggleSignInForm = () => {
      console.log("Here");
        const showSignUpCurrValue = this.state.showSignUp;
        
        this.setState({
            showSignUp: !showSignUpCurrValue
        });
    }

    submituserRegistrationForm(e) {
      e.preventDefault();
      if (this.validateForm()) {
          const fields = {};
          fields.fields = '';
          fields.lastName = "";
          fields.email = "";
          fields.mobileno = "";
          fields.password = '';
          this.setState({fields});
          alert("Form submitted");
      }

    }

    validateForm() {

      const fields = this.state.fields;
      const errors = {};
      let formIsValid = true;

      if (!fields.firstName) {
        formIsValid = false;
        errors.firstName = "*Please enter your firstName.";
      }

      if (typeof fields.firstName !== "undefined") {
        if (!fields.firstName.match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors.firstName = "*Please enter alphabet characters only.";
        }
      }

      if(typeof fields.lastName !== "undefined"){
        if(!fields.lastName.match(/^[a-zA-Z ]*$/)){
            formIsValid = false;
            errors.lastName = "*Please enter alphabet characters only."
        }
      }

      if (!fields.email) {
        formIsValid = false;
        errors.email = "*Please enter your email.";
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
        errors.password = "*Please enter your password.";
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


    }
    
  render() {
    return (
    <div id="main-registration-container">
     
     {
        this.state.showSignUp ?
     
     <div id="login">
      <input type="submit" className="button"  value="Sign Up" onClick={this.toggleSignInForm}/>
      <input type="submit" className="button"  value="Sign In" onClick={this.toggleSignInForm}/>
     <label>Email</label>
        <input type="text" name="email" value={this.state.fields.email} onChange={this.handleChange}  />
        <div className="errorMsg">{this.state.errors.email}</div>
        <label>Password</label>
        <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.password}</div>
     </div>
     
    :
    <div id="register">
      <input type="submit" className="button"  value="Sign Up" onClick={this.toggleSignInForm}/>
     <input type="submit" className="button"  value="Sign In" onClick={this.toggleSignInForm}/>
        <h3>Hi there, welcome to Name</h3>
        <form method="post"  name="userRegistrationForm"  onSubmit= {this.submituserRegistrationForm} >
        <label>First Name</label>
        <input type="text" name="firstName" value={this.state.fields.firstName} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.firstName}</div>
        <label>Last Name</label>
        <input type="text" name="lastName" value={this.state.fields.lastName} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.lastName}</div>
        <label>Email</label>
        <input type="text" name="email" value={this.state.fields.email} onChange={this.handleChange}  />
        <div className="errorMsg">{this.state.errors.email}</div>
        <label>Set a password</label>
        <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.password}</div>
        <label>By creating an account you agree to the <u>Terms & Conditions</u></label>
        <br></br>
        <label>Or log in with </label>
        <img id="blah" src="" />
        <input type="submit" className="button"  value="Let's go"/>
        </form>
    </div>
  }
</div>

      );
  }


}


export default RegisterComponent;