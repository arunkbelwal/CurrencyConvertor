import React from 'react';
import axios from 'axios';

class CurrencyConverterApp extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        amountentered: '',
        convertedamount: '',
        currencyformatfrom: 'CAD',
        currencyformatto: 'USD',
        exchangerates: '',
        showhidedisclaimermsg: 'slds-hide',
        showhidenetworkerrmsg: 'block',
        inputAmount: 0,
        placeholdervalue: '0.00'
    }
	/* state variables will be defined below */
    this.updateState = this.updateState.bind(this);
    this.showDisclaimerMessage = this.showDisclaimerMessage.bind(this);
    this.getSelectionChangeForFromDropdown = this.getSelectionChangeForFromDropdown.bind(this);
    this.getSelectionChangeForToDropdown = this.getSelectionChangeForToDropdown.bind(this);
    this.calculateExchangeRate = this.calculateExchangeRate.bind(this);
    this.inputFocusBlurUpdate = this.inputFocusBlurUpdate.bind(this);
};

/* this method will show/hide disclaimer message */
showDisclaimerMessage(event) {
    if (event.target.nextSibling.childNodes[0].classList.contains('slds-hide')) {
        this.setState({
            showhidedisclaimermsg: 'slds-show'
        });
    } else {
        this.setState({
            showhidedisclaimermsg: 'slds-hide'
        });
    }
};

getSelectionChangeForFromDropdown(event) {
    var sel = event.target;
    var seloptval = sel.options[sel.selectedIndex].value;
    var inputamount = this.state.inputAmount;
    this.setState({
        currencyformatfrom: seloptval
    }, function() {
        this.calculateExchangeRate(this.state.inputAmount);
    });
};

getSelectionChangeForToDropdown(event) {
    var sel = event.target;
    var seloptval = sel.options[sel.selectedIndex].value;
    this.setState({
        currencyformatto: seloptval
    }, function() {
        this.calculateExchangeRate(this.state.inputAmount);
    });
};

inputFocusBlurUpdate(event) {
    if (event.target.placeholder == '0.00') {
        this.setState({
            placeholdervalue: ''
        });
    } else {
        this.setState({
            placeholdervalue: '0.00'
        });
    }
};

updateState(event) {
    var inputElemObj = event.target;
    var invalidChars = /[^.0-9]/gi;
    if (invalidChars.test(inputElemObj.value)) {
		/* check to remove special characters */
        inputElemObj.value = inputElemObj.value.replace(invalidChars, "");
    } else {

        if (inputElemObj.value.indexOf(".") != inputElemObj.value.lastIndexOf(".")) {
            inputElemObj.value = inputElemObj.value.substr(0, inputElemObj.value.lastIndexOf("."));
        }
		/* check to allow only two digitd after decimal point */
        if (inputElemObj.value.indexOf(".") != -1) {
            var inputAmountArr = inputElemObj.value.split(".");
            var integralPart = inputAmountArr[0];
            var decPartUptoTwoPlace = '';
            if (inputAmountArr[1].length > 2) {
                decPartUptoTwoPlace = inputElemObj.value.substr(inputElemObj.value.indexOf("."), 3);
                inputElemObj.value = integralPart + decPartUptoTwoPlace;
            }
        }
        this.setState({
            inputAmount: inputElemObj.value
        }, function() {
            this.calculateExchangeRate(this.state.inputAmount);
        });
    }
};
calculateExchangeRate(inputamount) {
    var selectedcurrencyfrom = this.state.currencyformatfrom;
    var selectedcurrencyto = this.state.currencyformatto;
    if (selectedcurrencyfrom === selectedcurrencyto) {
        this.setState({
            convertedamount: inputamount
        });
    } else {
        var currencyrate = '';
        var convertedamounttemp = '';
        var promise = new Promise((resolve, reject) => {
            this.setState({
                amountentered: inputamount
            });
			/* fixer api call to get currency rates */
            var fixerapiurl = 'https://api.fixer.io/latest?base=' + selectedcurrencyfrom;
            axios.get(fixerapiurl)
                .then(function(response) {
                    if (response != null) {
                        resolve(currencyrate = response.data.rates[selectedcurrencyto]);
                        resolve(convertedamounttemp = (currencyrate * inputamount));
                        document.getElementById("error_container").innerText = "";
                    } else {
                        reject(Error("Promise rejected"));
                    }
                }).catch(error => {
                    document.getElementById("error_container").innerText = error.message + "!!";
                });
        });
        promise.then(result => {
            this.setState({
                convertedamount: convertedamounttemp.toFixed(2)
            });
        }, function(error) {});
    }
};

render() {
return (
<div className="slds-col slds-m-bottom--large slds-m-right_medium slds-p-left--large slds-p-right--small slds-p-bottom--large">
    <div id="main-container">
        <div className="main_heading_text slds-m-bottom_small  slds-size--4-of-4">
            <span className="slds-text-heading--medium">Currency converter</span>
        </div>
        <div id="converter-container">
            <div className="slds-form-element">
                <label className="slds-text-align--center" htmlFor="text-input-id-1">Type in amount and select currency :</label>
                <div className="slds-form-element__control slds-m-bottom--small">
                    <input type="text" id="user-input-amount" className="slds-input slds-size--3-of-6" placeholder={this.state.placeholdervalue} onChange={this.updateState} onFocus={this.inputFocusBlurUpdate} onBlur={this.inputFocusBlurUpdate}/>
                    <div className="slds-select_container slds-m-left_x-small slds-show_inline-block slds-size--2-of-6" id="currency-container-up">
                        <select className="slds-select slds-p-horizontal--large" id="select-01" onChange={this.getSelectionChangeForFromDropdown}>
                            <option>CAD</option>
                            <option>USD</option>
                            <option>EUR</option>
                        </select>
                    </div>
                </div>
                <label className="slds-text-align--center" htmlFor="convertedamountbox">Converted amount:</label>
                <div className="slds-form-element__control">
                    <input type="text" id="convertedamountbox" value={this.state.convertedamount} className="slds-input slds-size--3-of-6" disabled="true" />
                    <div className="slds-select_container slds-m-left_x-small slds-show_inline-block slds-size--2-of-6" id="currency-container-down">
                        <select className="slds-select" id="currency-type-options-down" onChange={this.getSelectionChangeForToDropdown}>
                            <option>USD</option>
                            <option>CAD</option>
                            <option>EUR</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div className="slds-size slds-size--7-of-8 slds-p-around--xx-small slds-text-align--right">
            <a href="#" className="" onClick={this.showDisclaimerMessage}>Disclaimer</a>
            <div className="slds-text-align--left" id="disclaimer-msg-container">
                <span className={this.state.showhidedisclaimermsg}>The currency rates are not latest and are based on data from fixer api. Developer is not responsible for the accuracy of these rates.</span>
            </div>
        </div>

    </div>
</div>
);
}
}
export default CurrencyConverterApp;