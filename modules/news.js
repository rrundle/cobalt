/* global React, ReactDOM, Redux */
const { Form, Button } = require('semantic-ui-react')
const { connect } = require('react-redux')

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

const News = ({ stateProps, dispatchProps }) => {

  const handleSubmit = (event, value) => {
    event.preventDefault()
    const route = 'POST'
    const path = '/news'
    const data = {
      site_id: stateProps.site_id,
      content: value.formData.details
    }
    sendData(data, path, route)
      .then(result => console.log(result))
  }

  return (
    <div>
      <Form id='news-form' onSubmit={handleSubmit}>
        <Form.TextArea name='details' placeholder='What is new?' rows='4' />
        <Button id='news-submit=' primary type='submit'>Publish</Button>
      </Form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    stateProps: {
      site_id: state.site_id,
    }
  }
}

module.exports = connect(mapStateToProps)(News)
