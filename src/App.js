import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import { useEffect, useState } from 'react';

function App() {

  const [toasterData, setToasterData] = useState(null);

  useEffect(() => {
    if (toasterData) setTimeout(() => setToasterData(null), 3000);
  }, [toasterData])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setToasterData={setToasterData} />} />
          <Route path="/home" element={<Home setToasterData={setToasterData} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      {toasterData ? <div className={`toaster-cont ${toasterData ? "visible-toaster" : ""}`}>
        <div className={`${toasterData.type === "success" ? "toaster-success" : "toaster-error"}`}>{toasterData.msg}</div>
      </div> : null}
    </>
  );
}

export default App;
