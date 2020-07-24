import React from 'react';
import Customer from './Customer_tr';

class Customer_Mid extends React.Component{
    render(){        
        return(            
            this.props.c_lst.map(c => {
                return <Customer details = {Object.values(c)}/>
            })
        )
    }
}

export default Customer_Mid;