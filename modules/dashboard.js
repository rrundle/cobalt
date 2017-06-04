/* global React, ReactDOM, Redux */
const { connect } = require('react-redux')
const { Sidebar, Segment, Button, Menu, Image, Icon, Header, Input, Popup, Radio, Dropdown } = require('semantic-ui-react')
const { CirclePicker, clientWidth } = require('react-color')
const Dropzone = require('react-dropzone')
const request = require('superagent')
const { IndexLink, browserHistory } = require('react-router')
const stateOptions = require('../components/states.js')
const News = require('../components/news.js')
const Events = require('../components/events.js')

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

const Dashboard = ({ stateProps, dispatchProps }) => {
  return (
    <Sidemenu
      stateProps={stateProps}
      dispatchProps={dispatchProps}
    />
  )
}

const Sidemenu = ({stateProps, dispatchProps}) => {

  return (
    <Sidebar.Pushable id="dashboard" as={Segment}>
      <Sidebar id="sidebar" as={Menu} animation='scale down' width='thin' visible={stateProps.view} icon='labeled' vertical inverted>
        <Info
         stateProps={stateProps}
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
  )
}

const Info = ({ stateProps, dispatchProps }) => {

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

  const handleState = (event, result) => {
    const { value } = result
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
    const value = color.hex
    dispatchProps.editPrimary(value)
    const route = 'POST'
    const path = '/dash'
    let data = {
      site_color_primary: value,
      site_id: stateProps.site_id
    }
    sendData(data, path, route)
      .then(result => console.log(result))
  }

  const handleSecondary = (color, event) => {
    const value = color.hex
    dispatchProps.editSecondary(value)
    const route = 'POST'
    const path = '/dash'
    let data = {
      site_color_secondary: value,
      site_id: stateProps.site_id
    }
    sendData(data, path, route)
      .then(result => console.log(result))
  }

  const updateProfile = (event) => {
    const ids = [
      {id: 'dash-name', property: 'name'},
      {id: 'dash-org', property: 'org_name'},
      {id: 'dash-address', property: 'org_address'},
      {id: 'dash-city', property: 'org_city'},
      {id: 'dash-state', property: 'org_state'},
      {id: 'dash-zipcode', property: 'org_zipcode'},
      {id: 'dash-phone', property: 'org_phone'}
    ]
    const uniqueId = ids.filter(function(target) {
      return target.id === event.target.parentNode.id
    })
    console.log(uniqueId)
    let data =
    {
      [uniqueId[0].property]: document.getElementById(`${uniqueId[0].id}`).childNodes[0].value,
      site_id: stateProps.site_id
    }
    const route = 'POST'
    const path = '/dash'
    /*
    sendData(data, path, route)
      .then(result => console.log(result))
    */
  }

  let primaryColor = {
    backgroundColor: `${stateProps.site_color_primary}`
  }

  let secondaryColor = {
    backgroundColor: `${stateProps.site_color_secondary}`
  }

  const handleRadio = (event) => {
    const route = 'POST'
    const path = '/dash'

    const field = event.target.parentNode.getAttribute('id')
    console.log(field)
    switch (field) {
      case 'display_address':
        let data =
        {
          org_address: !stateProps.display_address,
          site_id: stateProps.site_id
        }
        sendData(data, path, route)
          .then(result => console.log(result))

        dispatchProps.editRadio(stateProps.display_address, field)
      break

      case 'display_phone':
        data =
        {
          org_phone: !stateProps.display_phone,
          site_id: stateProps.site_id
        }
        sendData(data, path, route)
          .then(result => console.log(result))

        dispatchProps.editRadio(stateProps.display_phone, field)
      break

      case 'display_news':
        data =
        {
          news: !stateProps.display_news,
          site_id: stateProps.site_id
        }
        sendData(data, path, route)
          .then(result => console.log(result))

        dispatchProps.editRadio(stateProps.display_news, field)
      break

      case 'display_events':
        data =
        {
          events: !stateProps.display_events,
          site_id: stateProps.site_id
        }
        sendData(data, path, route)
          .then(result => console.log(result))

        dispatchProps.editRadio(stateProps.display_events, field)
      break

      default:
        console.log('uh oh!')
      break
    }
  }

  return (
    <div>
      <div id="dash-title">Cobalt</div>
      <Menu.Item id="dash-name-box" name='name'>
        <div className="category">Your name</div>
        <Input className="edit" id="dash-name" placeholder={'Name'} defaultValue={stateProps.name} onChange={handleName} onBlur={updateProfile}/>
      </Menu.Item>
      <Menu.Item id="org-menu" name='org'>
        <div className="category">Organization</div>
        <Input className="edit" id="dash-org" placeholder={'Organization'} defaultValue={stateProps.org_name} onBlur={updateProfile} onChange={handleOrg}/>
        <Input className="edit" id="dash-address" placeholder={'Address'} defaultValue={stateProps.org_address} onBlur={updateProfile} onChange={handleAddress}/>
        <Input className="edit" id="dash-city" placeholder={'City'} defaultValue={stateProps.org_city} onBlur={updateProfile} onChange={handleCity} />
        <Dropdown id="dash-state" search selection options={stateOptions} placeholder={'ST'} defaultValue={stateProps.org_state} onBlur={updateProfile} onChange={handleState} />
        <Input className="edit" id="dash-zipcode" type="number" placeholder={'Zipcode'} defaultValue={stateProps.org_zipcode} onBlur={updateProfile} onChange={handleZip}/>
        <Input className="edit" id="dash-phone" type="number" placeholder={'Phone'} defaultValue={stateProps.org_phone} onBlur={updateProfile} onChange={handlePhone}/>
      </Menu.Item>
      <Menu.Item name='color'>
        <div className="category">Primary Site Color</div>
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
        <div className="category">Secondary Site Color</div>
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
        <div className="category">Display Preferences</div>
        <div className="display-category">Address</div>
        <Segment id="radio-address"compact>
          <Radio id="display_address" onChange={handleRadio} checked={stateProps.display_address} slider />
        </Segment>
      </Menu.Item>
      <Menu.Item>
        <div>Phone</div>
        <Segment id="radio-phone"compact>
          <Radio id="display_phone" onChange={handleRadio} checked={stateProps.display_phone} slider />
        </Segment>
      </Menu.Item>
      <Menu.Item>
        <div>News</div>
        <Segment id="radio-news" compact>
          <Radio id="display_news" onChange={handleRadio} checked={stateProps.display_news} slider />
        </Segment>
      </Menu.Item>
      <Menu.Item>
        <div>Events</div>
        <Segment id="radio-events" compact>
          <Radio id="display_events" onChange={handleRadio} checked={stateProps.display_events} slider />
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

  const backgroundPhoto = {
    backgroundImage: `url(${stateProps.site_background_photo})`,
    backgroundRepeat: 'no-repeat',
    borderColor: stateProps.site_color_primary
  }

  const profilePhoto = {
    backgroundImage: `url(${stateProps.site_photo})`,
    backgroundRepeat: 'no-repeat'
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

        const route = 'POST'
        const path = '/dash'
        let data = {
          site_photo: value,
          site_id: stateProps.site_id
        }
        sendData(data, path, route)
          .then(result => console.log(result))
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

        const route = 'POST'
        const path = '/dash'
        let data = {
          site_background_photo: value,
          site_id: stateProps.site_id
        }
        sendData(data, path, route)
          .then(result => console.log(result))
      }
    })
  }

  const backgroundStyle = {
    width: '100%',
    border: 'none',
    height: '300px',
  }

  const profileStyle = {
    borderRadius: '50%',
    borderColor: stateProps.site_color_primary + 'important!',
    backgroundImage: 'url(' + stateProps.site_photo + ')',
  }

  const dropStyle = {
    border: 'none',
    borderRadius: '50%'
  }

  const orgName = stateProps.org_name.toLowerCase().replace(/[^A-Z0-9]/ig, '')
  console.log(orgName)

  return (
    <Segment.Group id="dash-segments">
      <Segment id="background-photo" style={backgroundPhoto}>
        <IndexLink to={`/website/${orgName}`} activeClassName="active" >
          <Button id="view-site" content="View site" icon="computer" labelPosition="right" />
        </IndexLink>
        {
          stateProps.site_background_photo === ''
          ? <div id="default-org-name">{stateProps.org_name}</div>
          : null
        }
        <Dropzone
          id="dash-drop-background"
          multiple={false}
          accept="image/*"
          onDrop={onBackground}
          style={backgroundStyle}
        >
          <div id="background-camera">
            <Icon name="photo" />
          </div>
          <p className="dropzone-description"></p>
        </Dropzone>
        <div>
          <Segment
            id="profile-photo"
            style={profileStyle}
          >
            <Dropzone
              id="dash-drop-photo"
              multiple={false}
              accept="image/*"
              onDrop={onPhoto}
              style={dropStyle}
              >
              {
                stateProps.site_photo === ''
                ? <i id="default-photo" class="fa fa-user" aria-hidden="true"></i>
                : null
              }
              <Icon id="profile-camera" name="photo" />
              <Image className="display" size='small' shape='circular' />
            </Dropzone>
          </Segment>
        </div>
      </Segment>
      <Segment>
        <div className="body-info" id="dash-org-title">{stateProps.org_name}</div>
        <div className="body-info">
        {
          stateProps.display_address
          ? `${stateProps.org_address}   ${stateProps.org_city}   ${stateProps.org_state} ${stateProps.org_zipcode}`
          : ''
        }
        </div>
        <div className="body-info">
        {
          stateProps.display_phone
          ? stateProps.org_phone
          : null
        }
        </div>
      </Segment>
      <Segment.Group id="plugins" widths='equal' horizontal>
        {
          stateProps.display_news
          ? <Segment id="news-segment">News
              <News />
            </Segment>
          : null
        }
        {
          stateProps.display_events
          ? <Segment id="events-segment">Events
              <Events />
            </Segment>
          : null
        }
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
      view: state.view,
      display_address: state.display_address,
      display_phone: state.display_phone,
      display_news: state.display_news,
      display_events: state.display_events
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
      editSecondary: (value) => dispatch({type: "SECONDARY", value}),
      editRadio: (value, field) => dispatch({type: "RADIO", value, field})
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Dashboard)
