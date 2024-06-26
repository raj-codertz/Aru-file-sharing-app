import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useNavigation, Form } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import profile from '../assets/images/profile.svg'
import { toast } from 'react-toastify';


export const action = async ({ request }) => {
    console.log(request);
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

      try {
       await customFetch.patch('/user/update-profile', data)
       toast.success('Profile updated successful')
      } catch(error) {
          toast.error(error?.response?.data?.msg)
      }
      return null
 }

const Profile = () => {
    const { user } = useOutletContext()
    const {firstName, lastName, email, role} = user
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'

    return (
        <div className="font-sans bg-white text-gray-900 md:h-screen">
            <div className="grid md:grid-cols-2 items-center gap-8 h-full">
                <div className="order-1 p-4 bg-gray-50 h-full">
                    <img src={profile} className="lg:max-w-90% w-full h-full object-contain block mx-auto" alt="update-profile-image" />
                </div>
                <div className="flex items-center p-6 h-full w-full">
                    <Form method="post"  className="max-w-lg w-full mx-auto">
                        <div className="mb-12">
                            <h3 className="text-[#6C63FF] md:text-3xl text-2xl font-extrabold text-center">Update Profile</h3>
                        </div>
                        <div className="mb-6">
                            <label className="text-xs block mb-2">First Name</label>
                            <div className="relative flex items-center">
                                <input
                                    name="firstName"
                                    type="text"
                                    defaultValue={firstName}
                                    required
                                    className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                                    placeholder="Enter first name"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-2" viewBox="0 0 24 24">
                                    <circle cx="10" cy="7" r="6"></circle>
                                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5z"></path>
                                    <path d="M22 11h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"></path>
                                </svg>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="text-xs block mb-2">Last Name</label>
                            <div className="relative flex items-center">
                                <input
                                    name="lastName"
                                    type="text"
                                    defaultValue={lastName}
                                    required
                                    className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                                    placeholder="Enter last name"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-2" viewBox="0 0 24 24">
                                    <path d="M0 512h512V0H0Z"></path>
                                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"></path>
                                </svg>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="text-xs block mb-2">Email</label>
                            <div className="relative flex items-center">
                                <input
                                    name="email"
                                    type="email"
                                    defaultValue={email}
                                    required
                                    className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                                    placeholder="Enter email"
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="text-xs block mb-2">Role</label>
                            <div className="relative flex items-center">
                                <select
                                    name="role"
                                    required
                                    defaultValue={role}
                                    className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                                >
                                    <option value="" disabled>Select your role</option>
                                    <option value="file-clerk">File Clerk</option>
                                    <option value="actioner">Actioner</option>
                                    <option value="secretary">Secretary</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-12">
                            <button
                                className="w-full py-2.5 px-8 text-sm font-semibold rounded bg-[#6C63FF] hover:bg-[#443ebe] text-white border focus:outline-none"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Updating...' : 'Update Profile'}
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
