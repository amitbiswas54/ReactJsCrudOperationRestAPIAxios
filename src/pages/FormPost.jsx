import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addPost, updatePost } from '../api/PostApi';

function FormPost({data, setData, editData, setEditData}) {
  const [open, setOpen] = useState(false);
        const [error, setError] = useState(""); // Error state

    const [addData, setAddData] = useState({     
        title: '',
        body: ''
    });

    let isEdit = Object.keys(editData).length === 0;
     
    useEffect(() => {
     editData && setAddData({
            title: editData.title || '',
            body: editData.body || ''
        });   
      
            },[editData]);   

    

    const onchangeHandler = (e) => {
        const {name, value} = e.target;
        setAddData(prevState => {
            return { 
                 ...prevState,
            [name]: value
              }  
        });       
    }

 

    const modifyPost = async () => {
      try {
     const res =await updatePost(editData.id, addData)

     setData((prev)=>{
      return prev.map((item)=>{
        return item.id === editData.id ? res.data : item
      } 
      )
     
        
        }

      )
    }
      catch (error) {
        console.error('Error updating post:', error); 
      }

    }
   const post = async () => {
        try {       
            const res = await addPost(addData);
            if(addData.title ==='' || addData.body ===''){
              return toast.error('Please fill in all fields');
            }else if
             (res.status === 201) {
                const nextId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
                res.data.id = nextId; // Assign a new ID for UI purposes
                setData([...data, res.data]);            
                setAddData({title: '', body: ''});
                 toast.success('Post created successfully!');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }
    const submitValues = (e) => {
        e.preventDefault();  
  
      let action = e.nativeEvent.submitter.value;

      if (action === 'Add') {
          post()
          setAddData({title: '', body: ''});
          
      }
      else if (action === 'Edit') {
          // Update functionality can be implemented here
          modifyPost();
           setEditData({title: '', body: ''});
      }

      
    }



  return (
   <>



        
            
            <div className='max-w-[60rem] mx-auto p-4 mt-5
             shadow-lg rounded-lg bg-gray-900 text-white'>
            <form onSubmit={submitValues} className='flex flex-col md:flex-row gap-5'>

            <input type="text"
             className='flex-grow px-4 text-gray-800'
             placeholder='Add Title'
             autoComplete='off'
             name="title"
               value={addData.title}
               onChange={onchangeHandler}

             />

            <input type="text" 
           className='flex-grow px-4 text-gray-800'
             placeholder='Add Body'
             autoComplete='off'
             name="body"
               value={addData.body}
               onChange={onchangeHandler}
             />
            <button type='submit' 
            className='px-5 py-2 rounded-md bg-green-600 text-white font-semibold'
             value={isEdit? 'Add': 'Edit'}>{isEdit ? 'Add': 'Edit'}</button>
            </form>
            </div>
          <ToastContainer />

   </>
  )
}

export default FormPost