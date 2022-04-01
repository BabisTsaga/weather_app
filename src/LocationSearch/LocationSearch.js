import {useState} from 'react';
import styles from './styles--modules.css';


export const LocationSearch = ({onCityfound}) => {
const apiKey1 ='xAb0SI6GhxfyhUzhmssDhzAiUBDJHU2J';
const [zipcode, setZipcode] = useState();
const getLocation= (zipcode) => {
    console.log(zipcode);
   
                                 {
    const url = `http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${apiKey1}&q=${zipcode}`;
    fetch(url)
    .then(res => res.json())
    .then(res => res.find(l => l.Country.ID === 'US'))
    .then (res => onCityfound({
    name: res.LocalizedName,
    key:   res.Key,
    state: res.AdministrativeArea.ID,
    }));
    setZipcode('');
    }

}

return (

    <div className={styles.main}>
<input 
placeholder='Zip Code'
value = {zipcode}
onChange = {e => setZipcode(e.target.value) }

/>
<button  onClick={() => getLocation(zipcode)} >Search</button>
    </div>
)



}

