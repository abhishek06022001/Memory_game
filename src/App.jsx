import React, { useEffect, useState, } from 'react';

import axios, { all } from 'axios';
import { BounceLoader } from 'react-spinners';



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
        const response =await axios.get(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json`);
        console.log(response);
        
        const cards = response.data.slice(0, 45);
        setCards(cards);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    }
    fetchCards();
  }, []);

  return (
    <div className='min-h-screen p-5 bg-gradient-to-b from-indigo-500 flex flex-col via-purple-500 to-pink-500'>
      <div className='flex justify-between  px-5  items-center text-[#070206] py-3'>
        <div className='md:text-6xl sm:text-md font-bold'>
          The Memory Game
        
        </div>
        <div className='md:text-lg sm:text-xs font-semibold'>
          <div>CURRENT SCORE: {score.current_score}</div>
          <div>MAX SCORE: {score.max_score}</div>
        </div>
      </div>
      {cards ?
        <div className='my-4 gap-5  sm:flex sm:flex-wrap  grid grid-cols-2'>

          {cards.map((card) => {
            return <div className='bg-white 
            shadow-lg shadow-white hover:shadow-2xl hover:shadow-black
            sm:w-auto  mx-auto px-2 py-1 rounded-md 
           transition-shadow duration-300 ease-in
          flex flex-col justify-center
          ' key={card.id} >
              <img className='  sm:h-32 md:h-44 rounded-md ' src={card.images.sm} alt="" />
              <div className='text-center font-bold'>{card.name}</div>
            </div>
          })}
        </div>
        :
        <div className='flex-1 flex justify-center items-center' >
          <BounceLoader />
        </div>

      }
    </div>
  );
}

export default App;
