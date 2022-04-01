import { useEffect } from 'react';
import { useState } from 'react';
import WeatherDay from '../Weather-Day/WeatherDay';
import styles from './styles-modules.css'
import {LocationSearch} from '../LocationSearch/LocationSearch';

const App= () => {
 const locationKey1 = '12985_PC';
  const apiKey = 'xAb0SI6GhxfyhUzhmssDhzAiUBDJHU2J';
  const [weatherInfo,setWeatherInfo] = useState();
  const [locationKey, setLocationKey] = useState('');
  const [location, setLocation]= useState('');

 


  

  const padNum = (num) => {
    const stringNum = num +'';
    const stringLen = stringNum.length;

    if(stringLen === 1) {
      return '0' +stringNum; 

    }else {
      return stringNum;

    }

  }
  useEffect(() => {
    const daysofweek= ['Sunday','Monday','Tuesday','Wednesday','Thursday', 'Friday', 'Saturday'];
    console.log(locationKey);
    
    if(locationKey){
    fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/locationKey=${locationKey}?apikey=${apiKey}`
    
    )
    .then(res => res.json())
    .then(res => setWeatherInfo(res.DailyForecasts.map(df => {
      return {
        min :df.Temperature.Minimum.Value,
        max :df.Temperature.Maximum.Value,
        weatherType: df.Day.IconPhrase,
        weatherKey: padNum(df.Day.Icon),
        dayOfweek: daysofweek[new Date(df.Date).getDay()],
      }

    }
      
      
      )) );
      
  }

  }, [locationKey]);


  return (
    <div>

      <LocationSearch
      
      onCityfound={cityInfo => {
        console.log('Found: ',  cityInfo);
        setLocationKey(cityInfo.key);
        setLocation(cityInfo.name + ', '+ cityInfo.state);
      }}
      />
 <div className={styles.main}>

   <h1>{location}</h1>
    {!!weatherInfo && weatherInfo.map((i,index)=> (
 
 <div className = {styles.day} key={index}>
 <WeatherDay min={i.min}
  max={i.max} 
  weatherType={i.weatherType}
   weatherKey = {i.weatherKey}
   dayOfweek={i.dayOfweek}

   />
  </div>
  ))}
  
  </div>
  </div>
  )
    }

export default App;
