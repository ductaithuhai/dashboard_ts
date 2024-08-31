function Header() {
    return (
        <div className="w-full h-16 sm:h-24 flex justify-between items-center px-3">
            <div className="px-2 text-xl sm:text-3xl font-bold text-orange-500 sm:text-slate-950">HRDept Company</div>
            <div className="flex justify-center items-center sm:gap-16 sm:px-12 px-2">
                <div className="flex justify-center items-center gap-6 sm:bg-white px-2 rounded-full">
                    <i className="hidden sm:flex fa-solid fa-bell text-2xl sm:items-center sm:justify-center sm:w-12 sm:h-12 bg-bg-primary sm:px-4 sm:rounded-full"></i>
                    <div className="hidden sm:flex sm:flex-col sm:justify-between gap-1 sm:w-40 sm:h-16 sm:px-4 ">
                        <p className="text-xl">HR Admin 1</p>
                        <p className="text-md">Product Manager</p>
                    </div>
                    <div>
                        <i className="flex items-center justify-center fa-solid fa-user-tie text-xl sm:text-2xl w-12 h-12 sm:bg-bg-primary bg-white sm:px-4 px-0 rounded-full"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
