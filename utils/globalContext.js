import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
    const [roomId, setRoomId] = useState("");
    const [isPlaying, setIsPlaying] = useState(true);
    const [volume, setVolume] = useState(0.8);
    const [playlist, setPlaylist] = useState([]);
    const [settings, setSettings] = useState({
        showQrCode: true,
        AcceptMember: false
    })

    const contextValue = {
        roomId,
        setRoomId,
        isPlaying,
        setIsPlaying,
        volume,
        setVolume,
        playlist,
        setPlaylist,
        settings,
        setSettings
    };

    return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};
