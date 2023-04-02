import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Coworking from './Coworking';
import Wrapper from '../assets/wrappers/JobsContainer';

const CoworkingsContainer = () => {
    const { getCoworkings, coworkings, isLoading, page, totalCoworkings } = useAppContext();
    useEffect(() => {
        getCoworkings();
    }, []);

    if (isLoading) {
        return <Loading center />;
    }
    if (coworkings.length === 0) {
        return (
            <Wrapper>
                <h2>No coworkings to display...</h2>
            </Wrapper>
        );
    }
    return (
        <Wrapper>
            <h5>
                {coworkings.length} coworking{coworkings.length > 1 && 's'} found
            </h5>
            <div className='jobs'>
                {coworkings.map((coworking) => {
                    return <Coworking key={coworking.id} {...coworking} />;
                })}
            </div>
        </Wrapper>
    );
};

export default CoworkingsContainer;
