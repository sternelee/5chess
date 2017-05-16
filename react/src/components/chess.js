import React, { Component } from 'react';

class Chess extends Component{
	render(){
		return(
			<span className={this.props.cnIndex} onClick={this.props.playChess.bind(this)}></span>
		)
	}
}

export default Chess;