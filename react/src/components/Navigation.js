import React from "react";

function initNetlifyIdentity() {
  const script = document.createElement("script");

  script.src = "https://identity.netlify.com/v1/netlify-identity-widget.js";
  script.async = true;

  document.body.appendChild(script);
}

function openNetlifyModal() {
  const netlifyIdentity = window.netlifyIdentity;

  if (netlifyIdentity) {
    netlifyIdentity.open();
  } else {
    console.log("netlifyIdentity not defined");
  }
}

function NetlifyIdentity() {
  React.useEffect(() => {
    initNetlifyIdentity();
  }, []);

  return <div></div>;
}

function Navigation() {
  return (
    <div className="NavHeader">
      <NetlifyIdentity />
      <h1>NAVIGATION</h1>
      <h3
        onClick={() => {
          openNetlifyModal();
        }}
      >
        Login
      </h3>
    </div>
  );
}

export default Navigation;
