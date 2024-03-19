import React, { useEffect } from 'react';
import { SpriteProvider } from './SpriteContext';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';

const GameWrapper = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const randomIndex =  Math.floor(Math.random() * 3) + 1;
        navigate(`/games/game${randomIndex}`);
    }, []);

    return (
        <SpriteProvider>
            <Outlet/>
        </SpriteProvider>
    );
};

export default GameWrapper;
