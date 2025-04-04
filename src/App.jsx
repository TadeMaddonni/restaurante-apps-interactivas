import { Button } from "./components/ui/button";
import Header from "./components/common/Header.jsx";
import Title from "./components/ui/title.jsx";
import { Card } from "./components/ui/card";
import Hero from "./components/sections/home/Hero";
import ProductList from "./components/sections/home/ProductList";

function App() {
	return (
		<>
			<Header />
			<main className="flex flex-col gap-4  justify-center items-center min-h-screen  bg-background">
				<Hero />
				<ProductList />
			</main>
		</>
	);
}

export default App;
