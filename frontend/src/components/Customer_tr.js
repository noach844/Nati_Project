import React from 'react';

class Customer extends React.Component{    

    handleclick = () => {
        console.log("omer")
    };

    render(){          
        return(
            <tr onClick={this.handleclick}>
                {this.props.details.map(value => <td>{value}</td>)}
            </tr>                             
        )
    }
}

export default Customer;
