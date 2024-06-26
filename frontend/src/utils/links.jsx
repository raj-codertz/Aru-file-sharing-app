
import { ImProfile } from 'react-icons/im';
import { BsFiles } from "react-icons/bs";
import { FcApproval } from "react-icons/fc";
import { MdOutlineDriveFolderUpload, MdOutlinePendingActions } from "react-icons/md";




const links = [
    {
        text: 'Upload file',
        path: '.',
        icon: <MdOutlineDriveFolderUpload />
    },
    {
        text: 'Uploaded File',
        path: 'uploaded-files ',
        icon: <BsFiles />
    },
    {
        text: 'Actions',
        path: 'actions',
        icon: <MdOutlinePendingActions />
    }
    // },
    // {
    //     text: 'Profile',
    //     path: 'profile',
    //     icon: <ImProfile />
    // },
    // {
    //     text: 'Admin',
    //     path: 'admin',
    //     icon: <MdAdminPanelSettings />
    // }
]

export default links