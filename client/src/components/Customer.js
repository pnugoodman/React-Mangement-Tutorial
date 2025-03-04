import { TableCell, TableRow } from "@mui/material";
import React from "react";

class Cutstomer extends React.Component{
    render(){
        return(
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src = {this.props.image} alt="profile image" style={{ width: '64px', height: '64px' }}/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.sex}</TableCell>
                <TableCell>{this.props.job}</TableCell>
            </TableRow>
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