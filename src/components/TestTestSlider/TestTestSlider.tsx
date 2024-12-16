import React, {useState} from 'react';
import './TestTestSlider.css'

const marks = [0.1, 0.3, 5, 10, 20, 50]

const getSegmentValue = (value:number, segments:number[]): number => {
    for (let i = 0; i < segments.length; i++) {
        if (value >= i * (100 / (segments.length - 1)) && value <= (i + 1) * (100 / (segments.length - 1))) {
            const segmentStart = segments[i];
            const segmentEnd = segments[i + 1];

            const segmentPosition = (value - i * (100 / (segments.length - 1))) / (100 / (segments.length - 1));
            return segmentStart + segmentPosition * (segmentEnd - segmentStart);
        }
    }
    return segments[segments.length - 1];
}


const TestSlider = () => {
    const [sliderValue, setSliderValue] = useState<number>(0);
    const [calculatedValue, setCalculatedValue] = useState(0);

    const handleSliderValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);

        // Порог для магнитного эффекта
        const threshold = 2; // (можно менять по необходимости, в процентах)

        // Рассчитать ближайшую точку
        const nearestMark = marks.find((mark, index) => {
            const markPosition = (index * 100) / (marks.length - 1);
            return Math.abs(value - markPosition) <= threshold;
        });

        // Если ползунок рядом с точкой, "примагнитить"
        const adjustedValue = nearestMark !== undefined
            ? (marks.indexOf(nearestMark) * 100) / (marks.length - 1)
            : value;

        setSliderValue(adjustedValue);
        setCalculatedValue(getSegmentValue(adjustedValue, marks));
    }

    return (
        <div className="helpers">
            <label className="range-slider">
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={sliderValue}
                    onChange={handleSliderValue}
                    // style={{ opacity: 0, position: "absolute" }}
                />
                <div className="marks">
                    <div className="line">
                        <div className="filled" style={{ '--width': `${sliderValue}%` } as React.CSSProperties}></div>
                    </div>
                    <div className="inner">
                        {marks.map((mark, index) => (
                            <div
                                key={index}
                                className={`item ${index === 0 ? 'is-first' : ''} ${
                                    index === marks.length - 1 ? 'is-last' : ''
                                }`}
                                style={{
                                    '--left': `${(index * 100) / (marks.length - 1)}%`,
                                } as React.CSSProperties}
                            >
                                <div className="content">
                                    <div
                                        className={`point ${
                                            sliderValue >= (index * 100) / (marks.length - 1)
                                                ? 'active'
                                                : ''
                                        }`}
                                    ></div>
                                    <div className="label">{mark} TON</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </label>
            <div style={{marginTop: '100px'}}> <p>Выбранное значение: {calculatedValue.toFixed(2)} TON</p></div>
        </div>
    );
};

export default TestSlider;
