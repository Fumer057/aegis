import { HeadsUpDisplay } from './components/Dashboard/HeadsUpDisplay';
import { SpaceScene } from './components/Visualizer/SpaceScene';

function App() {
    return (
        <>
            <div className="scanline"></div>
            <SpaceScene />
            <HeadsUpDisplay />
        </>
    )
}

export default App
