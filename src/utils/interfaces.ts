export interface IIcon{ // Interface for the icon object
    id?: number | null; // Unique identifier for the icon
    name: string; // Name of the icon
    size?: 'small' | 'medium' | 'large' | null; // Size of the icon
    img: string; // URL of the icon image
    appUrl?: string; // URL to open when the icon is clicked
    action?: () => void; // Function to execute when the icon is clicked
    type: 'tb' | 'dt' //taskbar or desktop 
}

