import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetailed = ({ selectedCountry }) => {

  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${selectedCountry.capital}`)
      .then(response => {
        setWeather(response.data.current)
      })  
  
  }, [])
      console.log(weather);

  return (
    <div>
      <h1>
        {selectedCountry.name}
      </h1>

      <p>capital {selectedCountry.capital}</p>
      <p>population {selectedCountry.population}</p>

      <h3>languages</h3>
      <ul>
        {selectedCountry.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img width="180px" src={selectedCountry.flag} alt='country flag '/>

      <h3>weather in {selectedCountry.capital}</h3>
      <p>temperature : {weather.temperature} Celcius</p>
      
      <img src={weather.weather_icons} alt="forecast" />
      
      <p>wind : {weather.wind_speed} mph direction {weather.wind_dir}</p>




    </div>
  )
}

const CountrySearch = (props) => {
  return (
    <div>
      find countries <input value={props.newCountry} onChange={props.handleNewCountryChange} />
    </div>
  )
}

const Country = (props) => {

  const [showCountry, setShowCountry] = useState(false)

  const handleClick = () => setShowCountry(true)

  if (showCountry) {
    return (
      <CountryDetailed selectedCountry={props.country} />
    )
  }

  return (
    <div>
      {props.country.name}
      <button onClick={handleClick}>Show</button>
    </div>
  )
}

const Countries = (props) => {

  const filteredCountries = props.countries.filter(country => country.name.toLowerCase().includes(props.newCountry.toLowerCase()))



  if (filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, more specific pls
      </div>
    )
  }

  if (filteredCountries.length === 1) {
    const selectedCountry = filteredCountries[0]
    return (
      <CountryDetailed selectedCountry={selectedCountry} />
    )


  }


  return (
    <div>
      {filteredCountries.map(country =>
        <Country key={country.name} country={country}></Country>

        // <p key={country.name}>{country.name}</p>
        // <button>Show</button>

      )}

    </div>
  )



}

const App = () => {


  const [countries, setCountries] = useState([])
  const [newCountry, setNewCountry] = useState('')

  const handleNewCountryChange = (event) => {
    setNewCountry(event.target.value)
  }


  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <CountrySearch newCountry={newCountry} handleNewCountryChange={handleNewCountryChange} />
      <Countries countries={countries} newCountry={newCountry} />
    </div>
  );
}

export default App;
