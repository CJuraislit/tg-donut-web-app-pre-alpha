import React, {FC, useEffect, useState} from 'react';
import './DonutCountSection.css'

type DonutCountSectionProps = {
    points: number | null;
    updatePoints: () => void;
};
const DonutCountSection:FC<DonutCountSectionProps> = ({points, updatePoints}) => {

    useEffect(() => {
        updatePoints()
    }, [updatePoints])

    return (
        <div className={'DonutCountSection_container'}>
            <div className={'donut-count'}>{points !== null ? points : '0'}</div>
            <p>DONUT</p>
        </div>
    );
};

export default DonutCountSection;
