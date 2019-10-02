import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext';
import './MainPage.css';

class MainPage extends Component {
  static contextType = AppContext;

  render() {
    const prompts = this.context.prompts.map(prompt => {
      return (
        <>
          <li key={prompt.id} className='prompt_list_item padding_prompt'>
            <h3 className='prompt_content_main'>{prompt.prompt_content}</h3>

            <Link to={`/prompts/${prompt.id}`}>
              <button className='main_page_buttons view_button'>View Prompt</button>
            </Link>

            <Link to='/prompts'><button className='main_page_buttons see_more'>See More</button></Link>
          </li>
        </>
      );
    });

    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];

    return (
      <>
          <header className='site_title' role='banner'>
            <h1 className='main_page_headline'>Loss For Words</h1>
            <h2 className='main_page_subhead'>prompt your creativity</h2>
          </header>

          <section className='random_prompt main_page_section'>
            <header>
              <ul>{randomPrompt}</ul>
            </header>
          </section>

          <section className='site_description'>
            <p className='para_one'> Got writer's block? Get the creative juices flowing with a writing prompt or two. Some are rude, some a crude, but all our prompts have just the right amount of 'tude to get you thinking outside the box.</p>
            <p className='para_two'>And if at the end of the day you really like what you had to say, share your words with your peers—you might just have the beginnings of a new story on your hands.</p>
          </section>
      </>
        );
      }
    }
    
export default MainPage;