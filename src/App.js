import React from 'react';
import AddPromptForm from './AddPromptForm/AddPromptForm';
import AppContext from './AppContext';
import { Route } from 'react-router-dom';
import Prompt from './Prompt/Prompt';
import PromptList from './PromptList/PromptList';
import MainPage from './MainPage/MainPage';
import Account from './Account/Account';
import LoginForm from './LoginForm/LoginForm';
import CategoryList from './CategoryList/CategoryList';
import TopNav from './TopNav/TopNav';
import Footer from './Footer/Footer';
import config from './config';
import NotFound from './NotFound/NotFound';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            prompts: [],
            comments: [],
            promptsToAdd: {},
            commentsToAdd: {}
        }
    }

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/api/prompts`),
            fetch(`${config.API_ENDPOINT}/api/comments`)
        ])
            .then(([prompts, comments]) => {
                if (!prompts.ok) {
                    return prompts.json().then(e => Promise.reject(e));
                }
                if (!comments.ok) {
                    return comments.json().then(e => Promise.reject(e));
                }
                return Promise.all([
                    prompts.json(),
                    comments.json()
                ]);
            })
            .then(([promptsJson, commentsJson]) => {
                this.setState({
                    prompts: promptsJson,
                    comments: commentsJson
                });
                console.log(promptsJson);
            })
            .catch(error => {
                console.log(error);
            })
    }

    addPrompt = (newPrompt) => {
        fetch(`${config.API_ENDPOINT}/api/prompts`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => Promise.reject(error))
                }
                return response.json();
            })
            .then(responseJson => {
                this.setState({
                    prompts: responseJson
                });
            })
            .catch(error => {
                console.log(error);
            });

        const newPrompts = [...this.state.prompts, newPrompt]
        this.setState({
            prompts: newPrompts
        });
    }

    addComment = (newComment) => {
        fetch(`${config.API_ENDPOINT}/api/comments`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => Promise.reject(error))
                }
                return response.json();
            })
            .then(responseJson => {
                this.setState({
                    comments: responseJson
                });
            })
            .catch(error => {
                console.log(error)
            })

        const newComments = [...this.state.comments, newComment]
        this.setState({
            comments: newComments
        });
    }

    renderRoutes() {
        const paths = ['/', '/add-prompt', '/account', '/login', '/prompts', '/prompts/:promptId', '/prompts/:category']

        return paths.map((path, index) => {
            if (path === '/') {
                return <Route key={index} exact path={path} component={MainPage} />
            }
            if (path === '/add-prompt') {
                return <Route key={index} path={path} component={AddPromptForm} />
            }
            // TODO: Enable signup/login
            // if (path === '/account') {
            //     return <Route key={index} path={path} component={Account} />
            // }
            // TODO: Enable signup/login
            // if (path === '/login') {
            //     return <Route key={index} path={path} component={LoginForm} />
            // }
            if (path === '/prompts') {
                return <Route key={index} exact path={path} component={PromptList} />
            }
            if (path === '/prompts/:category') {
                return <Route key={index} path={path} render={routeProps => {
                    const category = routeProps.match.params.category;
                    const selectedPrompts = this.state.prompts.filter(prompt => prompt.category === category);

                    return <CategoryList prompts={selectedPrompts} />
                }} />
            }
            if (path === '/prompts/:promptId') {
                return <Route key={index} exact path={path} component={Prompt} />
            }
        });
    }

    render() {
        const contextValue = {
            prompts: this.state.prompts,
            comments: this.state.comments,
            addPrompt: this.state.addPrompt,
            addComment: this.state.addComment
        };

        return (
            <>
                <header className="navigation">
                    <TopNav />
                </header>

                <main>
                    <NotFound>
                        <AppContext.Provider value={contextValue}>
                            <section className="main">
                                {this.renderRoutes()}
                            </section>
                        </AppContext.Provider>
                    </NotFound>
                </main>
                
                <Footer />
            </>
        );
    }
}

export default App;