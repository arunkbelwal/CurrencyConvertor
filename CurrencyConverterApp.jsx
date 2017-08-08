import React from 'react';
import axios from 'axios';
import styles from './css/main.scss';

class CurrencyConverterApp extends React.Component {
   
   
   constructor(props) {
      super(props);
		
      this.state = {
         amountentered: 0.00,
		 convertedamount : 0.00,
		 currencyformatfrom : 'CAD',
		 currencyformatto : 'USD',
		 exchangerates : '',
		 showhidedisclaimermsg : 'none'
      }
	    
	  this.updateState = this.updateState.bind(this);
	  this.showDisclaimerMessage = this.showDisclaimerMessage.bind(this);
	  this.getSelectionChangeForFromDropdown = this.getSelectionChangeForFromDropdown.bind(this);
	  this.getSelectionChangeForToDropdown = this.getSelectionChangeForToDropdown.bind(this);
	  this.calculateExchangeRate =  this.calculateExchangeRate.bind(this);
	  
   };

  
	
    showDisclaimerMessage(event){
	   var disclimermsgstatus = event.target.parentNode.nextSibling;
	   if(disclimermsgstatus.style.display === 'none'){
					  this.setState({ showhidedisclaimermsg: 'block'},function () {
						   console.log("disclaimer msg shown")
						});
		 }else if(disclimermsgstatus.style.display === 'block'){
			  this.setState({ showhidedisclaimermsg: 'none'},function () {
				   console.log("discliamer msg hidden")
				});
		 }

   };
  
    getSelectionChangeForFromDropdown(event){
		var sel = event.target;
		var seloptval = sel.options[sel.selectedIndex].value;
		var inputamount = event.target.parentNode.previousSibling.value;
		 this.setState({currencyformatfrom : seloptval},function(){
			console.log('from drop down');
			this.calculateExchangeRate(inputamount);
		});
    	  
     };
  
	getSelectionChangeForToDropdown(event){
		var sel = event.target;
		var seloptval = sel.options[sel.selectedIndex].value;
		var inputamount=event.target.parentNode.parentNode.previousSibling.childNodes[1].value;
		this.setState({currencyformatto : seloptval},function(){
			this.calculateExchangeRate(inputamount);
					
		});
       
    };
   
  
	updateState(event) {
		var inputElemObj = event.target;
 	    var invalidChars = /[^0-9]/gi
		if (invalidChars.test(inputElemObj.value)) {
			inputElemObj.value = inputElemObj.value.replace(invalidChars, "");
				
		}
		else {
			this.calculateExchangeRate(inputElemObj.value);
		}
	};
   
	calculateExchangeRate(inputamount){
	  
		var  selectedcurrencyfrom = this.state.currencyformatfrom;
		var  selectedcurrencyto =  this.state.currencyformatto;
	   if(selectedcurrencyfrom === selectedcurrencyto){
		  // document.getElementById('convertedamountbox').value =  inputamount;
			this.setState({convertedamount: inputamount},function(){
				console.log("current format are same");
			});
	   }else{
		   var currencyrate = '';
		   var convertedamounttemp = '';
		   var promise = new Promise( (resolve, reject) => {
				   
				   this.setState({amountentered: inputamount});
				   var fixerapiurl = 'http://api.fixer.io/latest?base='+selectedcurrencyfrom;
				   axios.get(fixerapiurl)
				  .then(function (response) {
					console.log(response);
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
			  // currencyrate = document.getElementById('conversionrates').value ;
				// document.getElementById('convertedamountbox').value =  (currencyrate*inputamount);
				 this.setState({convertedamount: convertedamounttemp.toFixed(2)},function(){
					  console.log("success occured!");
				 });
			 }, function(error) {
			  console.log("some error occured!");
			 });
				  
	
	   }
   };
   
   
   render() {
      return (
         <div className ={styles.main_container} id ="main-container">
		 
		 <div><span className={styles.heading}>Currency converter</span></div>
            <div className= {styles.converter_container} id= "converter-container">
			<p>Type in amount and select currency :</p>
			<input  type="text"  className={styles.inputamount} id="user-input-amount" onChange = {this.updateState} />
			 			 
			  <div className={styles.currency_container} id="currency-container-up" >
					<select className={styles.currency_options} onChange={this.getSelectionChangeForFromDropdown} id="currency-type-options-up" >
						<option>CAD</option>
						<option>USD</option>
						<option>EUR</option>
					</select>
					
				</div>
			   
			   </div>
			   <div>
			    <p>Converted amount:</p>
			   <input type="text" className={styles.inputamount} id="convertedamountbox" value = {this.state.convertedamount} disabled  />
			   		  
			   <div className={styles.currency_container} id="currency-container-down" >
					<select className={styles.currency_options} onChange={this.getSelectionChangeForToDropdown} id="currency-type-options-down" >
						<option>USD</option>
						<option>CAD</option>
						<option>EUR</option>
					</select>
					 
				</div>
			   
			   <input type = "hidden" id="conversionrates"/>
			   </div>
			    
			 	   
			   <div className={styles.disclaimer_link}>
					<a className={styles.disclaimer_label}  onClick={this.showDisclaimerMessage}>Disclaimer</a>
			   </div>
			   <div className={styles.disclaimer_message} id="disclaimer-msg-container" style={{display : this.state.showhidedisclaimermsg}} >
			   <span>The currency rates are not latest and are based on data from fixer api. Developer is not responsible for the accuracy of these rates.</span></div>
			   <div className={styles.author_text}><p>Developer : Arun Belwal , version 1.0</p></div>
         </div>
      );
   }
}

export default CurrencyConverterApp;