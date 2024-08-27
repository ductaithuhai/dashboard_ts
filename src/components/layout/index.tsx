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
        <div className="flex-1 w-full h-full flex flex-col bg-bg-primary">
          <div className="w-full h-24 border-b border-gray-500">
            <Header />
          </div>
          <div className="w-full h-full flex justify-center items-center overflow-auto">
            <div className="w-11/12 h-5/6 bg-white bg-opacity-35 rounded-2xl overflow-auto">
              <Users />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
