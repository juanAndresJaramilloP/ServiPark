'use client';

import { useEffect, useState } from "react";

export default function Clock({initialTime}:{initialTime: string}) {

    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleString());
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return(
        <div>
            <p className="block text-sm md:text-xl font-medium text-gray-900 ml-4 md:ml-16">{time}</p>
        </div>
    );
}