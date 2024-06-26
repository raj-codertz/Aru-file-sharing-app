import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { redirect, useOutletContext } from 'react-router-dom';
import { useNavigation, Form } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
   const formData = await request.formData()
   
     try {
      await customFetch.post('/file', formData)
      toast.success(' File uploaded successful')
      return redirect('uploaded-files')
     } catch(error) {
         toast.error(error?.response?.data?.msg)
     }
     return null
}

const UploadFile = () => {
    const { user } = useOutletContext()
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'

    return <Wrapper>
        <Form method='post' className='form' encType='multipart/form-data'>
          <h4 className='form-title'>Upload File</h4>
          <div>
            {/*    file input */}
              {/* <FormRow type='text' name='fil' labelText='document name'/> */}
              <FormRow type='text' name='documentNumber' labelText='document number'/>
              <div className='form-row'>
                  <label htmlFor='filename' className='form-label'>
                      Select a file
                  </label>
                  <input
                      type='file'
                      id='filename'
                      name='filename'
                      className='form-input'
                      accept='application/pdf'
                  />
              </div>
              <button type="submit" className='btn btn-block from-btn' disabled={isSubmitting}>
                  {isSubmitting ? 'Uploading...' : 'Upload'}
              </button>
            </div>
        </Form>
    </Wrapper>
}
export default UploadFile