import React, { useContext } from 'react';
import { CountryContext } from './CountryData';

function CurrencyData() {
    const currencyData = useContext(CountryContext);

    return (
        <div>
            {
                currencyData && currencyData.length > 0
                    ?
                    currencyData.map((currency, index) => (
                        <div key={index}>
                            <p> Currency code: {currency.code}</p>
                            <p> Currency name: {currency.name}</p>
                            <p>Currency symbol: {currency.symbol}</p>
                        </div>
                    ))
                    : 'No Currency Data Found'
            }
        </div>
    );
}

export default CurrencyData;