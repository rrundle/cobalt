/* global React, ReactDOM, Redux */
const { Input, Button, Icon, Form } = require('semantic-ui-react')
const { connect } = require('react-redux')
const { IndexLink } = require('react-router')

const Login = ({ stateProps, updateUsername, updatePassword }) => {

  return (
    <div className="login">

      <Authenticate
        stateProps={stateProps}
        updateUsername={updateUsername}
        updatePassword={updatePassword}
      >
      </Authenticate>

      <IndexLink to='/signup' activeClassName="active" id="link-go">
        <Button animated primary type="submit" id="go">
          <Button.Content visible>{'Signup'}</Button.Content>
          <Button.Content hidden>
            <Icon name='rocket' />
          </Button.Content>
        </Button>
      </IndexLink>

    </div>
  )
}

const Authenticate = ({ stateProps, updateUsername, updatePassword }) => {

  const handleUsername = event => {
    const value = event.target.value
    console.log(value)
    updateUsername(value)
  }

  const handlePassword = event => {
    const value = event.target.value
    console.log(value)
    updatePassword(value)
  }

  const handleLogin = event => {
    //const value = event.target.value
    //checkLogin(value)
    console.log('please login', stateProps.email, stateProps.password)
    //use state.props values
  }

  return (
    <div>
      <Input className="contact" placeholder="email" value={stateProps.email} onChange={handleUsername} />
      <Input className="contact" type="password" placeholder="password" value={stateProps.password} onChange={handlePassword} />
      <Button type='submit' onClick={handleLogin}>Login</Button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    stateProps: {
      email: state.email,
      password: state.password,
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUsername: (value) => dispatch({type: 'EMAIL', value}),
    updatePassword: (value) => dispatch({type: 'PASSWORD', value})
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Login)
