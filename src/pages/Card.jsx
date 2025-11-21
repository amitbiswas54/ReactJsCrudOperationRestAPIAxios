import React from 'react'
import { useEffect, useState } from 'react';
import { getPosts } from '../api/PostApi';

function Card() {

    const [data, setData] = useState(null);

    const fetchData = async () => {

        try {
           const response = await getPosts();
              setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }




    useEffect(() => {
        fetchData();
    }, []);


  return (
    <div>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4'>
            {data && data.map((item) => (
                <div key={item.id} className='flex flex-col gap-5 p-4 shadow-lg rounded-lg bg-gray-800'>
                    <h2 className='text-gray-300 font-semibold text-2xl '>
                        {item.title.length > 20 ? item.title.slice(0, 20) + " ..." : item.title}
                         </h2>       
                    <p className='text-gray-400 text-base font-normal' >{item.body}</p>
                    <p className='flex gap-2'>
                        <button className='px-5 rounded-md py-2 bg-green-700 text-white'>Edit</button>
                         <button className='px-5 rounded-md py-2 bg-red-700 text-white'>Delete</button>
                    </p>
                </div>
            ))}

        </div>


    </div>
  )
}

export default Card