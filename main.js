import React from 'react';
import ReactDOM from 'react-dom';
import CurrencyConverterApp from './CurrencyConverterApp.jsx';
/* you can reuse the CurrencyConverterApp component below 
by just simply appending <CurrencyConverterApp /> inside const element*/
const element = <div className="slds-grid slds-grid--overflow"> <CurrencyConverterApp /> <CurrencyConverterApp /> <CurrencyConverterApp /> </div> ;
ReactDOM.render(element,document.getElementById('app'));



 


