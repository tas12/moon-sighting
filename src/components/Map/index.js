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

import topoJson from "./data/world-110m.json"

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
        area: 'United Kingdom',
        coordinates: [-3.44, 55.38],
        count: 3
      },
      {
        area: 'France',
        coordinates: [2.21, 46.22],
        count: 6
      },
      {
        area: 'Germany',
        coordinates: [10.45, 51.17],
        count: 5
      },
      {
        area: 'Morocco',
        coordinates: [-7.09, 31.79],
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
        <p>Sightings for 10 October 2018</p>
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
                      default: { fill: "hsla(236, 66%, 68%, 0.5)" },
                      hover:   { fill: "#787fe3" },
                      pressed: { fill: "#000" },
                      border: "1px solid purple"
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
