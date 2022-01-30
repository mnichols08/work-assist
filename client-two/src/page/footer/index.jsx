import React from "react";

import "./index.css";

function Footer() {
    return (
      <footer className="watermark">
        <p>
          <a href="https://github.com/mnichols08/" target="_blank">
            <i className="fas fa-code text-green" alt="code" /> with{" "}
            <i className="fas fa-heart text-red" alt="heart" /> by{" "}
            <i className="fab fa-codepen text-yellow" />
            mNichols08
          </a>
        </p>
      </footer>
    )
}

export default Footer;
