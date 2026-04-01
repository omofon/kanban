import { useTheme } from "../hooks/useTheme";
import logoDark from "../assets/logo-dark.svg";
import logoLight from "../assets/logo-light.svg";
import logoMobile from "../assets/logo-mobile.svg";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";

function Header() {
  const { isDark } = useTheme();

  return (
    <header className="bg-surface fixed top-0 left-0 z-20 w-screen flex items-center justify-between h-16 md:h-20 lg:h-24">
      <div className="border-0 md:border-r md:border-edge flex items-center w-fit md:w-65 lg:w-75 px-4 py-5 md:px-6 md:py-8 h-full">
        <img
          src={logoMobile}
          alt="Kanban logo mobile"
          className="md:hidden px-4 py-5"
        />
        <img
          src={isDark ? logoLight : logoDark}
          alt="Kanban"
          className="hidden md:block"
        />
      </div>
      <nav className="flex flex-1 items-center justify-between px-8">
        <h1 className="">No Active Boards</h1>
        <div role="actions-buttons" className="flex items-center gap-6">
          <button className="px-6 py-4 bg-brand rounded-full hover:cursor-pointer hover:bg-brand-hover flex items-center justify-center">
            <h3>
              <span className="relative top-[0.5px]">+</span> Add New Task
            </h3>
          </button>
          <button>
            <img src={ellipsis} alt="Ellipsis Icon" />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
