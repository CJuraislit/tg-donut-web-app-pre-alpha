import React, { useEffect, useState } from 'react';
import './BackgroundDots.css';

const BackgroundDots = () => {
    const [dots, setDots] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const generateDots = () => {
            const dotElements = [];
            const numberOfDots = 50; // Укажите количество точек

            for (let i = 0; i < numberOfDots; i++) {
                const size = Math.random() * 4 + 2; // Размер точки (2px - 6px)
                const x = Math.random() * 100; // Позиция по X в процентах
                const y = Math.random() * 100; // Позиция по Y в процентах
                const opacity = Math.random() * 0.6 + 0.2; // Прозрачность точки

                dotElements.push(
                    <div
                        key={i}
                        className="background-dot"
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            left: `${x}%`,
                            top: `${y}%`,
                            opacity: opacity,
                        }}
                    ></div>
                );
            }

            setDots(dotElements);
        };

        generateDots();
    }, []);

    return <div className="background-dots">{dots}</div>;
};

export default BackgroundDots;
