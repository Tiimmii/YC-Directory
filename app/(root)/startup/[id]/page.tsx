import { STARTUP_BY_ID_QUERY } from '@/lib/queries';
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import React from 'react'
export const experimental_ppr = true;

// for ppr -> in next.config.ts ->
// experimental:{
//     ppr: 'incremental'
//   },
//   devIndicators:{
//     appIsrStatus: true,
//     buildActivity: true,
//     buildActivityPosition: 'bottom-right'
//   }
// };

const page = async ({ params} : {params: Promise<{id: string}>}) => {
    const id = (await params).id;

    const post = await client.fetch(STARTUP_BY_ID_QUERY, {id})
    if(!post) return notFound()

  return (
    <>
      <h1 className='text-3xl'> This is a startup number: {id}</h1>
    </>
  )
}

export default page
