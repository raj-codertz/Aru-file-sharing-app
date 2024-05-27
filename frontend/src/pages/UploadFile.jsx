import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { useNavigation, Form } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

// export const action = async ({ request }) => {
//    const formData = await request.formData()
// // formData has an interface of get method which provide input we want to access
//     const file = formData.get('avatar')
//      if ( file && file.size > 500000) {
//          toast.error('Image size too large')
//      }
//      try {
//       await customFetch.patch('/users/update-user', formData)
//       toast.success('Profile updated successful')
//      } catch(error) {
//          toast.error(error?.response?.data?.msg)
//      }
//      return null
// }

const UploadFile = () => {
    const { user } = useOutletContext()
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'
    return <Wrapper>
        <Form method='post' className='form'>
          <h4 className='form-title'>Upload File</h4>
          <div>
            {/*    file input */}
              <FormRow type='text' name='documentName' labelText='document name'/>
              <FormRow type='text' name='document' labelText='document number'/>
              <div className='form-row'>
                  <label htmlFor='avatar' className='form-label'>
                      Select a file
                  </label>
                  <input
                      type='file'
                      id='document'
                      name='document'
                      className='form-input'
                      accept='*'
                  />
              </div>
              <button className='btn btn-block from-btn' disabled={isSubmitting}>
                  {isSubmitting ? 'Uploading...' : 'Upload'}
              </button>
            </div>
        </Form>
    </Wrapper>
}
export default UploadFile