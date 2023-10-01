import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeName } from '../store/slices/userName.slice';
import { useNavigate } from 'react-router-dom';
import pokebaner from '../assets/pokeheader.png';
import '../styles/UserInput.css';

const UserInput = () => {

    const dispatch = useDispatch();
    const [userName, setUserName] = useState("")

    const navigate = useNavigate();

    const dispatchUserName = ()=> {
        dispatch(changeName(userName, setUserName));
        navigate('/pokedex');
    }

    return (
        <div className='pokemon-input'>
            <img src={pokebaner} alt=""></img>
            <div>
                <h1>¡Welcome Trainne!</h1>
                <p>Put your name to start the adventure!</p>
            </div>
            <div>
                <input 
                    type="text" 
                    value={userName}
                    onChange={e=> setUserName(e.target.value)}
                />
                <button onClick={dispatchUserName}>Send</button>
            </div>
            <footer>
                <div></div><div></div>
                <div></div>
            </footer>
        </div>
    );
};

export default UserInput;