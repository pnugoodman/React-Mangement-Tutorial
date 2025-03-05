import React from "react";
import axios from 'axios';

class CustomerAdd extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            file:null,
            userName:'',
            birthday:'',
            sex:'',
            job:'',
            fileName:''
        }
    }

    handleFormSubmit = (e)=>{
        console.log("추가하기 시작!");
        e.preventDefault()
        this.addCustomer()
            .then((response)=>{
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error adding customer:", error);
            });

        this.setState({
                file: null,
                userName: '',
                birthday: '',
                sex: '',
                job: '',
                fileName: '',
        })

        window.location.reload();
        console.log("고객 추가하기 끝!");
        
    }

    handleFileChange = (e) =>{
        this.setState({
            file: e.target.files[0],
            fileName: e.target.files[0]?.name || ''
        })
    }

    handleValueChange = (e) =>{
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

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

    render(){
        return(
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                <div>
                    <label>프로필 이미지: </label>
                    <input type="file" name="file" onChange={this.handleFileChange} />
                </div>
                <div>
                    <label>이름: </label>
                    <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} />
                </div>
                <div>
                    <label>생년월일: </label>
                    <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} />
                </div>
                <div>
                    <label>성별: </label>
                    <input type="text" name="sex" value={this.state.sex} onChange={this.handleValueChange} />
                </div>
                <div>
                    <label>직업: </label>
                    <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} />
                </div>
                <button type="submit">추가하기</button>
            </form>
        )
    }
}

export default CustomerAdd;