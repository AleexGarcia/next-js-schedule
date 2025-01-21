'use client';  // Indicando que este componente será executado no lado do cliente

import React, { useState } from 'react';
import { addSubjects } from '../lib/actions';

const FormWithDynamicFields = () => {
    const [fields, setFields] = useState([{ name: '' }]);

    const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newFields = [...fields];
        newFields[index].name = event.target.value;
        setFields(newFields);
    };

    const handleAddField = () => {
        setFields([...fields, { name: '' }]);
    };

    const handleRemoveField = (index: number) => {
        setFields(fields.filter((_, i) => i !== index));
    };

    return (
        <form className='flex flex-col gap-3 p-4' action={() => { addSubjects(fields) }}>
            {fields.map((field, index) => (
                <div key={index} className="field-group flex gap-4 items-center">
                    <label htmlFor={`field-${index}`}>Subject {index + 1}</label>
                    <input
                        type="text"
                        id={`field-${index}`}
                        value={field.name}
                        onChange={(e) => handleChange(index, e)}
                        placeholder={`Enter subject name`}
                        required
                    />
                    {fields.length > 1 && (
                        <button className='bg-red-400 px-2 rounded-sm' type="button" onClick={() => handleRemoveField(index)}>-</button>
                    )}
                </div>
            ))}
            <div className='flex gap-4'>
                <button className='bg-green-400 rounded-md p-2' type="button" onClick={handleAddField}>Add Field</button>
                <button className='bg-orange-400 rounded-md p-2' type="submit">Submit</button>
            </div>
        </form>
    );
};

export default FormWithDynamicFields;
