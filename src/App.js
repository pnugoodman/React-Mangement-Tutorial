import { Table, TableBody, TableHead, TableRow, TableCell, Paper } from '@mui/material';
import './App.css';
import Cutstomer from './components/Customer';

const styles = theme => ({
  root:{
    width:'100%',
    marginTop: theme.spcig.unit *3,
    overflowX:"auto"
  },
  table: {
    minWiddth: 1080
  }
})

const customers = [
  {
    'id':'1',
    'image': 'https://placeimag.com/64/64/1',
    'name':'홍길동', 
    'birthday':'01030012266',
    'sex':'남자',
    'job':'대학생',
  },
  {
    'id':'2',
    'image': 'https://placeimag.com/64/64/2',
    'name':'김나리', 
    'birthday':'01030012267',
    'sex':'여자',
    'job':'직장',
  },
  {
    'id':'1',
    'image': 'https://placeimag.com/64/64/3',
    'name':'이기리', 
    'birthday':'01030012268',
    'sex':'남자',
    'job':'군인',
  }
]

function App() {
  //const { classes} = this.props;
  return (
    <Paper> 
      <Table>
        <TableHead><TableRow><TableCell>번호</TableCell><TableCell>이미지</TableCell><TableCell>이름</TableCell><TableCell>생일</TableCell><TableCell>성별</TableCell><TableCell>직업</TableCell></TableRow></TableHead>
        <TableBody>
          {customers.map(c => {return(<Cutstomer key = {c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} sex={c.sex} job={c.job} /> ) }) }        
        </TableBody>
      </Table>
    </Paper>
  );
}
export default App;
