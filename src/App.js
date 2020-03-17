import React, { Component } from 'react';
import './app.scss';
import './rl-icon.scss';
import ListView from './components/listView/listView';

class App extends Component {
  render() {
    return (
      <div className="flex-body full-page">

        <ListView/>


        {/*<header className="flex-header"></header>*/}
        {/*<div className="flex-blank-content">*/}
        {/*</div>*/}
        {/*<footer id="footer" className="flex-footer clearfix">*/}
        {/*  <div className="footer-container-iq">*/}
        {/*    <div className="copyright">*/}
        {/*      © 2019 SomeFake Co, Inc. All Rights Reserved.*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</footer>*/}
      </div>
    );
  }
}

export default App;
