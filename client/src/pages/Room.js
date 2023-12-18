import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useSocket } from '../Context/SocketProvider';
import ReactPlayer from 'react-player'

const Room = () => {
    const socket = useSocket();
    const videoRef = useRef(null);

    const [remoteSocketID, setRemoteSocketID] = useState('');
    const [remoteSocketEmail, setRemoteSocketEmail] = useState('');
    const [myStream, setMyStream] = useState(null);

    const handleUserJoin = useCallback(({ email, id }) => {
        console.log(`Email : ${email}, ID : ${id}`);
        setRemoteSocketID(id);
        setRemoteSocketEmail(email);
    }, []);

    const handleStream = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            });
            setMyStream(stream);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Error accessing user media:', error);
        }
    }, []);

    useEffect(() => {
        socket.on('user:joined', handleUserJoin);

        return () => {
            socket.off('user:joined', handleUserJoin);
        };
    }, [handleUserJoin, socket]);

    return (
        <div className='bg-neutral-700 text-white h-screen w-screen flex justify-center items-center flex-col gap-10'>
            <div>
                {remoteSocketID ? (
                    <div>
                        Currently in the Room :{' '}
                        <span className='bg-gray-500 rounded-lg py-1 px-3'>{remoteSocketEmail}</span>
                    </div>
                ) : (
                    'No one in the room'
                )}
            </div>

            {!myStream && remoteSocketID && (
                <button onClick={handleStream} className='bg-green-500 text-white p-2 rounded-xl'>
                    Connect Now
                </button>
            )}
            {myStream && (
                <ReactPlayer url={myStream} playing muted />
            )}
        </div>
    );
};

export default Room;
