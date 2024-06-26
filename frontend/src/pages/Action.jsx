import React, { useEffect, useState } from 'react';
import customFetch from '../utils/customFetch';
import { useNavigate } from 'react-router-dom';
import { useDashboardContext } from './DashboardLayout';

const Action = () => {
    const [files, setFiles] = useState([]);
    const { user } = useDashboardContext();
    
    console.log(user);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const { data } = await customFetch.get('/file/get-files');
                setFiles(data);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };
        fetchFiles();
    }, []);

    const handleUpdateStatus = async (id, status, comments) => {
        try {
            const response = await customFetch.patch(`/file/action/${id}`, { status, comments });
            setFiles(files.map(file => (file._id === id ? response.data : file)));
            navigate(0);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Actions</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">Document Name</th>
                            <th className="py-3 px-6 text-left">Document Number</th>
                            <th className="py-3 px-6 text-left">Status</th>
                            <th className="py-3 px-6 text-left">Action</th>
                            <th className="py-3 px-6 text-left">Comment</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {files.map((file) => (
                            <tr key={file._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{file.filename}</td>
                                <td className="py-3 px-6 text-left">{file.documentNumber}</td>
                                <td className="py-3 px-6 text-left">{file.status}</td>
                                <td className="py-3 px-6 text-left">
                                    {(user.role === 'hod' && file.status === 'uploaded') ||
                                    (user.role === 'dean' && file.status === 'reviewed_by_hod') ||
                                    (user.role === 'dvs' && file.status === 'reviewed_by_dean') ||
                                    (user.role === 'secretary' && file.status === 'reviewed_by_dvs') ? (
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                handleUpdateStatus(
                                                    file._id,
                                                    user.role === 'hod' ? 'reviewed_by_hod'
                                                    : user.role === 'dean' ? 'reviewed_by_dean'
                                                    : user.role === 'dvs' ? 'reviewed_by_dvs'
                                                    : 'completed',
                                                    e.target.comments.value
                                                );
                                            }}
                                        >
                                            <input
                                                type="text"
                                                name="comments"
                                                placeholder="Add comment"
                                                required
                                                className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                                            />
                                            <button
                                                type="submit"
                                                className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
                                            >
                                                Submit
                                            </button>
                                        </form>
                                    ) : (
                                        <span>No action available</span>
                                    )}
                                </td>
                                <td className="py-3 px-6 text-left">
                                    {file.comments.hod && <p><strong>HOD:</strong> {file.comments.hod}</p>}
                                    {file.comments.dean && <p><strong>Dean:</strong> {file.comments.dean}</p>}
                                    {file.comments.dvs && <p><strong>DVS:</strong> {file.comments.dvs}</p>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Action;
