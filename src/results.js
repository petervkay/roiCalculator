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
	        <h1 className="align-left"> Your Results </h1>
	        <div className='row'>
	          <div className='five-column assumptions'>
	            <h3 className='green'> Assumptions </h3>
	            <div className='container bg-green small-input'>
	              <label className='label large white'>SSI Rate </label>
	              <Field name='SSIrate' component={CustomInput}  suffix='%' decimal={true} maximum={100} minimum={3} 
	              	warningMessage= "Are you sure that is realistic?"
	              	tooltip = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu mauris sed felis tincidunt pretium quis eu enim. Phasellus posuere mi in faucibus rhoncus. Vivamus congue eleifend rhoncus. Nullam congue finibus pulvinar. Suspendisse gravida ornare mauris ut ultricies. Sed vestibulum id nibh sed tristique. Proin id feugiat erat, scelerisque euismod nunc."
	              />
	            </div>
	            <div className='container bg-green'>
	              <label className='label white'>Average SSI Case Cost Per O.R.</label>
	              <Field name='averageCaseCost' component={CustomInput} prefix='$' maximum={999999} minimum={10000}
	              	warningMessage = "Are you sure that is realistic?"
	              	tooltip = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu mauris sed felis tincidunt pretium quis eu enim. Phasellus posuere mi in faucibus rhoncus. Vivamus congue eleifend rhoncus. Nullam congue finibus pulvinar. Suspendisse gravida ornare mauris ut ultricies. Sed vestibulum id nibh sed tristique. Proin id feugiat erat, scelerisque euismod nunc."
	              />
	            </div>
	            <div className='container bg-green'>
	              <label className='label white'>Number of O.R.s</label>
	              <Field name='numberORs' component={CustomInput} maximum={9999} />
	            </div>
	          </div>
	        <div className='five-column cla'>
	            <h3 className='gray' style={{"lineHeight":"27px"}}>Compliant<br /> Laminar Airflow</h3>
	            <div className='container'>
		            <p className='white bg-gray cla-intro'>
		                This is what your O.R. has if it doesn't have SurgicAir Zero
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
	          		<div className={"five-column reduction"+percentage} key={index}>
	          			<img src="https://precisionairpr.wpengine.com/wp-content/uploads/2018/11/roi_logo.png" alt="SurgicAir Zero Logo" className='surgicair-logo'/>
	          			<div className="container reduction">
	          				<div className='rate bg-blue'>
			          			<label className='label white'>Enter SSI Reduction Rate</label>
			          			<Field name={"column" + percentage + "SSIreduction"} component={CustomInput} suffix="%" decimal={true} maximum={100}/>
			          		</div>
			          		<div className='section'>
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
			          		<div className='section'>
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
				          				tooltip ="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu mauris sed felis tincidunt pretium quis eu enim. Phasellus posuere mi in faucibus rhoncus. Vivamus congue eleifend rhoncus. Nullam congue finibus pulvinar. Suspendisse gravida ornare mauris ut ultricies. Sed vestibulum id nibh sed tristique. Proin id feugiat erat, scelerisque euismod nunc."
				          				prefix = "$"
				          			/>
				          		</div>
				          	</div>
				          	<div className='section'>
			          			<div className='dependent roi'>
				          			<label className='label'>Payback</label>
				          			<div className='circle'>
					          			<Dependent
					          				name={"ROI"+percentage}
					          				value = {
					          					(12*(250000 * cv.numberORs)/
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
				          				tooltip = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu mauris sed felis tincidunt pretium quis eu enim. Phasellus posuere mi in faucibus rhoncus. Vivamus congue eleifend rhoncus. Nullam congue finibus pulvinar. Suspendisse gravida ornare mauris ut ultricies. Sed vestibulum id nibh sed tristique. Proin id feugiat erat, scelerisque euismod nunc."
				          				prefix = "$"
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