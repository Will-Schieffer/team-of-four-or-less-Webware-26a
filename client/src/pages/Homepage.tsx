import { Navbar } from "../components/Navbar"
import { Search } from "../components/Search"

export function HomePage() {
    return (
        <div className="main-content">
            <Navbar />
            <section id="homepage">
                <Search />
            </section>
        </div>
    )
}