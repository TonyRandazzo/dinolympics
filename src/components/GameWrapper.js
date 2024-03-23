import React, { useEffect } from 'react';
import { Outlet, Router, useNavigate } from 'react-router-dom';

const GameWrapper = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const randomIndex =  Math.floor(Math.random() * 3) + 1;
        navigate(`/games/game${randomIndex}`);
    }, []);

    return (
        <>
            <Outlet/>
        </>
    );
};

export default GameWrapper;
