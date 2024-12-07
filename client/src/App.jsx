import React from 'react'

import { Routes, Route } from 'react-router-dom';
import HuaweiPage from "./pages/HuaweiPage";
import HuaweiScenario from './pages/HuaweiScenario';
import HuaweiExecutionPage from './pages/HuaweiExecutionPage'
import HuaweiAIPage from './pages/HuaweiAIPage'

const App = () => {
  return (
    <Routes>

        <Route path='/' element={<HuaweiPage />} /> HuaweiScenario
        <Route path='/scenario' element={<HuaweiScenario />} />
        <Route path='/execute' element={<HuaweiExecutionPage />} />
        <Route path='/generate' element={<HuaweiAIPage />} />
        
      </Routes>
  )
}

export default App