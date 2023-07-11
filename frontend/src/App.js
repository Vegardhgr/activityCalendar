import NavBar from './components/navBar/navigationBar';
import Router from './router/router';

function App() {
  return (
    <div style={{backgroundColor: "#e6ffe6"}}>
        <NavBar/>
        <div class="d-flex justify-content-center">
          <Router/>
        </div>
    </div>
  );
}

export default App;
