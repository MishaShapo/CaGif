import React, { Component } from 'react';
import { Text, View } from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, signUpUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {

  constructor(props){
    super(props);

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.onFinishedEmail = this.onFinishedEmail.bind(this);
    this.onFinishedPassword = this.onFinishedPassword.bind(this);
    this.renderButton = this.renderButton.bind(this);

  }

  componentDidMount() {
      this.onEmailChange("Test@test.com");
      this.onPasswordChange("password");
      setTimeout(() => {this.login()}, 500);
  }
  
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  login() {
    const { email, password, navigator } = this.props;

    this.props.loginUser({ email, password, navigator });
  }

  signUp() {
    const { email, password, navigator } = this.props;
    this.props.signUpUser({ email, password, navigator });
  }

  onFinishedEmail() {
    if(this.props.email !== ""){
      this.refs.Password.focus();
    }
  }

  onFinishedPassword() {
    if(this.props.email !== "" && this.props.password != ""){
      dismissKeyboard();
    } else if(this.props.email === "") {
      this.refs.Email.focus();
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }
    return (
      <View style={{ flexGrow: 1, height: 120 }}>
        <Button onPress={this.login}>
          Login
        </Button>
        <Button onPress={this.signUp}>
          Sign Up
        </Button>
      </View>
    );
  }

  render() {
    return (
      <Card style={{marginTop: 83}}>
        <CardSection>
          <Input
          ref="Email"
          label='Email'
          placeholder='email@email.com'
          onChangeText={this.onEmailChange.bind(this)}
          value={this.props.email}
          returnKeyType={"next"}
          onSubmitEditing={this.onFinishedEmail}
          />
        </CardSection>

        <CardSection>
          <Input
          ref="Password"
          secureTextEntry
          label='Password'
          placeholder='password'
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
          returnKeyType={"done"}
          onSubmitEditing={this.onFinishedPassword}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection style={{ flexDirection: 'column', overflow: 'visible' }}>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 22,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return {
    email,
    password,
    error,
    loading
  };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, signUpUser
})(LoginForm);
