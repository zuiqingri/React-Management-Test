//import logo from './logo.svg';
import React, {Component} from 'react';
import './App.css';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import{ withStyles } from '@material-ui/core/styles';


const styles=theme=>({
  root:{
    width:'100%',
    marginTop:theme.spacing.unit*3,
    overflowX:"auto"
  },
  table:{
    minWidth:1080
  }
})
const customers=[
  {
  'id': 1,
  'image':'https://placeimg.com/64/64/1',
  'name':'LimGokJong',
  'birthday':'132456',
  'gender':'man',
  'job':'Student'
},
{
  'id': 2,
  'image':'https://placeimg.com/64/64/2',
  'name':'LiSunSin',
  'birthday':'466213',
  'gender':'man',
  'job':'Programming'
},
{
  'id': 3,
  'image':'https://placeimg.com/64/64/3',
  'name':'HongGilDong',
  'birthday':'215434',
  'gender':'man',
  'job':'Designer'
}
]
class App extends Component {
  render(){
  const { classes }=this.props;
  return (
    <Paper className={classes.root}>
       <Table className={classes.table}>
         <TableHead>
           <TableRow>
             <TableCell>No</TableCell>
             <TableCell>Image</TableCell>
             <TableCell>Name</TableCell>
             <TableCell>Birthday</TableCell>
             <TableCell>Gender</TableCell>
             <TableCell>Job</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
      {
      customers.map(a => {
        return(
          <Customer
          key={a.id}
          id={a.id}
          image={a.image}
          name={a.name}
          birthday={a.birthday}
          gender={a.gender}
          job={a.job}
          />
        );
      })
    }
    </TableBody>
    </Table>
  </Paper>
  );
}
}
export default withStyles(styles)(App);
