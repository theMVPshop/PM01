import React, { Component } from 'react';

function initNetlifyIdentity() {
    const script = document.createElement("script");

    script.src = "https://identity.netlify.com/v1/netlify-identity-widget.js";
    script.async = true;

    document.body.appendChild(script);
}

function openNetlifyModal() {
    const netlifyIdentity = window.netlifyIdentity;

    if(netlifyIdentity) {
        netlifyIdentity.open();
    } else {
        console.log("netlifyIdentity not defined")
    }
}

class NetlifyIdentity extends Component {
    componentDidMount() {
        initNetlifyIdentity();
    }
    render() {
        return(<div></div>)
    }
}

function Projects() {

    return(
        <div className="App">
            <NetlifyIdentity />
            <h2>PROJECTS</h2>
            <h3 onClick={()=>{ openNetlifyModal() }}>Login</h3>
        </div>
    )
}

export default Projects