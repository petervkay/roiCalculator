import React, { Component } from 'react';
import {Field} from 'redux-form';
import CustomInput from './customInput.js';
import Dependent from './dependent.js';

export default class Results extends Component {
	render() {
		var cv = this.props.customValues;
		const reductionValues = [cv.column15SSIreduction,cv.column30SSIreduction,cv.column45SSIreduction];
		return(
		<div className='results'>
	        <h1> Your Results </h1>
	        <div className='row'>
	          <div className='five-column assumptions'>
	            <h3 className='green'> Assumptions </h3>
	            <div className='container green'>
	              <label className='label large'>SSI Rate </label>
	              <Field name='SSIrate' component={CustomInput}  suffix='%' />
	            </div>
	            <div className='container green'>
	              <label className='label'>Average SSI Case Cost Per O.R.</label>
	              <Field name='averageCaseCost' component={CustomInput} prefix='$' />
	            </div>
	            <div className='container green'>
	              <label className='label'>Number of O.R.s</label>
	              <Field name='numberORs' component={CustomInput} />
	            </div>
	          </div>
	        <div className='five-column cla'>
	            <h3 className='black'>Compliant Laminar Airflow</h3>
	            <div className='bg-gray'>
		            <p className='color-white'>
		                Complaint Laminar Airflow is what your O.R. has if it doesn't have SurgicAir Zero
		            </p>
		            <label className='label'>Number of SSIs</label>
	{	            <Dependent 
						name='numberSSIs' 
						value = {Math.ceil(cv.totalAnnualCases * (cv.SSIrate / 100) * cv.numberORs)} 
					  />
	}	            <label className='label'>Annual Total SSI Cost</label>
		            <Dependent 
		            	name='CLAannualTotalSSICost' 
		            	value = {Math.ceil(cv.totalAnnualCases * (cv.SSIrate / 100) * cv.numberORs * cv.averageCaseCost)} 
		            	prefix = '$' 
		            />
	        	</div>
	         </div>
	          {[15,30,45].map(function(percentage, index){

	          	return (
	          		<div className='five-column' key={index}>
	          			<img src='/../../surgicair.png'/>
	          			<label className='label'>Enter SSI Reduction Rate</label>
	          			<Field name={"column" + percentage + "SSIreduction"} component={CustomInput} suffix="%" />
	          			<label className='label'>Number of SSIs</label>
	          			<Dependent
	          				name={'numberSSIs'+percentage}
	          				value={Math.ceil(cv.totalAnnualCases * (cv.SSIrate / 100) * cv.numberORs* (1-(reductionValues[index] / 100)))}
	          			/>
	          			<label className='label'>Annual Total SSI Cost</label>
	          			<Dependent 
	          				name={'annualTotalSSICost' + percentage}
	          				value= {Math.ceil(cv.totalAnnualCases * (cv.SSIrate / 100) * cv.numberORs * cv.averageCaseCost * (1-(reductionValues[index] / 100)))}
	          				prefix= "$"
	          			/>
	          			<label className='label'>SSIs Prevented</label>
	          			<Dependent
	          				name={"SSIsPrevented"+percentage}
	          				value = {
	          					Math.ceil(cv.totalAnnualCases * (cv.SSIrate / 100) * cv.numberORs* (reductionValues[index] / 100))
	          				}
	          			/>
	          			<label className='label'>Annual Savings</label>
	          			<Dependent
	          				name={"TotalAnnualSavings"+percentage}
	          				value = {Math.ceil(cv.totalAnnualCases * (cv.SSIrate / 100) * cv.numberORs * cv.averageCaseCost * (reductionValues[index] / 100))}
	          			/>
	          			<label className='label'>ROI</label>
	          			<Dependent
	          				name={"ROI"+percentage}
	          				value = {
	          					(12*250000/
	          					Math.ceil(cv.totalAnnualCases * (cv.SSIrate / 100) * cv.numberORs * cv.averageCaseCost * (reductionValues[index] / 100)))
	          					.toFixed(1)
	          				}
	          			/>
	          			<label className='label'>Future Savings</label>
	          			<Dependent
	          				name={'futureSavings'+percentage}
	          				value={
	          					20
	          					*
	          					Math.ceil(cv.totalAnnualCases * (cv.SSIrate / 100) * cv.numberORs * cv.averageCaseCost * (reductionValues[index] / 100))
	          				}
	          			/>


	          		</div>
	          	)
	          })}

	        </div>
      </div>
		)
	}
}