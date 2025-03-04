import React from "react";

class Cutstomer extends React.Component{
    render(){
        return(
            <div>
                <CustomerProfile id = {this.props.id} image = {this.props.image} name={this.props.name}/>
                <CustomerInfo birthday = {this.props.birthday} sex = {this.props.sex} job={this.props.job}/>
            </div>
        )
    }
}

class CustomerProfile extends React.Component{
    render(){
        return(
            <div>
                <img src={this.props.image} alt="profile image"/>
                <h2>{this.props.name}({this.props.id})</h2>
            </div>
        )
    }
}

class CustomerInfo extends React.Component{
    render(){
        return(
            <div>
                <p>{this.props.birthday}</p>
                <p>{this.props.sex}</p>
                <p>{this.props.job}</p>
            </div>
        )
    }
}

export default Cutstomer;