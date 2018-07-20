import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Notifications, {
  show,
  success,
  error,
  warning,
  info,
  hide,
  removeAll,
} from 'react-notification-system-redux'

import { setName, setAge } from './actions'

class Home extends Component {
  state = {
    name: '',
    age: '',
  }

  componentDidMount() {
    console.log('this.props:', this.props)
  }

  // change the REACT state
  handleChangeName = e => {
    this.setState({
      name: e.target.value,
    })
  }
  // dispatch an action, which changes the REDUX store
  handleClickSetName = () => {
    this.props.onDispatchSetName(this.state.name)
    this.setState({
      name: '',
    })
  }

  // change the REACT state
  handleChangeAge = e => {
    this.setState({
      age: e.target.value,
    })
  }
  // dispatch an action, which changes the REDUX store
  handleClickSetAge = () => {
    this.props.onDispatchSetAge(this.state.age)
    this.setState({
      age: '',
    })
  }

  getNotificationDetails(type) {
    switch (type) {
      case 'Application':
        return {
          uid: this.props.notifications.length + 1,
          title: 'Application',
          message: 'message',
          position: 'tl',
          autoDismiss: 0,
          dismissible: 'click',
          onRemove: () => this.props.onDispatchSetName('isaac'),
        }
      case 'Challenge':
        return {
          uid: this.props.notifications.length + 1,
          title: 'Challenge',
          message: 'message',
          position: 'bl',
          autoDismiss: 4,
        }
    }
  }

  // get notification details,
  // dispatch an action that is handled by the notifications reducer,
  // and ultimately changes the REDUX store
  handleClickNotification = type => {
    const noti = this.getNotificationDetails(type)

    if (noti.title === 'Application') {
      this.props.onDispatchNotification(success(noti))
    } else if (noti.title === 'Challenge') {
      this.props.onDispatchNotification(warning(noti))
    } else {
      this.props.onDispatchNotification(error(noti))
    }
  }

  render() {
    return (
      <div>
        <div>Home Component</div>

        <input value={this.state.name} onChange={this.handleChangeName} />
        <button onClick={this.handleClickSetName}>Set name</button>

        <input value={this.state.age} onChange={this.handleChangeAge} />
        <button onClick={this.handleClickSetAge}>Set age</button>

        <div onClick={e => this.handleClickNotification('Application')}>Application</div>
        <div onClick={e => this.handleClickNotification('Challenge')}>Challenge</div>

        <br />
        <br />

        {this.props.name === 'isaac' ? (
          <div>NAME IS ISAAC</div>
        ) : this.props.name === 'kareem' ? (
          <div>NAME IS KAREEM</div>
        ) : (
          this.props.name !== '' && <div>NAME IS SOMETHING ELSE</div>
        )}

        <br />
        <br />

        <div>{`React State Name: ${this.state.name}`}</div>
        <div>{`React State Age: ${this.state.age}`}</div>

        <br />
        <br />

        <div>{`Redux Store Name: ${this.props.name}`}</div>
        <div>{`Redux Store Age: ${this.props.age}`}</div>

        <br />
        <br />

        {`there are ${this.props.notifications.length} notifications`}

        <Notifications notifications={this.props.notifications} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onDispatchSetName: name => dispatch(setName(name)),
    onDispatchSetAge: age => dispatch(setAge(age)),
    onDispatchNotification: notification => dispatch(notification),
  }
}

function mapStateToProps(state) {
  return {
    name: state.home.name,
    age: state.home.age,
    notifications: state.notifications,
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(Home)
