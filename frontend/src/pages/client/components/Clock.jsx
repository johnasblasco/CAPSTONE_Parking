import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Clock = () => {
      const [currentTime, setCurrentTime] = useState(moment().format('h:mm:ss'));
      const [currentDate, setCurrentDate] = useState(moment().format('dddd, MMMM DD, YYYY'));

      useEffect(() => {
            const intervalId = setInterval(() => {
                  setCurrentTime(moment().format('h:mm:ss'))
                  setCurrentDate(moment().format('dddd, MMMM DD, YYYY'));
            }, 1000);

            // Clean up interval on component unmount
            return () => clearInterval(intervalId);
      }, []);
      return (
            <div className='text-center '>
                  <span className='text-8xl font-bold mr-2'>{currentTime}</span> <span className='text-8xl'>{moment().format('A')}</span>
                  <p className='text-4xl font-light p-1'>{currentDate}</p>
            </div>
      );
}

export default Clock;