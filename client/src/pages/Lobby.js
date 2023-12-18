import React, { useCallback, useState, useEffect } from 'react';
import { useSocket } from '../Context/SocketProvider'
import { useNavigate } from 'react-router-dom';

const Lobby = () => {
    const [email, setEmail] = useState('');
    const [roomID, setRoomID] = useState('');
    const Navigate = useNavigate()

    const socket = useSocket()
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        socket.emit("room:join", {
            email,
            roomID
        })
    }, [email, roomID, socket])

    const handleJoinRoom = useCallback((data) => {
        Navigate(`/room/${roomID}`)

    }, [Navigate, roomID])

    useEffect(() => {
        socket.on("room:join", handleJoinRoom)
        return () => {
            socket.off("room:join", handleJoinRoom)
        }
    }, [handleJoinRoom, socket])

    return (
        <div className='h-screen w-screen bg-neutral-800 flex justify-center items-center flex-col'>
            <div className='text-4xl font-bold text-white mb-8'>
                Join Now
            </div>
            <div className='h-3/4 w-3/4 flex justify-center items-center'>
                <form onSubmit={handleSubmit} className='flex flex-col bg-white p-8 rounded-lg shadow-md w-1/2'>
                    <input
                        type='text'
                        className='mb-4 p-2 border border-gray-300 rounded-md'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your email'
                        required
                    />
                    <input
                        type='text'
                        className='mb-4 p-2 border border-gray-300 rounded-md'
                        placeholder='Room ID'
                        value={roomID}
                        onChange={(e) => setRoomID(e.target.value)}
                        required
                    />
                    <button
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-300'
                    >
                        Join
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Lobby;
