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
            <div className='w-full h-screen grid grid-rows-12'>
                <div className='row-start-1 row-end-2 w-full h-auto flex justify-between items-center px-12'>
                    <div className='text-3xl font-bold'>User</div>
                    <div className='flex gap-5'>
                        <button className='bg-white bg-opacity-100 text-black px-4 py-2 rounded-full' onClick={exportToExcel}>
                            Export to Excel
                        </button>
                        <button className='bg-white bg-opacity-100 text-black px-4 py-2 rounded-full' onClick={toggleFormProp}>
                            {showAddUserForm ? 'Cancel' : 'Add New User'}
                        </button>
                    </div>
                </div>

                <div className='row-start-2 row-end-3 w-full h-auto flex justify-start items-center gap-5 py-3 px-12'>
                    <input className='bg-white bg-opacity-100 text-black px-4 py-2 rounded-full'
                        type="text"
                        placeholder="Search by email, first name, last name..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <select className='bg-white bg-opacity-100 text-black px-4 py-2 rounded-full'
                        value={filterRole}
                        onChange={handleFilterRoleChange}
                    >
                        <option value="">All Roles</option>
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>

                    <button className='bg-white bg-opacity-100 text-black px-4 py-2 rounded-full' onClick={exportToExcel}>
                        Search
                    </button>
                </div>

                <div className='row-start-3 row-end-12 w-full h-full overflow-auto'>
                    <table className='w-full h-full'>
                        <thead className='text-left table-header-group'>
                            <tr>
                                <th className='px-4 py-2'>No</th>
                                <th className='px-4 py-2'>Email</th>
                                <th className='px-4 py-2'>Phone Number</th>
                                <th className='px-4 py-2'>First Name</th>
                                <th className='px-4 py-2'>Last Name</th>
                                <th className='px-4 py-2'>Role</th>
                            </tr>
                        </thead>
                        <tbody>
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

                <div className='row-start-12 row-end-13 w-full h-auto flex justify-end items-center px-12 gap-5'>
                    <div>
                        {indexOfFirstUser + 1}-{indexOfLastUser} of {filteredUsers.length}
                    </div>

                    <div>
                        <label htmlFor="usersPerPage" >Rows per page: </label>
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
                <AddUserForm onSubmit={onSubmitProp} toggleForm={toggleFormProp} />
            )}
        </>
    );
}

export default Users;