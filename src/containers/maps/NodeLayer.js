import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Layer, Feature } from "react-mapbox-gl";

import { connect } from 'react-redux'
import _ from 'lodash'

const paint = {
  "circle-radius": 4,
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
  }

  handleClick = () => {

  }

  render () {
    const { nodes } = this.props

    const NodesFeatures = _.map(nodes, (node) =>
      <Feature
        key={node.time}
        coordinates={node.coordinates}
        properties={{rssi: node.gwRssi}}
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
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  nodes: state.entities.nodeRecords,
})

export default connect(mapStateToProps, {

})(NodeLayer)
