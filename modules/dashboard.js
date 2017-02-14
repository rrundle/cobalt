/* global React, ReactDOM, Redux */
const { connect } = require('react-redux')
const { Sidebar, Segment, Button, Menu, Image, Icon, Header } = require('semantic-ui-react')

const Dashboard = ({stateProps, toggleVisibility}) => {
  return (
    <Sidemenu
      stateProps={stateProps}
      toggleVisibility={toggleVisibility}
    />
  )
}

const Sidemenu = ({stateProps, toggleVisibility}) => {

  const handleClick = () => {
    if (stateProps.view === true) {
      stateProps.view = false
    }
    else {
      stateProps.view = true
    }
  }

  return (
    <div>
       <Button onClick={handleClick}>Toggle Visibility</Button>
       <Sidebar.Pushable id="dashboard" as={Segment}>
         <Sidebar id="sidebar" as={Menu} animation='scale down' width='thin' visible={stateProps.view} icon='labeled' vertical inverted>
           <Menu.Item name='home'>
             <Icon name='home' />
             Home
           </Menu.Item>
           <Menu.Item name='gamepad'>
            <Icon name='gamepad' />
             Games
           </Menu.Item>
           <Menu.Item name='camera'>
             <Icon name='camera' />
             Channels
           </Menu.Item>
         </Sidebar>
         <Sidebar.Pusher>
           <Segment basic>
             <Header as='h3'>Application Content</Header>
             <Image src='http://semantic-ui.com/images/wireframe/paragraph.png' />
           </Segment>
         </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
  )
}

/*
const Photos = () => {
  return (

  )
}

const Body = () => {
  return (

  )
}
*/

const mapStateToProps = state => {
  return {
    stateProps: {
      site_url: state.site_url,
      name: state.name,
      org_name: state.org_name,
      org_address: state.org_address,
      org_phone: state.org_phone,
      site_color_primary: state.site_color_primary,
      site_color_secondary: state.site_color_secondary,
      site_photo: state.site_photo,
      site_background_photo: state.site_background_photo,
      view: state.view
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleVisibility: () => console.log('got it!')//dispatch({type: "SIDEBAR"})
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Dashboard)
