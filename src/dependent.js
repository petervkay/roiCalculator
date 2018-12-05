import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import Modal from 'react-modal';

export default class Dependent extends Component {

	constructor(props) {
    	super(props);

      this.state = {
        showModal : false
      }

      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
  
    }

  /* modals */
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }
	render() {
		const customModalStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          width                 : '70%',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          border                : "4px solid #666",
          borderWidth           : "5px",
          padding               : "40px"
        }
      };

		return(
			<div className='dependent-value'>
				<div>
					<NumberFormat
						value={this.props.value} 
						suffix = {this.props.suffix}
						prefix = {this.props.prefix}
						displayType = "text"
						thousandSeparator = {true}
					/>
					{this.props.tooltip && <span className='tooltip trigger' onClick={this.handleOpenModal}><span>?</span></span>}
                	{this.props.tooltip && 
                  	<Modal 
                    	isOpen={this.state.showModal}
                    	onAfterOpen={this.afterOpenModal}
                    	onRequestClose={this.handleCloseModal}
                    	shouldCloseOnOverlayClick={true}
                    	style = {customModalStyles}
                 	>
                   		<p>{this.props.tooltip}</p>
                  	</Modal>
                  }
				</div>
			</div>
		)
	}
}