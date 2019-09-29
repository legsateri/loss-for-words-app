import React from 'react';
import { Link } from 'react-router-dom';
import './TopNav.css';

class TopNav extends React.Component {
    render() {
        return (
            <>
                <nav role="navigation" className="navigation">
                    <ul className="nav_list">
                        <li><Link to='/'><img src={require('./logo.png')} /></Link></li>
                        <li className="nav_options"><Link className='link_style' to='/prompts' style={{ textDecoration: 'none' }} >Find A Prompt</Link></li>
                        <li className="nav_options"><Link className= 'link_style' to='/add-prompt' style={{ textDecoration: 'none' }}>Create A Prompt</Link></li>
                        {/* TODO: Enable signup/login <li className="nav_options"> <Link to='/login'> Account </Link> </li> */}
                    </ul>
                </nav>
            </>
        )
    }
}

export default TopNav;