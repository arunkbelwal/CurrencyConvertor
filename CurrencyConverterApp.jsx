import React from 'react';
import axios from 'axios';
import styles from './css/main.scss';

class CurrencyConverterApp extends React.Component {
   
   
   constructor(props) {
      super(props);
		
      this.state = {
         amountentered: 0.00,
		 convertedamount : 0.00,
		 currencyformatto : 'USD',
		 currencyformatfrom : 'CAD',
		 exchangerates : '',
		 showhideupperoptions : 'none' ,
		 showhideloweroptions : 'none' ,
		 showhidedisclaimermsg : 'none' 
      }

      this.updateState = this.updateState.bind(this);
	  this.openList = this.openList.bind(this);
	  this.showDisclaimerMessage = this.showDisclaimerMessage.bind(this);
	  this.getSelectionChangeForFromDropdown = this.getSelectionChangeForFromDropdown.bind(this);
	  this.getSelectionChangeForToDropdown = this.getSelectionChangeForToDropdown.bind(this);
	  
   };

    
  openList(event){
	 
	 var element = event.target;
	 var elementId = event.target.id;
	 var upperDropdown = document.getElementById('currency-container-up');
	var lowerDropdown = document.getElementById('currency-container-down');
			 if(elementId === 'arrowimageup'){
				 if(upperDropdown.style.display === 'none'){
					  this.setState({ showhideupperoptions: 'block'},function () {
						   console.log("expanded")
						});
				 }else if(upperDropdown.style.display === 'block'){
					  this.setState({ showhideupperoptions: 'none'},function () {
						   console.log("collapse")
						});
				 }
			 }else if(elementId === 'arrowimagedown'){
				 if(lowerDropdown.style.display === 'none'){
					 this.setState({ showhideloweroptions: 'block'},function () {
						   console.log("expanded")
						});
				 }else if(lowerDropdown.style.display === 'block'){
					  this.setState({ showhideloweroptions: 'none'},function () {
						   console.log("collapse")
						});
				 }
			 }
			 
			 
			
	
  };
   
   showDisclaimerMessage(event){
	   var disclimermsgstatus = document.getElementById('disclaimer-msg-container');
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
	 this.setState({ showhideupperoptions: 'none'},function () {
						   console.log("collapsed")
	});
     // document.getElementById('selectedCurrencyFormatFrom').value = currentselec;
	  this.setState({ currencyformatfrom: event.target.innerText},function () {
       this.updateState();
	   
    });
	  
  };
  
  getSelectionChangeForToDropdown(event){
	this.setState({ showhideloweroptions: 'none'},function () {
						   console.log("collapsed")
	});
     // document.getElementById('selectedCurrencyFormatTo').value = currentselec;
	  this.setState({ currencyformatto: event.target.innerText},function () {
       this.updateState();
    });
	  
	  
  };
   
  
   updateState() {
	   var inputamount = document.getElementById('inputamount').value;
	   //var  selectedcurrencyfrom = document.getElementById('selectedCurrencyFormatFrom').value;
	  // var  selectedcurrencyto = document.getElementById('selectedCurrencyFormatTo').value;
	  var  selectedcurrencyfrom = this.state.currencyformatfrom;
	  var  selectedcurrencyto =  this.state.currencyformatto;
	   if(selectedcurrencyfrom === selectedcurrencyto){
		  // document.getElementById('convertedamountbox').value =  inputamount;
		    this.setState({convertedamount: inputamount},function(){
				console.log("current format are same");
			});
	   }else{
		   var currencyrate = '';
		   var promise = new Promise( (resolve, reject) => {
				   
				   this.setState({amountentered: inputamount});
				   var fixerapiurl = 'http://api.fixer.io/latest?base='+selectedcurrencyfrom;
				   axios.get(fixerapiurl)
				  .then(function (response) {
					console.log(response);
					 if (response != null) {
						   resolve( currencyrate = response.data.rates[selectedcurrencyto]);
					  }
					  else {
					   reject(Error("Promise rejected"));
					  }
					
				  });
				  
				  
				  
		   });
		   
		   promise.then( result => {
			  // currencyrate = document.getElementById('conversionrates').value ;
				// document.getElementById('convertedamountbox').value =  (currencyrate*inputamount);
				 this.setState({convertedamount: (currencyrate*inputamount)});
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
			   <input className={styles.inputamount} id="inputamount"  type = "text"  value = {this.state.amountentered} 
               onChange = {this.updateState} placeholder="0.00" />
			   <label className={styles.sel_label_text}>{this.state.currencyformatfrom}</label>
			  <img src="../images/arrow.png" className={styles.updownarrows_ul} id="arrowimageup" onClick={this.openList}/>
			  <div className={styles.ul_currency_container} style={{display : this.state.showhideupperoptions}} id="currency-container-up" >
					<ul className={styles.ul_currency_options_expaned}  id="currency-type-options" >
						<li onClick={this.getSelectionChangeForFromDropdown} value="CAD" >CAD</li>
						<li onClick={this.getSelectionChangeForFromDropdown} value="USD" >USD</li>
						<li onClick={this.getSelectionChangeForFromDropdown} value="EUR">EUR</li>
					</ul>
					
				</div>
			   <input type="hidden" id="selectedCurrencyFormatFrom" value= {this.state.currencyformatfrom} ></input>
			   </div>
			   <div>
			    <p>Converted amount:</p>
			   <input className={styles.inputamount} id="convertedamountbox" type = "text"  value = {this.state.convertedamount} placeholder="0.00"/>
			   <label className={styles.sel_label_text}>{this.state.currencyformatto}</label>
			   <img src="../images/arrow.png" className={styles.updownarrows_ul} id="arrowimagedown" onClick={this.openList}/>
			   <div className={styles.ul_currency_container} style={{display : this.state.showhideloweroptions}} id="currency-container-down" >
					<ul className={styles.ul_currency_options_expaned}  id="currency-type-options" >
						<li onClick={this.getSelectionChangeForToDropdown} value="USD" >USD</li>
						<li onClick={this.getSelectionChangeForToDropdown} value="CAD" >CAD</li>
						<li onClick={this.getSelectionChangeForToDropdown} value="EUR">EUR</li>
					</ul>
					
				</div>
			   <input type="hidden" id="selectedCurrencyFormatTo" value= {this.state.currencyformatto}></input>
			   <input type = "hidden" id="conversionrates"/>
			   </div>
			    
			 	   
			   <div className={styles.disclaimer_link}>
					<a className={styles.disclaimer_label}  onClick={this.showDisclaimerMessage}>Disclaimer</a>
			   </div>
			   <div className={styles.disclaimer_message} id="disclaimer-msg-container" style={{display : this.state.showhidedisclaimermsg}} >
			   The currency rates are not latest and are based on data from fixer api. Developer is not responsible for the accuracy of these rates.</div>
			   <div className={styles.author_text}><p>Developer : Arun Belwal , version 1.0</p></div>
         </div>
      );
   }
}

export default CurrencyConverterApp;