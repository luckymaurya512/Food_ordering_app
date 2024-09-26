import { useState } from "react";

const User=(props)=>{
    const [count1] = useState(0);
    const [count2] = useState(2);
    return(
        <div className="users">
            <h2>Name : {props.name}</h2>
            <h2>Location : Azamgarh</h2>
            <h2>Instagram : @lucky__maurya</h2>
            <h3>{count1} - Example of state variable in functional component</h3>
            <h3>{count2} - Example of state variable in functional component</h3>
        </div>
    );
}

export default User;