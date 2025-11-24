import React from 'react'
import { useEffect, useState } from 'react';
import { getPosts, deletePost } from '../api/PostApi';
import FormPost from './FormPost';

function Card() {

    const [data, setData] = useState([]);
    const [newdata, setNewdata] = useState([]);


    // fetch data from api
    const fetchData = async () => {

        try {
           const response = await getPosts();
              setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }
  



    // handel delet post
    const handelDeletPost = async (id) => {
        try {
         const res =  await deletePost(id);
            if (res.status === 200) {
                // remove deleted post from UI
                const updateData = data.filter((item) => item.id !== id);
                setData(updateData);         
            } 
        } catch (error) {
            console.error('Error deleting post:', error);
    }    
}
    
  useEffect(() => {
        fetchData();
    },[]);

  return (
    <div>

        <FormPost data={data} setData={setData}/>


        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4'>
            {data && data.map((item) => {

                const {id, title, body} = item; 
                return ( 
              
                <div key={id} className='flex flex-col gap-5 p-4 shadow-lg rounded-lg bg-gray-800'>
                    <p className='text-yellow-300 font-semibold'>{id}</p>
                    <h2 className='text-gray-300 font-semibold text-xl '>Title:   
                        {title.length > 20 ? title.slice(0, 20) + " ..." : title}
                         </h2>       
                    <p className='text-gray-400 text-base font-normal' >News: {body}</p>
                    <p className='flex gap-2'>
                        <button className='px-5 rounded-md py-2 bg-green-700 text-white'>Edit</button>
                         <button className='px-5 rounded-md py-2 bg-red-700 text-white' onClick={()=>handelDeletPost(id)}>Delete</button>
                    </p>
                </div>
                );
            })}

        </div>


    </div>
  )
}

export default Card