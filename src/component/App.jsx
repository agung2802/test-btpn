// import './App.css'
import CreateContact from './CreateContact'
import ListContact from './ListContact'

function App() {
  return (
    <>
      <Header />
      <div className='w-full text-right'>
        <button className="btn mt-16 mr-5 text-white" style={{backgroundColor: "#0a2463"}} data-bs-toggle="modal" data-bs-target="#exampleModal">
            Create Contact
        </button>
      </div>
          <ListContact />
      <CreateContact />
    </>
  )
}

function Header(){
  return <h1 className="text-3xl font-bold text-center text-white w-full fixed h-12 z-10" style={{backgroundColor: "#3e92cc"}}>
    Hello world!
  </h1>;
}

export default App
