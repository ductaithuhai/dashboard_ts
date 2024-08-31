import { useState } from "react";
import { useForm,SubmitHandler } from "react-hook-form";
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
    password: string;
    confirmPassword: string;
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
    } = useForm<User>();
    const [avatar, setAvatar] = useState({ src: avatarplaceholder });
    const [preview, setPreview1] = useState<string | null>(null);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader: FileReader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setPreview1(reader.result);
                    setAvatar({ src: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFormSubmit: SubmitHandler<User> = (newUser: User) => {
        onSubmit(newUser);
        reset();
        toggleForm();
    };
    return (
        <div className="fixed w-5/6 h-4/5 sm:h-niceper top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:grid lg:grid-cols-4 flex flex-col justify-center items-center bg-orange-400 rounded-3xl z-50">
            <div className="lg:col-span-3 h-4/5 lg:h-niceper w-full flex flex-col sm:gap-5 gap-1 justify-center items-start sm:p-8 p-4 bg-orange-400 text-white rounded-t-3xl lg:rounded-l-3xl">
                <div className="sm:text-3xl text-xl ">Add New User</div>
                <div className="sm:text-2xl text-lg">User Detail</div>
                <form
                    className="w-full h-full flex flex-col items-center justify-between sm:gap-5 gap-2"
                    onSubmit={handleSubmit(handleFormSubmit)}
                >
                    <div className="w-full flex justify-center lg:gap-24 sm:gap-12 gap-6">
                        <div className="w-5/12 flex flex-col gap-3">
                            <label className="sm:text-xl text-sm">Email</label>
                            <input
                                className="sm:text-xl text-sm px-2 sm:h-12 h-6 rounded-full text-black"
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
                            <label className="sm:text-xl text-sm">Role</label>
                            <select
                                className="sm:text-xl text-sm px-2 sm:h-12 h-6 rounded-full text-black"
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
                        <label className="sm:text-xl text-sm">Phone Number</label>
                        <input
                            className="sm:text-xl text-sm px-2 sm:h-12 h-6 rounded-full text-black"
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
                    <div className="w-full flex justify-center items-center lg:gap-24 sm:gap-12 gap-6">
                        <div className="w-5/12 flex flex-col items-start ">
                            <label className="sm:text-xl text-sm">First Name</label>
                            <input
                                className="w-full sm:text-xl text-sm px-2 sm:h-12 h-6 rounded-full text-black"
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
                            <label className="sm:text-xl text-sm">Last Name</label>
                            <input
                                className="w-full sm:text-xl text-sm px-2 sm:h-12 h-6 rounded-full text-black"
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
                        <label className="sm:text-xl text-sm">Password</label>
                        <input
                            className="sm:text-xl text-sm px-2 sm:h-12 h-6 rounded-full text-black"
                            type="password"
                            placeholder="Password"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && (
                            <p style={{ color: "red" }}>{errors.password.message as string}</p>
                        )}
                    </div>
                    <div className="w-11/12 flex flex-col text-left">
                        <label className="sm:text-xl text-sm">Confirm Password</label>
                        <input
                            className="sm:text-xl text-sm px-2 sm:h-12 h-6 rounded-full text-black"
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
                    <div className="w-full flex items-center justify-center sm:gap-10 gap-2">
                        <button
                            className="bg-white sm:text-xl text-sm sm:px-8 sm:py-4 px-4 py-1 text-orange-600 rounded-full hover:bg-bg-primary hover:text-white"
                            type="submit"
                        >
                            Add User
                        </button>
                        <button
                            className="bg-white sm:text-xl text-sm sm:px-8 sm:py-4 px-4 py-1 text-orange-600 rounded-full hover:bg-bg-primary hover:text-white"
                            type="button"
                            onClick={toggleForm}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
            <div className="p-5 h-1/5 lg:h-full w-full flex justify-center items-center bg-white rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none border border-orange-600">
                <div className="flex lg:flex-col items-center gap-5">
                    <div className="text-orange-400 sm:text-2xl text-lg text-center">Profile Picture</div>
                    <img
                        className="lg:w-80 lg:h-80 sm:w-40 sm:h-40 w-20 h-20 bg-orange-400 rounded-full"
                        src={preview || avatar.src}
                        alt="avatar"
                    />
                    <label htmlFor="file-upload" className="text-center sm:text-xl text-sm sm:px-5 sm:py-3 px-2 py-1 bg-orange-400 text-white rounded-full hover:bg-bg-primary hover:text-orange-400">
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
