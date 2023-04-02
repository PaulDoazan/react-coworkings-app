const FormRow = ({ type, name, value, handleChange, labelText, required }) => {
    return (
        <div className='form-row'>
            <label htmlFor={name} className={required ? `form-label required` : 'form-label'}>
                {labelText || name}
            </label>

            <input
                type={type}

                defaultValue={value}
                name={name}
                onChange={handleChange}
                className='form-input'
            />
        </div>
    );
};

export default FormRow
