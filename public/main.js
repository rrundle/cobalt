/* global React, ReactDOM, Redux */
const { Form, Input, Button, Dropdown, Icon } = require('semantic-ui-react')
const { Provider } = require('react-redux')
const { combineReducers } = require('redux')
const { Router, Route, hashHistory, IndexLink, browserHistory } = require('react-router')
const StepTwo = require('../modules/contact.js')
const StepThree = require('../modules/colors.js')
const StepFour = require('../modules/photos.js')

const initialState = {
  name: '',
  org_name: '',
  site_url: '',
  org_address: '',
  org_city: '',
  org_state: '',
  org_zipcode: '',
  org_phone: '',
  site_color_primary: '',
  site_color_secondary: '',
  site_photo: {},
  site_background_photo: {}
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'ORG':
      return Object.assign({}, state, {
        org_name: action.value,
        site_url: `http://www.${state.org_name.toLowerCase()}.cobalt.com`
      })

    case 'NAME':
      return Object.assign({}, state, {
        name: action.value
      })

    case 'ADDRESS':
      return Object.assign({}, state, {
        org_address: action.value
      })

    case 'CITY':
      return Object.assign({}, state, {
        org_city: action.value
      })

    case 'STATE':
      return Object.assign({}, state, {
  	    org_state: action.value
  	  })

    case "ZIPCODE":
      return Object.assign({}, state, {
        org_zipcode: action.value
      })

    case "PHONE":
      return Object.assign({}, state, {
        org_phone: action.value
      })


    default:
      return state
  }
}

/*
const contact = (state, action) => {
  switch(action.type) {
    case 'ADDRESS':
      return Object.assign({}, state, {
        org_address: action.value
      })

    case 'CITY':
      return Object.assign({}, state, {
        org_city: action.value
      })

    case 'STATE':
	    return Object.assign({}, state, {
		    org_state: action.value
	    })

    case "ZIPCODE":
      return Object.assign({}, state, {
        org_zipcode: action.value
      })

    case "PHONE":
      return Object.assign({}, state, {
        org_phone: action.value
      })

    default:
      return state
  }
}
*/

function sendData(data, path, route) {
  const options = {
    method: route,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }
  const result = fetch(path, options)
    .then(res => res.json())
  return result
}

const Signup = () => {

  const state = store.getState()
  const { dispatch } = store

  const handleGo = (event) => {
    const tagline = document.getElementById('tagline-container')
    if (tagline) {tagline.parentNode.removeChild(tagline)}
  }

  const handleName = event => {
    const value = event.target.value
    dispatch({ type: 'NAME', value})
  }

  const handleOrg = event => {
    const value = event.target.value.replace(/\s/g, "")
    dispatch({ type: 'ORG', value})
    const data = {
      url: state.org_name
    }
    const route = 'POST'
    const path = '/org'
    const matches = document.getElementById('matches')
    const button = document.getElementById('go')
    sendData(data, path, route)
      .then(result => {
        if (result.length === 0) {
          matches.textContent = 'available'
          matches.style.color = '#009f5a'
        }
        else {
          matches.textContent = 'unavailable'
          matches.style.color = '#e26454'
        }
      })
  }

  const disableSpace = event => {
    if (event.which === 32) {
      return false
    }
  }

  const required = true

  return (
    <div className="start">
      <div id="select">{'Select existing site'}
        <Dropdown fluid selection />
      </div>
      <div id="action-container">
        <p id="call-action">{'Get started'}</p>
      </div>
      <Form>
        <Form.Input label="" name="name" value={state.name} placeholder="Name" className="name" id="name" required={required} onChange={handleName} />
        <div className="title">{'Your name'}</div>
        <Form.Input label="" name="org" value={state.org_name} placeholder="Organization" className="org" id="org" required={required} keydown={disableSpace} onChange={handleOrg} />
        <div className="title">{'Organization name'}</div>
        <div className="org-display">
          <div>{`http://www.${state.org_name.toLowerCase()}.cobalt.com`}
            <div id="website" >{'Your website url'}</div>
            <span id="matches"></span>
          </div>
        </div>
        <IndexLink to='/contact' activeClassName="active" onClick={handleGo}>
          <Button animated primary type="submit" id="go">
            <Button.Content visible>{'Let\'s go!'}</Button.Content>
            <Button.Content hidden>
              <Icon name='thumbs up' />
            </Button.Content>
          </Button>
        </IndexLink>
      </Form>
    </div>
  )
}

//const reducer = combineReducers({info, contact})
const store = Redux.createStore(reducer, initialState)
const draw = () => console.log(store.getState())
store.subscribe(draw)

const routes = (
  <Route>
    <Route path='/' component={Signup} />
    <Route path='/contact' component={StepTwo} />
    <Route path='/colors' component={StepThree} />
    <Route path='/photos' component={StepFour} />
  </Route>
)

const redraw = () => {
  const { dispatch } = store
   ReactDOM.render(
    <Provider store={store} dispatch={dispatch}>
      <Router routes={routes} history={browserHistory} store={store} dispatch={dispatch} />
    </Provider>,
     document.querySelector('.start')
   )
}

store.subscribe(redraw)

redraw()

module.exports = store
