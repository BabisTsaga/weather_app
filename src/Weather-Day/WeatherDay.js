
const WeatherDay = ({min,max,weatherType,weatherKey,dayOfweek}) => {

    return (
<div> 
    {dayOfweek}
      <img
       alt={weatherType}
      src = {`https://developer.accuweather.com/sites/default/files/${weatherKey}-s.png`}/>  
   
   <div>Min: {min} Max: {max} </div> 
</div>
    )


}
export default WeatherDay;