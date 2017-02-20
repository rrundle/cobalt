/* global React, ReactDOM, Redux */
const { Form, Button } = require('semantic-ui-react')
const { connect } = require('react-redux')

const News = () => {
  const handleSubmit = () => {
    console.log('submitted')
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.TextArea name='details' placeholder='What is new?' rows='4' />
        <Button primary type='submit'>Publish</Button>
      </Form>
    </div>
  )
}

module.exports = connect()(News)
