import React, { Component } from 'react';
import {Field} from 'redux-form';
import CustomInput from './customInput.js';
import Dependent from './dependent.js';
import surgicair from './assets/surgicair.png'

export default class Results extends Component {
	render() {
		var cv = this.props.customValues;
		const reductionValues = [cv.column15SSIreduction,cv.column30SSIreduction,cv.column45SSIreduction];
		return(
		<div className='results'>
	        <h1 style={{"font-weight":"normal", "margin-bottom":"40px"}} className="align-left"> Your Results </h1>
	        <div className='row'>
	          <div className='five-column assumptions'>
	            <h3 className='green'> Assumptions </h3>
	            <div className='container bg-green small-input'>
	              <label className='label large white'>SSI Rate </label>
	              <Field name='SSIrate' component={CustomInput}  suffix='%' />
	            </div>
	            <div className='container bg-green'>
	              <label className='label white'>Average SSI Case Cost Per O.R.</label>
	              <Field name='averageCaseCost' component={CustomInput} prefix='$' />
	            </div>
	            <div className='container bg-green'>
	              <label className='label white'>Number of O.R.s</label>
	              <Field name='numberORs' component={CustomInput} />
	            </div>
	          </div>
	        <div className='five-column cla'>
	            <h3 className='black' style={{"line-height":"27px"}}>Compliant<br /> Laminar Airflow</h3>
	            <div class='container'>
		            <p className='white bg-gray cla-intro'>
		                Complaint Laminar Airflow is what your O.R. has if it doesn't have SurgicAir Zero
		            </p>
		            <div className='dependent large-value'>
			            <label className='label '>Number of SSIs</label>
			            <Dependent 
							name='numberSSIs' 
							value = {Math.ceil(cv.totalAnnualCases * (cv.SSIrate / 100) * cv.numberORs)} 
						  />
					</div>
					<div className='dependent'>
			            <label className='label'>Annual Total SSI Cost</label>
			            <Dependent 
			            	name='CLAannualTotalSSICost' 
			            	value = {Math.ceil(cv.totalAnnualCases * (cv.SSIrate / 100) * cv.numberORs * cv.averageCaseCost)} 
			            	prefix = '$' 
			            />
			        </div>
		         </div>
	         </div>
	          {[15,30,45].map(function(percentage, index){

	          	return (
	          		<div className='five-column' key={index}>
	          			<img src={surgicair} alt="SurgicAir Zero Logo" className='surgicair-logo'/>
	          			<div className='container reduction'>
	          				<div class='rate bg-blue'>
			          			<label className='label white'>Enter SSI Reduction Rate</label>
			          			<Field name={"column" + percentage + "SSIreduction"} component={CustomInput} suffix="%" />
			          		</div>
			          		<div class='section'>
			          			<div className='dependent large-value'>
				          			<label className='label'>Number of SSIs</label>
				          			<Dependent
				          				name={'numberSSIs'+percentage}
				          				value={Math.ceil(cv.totalAnnualCases * (cv.SSIrate / 100) * cv.numberORs* (1-(reductionValues[index] / 100)))}
				          			/>
				          		</div>
				          		<div className='dependent'>
				          			<label className='label'>Annual Total SSI Cost</label>
				          			<Dependent 
				          				name={'annualTotalSSICost' + percentage}
				          				value= {Math.ceil(cv.totalAnnualCases * (cv.SSIrate / 100) * cv.numberORs * cv.averageCaseCost * (1-(reductionValues[index] / 100)))}
				          				prefix= "$"
				          			/>
			          			</div>
			          		</div>
			          		<div class='section'>
			          			<div className='dependent'>
				          			<label className='label'>SSIs Prevented</label>
				          			<Dependent
				          				name={"SSIsPrevented"+percentage}
				          				value = {
				          					Math.ceil(cv.totalAnnualCases * (cv.SSIrate / 100) * cv.numberORs* (reductionValues[index] / 100))
				          				}
				          			/>
			          			</div>
			          			<div className='dependent'>
				          			<label className='label'>Annual Savings</label>
				          			<Dependent
				          				name={"TotalAnnualSavings"+percentage}
				          				value = {Math.ceil(cv.totalAnnualCases * (cv.SSIrate / 100) * cv.numberORs * cv.averageCaseCost * (reductionValues[index] / 100))}
				          			/>
				          		</div>
				          	</div>
				          	<div class='section'>
			          			<div className='dependent roi'>
				          			<label className='label'>ROI</label>
				          			<div className='circle'>
					          			<Dependent
					          				name={"ROI"+percentage}
					          				value = {
					          					(12*250000/
					          					Math.ceil(cv.totalAnnualCases * (cv.SSIrate / 100) * cv.numberORs * cv.averageCaseCost * (reductionValues[index] / 100)))
					          					.toFixed(1)
					          				}
					          			/>
					          			<span className='months'>months</span>
					          		</div>
				          		</div>
			          			<div className='dependent'>
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
				          	</div>
			          	</div>
	          		</div>
	          	)
	          })}

	        </div>
      </div>
		)
	}
}