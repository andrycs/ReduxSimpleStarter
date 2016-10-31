import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyBmweLhCYocxwyvBvU3f48E4lnn5OI3jqo';

// Create a new component. This component should produce some HTML
// const App = () => {
class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      videos: [], 
      selectedVideo: null
    };

    this.videoSearch('this girl');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0] 
      });
    });
  }
  
  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 500);

    return (
        <div>
          <SearchBar onSearchTermChange={videoSearch} />
          <VideoDetail video={this.state.selectedVideo} />
          <VideoList 
            onVideoSelect={selectedVideo => this.setState({selectedVideo})}
            videos={this.state.videos} 
          />
        </div>
    );
  }
}

// Take this components generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));