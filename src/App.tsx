import { HeadsUpDisplay } from './components/Dashboard/HeadsUpDisplay';
import { SpaceScene } from './components/Visualizer/SpaceScene';
import { AIChatOverlay } from './components/AI/AIChatOverlay';

function App() {
    return (
        <>
            <div className="scanline"></div>
            <SpaceScene />
            <HeadsUpDisplay />
            <AIChatOverlay />
        </>
    )
}

export default App
