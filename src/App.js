import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  page = 6;
  render() {
    return (
      <>
        <div>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route exact path="/general" element={<News key={"general"} pageSize={this.page} country='in' category='general' />} />
              <Route exact path="/business" element={<News key={"bisiness"} pageSize={this.page} country='in' category='business' />} />
              <Route exaxt path="/entertainment" element={<News key={"entertainment"} pageSize={this.page} country='in' category='entertainment' />} />
              <Route exaxt path="/health" element={<News key={"health"} pageSize={this.page} country='in' category='health' />} />
              <Route exaxt path="/science" element={<News key={"science"} pageSize={this.page} country='in' category='science' />} />
              <Route exaxt path="/sports" element={<News key={"sports"} pageSize={this.page} country='in' category='sports' />} />
              <Route exaxt path="/technology" element={<News key={"technology"} pageSize={this.page} country='in' category='technology' />} />
            </Routes>
          </BrowserRouter>
        </div>
      </>
    )
  }
}


