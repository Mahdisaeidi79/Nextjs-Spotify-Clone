
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { useAppSelector } from '../app/hooks';
import { selectedId } from '../features/playlistId';
import useSpotify from './../hooks/useSpotify';
import Songs from './Songs';
import { playlistType } from '../types/playlistType';

const colors = [
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-red-500',
    'from-yellow-500',
    'from-pink-500',
    'from-purple-500'
]
export default function Center():JSX.Element {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();
    const [color, setColor] = useState<null | string | undefined>(null);
    const currentPlaylistId = useAppSelector(selectedId);
    const [playlist, setPlaylist] = useState<playlistType>();
    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [currentPlaylistId])
    
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi
                .getPlaylist(currentPlaylistId)
                .then((data) => {
                    setPlaylist(data.body)
                })
        }
    }, [spotifyApi, currentPlaylistId]);

    return (
        <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
            <header className='absolute top-5 right-8'>
                <div className='flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2' onClick={() => signOut()}>
                    <img className='rounded-full h-10 w-10 object-cover' src={session?.user?.image ?? '/images/profile.jpg'} alt="" />
                    <h2>{session?.user?.name}</h2>
                    <ChevronDownIcon className='h-5 w-5' />
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 p-8`}>
                <img className='h-[232px] w-[232px] shadow-2xl' src={playlist?.images[0]?.url} alt='' />
            <div>
                <p className='text-xs font-bold'>PLAYLIST</p>
                <h1 className='text-2xl md:text-3xl xl:text-8xl font-bold'>{playlist?.name}</h1>
                <p className='text-[#ffffffB3] mt-4'>{playlist?.description}</p>
            </div>
            </section>
            <Songs playlist={playlist}/>
        </div>
    )
}
