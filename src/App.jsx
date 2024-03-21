import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import ArticleList from './components/ArticleList'

function App() {
 

  return (
   <ChakraProvider>
      <ArticleList  />
   </ChakraProvider>
  )
}

export default App
