import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Wiki() {
  const [wikis, setWikis] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('/api/wiki');
      setWikis(result.data);
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Wiki</h1>
      <ul>
        {wikis.map(wiki => (
          <li key={wiki._id}>
            <h2>{wiki.title}</h2>
            <p>{wiki.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Wiki;
