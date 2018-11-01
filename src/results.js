import React, { Component } from 'react';
import {Field} from 'redux-form';
import CustomInput from './customInput.js';
import Dependent from './dependent.js';

export default class Results extends Component {
	render() {
		var cv = this.props.customValues;
		const reductionValues = [cv.column15SSIreductionValue,cv.column30SSIreductionValue,cv.column45SSIreductionValue];
		return(
		<div className='results'>
	        <h1> Your Results </h1>
	        <div className='row'>
	          <div className='five-column assumptions'>
	            <h3 className='green'> Assumptions </h3>
	            <div className='container green'>
	              <label className='label large'>SSI Rate </label>
	              <Field name='SSIrate' component={CustomInput} type='independent' defaultValue = '3.5' suffix='%'/>
	            </div>
	            <div className='container green'>
	              <label className='label'>Average SSI Case Cost Per O.R.</label>
	              <Field name='averageCaseCost' component={CustomInput} type='independent' defaultValue= '64500' prefix='$' />
	            </div>
	            <div className='container green'>
	              <label className='label'>Number of O.R.s</label>
	              <Field name='numberORs' component={CustomInput} type='independent' defaultValue= '1' />
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
						value = {Math.ceil(cv.totalAnnualCasesValue * (cv.SSIrateValue / 100) * cv.numberORsValue)} 
					  />
	}	            <label className='label'>Annual Total SSI Cost</label>
		            <Dependent 
		            	name='CLAannualTotalSSICost' 
		            	value = {Math.ceil(cv.totalAnnualCasesValue * (cv.SSIrateValue / 100) * cv.numberORsValue * cv.averageCaseCostValue)} 
		            	prefix = '$' 
		            />
	        	</div>
	         </div>
	          {[15,30,45].map(function(percentage, index){

	          	return (
	          		<div className='five-column' key={index}>
	          			<img src='/../../surgicair.png'/>
	          			<label className='label'>Enter SSI Reduction Rate</label>
	          			<Field name={"column" + percentage + "SSIreduction"} component={CustomInput} type='independent' defaultValue={percentage} suffix="%" />
	          			<label className='label'>Number of SSIs</label>
	          			<Dependent
	          				name={'numberSSIs'+percentage}
	          				value={Math.ceil(cv.totalAnnualCasesValue * (cv.SSIrateValue / 100) * cv.numberORsValue* (1-(reductionValues[index] / 100)))}
	          			/>
	          			<label className='label'>Annual Total SSI Cost</label>
	          			<Dependent 
	          				name={'annualTotalSSICost' + percentage}
	          				value= {Math.ceil(cv.totalAnnualCasesValue * (cv.SSIrateValue / 100) * cv.numberORsValue * cv.averageCaseCostValue * (1-(reductionValues[index] / 100)))}
	          				prefix= "$"
	          			/>
	          			<label className='label'>SSIs Prevented</label>
	          			<Dependent
	          				name={"SSIsPrevented"+percentage}
	          				value = {
	          					Math.ceil(cv.totalAnnualCasesValue * (cv.SSIrateValue / 100) * cv.numberORsValue* (reductionValues[index] / 100))
	          				}
	          			/>
	          			<label className='label'>Annual Savings</label>
	          			<Dependent
	          				name={"TotalAnnualSavings"+percentage}
	          				value = {Math.ceil(cv.totalAnnualCasesValue * (cv.SSIrateValue / 100) * cv.numberORsValue * cv.averageCaseCostValue * (reductionValues[index] / 100))}
	          			/>
	          			<label className='label'>ROI</label>
	          			<Dependent
	          				name={"ROI"+percentage}
	          				value = {
	          					(12*250000/
	          					Math.ceil(cv.totalAnnualCasesValue * (cv.SSIrateValue / 100) * cv.numberORsValue * cv.averageCaseCostValue * (reductionValues[index] / 100)))
	          					.toFixed(1)
	          				}
	          			/>
	          			<label className='label'>Future Savings</label>
	          			<Dependent
	          				name={'futureSavings'+percentage}
	          				value={
	          					20
	          					*
	          					Math.ceil(cv.totalAnnualCasesValue * (cv.SSIrateValue / 100) * cv.numberORsValue * cv.averageCaseCostValue * (reductionValues[index] / 100))
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