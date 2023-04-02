import { FormRow, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
const AddCoworking = () => {
    const {
        isLoading,
        isEditing,
        showAlert,
        displayAlert,
        editCoworkingId,
        coworkingName,
        coworkingSuperficy,
        coworkingCapacity,
        addressNumber,
        addressStreet,
        addressPostCode,
        priceHour,
        priceDay,
        priceMonth,
        handleChange,
        clearValues,
        createCoworking
    } = useAppContext();

    const handleSubmit = (e) => {
        e.preventDefault();

        // if (!coworkingName || !coworkingSuperficy || !coworkingCapacity) {
        //     displayAlert();
        //     return;
        // }
        if (isEditing) {
            // eventually editCoworking()
            return;
        }
        createCoworking();
    };

    const handleCoworkingInput = (e) => {
        handleChange({ name: e.target.name, value: e.target.value });
    };

    return (
        <Wrapper>
            <form className='form'>
                <h3>{isEditing ? 'edit coworking' : 'add coworking'} </h3>
                {showAlert && <Alert />}

                <div className='form-center'>
                    <FormRow
                        type='text'
                        required={true}
                        className='required'
                        labelText='Name'
                        name='coworkingName'
                        value={coworkingName}
                        handleChange={handleCoworkingInput}
                    />
                    <FormRow
                        type='text'
                        required={true}
                        labelText='Superficy'
                        name='coworkingSuperficy'
                        value={coworkingSuperficy}
                        handleChange={handleCoworkingInput}
                    />
                    <FormRow
                        type='text'
                        required={true}
                        labelText='Capacity'
                        name='coworkingCapacity'
                        value={coworkingCapacity}
                        handleChange={handleCoworkingInput}
                    />

                    <FormRow
                        type='number'
                        labelText='Address Number'
                        name='addressNumber'
                        value={addressNumber}
                        handleChange={handleCoworkingInput}
                    />
                    <FormRow
                        type='text'
                        labelText='Address Street'
                        name='addressStreet'
                        value={addressStreet}
                        handleChange={handleCoworkingInput}
                    />
                    <FormRow
                        type='text'
                        labelText='Address PostCode'
                        name='addressPostCode'
                        value={addressPostCode}
                        handleChange={handleCoworkingInput}
                    />
                    <FormRow
                        type='number'
                        labelText='Price / Hour'
                        name='priceHour'
                        value={priceHour}
                        handleChange={handleCoworkingInput}
                    />
                    <FormRow
                        type='number'
                        labelText='Price / Day'
                        name='priceDay'
                        value={priceDay}
                        handleChange={handleCoworkingInput}
                    />
                    <FormRow
                        type='number'
                        labelText='Price / Month'
                        name='priceMonth'
                        value={priceMonth}
                        handleChange={handleCoworkingInput}
                    />

                    <div className='btn-container'>
                        <button
                            className='btn btn-block submit-btn'
                            type='submit'
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            submit
                        </button>
                        <button
                            className='btn btn-block clear-btn'
                            onClick={(e) => {
                                e.preventDefault();
                                clearValues();
                            }}
                        >
                            clear
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
};

export default AddCoworking;
