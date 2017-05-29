import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Layer, Feature } from "react-mapbox-gl"

import { connect } from 'react-redux'
import _ from 'lodash'

import { wsConnect } from '../../actions'


const paint = {
  "circle-radius": 4.5,
  "circle-color": {
        property: "rssi",
        stops: [
            [-300, "#1a237e"],
            [-120, "#18FFFF"],
            [-115, "#00E676"],
            [-110, "#FFEB3B"],
            [-105, "#FF9800"],
            [-100, "#FF5722"],
        ]
  },
  "circle-opacity": .8
}

class RealtimeNodeLayer extends Component {
  static propTypes = {
    heartbeat: PropTypes.func,
  }

  // the reason we don't use redux is because heartbeat happens per 1s
  // which  will flood message
  constructor () {
    super()
    this.state = {
      heartCircle: 5
    }
  }

  heartbeat = () => {
    const { heartCircle } = this.state
    if ( heartCircle === 5 ) {
      this.setState({heartCircle: 7});
    } else {
      this.setState({heartCircle: 5});
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.heartbeat(), 1000)
    this.props.wsConnect(window.location.origin.replace('http', 'ws'))
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render () {
    return (
      <div>
        {/* <Layer
          id="realtime"
          type="circle"
          paint={paint}>
          <Feature></Feature>
        </Layer> */}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
})

export default connect(mapStateToProps, {
  wsConnect,
})(RealtimeNodeLayer)
