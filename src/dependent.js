import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

export default class Dependent extends Component {

	render() {
		return(
			<div className='dependent-value'>
				<NumberFormat
					value={this.props.value} 
					suffix = {this.props.suffix}
					prefix = {this.props.prefix}
					displayType = "text"
					thousandSeparator = {true}
				/>
			</div>
		)
	}
}