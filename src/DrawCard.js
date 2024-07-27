import React, { useState , useRef, useEffect} from "react";
import axios from 'axios'

const DrawCard = () => {
    // const [profile, setProfile] = useState(null);
    const [card,setCard] = useState(null)
    const [isShuffled, setIsShuffled] = useState(true)
    const deckIdRef = useRef();
    useEffect(() => {
        async function loadPage() {
            const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            deckIdRef.current = res.data.deck_id
        }
        loadPage()
    },[])

    const getACard = () => {
       
           axios.get(`https://deckofcardsapi.com/api/deck/${deckIdRef.current}/draw/?count=1`).then(res => setCard(res.data.cards[0].image))
        //    console.log(deckIdRef.current)
    }

    const shuffle = (e) => {
        e.preventDefault();
        axios.get(`https://deckofcardsapi.com/api/deck/${deckIdRef.current}/shuffle/`).then(res => setIsShuffled(res.data.success))
        setCard(null)
    }
    return (
        <div>
            {isShuffled && 
            <div>
               <button onClick={getACard}>Draw a card!</button>
               <div><img src={card}></img></div>
            </div>
            }
            
            <button onClick={shuffle} disabled={!isShuffled}>Shuffle</button>
        </div>
        
    )
}

export default DrawCard