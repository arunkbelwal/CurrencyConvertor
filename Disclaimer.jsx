import React from 'react';

class Disclaimer extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        showhidedisclaimermsg: 'slds-hide',
        showhidenetworkerrmsg: 'block'
          }
	/* state variables will be defined below */
       this.showDisclaimerMessage = this.showDisclaimerMessage.bind(this);
    	
};


/* this method will show/hide disclaimer message on disclaimer link click*/
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

render() {
return (
		<div className="slds-size slds-size--7-of-8 slds-p-around--xx-small slds-text-align--right">
            <a href="#" className="" onClick={this.showDisclaimerMessage}>Disclaimer</a>
            <div className="slds-text-align--left" id="disclaimer-msg-container">
                <span className={this.state.showhidedisclaimermsg}>The currency rates are not latest and are based on data from fixer api. Developer is not responsible for the accuracy of these rates.</span>
            </div>
        </div>
);
}
}
export default Disclaimer;