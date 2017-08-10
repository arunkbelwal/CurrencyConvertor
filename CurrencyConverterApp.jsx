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

  
	
    showDisclaimerMessage(){
	   document.getElementById("disclaimer-msg-container").classList.toggle("main__hide___3TkWs");
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
					  }
					  else {
					   reject(Error("Promise rejected"));
					  }
					
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
   		  <div><span className="slds-text-heading_large">Currency converter</span></div>
            <div  id= "converter-container">
					
		    <div className="slds-form-element">
			  <label className="slds-form-element__label" for="text-input-id-1">Type in amount and select currency :</label>
			  <div className="slds-form-element__control">
				<input type="text" id="text-input-id-1" className={styles.slds_modified_input} placeholder="0.00" id="user-input-amount" onChange = {this.updateState} />
				<div className={styles.slds_modified_select_container} id="currency-container-up">
				  <select className="slds-select" id="select-01" onChange={this.getSelectionChangeForFromDropdown}>
					<option>CAD</option>
					<option>USD</option>
					<option>EUR</option>
				  </select>
				</div>
			  </div>
			  
			  <label className="slds-form-element__label" for="convertedamountbox">Converted amount:</label>
			  <div className="slds-form-element__control">
			  <input type="text" id="convertedamountbox" value = {this.state.convertedamount} className={styles.slds_modified_input} disabled />
				<div className={styles.slds_modified_select_container} id="currency-container-down">
				  <select className="slds-select" id="select-02" onChange={this.getSelectionChangeForToDropdown} id="currency-type-options-down" >
						<option>USD</option>
						<option>CAD</option>
						<option>EUR</option>
				  </select>
				</div>
			  </div>
			</div>
			   
			   </div>
			
			 	   
			   <div className={styles.disclaimer_link}>
					<a href="#" className={styles.disclaimer_label}  onClick={this.showDisclaimerMessage} >Disclaimer</a>
			   </div>
			   <div className={styles.hide} id="disclaimer-msg-container">
			   <span className={styles.disclaimer_message}>The currency rates are not latest and are based on data from fixer api. Developer is not responsible for the accuracy of these rates.</span></div>
			   
         </div>
      );
   }
}

export default CurrencyConverterApp;