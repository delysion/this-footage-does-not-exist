import { Composition, registerRoot } from 'remotion';
import '../ui/style.css';
import { Film, FilmA } from './video';
const Root=()=> <>
  <Composition id="Film" component={Film} durationInFrames={1704} fps={24} width={1600} height={900}/>
  <Composition id="FilmA" component={FilmA} durationInFrames={1752} fps={24} width={1600} height={900}/>
</>;
registerRoot(Root);
