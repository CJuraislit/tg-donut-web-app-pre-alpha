import React, {FC, useEffect, useState} from 'react';
import './DonutCountSection.css'

type DonutCountSectionProps = {
    fetchUserPoints: () => Promise<number>; // функция для получения очков с бэкенда
};
const DonutCountSection:FC<DonutCountSectionProps> = ({fetchUserPoints}) => {
    const [points, setPoints] = useState<number | null>(null);

    useEffect(() => {
        const loadPoints = async () => {
            try {
                const fetchedPoints = await fetchUserPoints();
                setPoints(fetchedPoints);
            } catch (error) {
                console.error('Ошибка при загрузке очков:', error);
            }
        };
        loadPoints();
    }, [fetchUserPoints])

    return (
        <div className={'DonutCountSection_container'}>
            <h2 className={'donut_count'}>{points !== null ? points : 'Loadinng...'}</h2>
            <p>$DONUT</p>
        </div>
    );
};

export default DonutCountSection;
