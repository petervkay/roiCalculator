/* Big River Custom Field Class */
import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { change  } from 'redux-form';
import { connect } from 'react-redux';
import Modal from 'react-modal';
/*import { debounce } from 'throttle-debounce';
*/
class CustomInput extends Component {

	constructor(props) {
    	super(props);

      this.state = {
        value: props.input.value, // 2 and 3
        showModal : false
      }

      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
  
    }

  /* modals */
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

 
  handleChange(event) {
    var eventValue = event.target.value
    if (!this.props.decimal) {
 		 eventValue = eventValue.replace( /\D+/g, ''); //strips out non-numeric characters
    } else {
      eventValue = eventValue.replace(/[^0-9.]/g, '');  //strips out non-numeric characters except decimals
    }

    this.props.updateSelf(eventValue);


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
      const customModalStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          width                 : '70%',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          border                : "4px solid #666",
          borderWidth           : "5px",
          padding               : "40px"
        }
      };

	    return(
              <div>
		    	      <NumberFormat
                   value = {this.props.input.value}
                   onFocus = {()=>{}}
                   onBlur = {this.handleChange.bind(this)}
                   onChange = {this.handleChange.bind(this)}
                   onInput = {this.handleChange.bind(this)}
     	        		thousandSeparator = {true}
     	        		prefix = {this.props.prefix}
     	        		suffix = {this.props.suffix}
                   decimalScale = {1}
                   isNumericString = {true}
                   isAllowed={(values) => {
                     const {value, floatValue} = values;

                     if (typeof floatValue==='undefined' || typeof value==='undefined') {
                       return true;
                     }
                    if (value.charAt(0)==='0') {
                      if (value.charAt(1) && value.charAt(1)!=='.') {
                        return false
                      }
                    }
                     if (this.props.maximum) {
                       return floatValue <= this.props.maximum;
                     } else {
                       return true;
                     }
                     
                   }}
                   onValueChange = {(val) => {
                      const {floatValue} = val;
                     if (floatValue < this.props.minimum) {
                        this.setState({warning: true});
                     }  else {
                      this.setState({warning:false});
                     }
                   }}

                  />
                  {this.props.tooltip && <span className='tooltip trigger' onClick={this.handleOpenModal}><span>?</span></span>}
                  {this.props.tooltip && 
                    <Modal 
                      isOpen={this.state.showModal}
                      onAfterOpen={this.afterOpenModal}
                      onRequestClose={this.handleCloseModal}
                      shouldCloseOnOverlayClick={true}
                      style = {customModalStyles}
                    >
                     <p>{this.props.tooltip}</p>
                    </Modal>
                  }
                  {this.state.warning && <span className='warning'>{this.props.warningMessage}</span>}
                </div>
	    )
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateSelf: (value) => dispatch(change(ownProps.meta.form, ownProps.input.name, value)),
  resetOthers: (others) => others.map(function(name){
    dispatch(change(ownProps.meta.form, name, ""));
  }),
  dispatchTotalAnnualCases: (value) => dispatch(change(ownProps.meta.form,"totalAnnualCases",value))
})

export default connect(undefined, mapDispatchToProps)(CustomInput);