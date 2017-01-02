import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, signUpUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
  static propTypes = {
    emailChanged: PropTypes.func,
    passwordChanged: PropTypes.func,
    loginUser: PropTypes.func,
    signUpUser: PropTypes.func,
    email: PropTypes.string,
    password: PropTypes.string,
    loading: PropTypes.bool,
    error: PropTypes.string,
    navigator: PropTypes.object
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

  renderLoginButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }
    return (
        <Button onPress={this.login.bind(this)} >
          Login
        </Button>
    );
  }

  renderSignInButton() {
    if(!this.props.loading) {
      return (
        <Button onPress={this.signUp.bind(this)} >
          Sign Up
        </Button>
      );
    }
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
          secureTextEntry
          label='Password'
          placeholder='password'
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
          />
        </CardSection>

        <CardSection>
          <Input
          label='Email'
          placeholder='email@email.com'
          onChangeText={this.onEmailChange.bind(this)}
          value={this.props.email}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection style={{height: 55}}>
          {this.renderLoginButton()}
          {this.renderSignInButton()}
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
