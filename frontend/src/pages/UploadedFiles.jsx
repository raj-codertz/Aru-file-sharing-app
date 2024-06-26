import { useLoaderData, redirect } from 'react-router-dom';
import { useState } from 'react';
import customFetch from '../utils/customFetch';
import { AiOutlineEye } from 'react-icons/ai';
import { CommentModal } from '../components';

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/file/get-files');
    console.log(data);
    return { data };
  } catch (error) {
    return redirect('/');
  }
};

const UploadedFiles = () => {
  const { data } = useLoaderData();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewComments = (file) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Uploaded Files</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Document Name</th>
              <th className="py-3 px-6 text-left">Document Number</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">File</th>
              <th className="py-3 px-6 text-left">Comments</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {data.map((file) => (
              <tr key={file.documentNumber} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{file.filename}</td>
                <td className="py-3 px-6 text-left">{file.documentNumber}</td>
                <td className="py-3 px-6 text-left">
                  <span className={`py-1 px-3 rounded-full text-xs ${
                    file.status === 'uploaded' ? 'bg-yellow-200 text-yellow-700' : 
                    file.status === 'reviewed_by_hod' ? 'bg-green-200 text-green-700' : 
                    file.status === 'reviewed_by_dean' ? 'bg-green-200 text-blue-700' :
                    file.status === 'reviewed_by_dvs' ? 'bg-green-200 text-green-950' :
                    'bg-red-200 text-red-700'
                  }`}>
                    {file.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">
                  <a href={`http://localhost:5500/uploads/${file.filename}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                    <AiOutlineEye className="mr-1" /> View
                  </a>
                </td>
                <td className="py-3 px-6 text-left">
                  <button 
                    onClick={() => handleViewComments(file)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                    View Comments
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedFile && (
        <CommentModal file={selectedFile} onClose={closeModal} />
      )}
    </div>
  );
};

export default UploadedFiles;