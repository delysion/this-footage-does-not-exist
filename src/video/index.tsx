import { Composition, registerRoot } from 'remotion';
import '../ui/style.css';
import { Film } from './video';
const Root=()=> <Composition id="Film" component={Film} durationInFrames={1752} fps={24} width={1600} height={900}/>;
registerRoot(Root);
