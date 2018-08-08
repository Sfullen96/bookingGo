import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

/*
* The very first, basic test.
* Provided by create-react-app
* */
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
