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

      <div className='row'>
        <div className='two-column align-left'>
          <h2 style={{"fontSize":"30px","padding":"40px 0","fontWeight": "300"}}>Calculate the benefits and payback of the SurgicAir Zero Airflow System.</h2>
          <p className='gray'> Just enter a few simple numbers to see the impact zero-particle O.R. airflow can have on your hospital's bottomline and patient outcomes.</p>
        </div>
        <div className='two-column'>
          <div className = 'totalAnnualCases'>
            <h3 style={{"fontSize":"24px","textTransform":"uppercase"}}> Calculate total annual SSI cases per O.R. </h3>
            <div className='automatic container'>
                <div className="control independent">
                  <Field name="daysPerWeek" component={CustomInput} customValues={props.customValues} maximum={7} />
                  <label className="label white">Days Per Week One O.R. is Used</label>
                </div>
                <span className='times white'>×</span>
                <div className="control independent">
                  <Field name="casesPerDay" component={CustomInput} customValues={props.customValues} maximum={999} />
                  <label className="label white">Cases Per Day For One O.R.</label>                  
                </div>
                <span className='times white'>×</span>
                <div className="control independent">
                  <Field name="weeksPerYear" component={CustomInput} customValues={props.customValues} maximum={52} />
                  <label className="label white">Weeks Per Year One O.R. is Used</label>
                </div>
            </div>
            <div className='manual hybrid container'>
              <label className="label white">Or, Enter Total Annual Cases for one O.R.</label> 
              <Field name="totalAnnualCases" component={CustomInput} customValues={props.customValues} maximum={999999}/>
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

    console.log('version with CRA polyfill');

    const initialValues = {
      daysPerWeek: "5",
      casesPerDay: "3",
      weeksPerYear: "50",
      totalAnnualCases: "750",
      SSIrate: "3.5",
      averageCaseCost: "64500",
      numberORs: "1",
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