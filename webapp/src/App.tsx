import React from 'react';
import './components/NavBar';
import NavBar from './components/NavBar';

// TODO Data models
// TODO JSON parsing
// TODO Services
// TODO Routing
// TODO Redux
// TODO Product table UI
// TODO Add/Edit dialog
// TODO Button theming
// TODO i18n
// TODO List paging?

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar title="Composite Products" />

        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
        </a>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
