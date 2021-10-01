//import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer';

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
function App() {
  return (
    <div>
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
  </div>
  );
}

export default App;
