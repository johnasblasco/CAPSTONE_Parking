import { useEffect, useState } from 'react';
import moment from 'moment';

const CurrentlyParked = ({ vehicles }) => {
      const [timers, setTimers] = useState({});

      // Format duration into hours and minutes
      const formatTime = (startDate) => {
            const startTime = moment(startDate);
            const endTime = moment(); // Assuming current time is end time
            const duration = moment.duration(endTime.diff(startTime));

            const hours = Math.floor(duration.asHours());
            const minutes = duration.minutes();
            return { hours, minutes };
      };

      // Update timers every minute
      useEffect(() => {
            const intervalId = setInterval(() => {
                  // Create new timers object with updated durations
                  const updatedTimers = {};
                  vehicles.forEach((vehicle, index) => {
                        const { hours, minutes } = formatTime(vehicle.startDate);
                        updatedTimers[index] = { hours, minutes };
                  });
                  setTimers(updatedTimers);
            }, 5000); // Update every minute (60000 milliseconds)

            // Clear interval on component unmount
            return () => clearInterval(intervalId);
      }, [vehicles]);

      // Determine if vehicle is overtime
      const isOvertime = (hours) => {
            return hours >= 3;
      };

      return (
            <div className='max-h-[55vh] min-h-[55vh] overflow-y-auto overflow-x-hidden flex flex-col items-center bg-[#D2BAA5] rounded-2xl '>
                  <p className='bg-[#AB9A80] rounded-3xl py-1 px-4 m-2'>Currently Parked</p>
                  <table className='w-[90%] m-4'>
                        <thead>
                              <tr className='text-center'>
                                    <th>Ticket No.</th>
                                    <th className='border-l border-r border-black'>Type</th>
                                    <th>Total Time</th>
                              </tr>
                        </thead>
                        <tbody>
                              {vehicles.map((vehicle, index) => {
                                    const { hours, minutes } = timers[index] || formatTime(vehicle.startDate);
                                    const overtime = isOvertime(hours);

                                    return (
                                          <tr key={index} className={`text-center ${overtime ? 'bg-[#B49389]' : ''}`}>
                                                <td>{vehicle.ticketNumber}</td>
                                                <td className='border-l border-r border-black'>{vehicle.category}</td>
                                                <td className={`${overtime ? 'text-[#892121]' : ''}`}>
                                                      {`${hours}.${minutes} hrs`}
                                                </td>
                                          </tr>
                                    );
                              })}
                        </tbody>
                  </table>
            </div>
      );
};

export default CurrentlyParked;
