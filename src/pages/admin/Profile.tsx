import { useEffect, useState } from "react";
import api from "../../api/axios";

function Profile() {

    const [profile, setProfile] =
        useState<any>(null);

    const [editing, setEditing] =
        useState(false);

    const [activeTab, setActiveTab] =
        useState("profile");

    const [password, setPassword] =
        useState({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });

    const API_URL =
        import.meta.env
            .VITE_API_BASE_URL
            .replace("/api", "");



    useEffect(() => {

        loadProfile();

    }, []);



    const loadProfile =
        async () => {

            try {

                const res =
                    await api.get(
                        "/users/profile"
                    );

                console.log(
                    "PROFILE:",
                    res.data
                );

                setProfile(
                    res.data
                );

            }
            catch (err) {

                console.log(err);

            }

        };



    const saveProfile =
        async () => {

            await api.put(
                "/users/profile",
                {
                    name: profile.name,
                    email: profile.email,
                    phone: profile.phone,
                    address: profile.address
                }
            );

            alert(
                "Profile updated"
            );

            setEditing(false);

            loadProfile();
        };



    const uploadImage =
        async (e: any) => {

            const file =
                e.target.files[0];

            if (!file)
                return;

            const form =
                new FormData();

            form.append(
                "file",
                file
            );

            await api.post(
                "/users/profile-image",
                form,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );

            loadProfile();
        };



    const changePassword =
        async () => {

            await api.put(
                "/users/change-password",
                password
            );

            alert(
                "Password changed"
            );
        };



    if (!profile)
        return <h2>Loading...</h2>;



    return (

        <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">
                My Profile
            </h1>



            {/* Tabs */}

            <div className="flex gap-5 mb-6">

                <button
                    onClick={() =>
                        setActiveTab("profile")
                    }>
                    Profile
                </button>

                <button
                    onClick={() =>
                        setActiveTab("password")
                    }>
                    Password
                </button>

                {
                    profile.role === "Admin"
                    &&
                    <button
                        onClick={() =>
                            setActiveTab(
                                "permissions"
                            )
                        }>
                        Permissions
                    </button>
                }

            </div>



            {/* Profile */}

            {
                activeTab === "profile"
                &&

                <div className="bg-white p-6 shadow rounded">

                    <div className="flex gap-5 mb-6">

                        <img

                            src={
                                profile.profileImage

                                    ?

                                    `${API_URL}/profile/${profile.profileImage}`

                                    :

                                    "/Avatar.png"
                            }

                            alt="Profile"

                            className="
                            w-32
                            h-32
                            rounded-full
                            object-cover
                            border
                            "
                        />



                        <input
                            type="file"
                            onChange={
                                uploadImage
                            }
                        />

                    </div>



                    <input
                        value={profile.name || ""}
                        disabled={!editing}
                        placeholder="Name"
                        onChange={(e) =>
                            setProfile({
                                ...profile,
                                name:
                                    e.target.value
                            })
                        }
                        className="border w-full p-2 mb-3"
                    />



                    <input
                        value={profile.email || ""}
                        disabled={!editing}
                        placeholder="Email"
                        onChange={(e) =>
                            setProfile({
                                ...profile,
                                email:
                                    e.target.value
                            })
                        }
                        className="border w-full p-2 mb-3"
                    />



                    <input
                        value={profile.phone || ""}
                        disabled={!editing}
                        placeholder="Phone"
                        onChange={(e) =>
                            setProfile({
                                ...profile,
                                phone:
                                    e.target.value
                            })
                        }
                        className="border w-full p-2 mb-3"
                    />



                    <input
                        value={profile.address || ""}
                        disabled={!editing}
                        placeholder="Address"
                        onChange={(e) =>
                            setProfile({
                                ...profile,
                                address:
                                    e.target.value
                            })
                        }
                        className="border w-full p-2 mb-3"
                    />



                    <button

                        onClick={() =>

                            editing
                                ?

                                saveProfile()

                                :

                                setEditing(true)

                        }

                        className="
                        bg-orange-500
                        text-white
                        px-5
                        py-2
                        "
                    >

                        {
                            editing
                                ?
                                "Save"
                                :
                                "Edit"
                        }

                    </button>

                </div>

            }



            {/* Password */}

            {
                activeTab === "password"
                &&

                <div className="bg-white p-6 shadow rounded">

                    <input
                        type="password"
                        placeholder="Current Password"
                        className="border w-full p-2 mb-3"
                        onChange={(e) =>
                            setPassword({
                                ...password,
                                currentPassword:
                                    e.target.value
                            })
                        }
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        className="border w-full p-2 mb-3"
                        onChange={(e) =>
                            setPassword({
                                ...password,
                                newPassword:
                                    e.target.value
                            })
                        }
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="border w-full p-2 mb-3"
                        onChange={(e) =>
                            setPassword({
                                ...password,
                                confirmPassword:
                                    e.target.value
                            })
                        }
                    />

                    <button
                        onClick={
                            changePassword
                        }
                        className="
                        bg-blue-500
                        text-white
                        px-5
                        py-2
                        "
                    >
                        Change Password
                    </button>

                </div>

            }



            {/* Permissions */}

            {
                activeTab === "permissions"
                &&

                <div className="bg-white p-6 shadow rounded">

                    <p>
                        Role:
                        <b>
                            {profile.role}
                        </b>
                    </p>

                    <p>
                        Branch:
                        <b>
                            {profile.branchId}
                        </b>
                    </p>

                    <p>
                        Active:
                        <b>
                            {
                                profile.isActive
                                    ?
                                    "Yes"
                                    :
                                    "No"
                            }
                        </b>
                    </p>

                </div>

            }

        </div>
    );
}

export default Profile;