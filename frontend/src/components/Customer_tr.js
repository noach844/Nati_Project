import React from 'react';

class Customer extends React.Component{    
    state = {
        id: this.props.details[this.props.details.length-2],
        prods: this.props.details[this.props.details.length-1],
        details: this.props.details.slice(0,this.props.details.length-2)
    }    

    handleclick = () => {
        console.log(this.state.id)
    };

    render(){          
        return(
            <tr onClick={this.handleclick}>
                {this.state.details.map(value => <td>{value}</td>)}
            </tr>                             
        )
    }
}

export default Customer;
