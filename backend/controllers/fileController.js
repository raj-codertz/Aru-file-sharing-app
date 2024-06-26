import { StatusCodes } from 'http-status-codes';
import File from '../models/fileModel.js'

export const uploadFile = async (req, res) => {
    try {
        const file = new File({
            filename: req.file.filename,
            uploadedBy: req.user.userId,
            documentNumber: req.body.documentNumber
        });
        await file.save();
        res.status(StatusCodes.CREATED).json(file)
    } catch (error) {
        res.status(400).send(error);
    }
}

export const getAllFile = async (req, res) => {
    const files = await File.find({})
    res.status(StatusCodes.OK).json(files)
}

export const editStatusFile = async (req, res) => {
    const updatedFile = await File.findByIdAndUpdate(req.params.id, {status: req.body.status}, {
        new:true
    })
    res.status(StatusCodes.OK).json({ msg: 'status updated', file: updatedFile})
}

export const updateFileStatusAndComment = async (req, res) => {
    const { id } = req.params;
    const { status, comments } = req.body;
    const userRole = req.user.role;

    try {
        const file = await File.findById(id);

        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

        switch (userRole) {
            case 'hod':
                file.comments.hod = comments;
                file.status = 'reviewed_by_hod';
                break;
            case 'dean':
                file.comments.dean = comments;
                file.status = 'reviewed_by_dean';
                break;
            case 'dvs':
                file.comments.dvs = comments;
                file.status = 'reviewed_by_dvs';
                break;
            case 'secretary':
                if (file.status === 'reviewed_by_dvs') {
                    file.status = 'completed';
                }
                break;
            default:
                return res.status(403).json({ error: 'Unauthorized action' });
        }

        await file.save();
        res.status(200).json(file);
    } catch (error) {
        res.status(500).json({ error: 'Error updating file' });
    }
};

export const comment = async (req, res) => {
    try {
        const { id } = req.params;

        const file = await File.findOne({ documentNumber:id }).populate('comments');
        if (!file) {
          return res.status(StatusCodes.NOT_FOUND).send({ message: 'File not found' });
        }
    
        res.send(file.comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).send({ message: 'Server error' });
      }
}