import React from 'react';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import A001A0001 from './pages/A001A0001/view/A001A0001';
import A001A0002 from './pages/A001A0002/view/A001A0002';
import A001A0003 from './pages/A001A0003/view/A001A0003';
import A001A0004 from './pages/A001A0004/view/A001A0004';
import A001A0005 from './pages/A001A0005/view/A001A0005';
import A001A0006 from './pages/A001A0006/view/A001A0006';
import A001A0007 from './pages/A001A0007/view/A001A0007';
import A001A0008 from './pages/A001A0008/view/A001A0008';
import A001A0009 from './pages/A001A0009/view/A001A0009';
import A001A0010 from './pages/A001A0010/view/A001A0010';
import A001A0011 from './pages/A001A0011/view/A001A0011';
import A002A0001 from './pages/A002A0001/view/A002A0001';

function App() {
  return (
    <Router>
      <Routes> {/* 여기서 Routes 컴포넌트를 사용합니다. */}
        {/* 경로와 컴포넌트 이름이 일치하는지 확인하세요. */}
        <Route path="/A001A0001" element={<A001A0001 />} />
        <Route path="/A001A0002" element={<A001A0002 />} />
        <Route path="/A001A0003" element={<A001A0003 />} />
        <Route path="/A001A0004/:storeId" element={<A001A0004 />} />
        <Route path="/A001A0005" element={<A001A0005 />} />
        <Route path="/A001A0006" element={<A001A0006 />} />
        <Route path="/A001A0007" element={<A001A0007 />} />
        <Route path="/A001A0008" element={<A001A0008 />} />
        <Route path="/A001A0009" element={<A001A0009 />} />
        <Route path="/A001A0010" element={<A001A0010 />} />
        <Route path="/A001A0011" element={<A001A0011 />} />
        <Route path="/A002A0001" element={<A002A0001 />} />
        {/* 다른 라우트들... */}
      </Routes>
    </Router>
  );
}
export default App;