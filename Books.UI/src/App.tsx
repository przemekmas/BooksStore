import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout';
import AddBook from './Pages/AddBook';
import ViewBooks from './Pages/ViewBooks';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="addBook" element={<AddBook />} />
            <Route path="viewBooks" element={<ViewBooks />} />
          </Route>
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;