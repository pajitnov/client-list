import React from 'react';
import ReactDOM from 'react-dom';
import listView from './listView';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<listView />, div);
  ReactDOM.unmountComponentAtNode(div);
});