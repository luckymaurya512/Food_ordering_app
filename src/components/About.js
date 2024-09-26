import User from "./User";
import UserClass from "./UserClass";

const About = () => {
    return (
        <div>
            <h1>About Us</h1>
            <h2>Welcome to About Us page </h2>
            {/* <User name={"Lucky Maurya"} /> */}
            <UserClass name={"Lucky"}/>
        </div>
    );
};

export default About;