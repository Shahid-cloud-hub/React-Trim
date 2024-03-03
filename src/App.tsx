import "./App.css";
import Socket from "./components/Socket/Socket";
import DisplayVideo from "./components/DisplayVideo/DisplayVideo";
// import VideoRangeSelector from "./components/VideoRangeSelector/VideoRangeSelector";
import FilterData from "./components/FilterData/FilterData";
import VideoMetadataExtractor from "./components/VideoChecker/VideoMetadataExtractor";

function App() {
  return (
    <div className="App">
      <DisplayVideo />
      {/* <VideoRangeSelector /> */}
      {/* <Socket /> */}
      {/* <FilterData /> */}
      {/* <VideoMetadataExtractor /> */}
    </div>
  );
}

export default App;
