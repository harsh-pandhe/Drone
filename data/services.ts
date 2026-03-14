export interface ServiceItem {
    id: string;
    title: string;
    description: string;
    accuracy: string;
    speed: string;
    features: string[];
}

export const services: ServiceItem[] = [
    {
        id: 'assembly',
        title: 'Drone Assembly',
        description:
            'Learn to build a drone from scratch — frame, motors, ESCs, flight controller, and propellers. Hands-on soldering and wiring included.',
        accuracy: 'Day 2',
        speed: 'Full Build',
        features: ['Frame Assembly', 'Motor Wiring', 'Flight Controller Setup'],
    },
    {
        id: 'basics',
        title: 'Drone Basics',
        description:
            'Understand how drones work — aerodynamics, components, battery management, safety protocols, and pre-flight checklists.',
        accuracy: 'Day 1',
        speed: 'Theory + Demo',
        features: ['Aerodynamics', 'Safety Protocols', 'Battery Management'],
    },
    {
        id: 'flying',
        title: 'Flight Training',
        description:
            'Get behind the sticks and fly! Guided practice sessions from hovering basics to confident maneuvering with instructor support.',
        accuracy: 'Day 3',
        speed: 'Hands-On',
        features: ['Hovering Drills', 'Navigation Skills', 'Emergency Landing'],
    },
];
