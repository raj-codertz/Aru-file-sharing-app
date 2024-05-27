
import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';

const links = [
    {
        text: 'Upload file',
        path: '.',
        icon: <FaWpforms />
    },
    {
        text: 'Uploaded File',
        path: 'uploaded-files ',
        icon: <MdQueryStats />
    },
    {
        text: 'Actions',
        path: 'actions',
        icon: <IoBarChartSharp />
    },
    {
        text: 'Profile',
        path: 'profile',
        icon: <ImProfile />
    },
    {
        text: 'Admin',
        path: 'admin',
        icon: <MdAdminPanelSettings />
    }
]

export default links