import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector} from 'redux-form';
import CustomInput from './customInput.js'
import Results from './results.js'
import './App.css';



let Calculator = (props) => {
  /*const { handleSubmit } = props;*/

  return (
    <form className="form">
      <div className='title align-left'>
        <h2>SurgicAir™ ZERO</h2>
        <h1>SSI Prevention Calculator</h1>
        <hr />
      </div>
      <div className='row'>
        <div className='two-column align-left'>
          <h2 style={{"fontSize":"30px","padding":"50px 0"}}>Calculate the human benefits and ROI of the SurgicAir ZERO Airflow System.</h2>
          <p className='gray'> Airborne pathogens are a proven and significant source of SSIs, contributing substantially to surgical morbidity and mortality each year. The first step to this problem is in their prevention, and that’s where SurgicAir™ Zero Airflow comes in.</p>
        </div>
        <div className='two-column'>
          <div className = 'totalAnnualCases'>
            <h3 style={{"fontSize":"24px","textTransform":"uppercase", "paddingTop":"50px"}}> Calculate total annual SSI cases per O.R. </h3>
            <div className='automatic container'>
                <div className="control independent">
                  <Field name="daysPerWeek" component={CustomInput} customValues={props.customValues} />
                  <label className="label white">Days Per Week One O.R. is Used</label>
                </div>
                <span className='times white'>×</span>
                <div className="control independent">
                  <Field name="casesPerDay" component={CustomInput} customValues={props.customValues} />
                  <label className="label white">Cases Per Day For One O.R.</label>                  
                </div>
                <span className='times white'>×</span>
                <div className="control independent">
                  <Field name="weeksPerYear" component={CustomInput} customValues={props.customValues} />
                  <label className="label white">Weeks Per Year One O.R. is Used</label>
                </div>
            </div>
            <div className='manual hybrid container'>
              <label className="label white inline">Or, Enter Total Annual Cases for one O.R.</label> 
              <Field name="totalAnnualCases" component={CustomInput} customValues={props.customValues}/>
            </div>
          </div>
        </div>
      </div>
      <hr style={{"marginTop":"60px", "marginBottom":"40px"}} />
      <Results {...props} customValues={props.customValues} />
    </form>
  ) // end return
};


Calculator = reduxForm({
  form: 'Calculator'
})(Calculator);

const selector = formValueSelector('Calculator') // <-- same as form name
let mapStateToProps = (state) => {
  //parsing selection to an integer
  var customValues = selector(state,
      'daysPerWeek',
      'casesPerDay',
      'weeksPerYear',
      'totalAnnualCases',
      'SSIrate',
      'averageCaseCost',
      'numberORs',
      'column15SSIreduction',
      'column30SSIreduction',
      'column45SSIreduction'
    );
  const keys = Object.keys(customValues);
  keys.forEach(function(key) {
    customValues[key] = Number(customValues[key]);
  })
  return {
    customValues: customValues
  }
}
Calculator = connect(
  mapStateToProps
)(Calculator)

class App extends Component {
  
  render() {
    const initialValues = {
      daysPerWeek: "",
      casesPerDay: "",
      weeksPerYear: "",
      totalAnnualCases: "400",
      SSIrate: "45",
      averageCaseCost: "10",
      numberORs: "20",
      column15SSIreduction: "15",
      column30SSIreduction: "30",
      column45SSIreduction: "45"
    } 
    return (
      <div className="App">
        <div className="container">
          <Calculator initialValues={initialValues} />
        </div>
      </div>
    );
  }
}

export default App;