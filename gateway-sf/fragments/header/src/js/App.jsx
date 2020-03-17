import React from "react";

export default class Header extends React.Component {

    onClick = () => {
        alert("Header Clicked");
    };

    render() {
        return <div className="navbar navbar-dark bg-dark">
            <a className="app-logo" onClick={this.onClick} href="#">Header Component</a>
        </div>
    }
}


