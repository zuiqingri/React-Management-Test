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

// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
// import { fade } from '@material-ui/core/styles/colorManipulator';
// import MenuIcon from '@material-ui/core/Menu';
// import SearchIcon from '@material-ui/core/Search';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';


const styles=theme=>({
  root:{
    width:'100%',
    minWidth:1080
  },
  menu:{
      marginTop:15,
      marginBottom:15,
      display:'flex',
      justifyContent:'center'
      },
  paper:{
    marginLeft:18,
    marginRight:18
  },
  progress:{
    margin:theme.spacing.unit*2
  },

  TableHead:{
    fontSize:'1.2rem'
  }
})

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



class App extends Component {
 
  constructor(props){
    super(props);
    this.state={
      customers:'',
      completed:0,
      searchKeyword:''
    }
  }

  stateRefresh=()=>{
    this.setState({
      customers:'',
      completed:0,
      searchKeyword:''
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

  handleValueChange=(e)=>{
    let nextState={};
    nextState[e.target.name]=e.target.value;
    this.setState(nextState);
  }

  render(){
  const filteredComponents=(data)=>{
    data=data.filter((c)=>{
      return c.name.indexOf(this.state.searchKeyword) > -1;
    });
    return data.map((c)=>{
      return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>
    });
  }
  const { classes }=this.props;
  const cellList=["No","Image","Name","Birthday","Gender","Job","Setting"];
  return (
    <div className={classes.root}>

      <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                  CUSTOM Management System
                </Typography>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    name="searchKeyword"
                    value={this.state.searchKeyword}
                    onChange={this.handleValueChange}
                  />
                </Search>
              </Toolbar>
            </AppBar>
          </Box>
          <div className={classes.menu}>
          <CustomerAdd stateRefresh={this.stateRefresh}/>
          </div>
    <Paper className={classes.paper}>
       <Table className={classes.table}>
         <TableHead>
           <TableRow>
             {
             /* <TableCell>No</TableCell>
             <TableCell>Image</TableCell>
             <TableCell>Name</TableCell>
             <TableCell>Birthday</TableCell>
             <TableCell>Gender</TableCell>
             <TableCell>Job</TableCell>
             <TableCell>Setting</TableCell> */
             
             cellList.map(c=>{
               return <TableCell className={classes.TableHead}>{c}</TableCell>
             })          
             }
           </TableRow>
         </TableHead>
         <TableBody>
      {this.state.customers?
          filteredComponents(this.state.customers):
              // this.state.customers ? this.state.customers.map(a => {
              //   return(
              //     <Customer stateRefresh={this.stateRefresh}
              //     key={a.id}
              //     id={a.id}
              //     image={a.image}
              //     name={a.name}
              //     birthday={a.birthday}
              //     gender={a.gender}
              //     job={a.job}
              //     />
              //   );
      <TableRow>
        <TableCell colSpan="6" align="center">
              <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>    
        </TableCell>
      </TableRow>
    }
    </TableBody>
    </Table>
  </Paper>

  </div>
  );
}
}
export default withStyles(styles)(App);
