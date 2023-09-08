import { useState, useEffect } from 'react'
import countryService from './services/countries'

const CountryDetails = ({countryData}) => {
  console.log(countryData.languages);
  return (
    <div>
      <h1>{countryData.name.common}</h1>
      capital {countryData.capital}<br/>
      area {countryData.area}
      <h2>languages: </h2>
      <ul>
        {Object.entries(countryData.languages).map(([key,value])=>
          <li key={key}>{value}</li>
        )}
      </ul>
      <img width="160px" src={countryData.flags.png} alt={countryData.flags.alt}/>
    </div>
  )
}

const Countries = ({filteredCountries, details, setSearchText})=>{
  const maxCountries = 10;

  if(details === null){
    if(filteredCountries.length>maxCountries){
      return (
        <div>Too many matches, specify another filter</div>
      )
    }
    else {
      return (
        <div>
          {filteredCountries.map((c)=>
            <div key={c.cca3}>
              {c.name.common}
              <button onClick={()=>setSearchText(c.name.common)}>show</button>
              <br/>
            </div>
          )}
        </div>
      )
    }
  }
  else {
    return (
      <CountryDetails countryData={details}/>
    )
  }
}

function App() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [details, setDetails] = useState(null);

  const getFilteredCountries = ()=>{
    return countries.filter((c)=>c.name.common.toLowerCase().includes(searchText.toLowerCase()));
  };

  useEffect(()=>{
    console.log("Fetching countries");
    countryService.getAll()
      .then((fetchedCountries)=>{
        console.log(`Received ${fetchedCountries.length} countries`);
        setCountries(fetchedCountries);
      })
  },[]);

  useEffect(()=>{
    const filtered = getFilteredCountries();
    if(filtered.length===1 ){
      //only reload if the country has changed
      if((details===null || filtered[0].cca3!==details.cca3)) {
        console.log("loading details for ",filtered[0].name.common);
        countryService.search(filtered[0].name.common)
          .then((data)=>{
            console.log("Received detailed data for ",data.name.common);
            setDetails(data);
        });
      }
    }
    else if(details!==null){
      console.log("Reset Details");
      setDetails(null);
    }
  },[countries, searchText])

  const handleSearchChange = (event) =>{
    setSearchText(event.target.value);
  }

  return (
    <>
      find countries <input value ={searchText} onChange={handleSearchChange}/>
      <Countries filteredCountries={getFilteredCountries()} details={details} setSearchText={setSearchText}/>
    </>
  )
}

export default App
