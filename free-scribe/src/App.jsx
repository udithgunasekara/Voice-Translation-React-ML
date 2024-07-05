import HomePage from "./components/HomePage"
import Header from "./components/Header"


function App() {
 
  return (
    <div className= 'flex flex-col  max-w-[1000px] max-auto w-full'>
      <section className = 'min-h-screen flex flex-col'>
        <Header></Header>
        <HomePage></HomePage>

        </section>
     
    
    </div>
  )
}

export default App
