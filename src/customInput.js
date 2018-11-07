/* Big River Custom Field Class */
import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { change  } from 'redux-form';
import { connect, Store } from 'react-redux';
/*import { debounce } from 'throttle-debounce';
*/
class CustomInput extends Component {

	constructor(props) {
    	super(props);

      this.state = {
        value: props.input.value, // 2 and 3
      }
    }
/*
  componentDidUpdate(prevProps, prevState) {


	}*/

	 debounceAndEmit() {

	 }

    handleChange(event) {
      if (!this.props.decimal) {
   		 var eventValue = event.target.value.replace( /\D+/g, ''); //strips out non-numeric characters
      } else {
        var eventValue = event.target.value.replace(/[^0-9.]/g, '');  //strips out non-numeric characters except decimals
        eventValue = eventValue.substring(0,4);
      }
       console.log(eventValue);

      eventValue = parseInt(eventValue,10);


   		this.props.updateSelf(eventValue);
      this.state.value = eventValue; //not correct, but doesn't trigger rerenders which is desirable here

      //sets behavior when editing the values which determine total annual cases, will update TAC when you update all 3 and set TAC to
      //to blank if one is blank
      if (this.props.input.name==='daysPerWeek'||this.props.input.name==='weeksPerYear'||this.props.input.name==='casesPerDay') {
        const cv = this.props.customValues;
        if (cv.daysPerWeek && cv.weeksPerYear && cv.casesPerDay) {
          var value = cv.daysPerWeek * cv.weeksPerYear * cv.casesPerDay;
          this.props.dispatchTotalAnnualCases(value);
        } else {
          this.props.dispatchTotalAnnualCases("");
        }
      }

      if(this.props.input.name==="totalAnnualCases") {
        this.props.resetOthers(["daysPerWeek","weeksPerYear","casesPerDay"]);
      }
 	}

    render() {
	    return(
		    	     <NumberFormat
                  value = {this.props.input.value || 0}
                  onFocus = {()=>{}}
                  onBlur = {this.handleChange.bind(this)}
                  onChange = {this.handleChange.bind(this)}
                  onInput = {this.handleChange.bind(this)}
    	        		thousandSeparator = {true}
    	        		prefix = {this.props.prefix}
    	        		suffix = {this.props.suffix}
                  decimalScale = {1}
                  isAllowed={(values) => {
                    const {floatValue} = values;
                    if (typeof floatValue==='undefined') {
                      return true;
                    }    

                    if (this.props.maximum) {
                      return floatValue <= this.props.maximum;
                    } else {
                      return true;
                    }
                    
                  }}
    	      		/>
	    )
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateSelf: (value) => dispatch(change(ownProps.meta.form, ownProps.input.name, value)),
  resetOthers: (others) => others.map(function(name){
    dispatch(change(ownProps.meta.form, name, ""))
  }),
  dispatchTotalAnnualCases: (value) => dispatch(change(ownProps.meta.form,"totalAnnualCases",value))
})

export default connect(undefined, mapDispatchToProps)(CustomInput);