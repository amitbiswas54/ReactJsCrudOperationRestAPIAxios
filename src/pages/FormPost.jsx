import React, { useState } from 'react'
import { addPost } from '../api/PostApi';

function FormPost({data, setData}) {

    const [addData, setAddData] = useState({
        
        title: '',
        body: ''
    });
     


    const onchandelHandler = (e) => {

        const {name, value} = e.target;
        // setAddvalue({...addvalue, [name]: value});  
        setAddData(prevState => {
            return { 
                 ...prevState,
            [name]: value
              }
           
        });       

    }

    const post = async () => {

        try {
            const res = await addPost(addData);
            console.log('Response from addPost:', res);
            if (res.status === 201) {
                // append new post to UI
                const nextId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
                res.data.id = nextId; // Assign a new ID for UI purposes

                setData([...data, res.data]);
              setAddData({title: '', body: ''});


            }


        } catch (error) {
            console.error('Error creating post:', error);
        }
    }


    const submitValues = (e) => {
        e.preventDefault();
       post()
    }



  return (
   <>
        <div className='flex flex-col max-w-[800px] mx-auto gap-5 p-4 mt-5 shadow-lg rounded-lg bg-gray-900 text-black'>
            <form onSubmit={submitValues} className='flex flex-col md:flex-row gap-5'>

            <input type="text"
             className='flex-grow px-4'
             placeholder='Add Title'
             autoComplete='off'
             name="title"
               value={addData.title}
               onChange={onchandelHandler}

             />

            <input type="text" 
           className='flex-grow px-4 '
             placeholder='Add Body'
             autoComplete='off'
             name="body"
               value={addData.body}
               onChange={onchandelHandler}
             />
            <button type='submit' className='px-5 py-2 rounded-md bg-green-600 text-white font-semibold'>Add</button>
            </form>
        </div>

   </>
  )
}

export default FormPost