import React from 'react';
import Customer from './Customer_tr';

class Customer_Mid extends React.Component{
    render(){                
        return(            
            this.props.c_lst.map(c => {                
                return <Customer prods={this.props.prods} toggle={this.props.toggle} load={this.props.load} details = {Object.values(c)}/>
            })
        )
    }
}

export default Customer_Mid;