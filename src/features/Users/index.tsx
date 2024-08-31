import { useState } from 'react';
import Pagination from './pagination';
import AddUserForm from './userForm';
import * as XLSX from 'xlsx';

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);
    const [usersData, setUsersData] = useState(Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        email: `email${i + 1}@gmail.com`,
        phoneNumber: `0911${String(i).padStart(6, '0')}`,
        firstName: `Firstname${i + 1}`,
        lastName: `Lastname${i + 1}`,
        role: 'User',
    })));
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('');

    const filteredUsers = usersData.filter(user =>
        (user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterRole ? user.role === filterRole : true)
    );

    const totalPages = Math.ceil(usersData.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToFirstPage = () => {
        setCurrentPage(1);
    };

    const goToLastPage = () => {
        setCurrentPage(totalPages);
    };

    const handleUsersPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUsersPerPage(Number(e.target.value));
        setCurrentPage(1);
    };


    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(usersData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Users");
        XLSX.writeFile(wb, "users.xlsx");
    };

    const toggleFormProp = () => {
        setShowAddUserForm(!showAddUserForm);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleFilterRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterRole(e.target.value);
        setCurrentPage(1);
    };

    interface User {
        id: number;
        email: string;
        phoneNumber: string;
        firstName: string;
        lastName: string;
        role: string;
    }

    const onSubmitProp = (user: User) => {
        setUsersData((usersData) => [...usersData, user]);
    };

    return (
        <>
            <div className='max-w-full h-full grid grid-rows-12'>
                <div className='row-start-1 row-end-2 w-full h-auto flex justify-between items-center sm:px-4 px-6 py-2'>
                    <div className='text-2xl sm:text-5xl font-bold'>User</div>
                    <div className='w-full flex justify-end gap-5'>
                        <button className='hidden sm:flex sm:bg-white sm:bg-opacity-100 sm:text-black sm:px-4 sm:py-2 sm:rounded-full' onClick={exportToExcel}>
                            Export to Excel
                        </button>
                        <button className='flex sm:hidden bg-white bg-opacity-100 text-black sm:px-4 px-2 sm:py-2 py-1.5 rounded-full' onClick={exportToExcel}>
                            Export
                        </button>
                        <button className='bg-white bg-opacity-100 text-black sm:px-4 px-2 sm:py-2 py-1 rounded-full' onClick={toggleFormProp}>
                            {showAddUserForm ? 'Cancel' : 'Add New User'}
                        </button>
                    </div>
                </div>

                <div className='row-start-2 row-end-3 w-full h-auto flex lg:justify-start items-center justify-start gap-5 py-3 sm:px-4 px-2'>
                    <input className='w-1/2 sm:w-1/4 lg:w-1/6 bg-white bg-opacity-100 text-black sm:px-4 px-2 sm:py-2 py-1 rounded-full'
                        type="text"
                        placeholder="Search by email, first name, last name..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <select className='w-1/2 sm:w-1/4 lg:w-1/6 bg-white bg-opacity-100 text-black sm:px-6 px-2 sm:py-2 py-[6.5px] rounded-full'
                        value={filterRole}
                        onChange={handleFilterRoleChange}
                    >
                        <option value="">All Roles</option>
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>

                    <button className='bg-white bg-opacity-100 sm:w-1/4 lg:w-1/6 text-black sm:px-4 px-2 sm:py-2 py-1 rounded-full' onClick={exportToExcel}>
                        Search
                    </button>
                </div>

                <div className='text-sm sm:text-base row-start-3 row-end-12 sm:p-4 p-2 w-full h-full max-h-[400px] sm:max-h-[800px] lg:max-h-[450px] lg:overflow-auto overflow-x-scroll'>
                    <table className='w-full min-w-full h-full'>
                        <thead className='text-left table-header-group w-full h-1/6'>
                            <tr>
                                <th className='px-4 py-2'>No</th>
                                <th className='px-4 py-2'>Email</th>
                                <th className='px-4 py-2'>Phone Number</th>
                                <th className='px-4 py-2'>First Name</th>
                                <th className='px-4 py-2'>Last Name</th>
                                <th className='px-4 py-2'>Role</th>
                            </tr>
                        </thead>
                        <tbody className='table-row-group w-full h-full'  >
                            {currentUsers.map((user, index) => (
                                <tr key={user.id} className="table-row">
                                    <td className='table-cell px-4 py-2'>{indexOfFirstUser + index + 1}</td>
                                    <td className='table-cell px-4 py-2'>{user.email}</td>
                                    <td className='table-cell px-4 py-2'>{user.phoneNumber}</td>
                                    <td className='table-cell px-4 py-2'>{user.firstName}</td>
                                    <td className='table-cell px-4 py-2'>{user.lastName}</td>
                                    <td className='table-cell px-4 py-2'>{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='row-start-12 row-end-13 w-full h-auto flex justify-center items-center sm:px-6 px-2 sm:gap-5 gap-1 text-sm sm:text-base'>
                    <div>
                        {indexOfFirstUser + 1}-{indexOfLastUser} of {filteredUsers.length}
                    </div>

                    <div className='flex items-center gap-1 text-sm sm:text-base'>
                        <label htmlFor="usersPerPage" className='hidden sm:flex'>Rows per page: </label>
                        <label htmlFor="usersPerPage" className='sm:hidden'>Rows: </label>
                        <select className='rounded-full' value={usersPerPage} onChange={handleUsersPerPageChange}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>
                    </div>

                    <div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            goToNextPage={goToNextPage}
                            goToPrevPage={goToPrevPage}
                            goToFirstPage={goToFirstPage}
                            goToLastPage={goToLastPage}
                        />
                    </div>
                </div>
            </div>
            {showAddUserForm && (
                <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50'>
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <AddUserForm onSubmit={onSubmitProp} toggleForm={toggleFormProp} />
                    </div>
                </div>
            )}
        </>
    );
}

export default Users;