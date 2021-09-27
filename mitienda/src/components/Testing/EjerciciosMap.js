//utlizando Map con Keys(Keys ayudan a React a optimizar el Rendering ante cambios del array)
import React, { useState } from 'react';

const EjerciciosMap = () => {
    const [users, setUsers] = useState(
        [{ id: 1, name: 'Pepito' }, { id: 2, name: 'Perez' }]
    );
    return (
        <ul>
            {users.map(u => <li key={u.id}>{u.name}</li>)}
        </ul>
    );
};

export default EjerciciosMap;

