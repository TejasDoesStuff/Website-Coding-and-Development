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

    public getName() {
        return this.name;
    }

    public getDescription() {
        return this.description;
    }

    public getPfp() {
        return this.pfp;
    }

    public getEmail() {
        return this.email;
    }

    public getAge() {
        return this.age;
    }

    public getSchool() {
        return this.school;
    }

    public getPreferences() {
        return this.preferences;
    }

    public getFavoriteListings() {
        return this.favoriteListings;
    }
}

export default User;