import React from 'react'

export default function HomePage() {
  return (
    
    <main className = 'pb-20 text-center flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center'>
        <h1 className='font-semibold text-5xl sm:text-6xl md:text-7xl'>Free <span className='text-blue-400 blod'>Scribe</span></h1>


        <h3 className='font-medium md:text-lg' >Record<span 
        className='text-blue-400'> &rarr; </span>Transcribe<span 
        className='text-blue-400'> &rarr; </span>Translate</h3>

        <button className='flex item-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4
        specialBtn px-4 py-2 rounded-xl'>
            <p className='text-blue-400'>Record</p>
            <i class="fa-solid fa-microphone"></i>
            </button>
        <p className='text-base'>Or <label className='text-blue-400 cursor-pointer hover:text-blue-600 duraation-200'>Upload <input className='hidden' type='file' accept='.mp3,.wave'/></label>a mp3 file</p>
        <p className='italic text-slate-500'>Free now free forever</p>
            </main>
  )
}
