import { React, useState, useEffect } from 'react';


const ProgressBar = ({ color = "#dc2626", radius = "2px"}) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100; // Ensure it doesn't exceed 100%
                }
                return prev + 1; // Increment progress
            });
        }, 630); // Adjust speed (50ms for smooth animation)

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="progress-container">
                <div
                    className="progress-bar"
                    style={{ 
                        width: `${progress}%`,
                        backgroundColor: color,
                        borderRadius: radius,
                    
                }}
                    
                ></div>
            </div>
            <div className="progress-text">{progress}%</div>
        </div>
    );
};

export default ProgressBar;
