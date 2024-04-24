import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LocationSender() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude });
              sendLocationToBackend(latitude, longitude);
            },
            (error) => {
              console.error('Error getting location:', error);
              alert('Error getting location. Please enable location services.');
            }
          );
        } else {
          alert('Geolocation is not supported by this browser.');
        }
      } catch (error) {
        console.error('Error fetching location:', error);
        alert('Error fetching location.');
      }
    };

    fetchLocation();
  }, []);

  const sendLocationToBackend = async (latitude, longitude) => {
    try {
      const response = await axios.post('https://backeddata-production.up.railway.app/data', { latitude, longitude });
      console.log('Location sent successfully:', response.data);
      alert('Location sent successfully.');
    } catch (error) {
      console.error('Error sending location:', error);
      alert('Error sending location.');
    }
  };

  return (
    <div>
      {location && (
        <div>
         sample
        </div>
      )}
    </div>
  );
}

export default LocationSender;
