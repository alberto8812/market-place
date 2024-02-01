
export interface User {
    id:             string,   
    name:           string | null,
    password:       string | null,
    roles:          string,      
    isActive:       Boolean,   
    email:          string | null,   
    emailVerified?: Date | null,
    image?:         string | null,
  
}

