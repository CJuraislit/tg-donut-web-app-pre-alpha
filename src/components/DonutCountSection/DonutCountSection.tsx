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
            <h2 className={'donut_count'}>{points !== null ? points : '0'}</h2>
            <p>$DONUT</p>
        </div>
    );
};

export default DonutCountSection;
