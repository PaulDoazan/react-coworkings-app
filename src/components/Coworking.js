import moment from 'moment';

import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/Job';
import CoworkingInfo from './CoworkingInfo';

const Coworking = ({ id, name, superficy, capacity, price, address, createdAt }) => {
    const { setEditCoworking, deleteCoworking } = useAppContext();
    let date = moment(createdAt);
    date = date.format('MMM Do, YYYY');
    return (
        <Wrapper>
            <header>
                <div className='main-icon'>{name.charAt(0)}</div>
                <div className='info'>
                    <h5>{address.number} {address.street}, {address.city}</h5>
                    <p>{name}</p>
                    <p className='prices'>{price.hour ? `heure : ${price.hour}€ / ` : ''} {price.day ? `jour : ${price.day}€ / ` : ''} {price.month ? `mois : ${price.month}€` : ''}</p>
                </div>
            </header>
            <div className='content'>
                {/* content center later */}
                <footer>
                    <div className='actions'>
                        <Link
                            to='/add-coworking'
                            onClick={() => setEditCoworking(id)}
                            className='btn edit-btn'
                        >
                            Edit
                        </Link>
                        <button
                            type='button'
                            className='btn delete-btn'
                            onClick={() => deleteCoworking(id)}
                        >
                            Delete
                        </button>
                    </div>
                </footer>
            </div>
        </Wrapper>
    );
};

export default Coworking;