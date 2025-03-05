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
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // 고객 데이터 불러오기
  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/customers");
      const body = await response.json();
      setCustomers(body);
    } catch (err) {
      console.error("Error fetching customers:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트가 처음 마운트될 때 고객 목록 불러오기
  useEffect(() => {
    fetchCustomers();
  }, []);
  
  // 로딩 상태 Progress 애니메이션
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // 고객 추가 함수
  const addCustomer = (newCustomer) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  };


  return (
    <div>
      <Paper sx={{ width: 1080, margin: "auto", overflowX: "auto" }}>
        <Table sx={{ minWidth: 1080 }}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
              <TableCell>삭제여부</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan="7" align="center">
                  <CircularProgress variant="determinate" value={progress} />
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              customers.map((c) => (
                <Customer
                  key={c.id}
                  id={c.id}
                  image={c.image}
                  name={c.name}
                  birthday={c.birthday}
                  sex={c.sex}
                  job={c.job}
                  stateRefresh={fetchCustomers} // 삭제 후 갱신 함수 전달
                />
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
      <CustomerAdd addCustomer={addCustomer} />
    </div>
  );
}

export default App;
