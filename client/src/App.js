//import logo from './logo.svg';
import React, {Component} from 'react';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import{ withStyles } from '@material-ui/core/styles';


const styles=theme=>({
  root:{
    width:'100%',
    marginTop:theme.spacing.unit*3,
    overflowX:"auto"
  },
  table:{
    minWidth:1080
  },
  progress:{
    margin:theme.spacing.unit*2
  }
})

class App extends Component {
 
  constructor(props){
    super(props);
    this.state={
      customers:'',
      completed:0
    }
  }

  stateRefresh=()=>{
    this.setState({
      customers:'',
      completed:0
    });
    this.callApi()
    .then(res=>this.setState({customers:res}))
    .catch(err=>console.log(err));
  }

  componentDidMount(){
    this.timer=setInterval(this.progress,20);
    this.callApi()
    .then(res=>this.setState({customers:res}))
    .catch(err=>console.log(err));
  }
  callApi=async()=>{
    const response=await fetch('/api/customers');
    const body=await response.json();
    return body;
  }

  progress=()=>{
    const {completed}=this.state;
    this.setState({completed:completed>=100 ? 0: completed+1});
  }
  render(){
  const { classes }=this.props;
  return (
    <div>
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
      this.state.customers ? this.state.customers.map(a => {
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
      }):
      <TableRow>
        <TableCell colSpan="6" align="center">
              <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>    
        </TableCell>
      </TableRow>
    }
    </TableBody>
    </Table>
  </Paper>
  <CustomerAdd stateRefresh={this.stateRefresh}/>
  </div>
  );
}
}
export default withStyles(styles)(App);
