import Header from "./components/common/Header.jsx";
import Hero from "./components/sections/home/Hero";
import SelectedDishes from "./components/sections/home/Selected-dishes";
import OurEnvironment  from "./components/sections/home/our-enviroment.jsx";
import Location from "./components/sections/home/Location.jsx";
import Footer from "./components/common/Footer.jsx";

function App() {
	return (
		<>
			<Header />
			<main className="flex flex-col gap-4  justify-start min-h-screen  bg-background">
				<Hero />
				<OurEnvironment/>	
				<SelectedDishes />
				<Location/>
				<Footer />
			</main>
		</>
	);
}

export default App;
