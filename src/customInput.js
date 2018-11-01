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

  componentDidUpdate(prevProps, prevState) {
    this.props.updateSelf(this.state.value);
	}

	 debounceAndEmit() {

	 }

    handleChange(event) {
      console.log('test');
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

	    return(
		    	 <NumberFormat
              value = {this.state.value}
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