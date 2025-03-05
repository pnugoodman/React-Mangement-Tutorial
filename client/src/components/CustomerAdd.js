import React from "react";
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { styled } from "@mui/material/styles"; // ✅ styled 사용

// ✅ MUI 스타일 적용 (withStyles 대체)
const HiddenInput = styled("input")({
    display: "none",
});

class CustomerAdd extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            file:null,
            userName:'',
            birthday:'',
            sex:'',
            job:'',
            fileName:'',
            open: false
        }
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log("추가하기 시작!");

        try {
            const response = await this.addCustomer();
            console.log("서버 응답 데이터:", response.data); // 서버 응답 확인

            // 서버에서 반환된 데이터 확인
            const newCustomer = {
                id: response.data.id, // ID가 없으면 임시 ID 사용
                image: response.data.image || "", // 이미지 URL이 없으면 빈 값
                name: this.state.userName,
                birthday: this.state.birthday,
                sex: this.state.sex,
                job: this.state.job
            };

            this.props.addCustomer(newCustomer); // 부모(App.js)로 데이터 전달

            // 입력 필드 초기화
            this.setState({
                file: null,
                userName: '',
                birthday: '',
                sex: '',
                job: '',
                fileName: '',
                open: false,
            });

        } catch (error) {
            console.error("Error adding customer:", error);
        }
    };

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.files[0]?.name || ''
        });
    };

    handleValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    addCustomer = ()=>{
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('sex', this.state.sex);
        formData.append('job', this.state.job);

        const config = {
            headers:{
                'content-type':'multipart/form-data'
            }
        };
        
        return axios.post(url, formData, config);
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            sex: '',
            job: '',
            fileName: '',
            open: false,
        });
    }

    render(){
        const {classes} = this.props;
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                    <HiddenInput accept="image/*" id="raised-button-file" type="file" onChange={this.handleFileChange} />
                        <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" component="span">
                            {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                        </Button>
                        </label>
                        <TextField label = "이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} />
                        <TextField label = "생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} />
                        <TextField label = "성별" type="text" name="sex" value={this.state.sex} onChange={this.handleValueChange} />
                        <TextField label = "직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange} />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>

                </Dialog>
            </div>
        )
    }
}

export default CustomerAdd;