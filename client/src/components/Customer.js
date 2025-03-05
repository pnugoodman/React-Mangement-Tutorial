import { TableCell, TableRow } from "@mui/material";
import React from "react";
import CustomerDelete from "./CustomerDelete";

class Customer extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell>
                    <img src={this.props.image} alt="profile" style={{ width: '64px', height: '64px' }} />
                </TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.sex}</TableCell>
                <TableCell>{this.props.job}</TableCell>
                <TableCell>
                    <CustomerDelete 
                        id={this.props.id} 
                        stateRefresh={this.props.stateRefresh} // ✅ 부모(App.js)에서 받은 새로고침 함수 전달
                    />
                </TableCell>
            </TableRow>
        );
    }
}

export default Customer;