import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
    realtimeNodes: PropTypes.object
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

  componentWillReceiveProps(nextProps) {

  }

  render () {
    const { realtimeNodes } = this.props
    const { heartCircle } = this.state

    return (
      <div>
        <Layer
          id="realtime"
          type="circle"
          paint={{
            ...paint,
            "circle-radius": heartCircle,
          }}>
          {
            _.map(realtimeNodes, (node) =>
              <Feature
                key={node.time}
                coordinates={node.coordinates}
                properties={{rssi: node.gwRssi}}
              />
            )
          }
        </Layer>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  realtimeNodes: state.entities.realtimeNodes
})

export default connect(mapStateToProps, {
  wsConnect,

})(RealtimeNodeLayer)
