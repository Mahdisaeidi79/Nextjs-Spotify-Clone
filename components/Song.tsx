import React from 'react'
import { millisToMinutesAndSeconds } from './../lib/time';

export default function Song({ track, order }) {
    return (
        <div className='grid grid-cols-2 text-gray-400 py-2 px-5 hover:bg-[#ffffff1a]  rounded-lg'>
            <section className='flex items-center space-x-4'>
                <p>{order + 1}</p>
                <img className="w-10 h-10" src={track.track.album.images[0].url} alt="" />
                <div>
                    <p className='w-36 lg:w-64 truncate text-white'>{track.track.name}</p>
                    <p className='w-40'>{track.track.artists[0].name}</p>
                </div>
            </section>
            <section className='flex items-center justify-between ml-auto md:ml-0'>
                <p className="w-40 hidden md:inline truncate">{track.track.album.name}</p>
                <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
            </section>
        </div>
    )
}
