import { Button } from "./components/ui/button"
import { NavigationMenu } from "./components/ui/navigation-menu.jsx"
import { Card } from "./components/ui/card"


function App() {
  return (
    <>
      <main className="flex flex-col gap-4 items-center justify-center min-h-screen p-4 bg-background">
      <NavigationMenu />
        <h1 className="font-bold text-3xl">Restaurante App</h1>
      </main>
    </>
  )
}

export default App
