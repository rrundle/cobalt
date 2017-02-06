/* global React, ReactDOM, Redux */
const { Input } = require('semantic-react')

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
    let value = event.target.value
    store.dispatch({ type: "INPUT", value})
  }

  return (
    <div className="start">
      <div className="name-title">{'Your name'}
        <input className="name"></input>
      </div>
      <div className="org-title">{'Organization name'}
        <Input className="org" onChange={handlePress}/>
      </div>
      <div className="org-display">
        <div>{'http://www.' + store.getState().org + '.cobalt.com'}>
        </div>
      </div>
      <button className="go">{'Let\'s go!'}</button>
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
