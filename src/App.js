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
      <div className='title container'>
        <h2>SurgicAir™ ZERO</h2>
        <h1>SSI Prevention Calculator</h1>
      </div>
      <div className='row border-bottom container'>
        <div className='two-column'>
          <h2>Calculate the human benefits and ROI of the SurgicAir ZERO Airflow System.</h2>
          <p>Airborne pathogens are a proven and significant source of SSIs, contributing substantially to surgical morbidity and mortality each year. The first step to this problem is in their prevention, and that’s where SurgicAir™ Zero Airflow comes in.</p>
        </div>
        <div className='two-column'>
          <div className = 'totalAnnualCases'>
            <h3> Calculate total annual SSI cases per O.R. </h3>
            <div className='automatic container'>
              <div className="field">
                <div className="control independent">
                  <label className="label">Days Per Week Used</label>
                  <Field name="daysPerWeek" component={CustomInput} customValues={props.customValues} />
                </div>
                <div className="control independent">
                  <label className="label">Cases Per Day</label>
                  <Field name="casesPerDay" component={CustomInput} customValues={props.customValues} />
                </div>
                <div className="control independent">
                  <label className="label">Weeks Per Year Used</label>
                  <Field name="weeksPerYear" component={CustomInput} customValues={props.customValues} />
                </div>
              </div>
            </div>
            <div className='manual hybrid container'>
              <label className="label">Or, Enter Total Annual cases</label>
              <Field name="totalAnnualCases" component={CustomInput} customValues={props.customValues}/>
            </div>
          </div>
        </div>
      </div>
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
    customValues[key] = parseInt(customValues[key]);
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
      totalAnnualCases: "",
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