/* global React, ReactDOM, Redux */
const { connect } = require('react-redux')
const { Sidebar, Segment, Button, Menu, Image, Icon, Header, Input, Popup, Radio } = require('semantic-ui-react')
const { TwitterPicker, clientWidth } = require('react-color')

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
    stateProps.view = false ? stateProps.view === true : true
  }

  return (
    <div>
       <Button onClick={handleClick}>Toggle Visibility</Button>
       <Sidebar.Pushable id="dashboard" as={Segment}>
         <Sidebar id="sidebar" as={Menu} animation='scale down' width='thin' visible={stateProps.view} icon='labeled' vertical inverted>
           <Info
             stateProps={stateProps}
             toggleVisibility={toggleVisibility}
           />
         </Sidebar>
         <Sidebar.Pusher id="content">
           <Segment basic>
             <Header as='h3'>Application Content</Header>
             <Image src='http://semantic-ui.com/images/wireframe/paragraph.png' />
           </Segment>
         </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
  )
}

const Info = ({stateProps, toggleVisibility}) => {

  return (
    <div>
      <div id="dash-title">Cobalt</div>
      <Menu.Item name='name'>
        <div>Name</div>
        <Input id="dash-name" icon='write' defaultValue={stateProps.name} />
      </Menu.Item>
      <Menu.Item name='org'>
        <div>Organization</div>
        <Input id="dash-org" icon='write' defaultValue={stateProps.org_name} />
        <Input id="dash-address" icon='write' defaultValue={stateProps.org_address} />
      </Menu.Item>
      <Menu.Item name='color'>
        <div>Primary Site Color</div>
        <Popup
          id="dash-color-1"
          trigger={<div id="dash-circle-1"></div>}
          flowing
          hoverable
        >
          <TwitterPicker />
        </Popup>
      </Menu.Item>
      <Menu.Item>
        <div>Secondary Site Color</div>
        <Popup
          id="dash-color-2"
          trigger={<div id="dash-circle-2"></div>}
          flowing
          hoverable
        >
          <TwitterPicker />
        </Popup>
      </Menu.Item>
      <Menu.Item>
        <div>Display Preferences</div>
        <div>Address</div>
        <Segment compact>
          <Radio slider />
        </Segment>
      </Menu.Item>
      <Menu.Item>
        <div>Phone</div>
        <Segment compact>
          <Radio slider />
        </Segment>
      </Menu.Item>
      <Menu.Item>
        <div>News</div>
        <Segment compact>
          <Radio slider />
        </Segment>
      </Menu.Item>
      <Menu.Item>
        <div>Events</div>
        <Segment compact>
          <Radio slider />
        </Segment>
      </Menu.Item>
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
