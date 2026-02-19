import { Vector3 } from 'three';
import { OrbitState, OrbitPredictor } from './OrbitEngine';

// Simulates "Linear Regression" by taking two points and extending the line linearly
// In a real scenario, this would fit a line to a dataset of past positions.
export function predictPathLinear(current: Vector3, previous: Vector3, steps: number = 50, dt: number = 1): Vector3[] {
    const prediction: Vector3[] = [];
    const velocity = current.clone().sub(previous).divideScalar(dt); // Approx velocity

    let simulatedPos = current.clone();

    for (let i = 0; i < steps; i++) {
        // Linear extrapolation (ignoring gravity for the "Linear Regression" model to show deviation)
        const nextPos = simulatedPos.clone().add(velocity.clone().multiplyScalar(dt));
        prediction.push(nextPos);
        simulatedPos = nextPos;
    }

    return prediction;
}

// Simulates "LSTM" model which would learn the orbital mechanics non-linearly.
// Here we use the actual physics propagator but add some "noise" or "correction" to simulate
// the model's behavior (or just use the physics propagator as the "perfect" AI model).
export function predictPathLSTM(state: OrbitState, steps: number = 50, dt: number = 1): Vector3[] {
    const prediction: Vector3[] = [];
    let currentState = {
        position: state.position.clone(),
        velocity: state.velocity.clone()
    };

    for (let i = 0; i < steps; i++) {
        // The "AI" predicts the next state using physics (representing a well-trained model)
        const nextState = OrbitPredictor.propagate(currentState, dt);
        prediction.push(nextState.position);
        currentState = nextState;
    }

    return prediction;
}
