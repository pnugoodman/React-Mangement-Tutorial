import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";

class CustomerDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        open: false,
    }
  }

  deleteCustomer = async (id) => {
    const url = `/api/customers/${id}`;

    try {
      await fetch(url, { method: "DELETE" });
      this.props.stateRefresh(); // 삭제 후 부모 컴포넌트에서 상태 갱신
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };
    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    }

    handleClose = () => {
        this.setState({
            open: false,
        });
    }
  render() {
    return (
      <div>
      <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
      <Dialog open = {this.state.open} onClose={this.handleClose}>
        <DialogTitle onClose={this.handleClose}>
          삭제 경고
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            선택한 고객 정보가 삭제됩니다.
          </Typography>

        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={(e)=> {this.deleteCustomer(this.props.id)}}>삭제</Button>
          <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>

        </DialogActions>
      </Dialog>
      </div>
    );
  }
}

export default CustomerDelete;