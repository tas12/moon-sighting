import React, { Component } from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import CountryRegionData from 'country-region-data';

import './index.css';

export default class MoonSightingForm extends Component {
  constructor() {
    super();
    this.state = {
      selectedCountry: 'United Kingdom',
      selectedRegion: '',
      sightedMoon: true
    };
  }

  handleCountryChange(e) {
    this.setState({selectedCountry: e.target.value});
  }

  handleRegionChange(e) {
    this.setState({selectedRegion: e.target.value});
  }

  handleToggleButtonClick(e) {
    console.log(e.currentTarget.getAttribute("value"));
    if (e.currentTarget.getAttribute("value") === "sighted moon") {
      this.setState({sightedMoon: true});
    } else {
      this.setState({sightedMoon: false});
    }
  }

  getRegions() {
    const countryObj = CountryRegionData.filter(el => el.countryName === this.state.selectedCountry)

    return countryObj[0].regions.map(region => region.name);
  }

  render () {
    return (
      <form className="moon-sighting-form">
        <FormControl variant="outlined">
          <p>Country</p>
          <Select
            className="location-selector"
            value={this.state.selectedCountry}
            style={{display: 'block'}}
            onChange={this.handleCountryChange.bind(this)}
            input={<OutlinedInput labelWidth={0} />}
          >
            {CountryRegionData.map(el => {
              return <MenuItem value={el.countryName}>{el.countryName}</MenuItem>
            })}
          </Select>
        </FormControl>
        <FormControl variant="outlined">
          <p>Region</p>
          <Select
            variant="outlined"
            className="location-selector"
            value={this.state.selectedRegion}
            style={{display: 'block'}}
            onChange={this.handleRegionChange.bind(this)}
            input={<OutlinedInput labelWidth={0} />}
          >
            {
              this.getRegions().map(region => {
                return <MenuItem value={region}>{region}</MenuItem>
              })
            }
          </Select>
        </FormControl>
        <div className="toggle-button-group">
          <Button
            className={`toggle-button ${this.state.sightedMoon ? 'selected' : null}`}
            variant="outlined"
            value="sighted moon"
            style={{margin: '10px'}}
            onClick={this.handleToggleButtonClick.bind(this)}
          >
            I saw the new crescent moon
          </Button>
          <Button
            className={`${!this.state.sightedMoon ? 'selected' : null}`}
            classes={{root: 'toggle-button'}}
            style={{margin: '10px'}}
            variant="outlined"
            onClick={this.handleToggleButtonClick.bind(this)}
            value="did not sight moon"
          >
            I didn't see the new crescent moon
          </Button>
        </div>
      </form>
    )
  }
}
