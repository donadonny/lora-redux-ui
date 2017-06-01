import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Layer, Feature, Popup } from "react-mapbox-gl"

import { connect } from 'react-redux'
import _ from 'lodash'
import { updateNodePopup } from '../../actions'
import { PopupContent } from '../../components/maps/PopupContent'
import { computeDistance } from '../../utils/computeDistance'

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

class NodeLayer extends Component {
  static propTypes = {
    nodes: PropTypes.object,
    updateNodePopup: PropTypes.func,
    gateways: PropTypes.object
  }

  handleHover(node) {
    if (node) {
      const { gateways } = this.props

      let gw = gateways[node.gwMac]
      node.localTime = moment(node.time).format('YYYY-MM-DD HH:mm:ss')
      node.radio = 'SF'+node.txSpreadfactor+'BW'+node.txBandwidth
      node.snr = parseFloat(node.gwSnr).toFixed(1)
      node.gwDistance = computeDistance([gw.longitude, gw.latitude], node.coordinates)
      node.gwName = gw.name
    }
    this.props.updateNodePopup(node)
  }

  render () {
    const { nodes, nodePopup } = this.props

    const NodesFeatures = _.map(nodes, (node) =>
      <Feature
        key={node.time}
        coordinates={node.coordinates}
        properties={{rssi: node.gwRssi}}
        onClick={this.handleHover.bind(this, node)}
      />
    );
    return (
      <div>
        <Layer
          id="cluster-history"
          type="circle"
          paint={paint}>
          {NodesFeatures}
        </Layer>
        {nodePopup &&
          <Popup
            coordinates={nodePopup.coordinates}
            anchor={"bottom"}
            offset={10}>
            <PopupContent>
              <p>
                <i onClick={this.handleHover.bind(this, null)} style={{'float': 'right'}} className="fa fa-times" aria-hidden="true"></i>
              </p>
              <p>
                <strong>Time Send: {nodePopup.localTime} </strong>
              </p>
              <hr></hr>
              <p>Signal Strength: {nodePopup.gwRssi}</p>
              <p>Deveui: {nodePopup.deveui}</p>
              <p>SNR: {nodePopup.snr}</p>
              <p>Distance: {nodePopup.gwDistance}m</p>
              <p>Radio: {nodePopup.radio}</p>
              <p>Gateway: {nodePopup.gwName}</p>
            </PopupContent>
          </Popup>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  nodes: state.entities.packets,
  nodePopup: state.ui.nodePopup,
  gateways: state.entities.gateways
})

export default connect(mapStateToProps, {
  updateNodePopup,
})(NodeLayer)
