import React from 'react';
import axios from 'axios';
import styles from './css/main.scss';
class CurrencyConverterApp extends React.Component {
constructor(props) {
super(props);
this.state = {
amountentered: 0.00,
convertedamount : '',
currencyformatfrom : 'CAD',
currencyformatto : 'USD',
exchangerates : '',
showhidedisclaimermsg : 'none',
showhidenetworkerrmsg : 'block',
inputAmount : 0
}
this.updateState = this.updateState.bind(this);
this.showDisclaimerMessage = this.showDisclaimerMessage.bind(this);
this.getSelectionChangeForFromDropdown = this.getSelectionChangeForFromDropdown.bind(this);
this.getSelectionChangeForToDropdown = this.getSelectionChangeForToDropdown.bind(this);
this.calculateExchangeRate =  this.calculateExchangeRate.bind(this);
};
showDisclaimerMessage(event){
event.target.parentNode.nextSibling.classList.toggle("main__hide___3TkWs");
};
getSelectionChangeForFromDropdown(event){
var sel = event.target;
var seloptval = sel.options[sel.selectedIndex].value;
var inputamount = this.state.inputAmount;
this.setState({currencyformatfrom : seloptval},function(){
this.calculateExchangeRate(this.state.inputAmount);
});
};
getSelectionChangeForToDropdown(event){
var sel = event.target;
var seloptval = sel.options[sel.selectedIndex].value;
this.setState({currencyformatto : seloptval},function(){
this.calculateExchangeRate(this.state.inputAmount);
});
};
updateState(event) {
var inputElemObj = event.target;
var invalidChars = /[^.0-9]/gi;
var invlidInput = /^[0-9]+\.[0-9][0-9]$/gi;
if (invalidChars.test(inputElemObj.value)) {
inputElemObj.value = inputElemObj.value.replace(invalidChars, "");
}else {
var inputAmountArr = inputElemObj.value.split(".");
if(inputAmountArr[1] != undefined && inputAmountArr[1] != null && inputElemObj.value.indexOf(".") === inputElemObj.value.lastIndexOf(".") && inputAmountArr[1].length > 2){
inputElemObj.value = inputElemObj.value.replace(inputElemObj.value.substr((inputElemObj.value.indexOf(".")+3),inputElemObj.value.length),"");
}else if(inputElemObj.value.indexOf(".") != inputElemObj.value.lastIndexOf(".")){
inputElemObj.value = inputElemObj.value.substr(0,inputElemObj.value.lastIndexOf("."));
}
this.setState({inputAmount : inputElemObj.value},function(){
this.calculateExchangeRate(this.state.inputAmount);
});
}
};
calculateExchangeRate(inputamount){
var  selectedcurrencyfrom = this.state.currencyformatfrom;
var  selectedcurrencyto =  this.state.currencyformatto;
if(selectedcurrencyfrom === selectedcurrencyto){
this.setState({convertedamount: inputamount});
}else{
var currencyrate = '';
var convertedamounttemp = '';
var promise = new Promise( (resolve, reject) => {
this.setState({amountentered: inputamount});
var fixerapiurl = 'https://api.fixer.io/latest?base='+selectedcurrencyfrom;
axios.get(fixerapiurl)
.then(function (response) {
if (response != null) {
resolve( currencyrate = response.data.rates[selectedcurrencyto]);
resolve( convertedamounttemp = (currencyrate*inputamount) );
document.getElementById("error_container").innerText="";
}
else {
reject(Error("Promise rejected"));
}
}) .catch(error => {
document.getElementById("error_container").innerText= error.message+"!!";
});
});
promise.then( result => {
this.setState({convertedamount: convertedamounttemp.toFixed(2)});
}, function(error) {
});
}
};
render() {
return (
<div  id ="main-container">
   <div className="main_heading_text slds-m-bottom_small  slds-size--4-of-4">
	<span className="slds-text-heading_large">Currency converter</span>
   </div>
   <div  id= "converter-container">
      <div className="slds-form-element">
         <label className="slds-form-element__label" htmlFor="text-input-id-1">Type in amount and select currency :</label>
         <div className="slds-form-element__control slds-m-bottom--small">
            <input type="text" id="user-input-amount" className="slds-input slds-size--3-of-6" placeholder="0.00" />
            <div className="slds-select_container slds-m-left_x-small slds-show_inline-block slds-size--2-of-6" id="currency-container-up">
               <select className="slds-select slds-p-horizontal--large" id="select-01">
                  <option>CAD</option>
                  <option>USD</option>
                  <option>EUR</option>
               </select>
            </div>
         </div>
         <label className="slds-form-element__label" htmlFor="convertedamountbox">Converted amount:</label>
         <div className="slds-form-element__control">
            <input type="text" id="convertedamountbox" value="" className="slds-input slds-size--3-of-6" disabled="" />
            <div className="slds-select_container slds-m-left_x-small slds-show_inline-block slds-size--2-of-6" id="currency-container-down">
               <select className="slds-select" id="currency-type-options-down">
                  <option>USD</option>
                  <option>CAD</option>
                  <option>EUR</option>
               </select>
            </div>
         </div>
      </div>
   </div>
   <div className="slds-size slds-size--2-of-8 slds-p-around--xx-small">
      <a href="#" className={styles.disclaimer_label}  onClick={this.showDisclaimerMessage} >Disclaimer</a>
   </div>
   <div className={styles.hide} id="disclaimer-msg-container">
      <span className={styles.disclaimer_message}>The currency rates are not latest and are based on data from fixer api. Developer is not responsible for the accuracy of these rates.</span>
   </div>
</div>
);
}
}
export default CurrencyConverterApp;