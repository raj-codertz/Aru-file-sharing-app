import logoImg from '../assets/images/file.svg'
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <>
            <div
                className="grid md:grid-cols-2 items-center md:gap-4 gap-8 font-[sans-serif] text-[#333] max-w-[1100px] max-md:max-w-md mx-auto">
                <div className="max-md:order-1 max-md:text-center">
                    <h3 className="md:text-3xl text-2xl md:leading-10">Simplify Your College File Management</h3>
                    <p className="mt-4 text-sm">Enjoy effortless organization, quick access, and secure storage of all your important documents.</p>
                    <Link to='/register'>
                    <button type="button"
                            className="px-6 py-2 mt-8 font-semibold rounded text-sm outline-none border-2 border-[#333] hover:bg-[#333] hover:text-white transition-all duration-300">Get started
                    </button>
                    </Link>
                </div>
                <div className="md:h-[450px]">
                    <img src={logoImg} className="w-full h-full md:object-contain" alt='image for hero'/>
                </div>
            </div>
        </>
    );
};

export default Landing;