import React from "react";

class UserClass extends React.Component{
    constructor(props){
        super(props);

        this.state={
            userInfo:{
                name:" ",
                location: " ",
            },
        };
    }

    async componentDidMount(){
        const data=await fetch("https://api.github.com/users/luckymaurya512");
        const json=await data.json();

        this.setState({
            userInfo:json,
        });

        console.log(json);

    }

    componentDidUpdate(){
        console.log("Component Updated");
    }

    componentWillUnmount(){
        console.log("Component Unmounted.. means components  is removed from DOM, when switched from one page to another");
    }

    render(){
        const {name, location, avatar_url, bio} =this.state.userInfo;
        return (
            <div className="users">
                <img src={avatar_url}/>
                <h2>Name : {name}</h2>
                <h2>Location : {location}</h2>
                <h3>About : {bio}</h3>  
            </div>
        );
    }
}

export  default UserClass;