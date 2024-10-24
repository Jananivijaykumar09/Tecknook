import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BachelorDegrees.css'; // Import the CSS file
import NextStepHeader from './NextstepHeader';

const BachelorDegrees = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://en.wikipedia.org/w/api.php';
        const params = {
          action: 'query',
          list: 'categorymembers',
          cmtitle: 'Category:Bachelor\'s_degrees',
          cmlimit: 'max',
          format: 'json',
          origin: '*'
        };

        const response = await axios.get(url, { params });
        const members = response.data.query.categorymembers;

        const linkData = members.map(member => ({
          href: `https://en.wikipedia.org/?curid=${member.pageid}`,
          text: member.title,
        }));

        setLinks(linkData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bachelor-degrees-containerb">
      <NextStepHeader /> {/* Add the new header here */}
      <h2 className="headerb">Bachelor's Degrees</h2>
      <div className="card-containerb">
        {links.map((link, index) => (
          <div key={index} className="cardb">
            <a href={link.href} target="_blank" rel="noopener noreferrer" className="card-linkb">
              {link.text}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BachelorDegrees;
