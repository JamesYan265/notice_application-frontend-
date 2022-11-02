import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthLayout from './components/layout/AuthLayout';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';

//import material UI 的 Theme Provider 快速提供主題
import { createStyles, createTheme, ThemeProvider} from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import { blue } from '@mui/material/colors';
import Memo from './pages/Memo';



function App() {

  const theme = createTheme({
    palette : { primary : blue },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      {/* 設定React的網頁路徑 */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthLayout />} >
            {/* 與AuthLayout共通,所以成為其子層 */}
            <Route path='login' element={<Login />} ></Route>
            <Route path='register' element={<Register />} ></Route>
          </Route>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<Home/>} />
            <Route path="memo" element={<Home/>} />
            <Route path="memo/:memoId" element={<Memo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
