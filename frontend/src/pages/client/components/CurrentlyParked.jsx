import { useEffect, useState } from 'react';
import moment from 'moment';

const CurrentlyParked = ({ vehicles, hoursLimit }) => {
      const [timers, setTimers] = useState({});

      // Format duration into hours and minutes
      const formatTime = (startDate) => {
            const startTime = moment(startDate);
            const endTime = moment(); // Assuming current time is end time
            const duration = moment.duration(endTime.diff(startTime));

            const hours = Math.floor(duration.asHours());
            const minutes = duration.minutes() > 9 ? duration.minutes() : "0" + duration.minutes()
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
            return hours >= hoursLimit && hoursLimit != 0;
      };

      return (
            <div className='relative border-4 border-deepBlue shadow-2xl max-h-[50vh] min-h-[67%] overflow-y-auto flex flex-col items-center bg-offWhite rounded-2xl '>
                  <span className='absolute top-2 px-8 py-2 bg-yeelow border-4 border-deepBlue text-xl font-bold  rounded-full'>Currently Parked</span>
                  <table className='w-[90%] m-4 mt-24'>
                        <thead>
                              <tr className='text-center'>
                                    <th className='border-b-4 border-deepBlue'>Ticket No.</th>
                                    <th className='border-l-4 border-b-4 border-r-4 border-deepBlue '>Plate Number</th>
                                    <th className='border-b-4 border-deepBlue'>Total Time</th>
                              </tr>
                        </thead>
                        <tbody>
                              {vehicles.map((vehicle, index) => {
                                    const { hours, minutes } = timers[index] || formatTime(vehicle.startDate);
                                    const overtime = isOvertime(hours);

                                    return (
                                          <tr key={index} className={`text-center ${overtime ? '' : ''}`}>
                                                <td>{vehicle.ticketNumber}</td>
                                                <td className='border-l-4 border-r-4  border-deepBlue'>{vehicle.plateNumber}</td>
                                                <td className={`${overtime ? 'text-[#892121]' : ''}`}>
                                                      {`${hours}:${minutes} hrs`}

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
