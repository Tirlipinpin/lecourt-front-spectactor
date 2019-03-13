export interface Person {
    id: number,
    firstName: string,
    lastName: string,
    birthDate: string,
};

export interface Actor {
    person: Person,
    role: string,
};

export interface Staff {
    person: Person,
    role: string,
};

export interface Image {

};

export interface Movie {
    id: number,
    title: string,
    releaseDate: string,
    summary: string,
    summarySmall: string,
    duration: number,
    createdAt: string,
    updatedAt: string,
    actors: Actor[],
    directors: Person[],
    staff: Staff[],
    images: Image[],
};
