import { Button } from "./components/ui/button"
import  Header  from "./components/ui/Header.jsx"
import { Card } from "./components/ui/card"


function App() {
  return (
    <>
      <main className="flex flex-col gap-4 items-center justify-center min-h-screen p-4 bg-background">
      <Header />
        <h1 className="font-bold text-3xl">Restaurante App</h1>
      </main>
    </>
  )
}

export default App
