import React, { useEffect, useState, } from 'react';

import axios, { all } from 'axios';
import { BounceLoader } from 'react-spinners';



function App() {
  const [currId, setCurrId] = useState(null);
  const [cards, setCards] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState({
    max_score: 0, current_score: 0
  });
  function shuffle(e) {
    let someId = e.currentTarget.getAttribute('data-id');
    // alert(someId);
    
    if (currId == someId) {
      setScore({ ...score, max_score: score.current_score, current_score: 0 })
    } else {
      setScore({ ...score, current_score: score.current_score + 1 });
    }
    let shuffled_cards = [];
    let usedIndex = [];
    while (shuffled_cards.length < cards.length) {
      let random_num = Math.floor(Math.random() * cards.length);
      if (!usedIndex.includes(random_num)) {
        shuffled_cards.push(cards[random_num]);
        usedIndex.push(random_num);
      }
    }
    setCards(shuffled_cards);

  }

  useEffect(() => {
    async function fetchCards() {
      try {
        let fetchedCards = [];
        let i = 1;
        const response = await axios.get(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json`);
        console.log(response);

        const response_cards = response.data.slice(0, 27);
        setCards(response_cards);
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
        <div className='md:text-5xl  text-xl font-extrabold'>
          THE MEMORY GAME

        </div>
        <div className='md:text-md text-sm font-semibold text-black bg-white rounded-sm  p-2'>
          <div className='flex justify-between gap-5'><div>current score</div> <div>{score.current_score}</div></div>
          <div className='flex justify-between gap-5' ><div>max score</div><div> {score.max_score}</div></div>
        </div>
      </div>
      {loading ?
        <div className='flex-1 flex justify-center items-center' >
          <BounceLoader />
        </div>

        :
        <div className='my-4 gap-5  sm:flex sm:flex-wrap  grid grid-cols-2'>

          {cards.map((card) => {
            return <div className='bg-white 
            shadow-lg shadow-white hover:shadow-2xl hover:shadow-black
            sm:w-auto  mx-auto px-2 py-1 rounded-md 
           transition-shadow duration-300 ease-in
          flex flex-col justify-center
          '
              onClick={(e) => { shuffle(e), setCurrId(card.id)}}
              data-id={card.id}
              key={card.id} >
              <img className='  sm:h-32 md:h-44 rounded-md ' src={card.images.sm}
                alt="" />
              <div className='text-center font-bold'>{card.name}</div>
            </div>
          })}
        </div>


      }
    </div>
  );
}

export default App;
