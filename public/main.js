/* global React, ReactDOM, Redux */
const { Input, Button, Dropdown } = require('semantic-ui-react')
const { Provider } = require('react-redux')

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

const Signup = ({ state, dispatch }) => {

  const handlePress = event => {
    const value = event.target.value.replace(/\s/g, "")
    dispatch({ type: "INPUT", value})
    const data = {
      url: state.org
    }
    const route = 'POST'
    const path = '/org'
    const matches = document.getElementById('matches')
    sendData(data, path, route)
      .then(result => {
        if (result.length === 0) {
          matches.textContent = 'available'
        }
        else {
          matches.textContent = 'unavailable'
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
      <div>{'Select existing site'}
        <Dropdown fluid selection />
      </div>
      <div id="action-container">
        <p id="call-action">{'Get started'}</p>
      </div>
      <div className="name-title">{'Your name'}
        <Input className="name" required={required}></Input>
      </div>
      <div className="org-title">{'Organization name'}
        <Input keyboardType='numeric' className="org" required={required} keydown={disableSpace} onChange={handlePress}/>
      </div>
      <div className="org-display">
        <div>{`http://www.${state.org}.cobalt.com`}
        </div>
        <span id="matches"></span>
      </div>
      <Button className="go" onClick={handleClick}>{'Let\'s go!'}</Button>
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
      <Signup state={state} dispatch={dispatch} />
    </Provider>,
     document.querySelector('.start')
   )
}

store.subscribe(redraw)

redraw()
