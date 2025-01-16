class User {
    name: string;
    description: string;
    pfp: string;
    email: string;
    age: number;
    school: string;
    preferences: string[];
    qualifications: string[];
    favoriteListings: number[];
    public constructor(name: string, description: string, pfp: string, email: string, age: number, school: string, preferences: string[], qualifications: string[], favoriteListings: number[]) {
        this.name = name;
        this.description = description;
        this.pfp = pfp;
        this.email = email;
        this.age = age;
        this.school = school;
        this.preferences = preferences;
        this.qualifications = qualifications;
        this.favoriteListings = favoriteListings;
    }
}