import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';

function App() {
  const access_token = "7927a62e31cfa459b5b3dd16fc5467d7";
  const [cards, setCards] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState({
    max_score: 0, current_score: 0
  });

  useEffect(() => {
    async function fetchCards() {
      try {
        let fetchedCards = [];
        let i = 1;
        while (i < 33) {
          const response = axios.get(`/api/${access_token}/${i}`);
          fetchedCards.push(response);
          i++;
        }
        const response = await all(fetchedCards);
        setCards(response);
        setLoading(false);
        console.log("response is", response);

      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    }
    fetchCards();
  }, []);

  return (
    <div className='min-h-screen p-5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500'>
      <div className='flex justify-between  px-5  items-center text-[#070206] py-3'>
        <div className='md:text-6xl sm:text-md font-bold'>
          The Memory Game
        </div>
        <div className='md:text-lg sm:text-xs font-semibold'>
          <div>CURRENT SCORE: {score.current_score}</div>
          <div>MAX SCORE: {score.max_score}</div>
        </div>
      </div>
      <div className='my-4 gap-5  sm:flex sm:flex-wrap  grid grid-cols-2'>
        {cards && cards.map((card) => {
          return <div className='bg-white   sm:w-auto  mx-auto px-2 py-1 rounded-md 
          flex flex-col justify-center
          ' key={card.data.connections.id} >
            <img className='  sm:h-32 md:h-44 rounded-md ' src={card.data.image.url} alt="" />
            <div className='text-center font-bold'>{card.data.name}</div>
          </div>
        })}
      </div>
    </div>
  );
}

export default App;
