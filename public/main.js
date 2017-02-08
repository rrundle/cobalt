/* global React, ReactDOM, Redux */
const { Input, Button, Dropdown } = require('semantic-ui-react')
const { Provider } = require('react-redux')
const { Router, Route, hashHistory } = require('react-router')

const initialState = {
  org: ''
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'INPUT':
    if (!action.value) {
      return Object.assign({}, state, {
        org: ''
      })
    }
    if (action.value) {
      const typed = action.value.trim()
      return Object.assign({}, state, {
        org: typed.toLowerCase()
      })
    }

    default:
      return state
  }
}

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

  const handlePress = event => {
    const value = event.target.value.replace(/\s/g, "")
    dispatch({ type: "INPUT", value})
    const data = {
      url: state.org
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

  const handleClick = event => {
    const nameValue = document.querySelector('.name').firstChild.value
    const urlValue = `http://www.${state.org}.cobalt.com`
    const data = {
      nameValue: nameValue,
      urlValue: urlValue
    }
    const route = 'POST'
    const path = '/site'
    sendData(data, path, route)
      .then(result => console.log(result))
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
      <div>
        <Input className="name" id="name" required={required}></Input>
        <div className="title">{'Your name'}</div>
      </div>
      <div>
        <Input keyboardType='numeric' className="org" id="org" required={required} keydown={disableSpace} onChange={handlePress}/>
        <div className="title">{'Organization name'}</div>
      </div>
      <div className="org-display">
        <div>{`http://www.${state.org}.cobalt.com`}
        <div id="website" >{'Your website url'}</div>
        <span id="matches"></span>
        </div>
      </div>
      <Button id="go" onClick={handleClick}>{'Let\'s go!'}</Button>
    </div>
  )
}

const store = Redux.createStore(reducer, initialState)
const draw = () => console.log(store.getState())
store.subscribe(draw)

const redraw = () => {
  const state = store.getState()
  const { dispatch } = store
   ReactDOM.render(
    <Provider store={store} dispatch={dispatch}>
      <Router history={hashHistory} store={store} dispatch={dispatch}>
        <Route path='/' component={Signup} />
      </Router>
    </Provider>,
     document.querySelector('.start')
   )
}

store.subscribe(redraw)

redraw()

module.exports = Signup
