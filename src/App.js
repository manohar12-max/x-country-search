import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
export default function App() {
  const [data, setData] = useState([]);
  const [spareData, setSpareData] = useState([]);
  const [input, setInput] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        let res = await axios.get("https://restcountries.com/v3.1/all");
          if (res.status == 200) {
           setData(res.data);
        setSpareData(res.data)
        }
       ;
      } catch (error) {
         console.error("Error fetching data:",error);
      }
    }

    fetchData();
  }, []);

  const change = (e) => {
    let val = e.target.value;
    setInput(val);
    if (val == "") {
      setSpareData(data);
      return;
    }
    let filteredData = data.filter(({ name: { common } }) =>
      common.toLowerCase().includes(val.toLowerCase())
    );
    setSpareData(filteredData);
    return;
  };

  return (
    <div className="App">
      <input
        value={input}
        onChange={change}
        type="text"
        placeholder="Search for countries"
      />
      <div className="country__grid">
        {spareData.map((country) => (
          <div className="countryCard">
            <img src={country.flags.png} alt={country.name.common} />
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
