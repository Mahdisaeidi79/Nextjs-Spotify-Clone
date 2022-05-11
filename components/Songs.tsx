import React from 'react'
import Song from './Song'
import { playlistType } from './../types/playlistType';

type songs = {
  playlist:playlistType
}

export default function Songs({playlist}:songs) {
  return (
    <div className='p-8 flex flex-col space-y-1 pb-28 text-white'>
        {playlist?.tracks.items.map((track,index:number)=>(
            <Song key={track.track.id} track={track.track} order={index}/>
        ))}
    </div>
  )
}
