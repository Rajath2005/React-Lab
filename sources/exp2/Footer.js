import React from 'react';
function Footer(props){
    return(
        <footer>
            <p>{props.tagline}</p>
            <small>{props.copyright}</small>
        </footer>
    );
}
export default Footer;