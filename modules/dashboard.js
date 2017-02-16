/* global React, ReactDOM, Redux */
const { connect } = require('react-redux')
const { Sidebar, Segment, Button, Menu, Image, Icon, Header, Input, Popup, Radio, Dropdown } = require('semantic-ui-react')
const { CirclePicker, clientWidth } = require('react-color')
const Dropzone = require('react-dropzone')
const request = require('superagent')
const { Photo } = require('./photo-drop.js')
const { stateOptions } = require('./states')


const Dashboard = ({stateProps, toggleVisibility, dispatchProps }) => {
  return (
    <Sidemenu
      stateProps={stateProps}
      toggleVisibility={toggleVisibility}
      dispatchProps={dispatchProps}
    />
  )
}

const Sidemenu = ({stateProps, toggleVisibility, dispatchProps}) => {

  return (
    <div>
      <Sidebar.Pushable id="dashboard" as={Segment}>
        <Sidebar id="sidebar" as={Menu} animation='scale down' width='thin' visible={stateProps.view} icon='labeled' vertical inverted>
          <Info
           stateProps={stateProps}
           toggleVisibility={toggleVisibility}
           dispatchProps={dispatchProps}
          />
      </Sidebar>
        <Sidebar.Pusher id="dash-body">
          <Body
          stateProps={stateProps}
          dispatchProps={dispatchProps}
          >
          </Body>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  )
}

const Info = ({ stateProps, toggleVisibility, dispatchProps }) => {

  const handleClick = () => {
    stateProps.view = false ? stateProps.view === true : true
  }

  const handleName = event => {
    const value = event.target.value
    dispatchProps.editName(value)
  }

  const handleOrg = event => {
    const value = event.target.value
    dispatchProps.editOrg(value)
  }

  const handleAddress = event => {
    const value = event.target.value
    dispatchProps.editAddress(value)
  }

  const handleCity = event => {
    const value = event.target.value
    dispatchProps.editCity(value)
  }

  const handleState = event => {
    const value = event.target.value
    dispatchProps.editState(value)
  }

  const handleZip = event => {
    const value = event.target.value
    dispatchProps.editZip(value)
  }

  const handlePhone = event => {
    const value = event.target.value
    dispatchProps.editPhone(value)
  }

  const handlePrimary = (color, event) => {
    console.log(color.hex)
    const value = color.hex
    dispatchProps.editPrimary(value)
  }

  const handleSecondary = (color, event) => {
    const value = color.hex
    dispatchProps.editSecondary(value)
  }

  const updateProfile = () => {
    const data = {
      site_id: stateProps.site_id,
      name: stateProps.name,
      org_name: stateProps.org_name,
      org_address: stateProps.org_address,
      org_city: stateProps.org_city,
      org_state: stateProps.org_state,
      org_zipcode: stateProps.org_zipcode,
      org_phone: stateProps.org_phone,
      site_color_primary: stateProps.site_color_primary,
      site_color_secondary: stateProps.site_color_secondary,
      site_photo: stateProps.site_photo,
      site_background_photo: stateProps.site_background_photo
    }
    const route = 'POST'
    const path = '/dashboard'
    sendData(data, path, route)
      .then(result => console.log(result))
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

  let primaryColor = {
    backgroundColor: `${stateProps.site_color_primary}`
  }

  let secondaryColor = {
    backgroundColor: `${stateProps.site_color_secondary}`
  }

  return (
    <div>
      <div id="dash-title">Cobalt</div>
      <Button content="Hide" icon="left arrow" labelPosition="left" onClick={dispatchProps.handleClick}></Button>
      <Menu.Item name='name'>
        <div>Name</div>
        <Input id="dash-name" icon='write' defaultValue={stateProps.name} onChange={handleName} onBlur={updateProfile}/>
      </Menu.Item>
      <Menu.Item name='org'>
        <div>Organization</div>
        <Input id="dash-org" icon='write' labelPosition="left" defaultValue={stateProps.org_name} onBlur={updateProfile} onChange={handleOrg}/>
        <Input id="dash-address" icon='write' defaultValue={stateProps.org_address} onBlur={updateProfile} onChange={handleAddress}/>
        <Input id="dash-city" icon='write' defaultValue={stateProps.org_city} onBlur={updateProfile} onChange={handleCity} />
        <Dropdown id="dash-state" search selection options={stateOptions} placeholder="CA" defaultValue={stateProps.org_state} onBlur={updateProfile} onChange={handleState} />
        <Input id="dash-address" icon='write' defaultValue={stateProps.org_zipcode} onBlur={updateProfile} onChange={handleZip}/>
        <Input id="dash-phone" icon='write' defaultValue={stateProps.org_phone} onBlur={updateProfile} onChange={handlePhone}/>
      </Menu.Item>
      <Menu.Item name='color'>
        <div>Primary Site Color</div>
        <Popup
          id="dash-color-1"
          trigger={<div id="dash-circle-1" style={primaryColor} onClick={handlePrimary}></div>}
          flowing
          hoverable
        >
          <CirclePicker onChangeComplete={handlePrimary} />
        </Popup>
      </Menu.Item>
      <Menu.Item>
        <div>Secondary Site Color</div>
        <Popup
          id="dash-color-2"
          trigger={<div id="dash-circle-2" style={secondaryColor} onClick={handleSecondary}></div>}
          flowing
          hoverable
        >
          <CirclePicker onChangeComplete={handleSecondary} />
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

const Body = ({ stateProps, addPhoto, addBackground, dispatchProps }) => {

  const CLOUDINARY_UPLOAD_PRESET = 'l25kfhpr'
  const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ryanrundle/upload'

  const onPhoto = (acceptedFiles, rejectedFiles) => {
    handlePhotoUpload(acceptedFiles[0])
  }

  const onBackground = (acceptedFiles, rejectedFiles) => {
    handleBackgroundUpload(acceptedFiles[0])
  }

  function handlePhotoUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file)

    upload.end((err, response) => {
      if (err) {
        console.error(err)
      }

      if (response.body.secure_url !== '') {
        const value = response.body.secure_url
        dispatchProps.addPhoto(value)
      }
    })
  }

  function handleBackgroundUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file)

    upload.end((err, response) => {
      if (err) {
        console.error(err)
      }

      if (response.body.secure_url !== '') {
        const value = response.body.secure_url
        dispatchProps.addBackground(value)
      }
    })
  }

  return (
    <Segment.Group>
      <Segment>Background Photo
        <Dropzone
          id="dash-drop-background"
          multiple={false}
          accept="image/*"
          onDrop={dispatchProps.onBackground}
          background-photo={stateProps.site_background_photo}
        >
          <Button content="View site" icon="computer" labelPosition="right" />
          <Icon name="photo" />
          <p className="dropzone-description">Edit background photo</p>
        </Dropzone>
      </Segment>
      <Segment.Group>
        <Segment>Profile Photo
          <Dropzone
            id="dash-drop-photo"
            multiple={false}
            accept="image/*"
            onDrop={dispatchProps.onPhoto}>
            <Icon name="photo" />
            <Image className="display" src={stateProps.site_photo} size='small' shape='circular' />
          </Dropzone>
        </Segment>
      </Segment.Group>
      <Segment>
        <div>{stateProps.org_name}</div>
        <div>{`${stateProps.org_address}, ${stateProps.org_city}, ${stateProps.org_state} ${stateProps.org_zipcode}`}</div>
        <div>{stateProps.org_phone}</div>
      </Segment>
      <Segment.Group horizontal>
        <Segment>News</Segment>
        <Segment>Events</Segment>
      </Segment.Group>
    </Segment.Group>
  )
}

const mapStateToProps = state => {
  return {
    stateProps: {
      site_id: state.site_id,
      site_url: state.site_url,
      name: state.name,
      org_name: state.org_name,
      org_address: state.org_address,
      org_city: state.org_city,
      org_state: state.org_state,
      org_zipcode: state.org_zipcode,
      org_phone: state.org_phone,
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
    dispatchProps: {
      addPhoto: (value) => dispatch({type:'PHOTO', value}),
      addBackground: (value) => dispatch({type: 'BACKGROUND', value}),
      editName: (value) => dispatch({type: "NAME", value}),
      editOrg: (value) => dispatch({type: "ORG", value}),
      editAddress: (value) => dispatch({type: "ADDRESS", value}),
      editCity: (value) => dispatch({type: "CITY", value}),
      editState: (value) => dispatch({type: "STATE", value}),
      editZip: (value) => dispatch({type: "ZIPCODE", value}),
      editPhone: (value) => dispatch({type: "PHONE", value}),
      editPrimary: (value) => dispatch({type: "PRIMARY", value}),
      editSecondary: (value) => dispatch({type: "SECONDARY", value})
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Dashboard)
