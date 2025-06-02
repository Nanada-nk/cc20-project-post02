import { NavLink } from "react-router"


function NavBar() {

  const menus = [
    {id:1, text: "Home", path: "/"},
    {id:2, text: "Create Post", path: "/create"},
    {id:3, text: "Register", path: "/register"},
    {id:4, text: "Login", path: "/login"},
  ]

  return (
    <nav className="h-13 font-bold bg-pri-1 text-fon-2 flex justify-center items-center gap-6 px-8">
      {menus.map((item) => (
      <NavLink
      className={"cursor-pointer hover:text-bold-1 duration-300"}
      key={item.id} 
      to={item.path}>{item.text}</NavLink>
      ))}
    </nav>
  )
}

export default NavBar