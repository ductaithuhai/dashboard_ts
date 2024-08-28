import { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import avatarplaceholder from "../../assets/img/avatarplaceholder.png";
import "./styles.css";
interface User {
    id: number;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    role: string;
}
const AddUserForm = ({
    onSubmit,
    toggleForm,
}: {
    onSubmit: (user: User) => void;
    toggleForm: () => void;
}) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm();
    const [avatar, setAvatar] = useState(avatarplaceholder);
    const [preview, setPreview] = useState(null);

    const handleFormSubmit = (newUser: User) => {
        onSubmit(newUser);
        reset();
        toggleForm();
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
                setAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="fixed w-1/2 h-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid grid-cols-4 bg-white rounded-3xl z-50">
            <div className="col-span-3 flex flex-col gap-5 justify-center items-start p-8 bg-blue-500 text-white rounded-l-3xl">
                <div className="text-3xl">Add New User</div>
                <div className="text-2xl">User Detail</div>
                <form
                    className="w-full h-full flex flex-col items-center justify-between gap-5"
                    onSubmit={handleSubmit(handleFormSubmit as any)}
                >
                    <div className="w-full flex justify-center gap-12">
                        <div className="w-5/12 flex flex-col gap-3">
                            <label>Email</label>
                            <input
                                className="h-8 rounded-lg text-black"
                                type="email"
                                placeholder="email@address.com"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p style={{ color: "red" }}>{errors.email.message as string}</p>
                            )}
                        </div>
                        <div className="w-5/12 flex flex-col gap-3 rounded-lg">
                            <label>Role</label>
                            <select
                                className="h-8 rounded-lg text-black"
                                {...register("role", { required: "Role is required" })}
                            >
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                            </select>
                            {errors.role && (
                                <p style={{ color: "red" }}>{errors.role.message as string}</p>
                            )}
                        </div>
                    </div>
                    <div className="w-11/12 flex flex-col text-left">
                        <label>Phone Number</label>
                        <input
                            className="h-8 rounded-lg text-black"
                            type="tel"
                            placeholder="0911222333"
                            {...register("phoneNumber", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Invalid phone number",
                                },
                            })}
                        />
                        {errors.phoneNumber && (
                            <p style={{ color: "red" }}>{errors.phoneNumber.message as string as string}</p>
                        )}
                    </div>
                    <div className="w-full flex justify-center items-center gap-12">
                        <div className="w-5/12 flex flex-col items-start ">
                            <label>First Name</label>
                            <input
                                className="w-full h-8 rounded-lg text-black"
                                type="text"
                                placeholder="John"
                                {...register("firstName", {
                                    required: "First name is required",
                                })}
                            />
                            {errors.firstName && (
                                <p style={{ color: "red" }}>{errors.firstName.message as string as string}</p>
                            )}
                        </div>
                        <div className="w-5/12 flex flex-col items-start">
                            <label>Last Name</label>
                            <input
                                className="w-full h-8 rounded-lg text-black"
                                type="text"
                                placeholder="Doe"
                                {...register("lastName", { required: "Last name is required" })}
                            />
                            {errors.lastName && (
                                <p style={{ color: "red" }}>{errors.lastName.message as string}</p>
                            )}
                        </div>
                    </div>
                    <div className="w-11/12 flex flex-col text-left">
                        <label>Password</label>
                        <input
                            className="h-8 rounded-lg text-black"
                            type="password"
                            placeholder="Password"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && (
                            <p style={{ color: "red" }}>{errors.password.message as string}</p>
                        )}
                    </div>
                    <div className="w-11/12 flex flex-col text-left">
                        <label>Confirm Password</label>
                        <input
                            className="h-8 rounded-lg text-black"
                            type="password"
                            placeholder="Confirm Password"
                            {...register("confirmPassword", {
                                required: "Confirm password is required",
                                validate: (value) =>
                                    value === watch("password") || "Passwords do not match",
                            })}
                        />
                        {errors.confirmPassword && (
                            <p style={{ color: "red" }}>{errors.confirmPassword.message as string}</p>
                        )}
                    </div>
                    <div className="w-full flex items-center justify-center gap-10">
                        <button
                            className="bg-white px-8 py-2 text-blue-500 rounded-lg"
                            type="submit"
                        >
                            Add User
                        </button>
                        <button
                            className="bg-white px-8 py-2 text-blue-500 rounded-lg"
                            type="button"
                            onClick={toggleForm}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
            <div className="p-5 flex justify-center items-center bg-white rounded-r-3xl border border-blue-500">
                <div className="flex flex-col items-center gap-5">
                    <div className="text-blue-500">Profile Picture</div>
                    <img
                        className="w-40 h-40 bg-blue-500"
                        src={preview || avatar}
                        alt="avatar"
                    />
                    <label htmlFor="file-upload" className="p-3 bg-blue-500 rounded-lg">
                        Select Image
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        style={{ display: "none" }}
                    />
                </div>
            </div>
        </div>
    );
};

AddUserForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    toggleForm: PropTypes.func.isRequired,
};

export default AddUserForm;
