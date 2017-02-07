/* global React, ReactDOM, Redux */
const { Input, Button, Dropdown } = require('semantic-ui-react')

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

const Signup = () => {
  const handlePress = event => {
    let value = event.target.value.replace(/\s/g, "")
    store.dispatch({ type: "INPUT", value})
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
        <input className="name" required={required}></input>
      </div>
      <div className="org-title">{'Organization name'}
        <Input keyboardType='numeric' className="org" required={required} keydown={disableSpace} onChange={handlePress}/>
      </div>
      <div className="org-display">
        <div>{'http://www.' + store.getState().org + '.cobalt.com'}
        </div>
      </div>
      <Button disabled className="go">{'Let\'s go!'}</Button>
    </div>
  )
}

const store = Redux.createStore(reducer, initialState)
const draw = () => console.log(store.getState())
store.subscribe(draw)

const redraw = () => {
   ReactDOM.render(
     <Signup/>,
     document.querySelector('.start')
   )
 }

 store.subscribe(redraw)

 redraw()
