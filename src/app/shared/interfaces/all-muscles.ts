

export interface AllMuscles {
    message: string;           
    muscleGroup: MuscleGroup; 
    muscles: Muscle[];         
}

export interface Muscle {
    _id: string;
    name: string;
    image: string | null;      
    
}

export interface MuscleGroup {
    _id: string;
    name: string;
}