const { IndexLink } = require('react-router')
const { Button, Icon } = require('semantic-ui-react')

const Next = ({link}) => {
  return (
  <div id="next">
    <IndexLink to={link} activeClassName="active">
      <Button animated>
        <Button.Content visible>Next</Button.Content>
        <Button.Content hidden>
          <Icon name='right arrow' />
        </Button.Content>
      </Button>
    </IndexLink>
  </div>
  )
}

const Back = ({link}) => {
  return (
    <div id="back">
      <IndexLink to={link} activeClassName="active">
        <Button animated>
          <Button.Content visible>Back</Button.Content>
          <Button.Content hidden>
            <Icon name='left arrow' />
          </Button.Content>
        </Button>
      </IndexLink>
    </div>
  )
}

module.exports = { Back, Next }
