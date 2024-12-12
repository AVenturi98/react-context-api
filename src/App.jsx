import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import DefaultLayout from './layout/DefaultLayout'
import Home from './pages/Home'
import Main from "./components/main/Main"
import Salato from './pages/Salato'
import Dolce from './pages/Dolce'
import BlankLayout from './layout/BlankLayout'
import Lost from './layout/Lost'
import Dettails from './pages/Dettails'
import GlobalContext from './context/context.js'


function App() {
  const [categories] = useState(['Dolce', 'Salato'])

  return (
    <>
      <GlobalContext.Provider value={{ categories: categories }} >
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path='/' element={<Home />}></Route>
              <Route path='/list'>
                <Route index element={<Main />}></Route>
                <Route path=':id' element={<Dettails />}></Route>
              </Route>
              <Route path='/salt' element={<Salato />}></Route>
              <Route path='/sweet' element={<Dolce />}></Route>
            </Route>
            <Route element={<BlankLayout />}>
              <Route path='*' element={<Lost />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider >
    </>
  )
}

export default App