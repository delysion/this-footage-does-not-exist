import { Composition, registerRoot } from 'remotion';
import { Film } from './video';
const Root=()=> <Composition id="Film" component={Film} durationInFrames={1584} fps={24} width={1600} height={900}/>;
registerRoot(Root);
