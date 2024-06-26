import RegisterImg from '../assets/images/signup.svg'
import customFetch from "../utils/customFetch.js";
import { toast } from "react-toastify"
import {Form, redirect,  useNavigation, Link} from "react-router-dom";


export const action = async  ({request}) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    try {
        await customFetch.post('/auth/register', data)
        toast.success('Registration Successful')
        return redirect('/login')
    } catch (error){
        console.log(error)
        toast.error(error?.response?.data?.msg)
        return error
    }
}

const Register = () => {
    const navigation = useNavigation()
    console.log(navigation)
    const isSubmitting = navigation.state === 'submitting'

    return (
        <>
            <div className="font-[sans-serif] bg-white text-[#443ebe] md:h-screen">
                <div className="grid md:grid-cols-2 items-center gap-8 h-full">
                    <div className="max-md:order-1 p-4 bg-gray-50 h-full">
                        <img src={RegisterImg}
                             className="lg:max-w-[90%] w-full h-full object-contain block mx-auto" alt="login-image"/>
                    </div>
                    <div className="flex items-center p-6 h-full w-full">
                        <Form method='post' className="max-w-lg w-full mx-auto">
                            <div className="mb-12">
                                <h3 className="text-[#443ebe] md:text-3xl text-2xl font-extrabold max-md:text-center">Create
                                    an account</h3>
                            </div>
                            <div>
                                <label className="text-xs block mb-2">First Name</label>
                                <div className="relative flex items-center">
                                    <input name="firstName" type="text" required
                                           className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                                           placeholder="Enter name"/>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb"
                                         className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 24 24">
                                        <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                        <path
                                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                            data-original="#000000"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-10">
                                <label className="text-xs block mb-2">Last Name</label>
                                <div className="relative flex items-center">
                                    <input name="lastName" type="text" required
                                           className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                                           placeholder="Enter lastname"/>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb"
                                         className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                                        <defs>
                                            <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                                <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                            </clipPath>
                                        </defs>
                                        <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                            <path fill="none" stroke-miterlimit="10" stroke-width="40"
                                                  d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                                  data-original="#000000"></path>
                                            <path
                                                d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                                                data-original="#000000"></path>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-10">
                                <label className="text-xs block mb-2">Password</label>
                                <div className="relative flex items-center">
                                    <input name="password" type="password" required
                                           className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                                           placeholder="Enter password"/>
                                </div>
                            </div>
                            <div className="mt-10">
                                <label className="text-xs block mb-2">Email</label>
                                <div className="relative flex items-center">
                                    <input name="email" type="text" required
                                           className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                                           placeholder="Enter password"/>
                                    
                                </div>
                            </div>

                            <div className="mt-10">
                    <label className="text-xs block mb-2">Role</label>
                    <div className="relative flex items-center">
                        <select name="role"
                                className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none">
                            <option value="" disabled selected>Select your role</option>
                            <option value="hod">HOD</option>
                            <option value="dean">Dean</option>
                            <option value="dvs">DVS</option>
                            <option value="secretary">Secretary</option>
                        </select>
                    </div>
                </div>
                            
                            <div className="mt-12">
                                <button type="submit"
                                        className="w-full py-2.5 px-8 text-sm font-semibold rounded bg-[#524ae4] hover:bg-[#443ebe] text-white border focus:outline-none" disabled={isSubmitting}>
                                     { isSubmitting ? 'registering...': 'Register'}
                                </button>
                                <p className="text-sm mt-8 text-black">Already have an account? <Link to="/login"className="text-blue-500 font-semibold hover:underline ml-1">
                                    Login here</Link></p>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;