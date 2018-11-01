import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector} from 'redux-form';
import CustomInput from './customInput.js'
import Results from './results.js'
import './App.css';



let Calculator = (props) => {
  /*const { handleSubmit } = props;*/

  const {
    daysPerWeekValue,
    casesPerDayValue,
    weeksPerYearValue,
    totalAnnualCasesValue,
    SSIrateValue,
    averageCaseCostValue,
    numberORsValue,
    column15SSIreductionValue,
    column30SSIreductionValue,
    column45SSIreductionValue
  } = props;

  const customValues = {
    daysPerWeekValue,
    casesPerDayValue,
    weeksPerYearValue,
    totalAnnualCasesValue,
    SSIrateValue,
    averageCaseCostValue,
    numberORsValue,
    column15SSIreductionValue,
    column30SSIreductionValue,
    column45SSIreductionValue
  }

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
                  <Field name="daysPerWeek" component={CustomInput} type="independent"  customValues={customValues} />
                </div>
                <div className="control independent">
                  <label className="label">Cases Per Day</label>
                  <Field name="casesPerDay" component={CustomInput} type="independent"  customValues={customValues} />
                </div>
                <div className="control independent">
                  <label className="label">Weeks Per Year Used</label>
                  <Field name="weeksPerYear" component={CustomInput} type="independent"  customValues={customValues} />
                </div>
              </div>
            </div>
            <div className='manual hybrid container'>
              <label className="label">Or, Enter Total Annual cases</label>
              <Field name="totalAnnualCases" component={CustomInput} type="hybrid"  customValues={customValues}/>
            </div>
          </div>
        </div>
      </div>
      <Results {...props} customValues={customValues} />
    </form>
  ) // end return
};

Calculator = reduxForm({
  form: 'Calculator'
})(Calculator);

const selector = formValueSelector('Calculator') // <-- same as form name
Calculator = connect(
  state => {
    // can select values individually
    const daysPerWeekValue = parseInt(selector(state, 'daysPerWeek'))
    const casesPerDayValue = parseInt(selector(state, 'casesPerDay'));
    const weeksPerYearValue = parseInt(selector(state, 'weeksPerYear'));
    const totalAnnualCasesValue = parseInt(selector(state, 'totalAnnualCases'));
    const SSIrateValue= parseInt(selector(state,'SSIrate'));
    const averageCaseCostValue = parseInt(selector(state,'averageCaseCost'));
    const numberORsValue = parseInt(selector(state,'numberORs'));
    const column15SSIreductionValue = parseInt(selector(state,'column15SSIreduction'));
    const column30SSIreductionValue = parseInt(selector(state,'column30SSIreduction'));
    const column45SSIreductionValue = parseInt(selector(state,'column45SSIreduction'));

    return {
      daysPerWeekValue,
      casesPerDayValue,
      weeksPerYearValue,
      totalAnnualCasesValue,
      SSIrateValue,
      averageCaseCostValue,
      numberORsValue,
      column15SSIreductionValue,
      column30SSIreductionValue,
      column45SSIreductionValue
    }
  }
)(Calculator)

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="container">
          <Calculator />
        </div>
      </div>
    );
  }
}

export default App;