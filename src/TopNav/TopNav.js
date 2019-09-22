import React from 'react';
import { Link } from 'react-router-dom';
import './TopNav.css';

class TopNav extends React.Component {
    render() {
        return (
            <>
                <nav role="navigation" className="navigation">
                    <ul className="nav_list">
                        <li className="nav_options"><Link to='/'>[Placeholder For Logo]</Link></li>
                        <li className="nav_options"><Link to='/prompts'>Find A Prompt</Link></li>
                        <li className="nav_options"><Link to='/add-prompt'>Create A Prompt</Link></li>
                        <li className="nav_options"><Link to='/login'>Account</Link></li>
                    </ul>
                </nav>
            </>
        )
    }
}

export default TopNav;