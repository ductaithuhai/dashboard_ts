import Header from "../header";
import Sidebar from "../sidebar";
import Users from "../../features/Users";

function Layout() {
  return (
    <>
      <div className="w-screen h-screen flex">
        <div className="hidden w-40 h-full sm:flex sm:flex-col sm:justify-between sm:items-center">
          <Sidebar />
        </div>
        <div className="flex-1 w-full h-full flex flex-col bg-bg-primary items-center">
          <div className="w-full h-16 sm:h-24 border-b sm:bg-bg-primary bg-slate-950 border-gray-500">
            <Header />
          </div>
          <div className="w-11/12 h-5/6 flex justify-center items-center">
            <div className="w-full sm:w-full h-niceper bg-white bg-opacity-35 rounded-2xl">
              <Users />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
