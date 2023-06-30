import React, {useState, useEffect} from "react";
import CountrySelector from "../components/CountrySelector";
import Country from "../components/Country"
import '../containers/CountriesContainer.css';

const CountriesContainer = () => {

    const[countries, setCountries] = useState([])
    const [selectedCountryCCA3Code, setSelectedCountryCCA3Code] = useState('')

    const getCountries = () => {
        fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(countriesData => setCountries(countriesData))
    }

    useEffect(() => {
        getCountries()
    }, [])

    const handleCountrySelected = cca3 => {
        setSelectedCountryCCA3Code(cca3)
    }

    const selectedCountry = countries.find(
        country => country.cca3 === selectedCountryCCA3Code
    )
    
    const totalPopulation = () => {
        return countries.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.population;
        }, 0);
    };

    return(
        <>
            <h1> Here are my Countries</h1>
            <hr></hr>
            <div className="countryList">
                <CountrySelector countries = {countries} onCountrySelected = {handleCountrySelected}/>
            </div>
            <div className="country">
                <Country country = {selectedCountry}/>
            </div>
            <hr></hr>
            <div className="countryDetails">
                <h3> Total population: {totalPopulation()} </h3>
            </div>
        </>
    )
}

export default CountriesContainer