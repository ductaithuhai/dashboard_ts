import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import { dashboard_navigation } from "./navi";

const linkClasses =
    "w-full flex items-center justify-center gap-5 font-light text-white lg:text-lg text-3xl";

function Sidebar() {
    return (
        <div className="w-40 h-full bg-slate-950 flex flex-col">
            <div className="w-full h-24 bg-slate-950 flex justify-center items-center">
                <div className="w-full h-full flex justify-center items-center">
                    <img
                        className="hidden lg:block w-full h-full object-contain"
                        src={logo}
                        alt="logo"
                    />
                    <div className="lg:hidden h-24 w-full bg-orange-500 flex items-center justify-center">
                        <i className="text-white fa-solid fa-bars sm:text-4xl text-2xl" />
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full h-full flex flex-col justify-start items-center gap-5">
                <div className="w-auto flex justify-center items-center gap-2 py-3 px-5 lg:mt-5 mt-10 text-orange-500 bg-white rounded-lg text-xl">
                    <i className="fa-solid fa-chalkboard-user lg:text-2xl text-3xl"></i>
                    <div className="lg:block hidden">Dashboard</div>
                </div>
                <div className="w-full flex flex-col justify-center items-center lg:gap-6 gap-10">
                    {dashboard_navigation.map((item) => (
                        <NavigationLink key={item.key} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );

    interface items {
        key: string;
        label: string;
        className: string;
        icon: string;
        path: string;
    } 

    function NavigationLink({ item }: { item: items }) {

        return (
            <Link to={item.path} className={`hover:bg-orange-500 ${linkClasses}`}>
                <span className={item.className}>
                    <i className={`${item.icon}`}></i>
                    <span className="hidden lg:block">{item.label}</span>
                </span>
            </Link>
        );
    }
}

export default Sidebar;
