import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector  } from 'redux-form';
import './App.css';

let Calculator = (props) => {
  /*const { handleSubmit } = props;*/


  let New = () => {
    console.log('new');
  }


  const {
    daysPerWeekValue,
    casesPerDayValue,
    weeksPerYearValue,
    totalAnnualCasesValue,
    pristine,
    reset,
    submitting
  } = props;

  return (
    <form className="form">
      <div className = 'totalAnnualCases'>
        <h2> Calculate total annual SSI cases per O.R. </h2>
        <div className='automatic container'>
          <div className="field">
            <div className="control independent">
              <label className="label">Days Per Week Used</label>
              <Field name="daysPerWeek" component="input" type="number" onChange={New}/>
            </div>
            <div className="control independent">
              <label className="label">Cases Per Day</label>
              <Field name="casesPerDay" component="input" type="number" onChange={New}/>
            </div>
            <div className="control independent">
              <label className="label">Weeks Per Year Used</label>
              <Field name="weeksPerYear" component="input" type="number" onChange={New}/>
            </div>
          </div>
        </div>
        <div className='manual hybrid container'>
          <label className="label">Or, Enter Total Annual cases</label>
          <Field name="totalAnnualCases" component="input" type="number" />
        </div>
        <div> This is the product of the fields: {daysPerWeekValue * casesPerDayValue * weeksPerYearValue}</div>
      </div>

    
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
    const daysPerWeekValue = selector(state, 'daysPerWeek')
    const casesPerDayValue = selector(state, 'casesPerDay');
    const weeksPerYearValue = selector(state, 'weeksPerYear');
    const totalAnnualCasesValue = selector(state, 'totalAnnualCases');

    return {
      daysPerWeekValue,
      casesPerDayValue,
      weeksPerYearValue,
      totalAnnualCasesValue
    }
  }
)(Calculator)

class App extends Component {

  handleCalculator = values => {
    console.log(values);
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <Calculator onSubmit={this.handleCalculator} />
        </div>
      </div>
    );
  }
}

export default App;