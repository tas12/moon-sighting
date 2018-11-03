import React, { Component } from "react"
import ReactDOM from "react-dom"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from "react-simple-maps"

import topoJson from "../data/world-110m.json"

export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      selectedSighting: {}
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(sighting) {
    this.setState({selectedSighting: sighting});
  }

  getSightings () {
    return [
      {
        area: 'Scotland',
        coordinates: [-4.20, 56.49],
        count: 3
      },
      {
        area: 'England',
        coordinates: [-1.17, 52.36],
        count: 1
      },
      {
        area: 'France',
        coordinates: [2.21, 46.22],
        count: 6
      },
      {
        area: 'Zurich',
        coordinates: [8.5, 47.3],
        count: 5
      }
    ];
  }

  getTotalSightings() {
    return this.getSightings().map(el => el.count).reduce((prev, curr) => {
      return prev + curr;
    }, 0);
  }

  getMaxRadius() {
    return 50;
  }

  getRadius (count) {
      const unit = this.getMaxRadius() / this.getTotalSightings();
      return count * unit;
  }

  render() {
    return(
      <div>
        <ComposableMap>
          <ZoomableGroup>
          <Geographies geography={topoJson}>
            {(geographies, projection) => geographies.map(geography => (
              <Geography
                key={ geography.id }
                geography={ geography }
                projection={ projection }
                style={{
                  default: { fill: "lightblue" },
                  hover:   { fill: "#999" },
                  pressed: { fill: "#000" }
                }}
                />
            ))}
          </Geographies>
          <Markers>
            {
              this.getSightings().map((el, i) => {
                return (
                  <Marker
                    marker={{ coordinates: el.coordinates }}
                    style={{
                      default: { fill: "rgba(233, 195, 175, 0.74)" },
                      hover:   { fill: "#999" },
                      pressed: { fill: "#000" },
                    }}
                    onMouseEnter={() => this.handleClick(el)}
                    key={i}>
                    <circle cx={ 0 } cy={ 0 } r={ this.getRadius(el.count) } />
                  </Marker>
                );
              })
            }
          </Markers>
          </ZoomableGroup>
        </ComposableMap>
        <div>
          <p>Country: {this.state.selectedSighting.area}</p>
          <p>Sightings: {this.state.selectedSighting.count}</p>
        </div>
      </div>
    )
  }
}
