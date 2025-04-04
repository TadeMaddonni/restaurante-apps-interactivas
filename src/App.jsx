import { Button } from "./components/ui/button";
import Header from "./components/common/Header.jsx";
import Title from "./components/ui/title.jsx";
import { Card } from "./components/ui/card";

function App() {
	return (
		<>
			<main className="flex flex-col gap-4  justify-start min-h-screen p-4 bg-background">
				<Header />
				<div className="flex gap-2">
					<h1 className="font-bold text-3xl font-display" >Restaurante App</h1>
					<h1 className="font-bold text-3xl " >Restaurante App</h1>
				</div>
				<Title text="Restaurante app" className={"font-display"}/>
			</main>
		</>
	);
}

export default App;
