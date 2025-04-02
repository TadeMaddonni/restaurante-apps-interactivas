import { Button } from "./components/ui/button";
import Header from "./components/common/Header.jsx";
import HeaderTomi from "./components/common/Header-tomi";
import { Card } from "./components/ui/card";

function App() {
	return (
		<>
			<main className="flex flex-col gap-4  justify-start min-h-screen p-4 bg-background">
				<Header />
				<HeaderTomi />
				<h1 className="font-bold text-3xl">Restaurante App</h1>
			</main>
		</>
	);
}

export default App;
