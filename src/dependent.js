import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format';

export default class Dependent extends Component {

	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div className='dependent-value'>
				<NumberFormat 
					suffix = {this.props.suffix}
					prefix = {this.props.prefix}
					displayType = "text"
					thousandSeparator = {true}
				/>
			</div>
		)
	}
}