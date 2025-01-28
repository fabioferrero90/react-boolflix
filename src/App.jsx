import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import { DataProvider } from './context/DataContext'

const App = () => {

  return (
    <>
    <DataProvider>
      <Header />
      <Main />
    </DataProvider>
   </>
  )
}

export default App