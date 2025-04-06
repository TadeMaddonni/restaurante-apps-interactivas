import Header from "./components/common/Header.jsx";
import Hero from "./components/sections/home/Hero";
import SelectedDishes from "./components/sections/home/Selected-dishes";
import OurEnvironment  from "./components/sections/home/our-enviroment.jsx";


function App() {
	return (
		<>
			<Header />
			<main className="flex flex-col gap-4  justify-start min-h-screen  bg-background">
				<Hero />
				<OurEnvironment/>	
				<SelectedDishes />
			</main>
		</>
	);
}

export default App;
