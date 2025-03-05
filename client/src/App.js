import React, {useState, useEffect} from 'react';
import { Table, TableBody, TableHead, TableRow, TableCell, Paper, CircularProgress } from '@mui/material';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';

const styles = {
  root: {
    width: "100%",
    marginTop: 24, // theme.spacing.unit * 3 대신 직접 숫자 사용
    overflowX: "auto",
  },
  table: {
    minWidth: 1080, // 철자 수정
  },
};

function App() {
  const [customers, setCustomers] = useState([]); // useState로 상태 관리
  const [progress, setProgress] = useState(0); // useState로 상태 관리

  useEffect(() => {
    const callApi = async () => {
      try {
        const response = await fetch("/api/customers");
        const body = await response.json();
        setCustomers(body); // useState로 상태 업데이트
      } catch (err) {
        console.error(err);
      }
    };
    const interval = setInterval(()=>{
      setProgress((prevProgress)=> {
        if(prevProgress >= 100) {
          return 0;
        }
        return prevProgress + 10;
      });
    },200);
    

    callApi();

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <div>
    <Paper sx={{ width: 1080, margin: "auto", overflowX: "auto" }}> {/* ✅ 최신 MUI 스타일 */}
      <Table sx={{ minWidth: 1080 }}> {/* ✅ 최신 MUI 스타일 */}
        <TableHead><TableRow><TableCell>번호</TableCell><TableCell>이미지</TableCell><TableCell>이름</TableCell><TableCell>생일</TableCell><TableCell>성별</TableCell><TableCell>직업</TableCell></TableRow></TableHead>
        <TableBody>
          {customers.length > 0 ? (
            customers.map((c) => (
              <Customer
                key={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                sex={c.sex}
                job={c.job}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="6" align="center">
                <CircularProgress variant="determinate" value={progress} />
                Loading...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
    <CustomerAdd/>
    </div>
  );
}

export default App;
