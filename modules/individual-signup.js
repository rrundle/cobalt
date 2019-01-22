/* global React, ReactDOM, Redux */
const { Input, Button, Icon, Form } = require('semantic-ui-react')
const { connect } = require('react-redux')
const { IndexLink } = require('react-router')

const IndSignup = ({ stateProps, dispatchProps }) => {

    return (
        <div>
        <div id="company">
            <span id="logo">cobalt</span>
        </div>
        <div id="action-container">
            <p id="call-action">{'Get started'}</p>
        </div>
        <Form>
            <Form.Input name="org" value={state.org_name} className="org" id="org" onChange={handleOrg} />
            <div className="title">{'Organization name'}</div>
            <div className="org-display">
                <div>{state.site_url}
                    <div id="website" >{'Your website url'}</div>
                    <span id="matches"></span>
                </div>
            </div>

            <Form.Input label="" name="name" value={state.name} className="name" id="name" onChange={handleName} />
            <div className="title">{'Your name'}</div>

            <Form.Input required name="email" value={state.email} type="email" className="name" onChange={handleEmail} />
            <div className="title">{'Your email'}</div>

            <Form.Input required name="password" value={state.password} type="password" className="name" onChange={handlePassword} />
            <div className="title">{'Password'}</div>
            {
            (state.match !== true)
            ? <IndexLink to='/contact' activeClassName="active" id="link-go">
                <Button animated primary type="submit" id="go" onBlur={handleBlur}>
                    <Button.Content visible>{'Let\'s go!'}</Button.Content>
                    <Button.Content hidden>
                    <Icon name='thumbs up' />
                    </Button.Content>
                </Button>
            </IndexLink>
            : <Button animated disabled primary type="submit" id="go" onBlur={handleBlur}>
                <Button.Content visible>{'Let\'s go!'}</Button.Content>
                <Button.Content hidden>
                    <Icon name='thumbs up' />
                </Button.Content>
            </Button>
            }
        </Form>
        </div>
    )
}

const Authenticate = ({ stateProps, dispatchProps}) => {

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
      <div id="company">
        <span id="logo">cobalt</span>
      </div>
      <div id="tagline-container">
        <h1 id="tagline">Dead simple content management.</h1>
        <p>Create content and share with your followers or members.</p>
      </div>
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
      dispatchProps: {
        updateUsername: (value) => dispatch({type: 'EMAIL', value}),
        updatePassword: (value) => dispatch({type: 'PASSWORD', value})
      }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(IndSignup)
