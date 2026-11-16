import { NavLink } from "react-router-dom";   

export default function Header() {
    return (
        <header className="flex items-center justify-between gap-10 px-50 bg-emerald-500 text-orange-500">
                <img src="" alt="" />

                <div className="flex gap-4">
                    <NavLink to="/" className="font-playfair text-xl" style={({ isActive }) => ({
                        color: isActive ? "green" : "orange",
                    })}>início</NavLink>
                    <NavLink to="/cardapio" className="font-playfair text-xl" style={({ isActive }) => ({
                        color: isActive ? "green" : "orange",
                    })}>cardápio</NavLink>
                </div>
        </header>
    )
}
