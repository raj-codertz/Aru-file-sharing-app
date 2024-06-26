import { useEffect, useState } from 'react';
import customFetch from '../utils/customFetch';

const CommentModal = ({ file, onClose }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await customFetch.get(`/file/comments/${file.documentNumber}`);
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [file.documentNumber]);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg overflow-y-auto max-h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Comments for {file.filename}</h2>
          <button onClick={onClose} className="text-red-500 font-bold">Close</button>
        </div>
        <ul className="space-y-4">
          <li>
            <p className="font-semibold text-gray-800">Comment by HOD:</p>
            <p className="text-gray-600 whitespace-pre-wrap">{comments.hod || "No comment"}</p>
          </li>
          <li>
            <p className="font-semibold text-gray-800">Comment by Dean:</p>
            <p className="text-gray-600 whitespace-pre-wrap">{comments.dean || "No comment"}</p>
          </li>
          <li>
            <p className="font-semibold text-gray-800">Comment by DVS:</p>
            <p className="text-gray-600 whitespace-pre-wrap">{comments.dvs || "No comment"}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CommentModal;