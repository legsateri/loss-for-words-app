import React from 'react';
import './NotFound.css';

class NotFound extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <section className='not_found_page'>
                        <h1 className='not_found_h1'>Page Not Found</h1>
                        <h2 className='not_found_h2'>Put the pen away, there are no prompts to be found here.</h2>
                        <p className="not_found">Try the nav bad, that'll take you where you want to go.</p>
                    </section>
                </>
            );
        }
        return this.props.children;
    }
}

export default NotFound;