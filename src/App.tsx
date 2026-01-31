import { ReactFlowProvider } from '@xyflow/react';
import BlueprintCanvas from './components/BlueprintCanvas';

function App() {
  return (
    <ReactFlowProvider>
      <BlueprintCanvas />
    </ReactFlowProvider>
  );
}

export default App;
