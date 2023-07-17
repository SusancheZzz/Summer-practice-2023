import React from "react";
import BlackAndWhiteImage from "./BlackAndWhiteImage";

class App extends React.Component {
  render() {
    return (
        <div>
          <BlackAndWhiteImage src={require ('C:/Users/chumba_2077/Pictures/923.jpg')} />
        </div>
    );
  }
}

export default App;