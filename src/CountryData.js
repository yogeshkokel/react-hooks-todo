import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrencyData from './CurrencyData';
import useDocTitle from './customHooks/useDocTitle';

export const CountryContext = React.createContext();

function CountryData() {
    const [countries, setCountryData] = useState([]);

    useDocTitle('This is Country Page');
    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then((response) => {
                const { data } = response;
                setCountryData(data);
            }).catch((err) => {
                alert('Cannot Fetch Country Data', err);
            });
    }, [])

    return (
        <div>
            <ul>
                {countries.map((country, index) => (
                    <div className="pb-10" key={index}>
                        <li> <img src={country.flag} width="20px" height="20px" /> Country Name: {country.name}</li>
                        <span>Capital: {country.capital}</span>
                        <CountryContext.Provider value={country.currencies}>
                            <div>
                                <CurrencyData />
                            </div>
                        </CountryContext.Provider>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default CountryData;