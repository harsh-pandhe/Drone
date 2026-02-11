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
        id: 'lidar',
        title: 'LiDAR Mapping',
        description:
            'Laser-based remote sensing for penetrating vegetation and capturing ground topology with unmatched precision.',
        accuracy: '+/- 2cm',
        speed: '500 acres/day',
        features: ['Point Cloud', 'DTM/DSM', 'Vegetation Analysis'],
    },
    {
        id: 'ortho',
        title: 'Photogrammetry',
        description:
            'High-resolution orthomosaics created from thousands of stitched aerial images for comprehensive site documentation.',
        accuracy: '1cm GSD',
        speed: '1200 acres/day',
        features: ['2D Orthomosaics', '3D Mesh', 'Texture Mapping'],
    },
    {
        id: 'thermal',
        title: 'Thermal Inspection',
        description:
            'Radiometric thermal imaging to detect heat leaks, solar panel defects, and moisture intrusion patterns.',
        accuracy: '0.04°C Sensitivity',
        speed: 'Rapid Scan',
        features: ['Solar Inspection', 'Roof Moisture', 'Utility Lines'],
    },
];
