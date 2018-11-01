/* Big River Custom Field Class */
import React, { Component } from 'react';
import { change  } from 'redux-form';
import { connect, Store } from 'react-redux';
import NumberFormat from 'react-number-format';
/*import { debounce } from 'throttle-debounce';
*/
class CustomInput extends Component {



	constructor(props) {
    	super(props);

    	this.state = {
    		customValues: props.customValues,
    		value: props.input.value || props.initialvalue || ""
    	}

    }

     componentDidUpdate(prevProps, prevState) {
        console.log(this.props.input.name);
        console.log(prevProps);
        console.log(this.state.value);
  	   if (prevState.value !== this.state.value) {
  	     this.debounceAndEmit();
  	   }
      else if (this.props.type === 'hybrid' ) {  //updates Redux store whenever totalAnnualCases is updated by independent fields
         var cv = this.props.customValues;
         if (cv.daysPerWeekValue && cv.casesPerDayValue && cv.weeksPerYearValue) {
          this.props.dispatchTotalAnnualCases(cv.daysPerWeekValue * cv.casesPerDayValue * cv.weeksPerYearValue);
        }
    }


	 }

	 debounceAndEmit() {
	   // Debounce for some time. Maybe use:
	   // import { debounce } from 'throttle-debounce';
	   // for that:

	   // disabled debouncing for now
	     this.props.updateSelf(this.state.value);
	     if(['daysPerWeek','casesPerDay','weeksPerYear'].indexOf(this.props.input.name) > -1 ) { //checks if has one of these names 
	     	this.props.resetOthers(['totalAnnualCases']);
	     }
	     if (this.props.type === 'hybrid') {
	     	this.props.resetOthers(['daysPerWeek', 'casesPerDay', 'weeksPerYear']);
	     }
	 }

    handleChange(event) {

   		var eventValue = event.target.value.replace( /\D+/g, ''); //strips out non-numeric characters
   		   		// check to make sure users don't delete $'s or percents 
/*   		if (this.props.symbol==='dollar' && !eventValue.startsWith('$')) {
   			var value = '$' + eventValue;
   		} else if (this.props.symbol==='percent' && !eventValue.endsWith('%')) {
   			var value = eventValue + "%";
   		} else {
   			var value = eventValue
   		}*/

   		this.setState({ value: eventValue })
 	}

    render() {
    	var customValues = this.props.customValues;
	   	if (this.props.type === 'independent') {
    		var value = this.props.input.value;
    	}

    	if (this.props.type === 'hybrid') {
    		if (this.props.input.value) {   //uses manually entered value if it exists, else uses calculated value
    			var value = this.props.input.value;
    		} else {
    			var value = customValues.daysPerWeekValue * customValues.casesPerDayValue * customValues.weeksPerYearValue;
    		}
    	}

	    return(
		    	 <NumberFormat
	        		{...this.props} // Includes standard redux-form bindings for input fields. 
	        		onFocus = {()=>{}}
	        		onBlur = {this.handleChange.bind(this)}
	        		onChange = {this.handleChange.bind(this)}
	        		onInput = {this.handleChange.bind(this)}
	        		thousandSeparator = {true}
	        		prefix = {this.props.prefix}
	        		suffix = {this.props.suffix}
	      		/>
	    )
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateSelf: (value) => dispatch(change(ownProps.meta.form, ownProps.input.name, value)),
  resetOthers: (others) => others.map(function(name){
  	dispatch(change(ownProps.meta.form, ownProps.input.name, ""))
  }),
  dispatchTotalAnnualCases: (value) => dispatch(change(ownProps.meta.form,"totalAnnualCases",value))
})

export default connect(undefined, mapDispatchToProps)(CustomInput);


