/* global React, ReactDOM, Redux */
const { connect } = require('react-redux')
const { Sidebar, Segment, Button, Menu, Image, Icon, Header, Input, Popup, Radio, Dropdown } = require('semantic-ui-react')
const { TwitterPicker, clientWidth } = require('react-color')
const Dropzone = require('react-dropzone')
const request = require('superagent')
const { Photo } = require('./photo-drop.js')
const { stateOptions } = require('./states')


const Dashboard = ({stateProps, toggleVisibility, addPhoto, addBackground, editName, editOrg, editAddress, editCity, editState, editZip, editPhone }) => {
  return (
    <Sidemenu
      stateProps={stateProps}
      toggleVisibility={toggleVisibility}
      addPhoto={addPhoto}
      addBackground={addBackground}
      editName={editName}
      editOrg={editOrg}
      editAddress={editAddress}
      editCity={editCity}
      editState={editState}
      editZip={editZip}
      editPhone={editPhone}
    />
  )
}

const Sidemenu = ({stateProps, toggleVisibility, addPhoto, addBackground, editName, editOrg, editAddress, editCity, editState, editZip, editPhone }) => {

  return (
    <div>
      <Sidebar.Pushable id="dashboard" as={Segment}>
        <Sidebar id="sidebar" as={Menu} animation='scale down' width='thin' visible={stateProps.view} icon='labeled' vertical inverted>
          <Info
           stateProps={stateProps}
           toggleVisibility={toggleVisibility}
           editName={editName}
           editOrg={editOrg}
           editAddress={editAddress}
           editCity={editCity}
           editState={editState}
           editZip={editZip}
           editPhone={editPhone}
          />
      </Sidebar>
        <Sidebar.Pusher id="dash-body">
          <Body
          stateProps={stateProps}
          addPhoto={addPhoto}
          addBackground={addBackground}
          >
          </Body>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  )
}

const Info = ({ stateProps, toggleVisibility, editName, editOrg, editAddress, editCity, editState, editZip, editPhone }) => {

  const handleClick = () => {
    stateProps.view = false ? stateProps.view === true : true
  }

  const handleName = event => {
    const value = event.target.value
    editName(value)
  }

  const handleOrg = event => {
    const value = event.target.value
    editOrg(value)
  }

  const handleAddress = event => {
    const value = event.target.value
    editAddress(value)
  }

  const handleCity = event => {
    const value = event.target.value
    editCity(value)
  }

  const handleState = event => {
    const value = event.target.value
    editState(value)
  }

  const handleZip = event => {
    const value = event.target.value
    editZip(value)
  }

  const handlePhone = event => {
    const value = event.target.value
    editPhone(value)
  }

  return (
    <div>
      <div id="dash-title">Cobalt</div>
      <Button content="Hide" icon="left arrow" labelPosition="left" onClick={handleClick}></Button>
      <Menu.Item name='name'>
        <div>Name</div>
        <Input id="dash-name" icon='write' defaultValue={stateProps.name} onChange={handleName} />
      </Menu.Item>
      <Menu.Item name='org'>
        <div>Organization</div>
        <Input id="dash-org" icon='write' labelPosition="left" defaultValue={stateProps.org_name} onChange={handleOrg}/>
        <Input id="dash-address" icon='write' defaultValue={stateProps.org_address} onChange={handleAddress}/>
        <Input id="dash-city" icon='write' defaultValue={stateProps.org_city} onChange={handleCity} />
        <Dropdown id="dash-state" search selection options={stateOptions} placeholder="CA" defaultValue={stateProps.org_state} onChange={handleState} />
        <Input id="dash-address" icon='write' defaultValue={stateProps.org_zipcode} onChange={handleZip}/>
        <Input id="dash-phone" icon='write' defaultValue={stateProps.org_phone} onChange={handlePhone}/>
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

const Body = ({ stateProps, addPhoto, addBackground }) => {

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
        addPhoto(value)
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
        addBackground(value)
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
          onDrop={onBackground}
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
            onDrop={onPhoto}>
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
    addPhoto: (value) => dispatch({type:'PHOTO', value}),
    addBackground: (value) => dispatch({type: 'BACKGROUND', value}),
    editName: (value) => dispatch({type: "NAME", value}),
    editOrg: (value) => dispatch({type: "ORG", value}),
    editAddress: (value) => dispatch({type: "ADDRESS", value}),
    editCity: (value) => dispatch({type: "CITY", value}),
    editState: (value) => dispatch({type: "STATE", value}),
    editZip: (value) => dispatch({type: "ZIPCODE", value}),
    editPhone: (value) => dispatch({type: "PHONE", value}),
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Dashboard)
