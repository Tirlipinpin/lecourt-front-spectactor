export interface Person {
    id: number
    firstName: string
    lastName: string
    birthDate: string
};

export interface Actor {
    node: Person
    role: string
};

export interface Staff {
    node: Person
    job: string
};

export interface Image {
    id: string
    type: string
    path: string
};

export interface Genre {
    id: string
    name: string
}

export interface File {
    name: string
    format: string
    path: string
}

// Movie model relations
export interface ActorRelation {
    node: Person
    role: string
}
export interface StaffRelation {
    node: Person
    job: string
}
export interface DirectorRelation {
    node: Person
}
export interface ImageRelation {
    file: Image
}
export interface GenreRelation {
    node: Genre
}
export interface FileRelation {
    file: File
}

export interface Movie {
    id: number
    title: string
    releaseDate: string
    summary: string
    summarySmall: string
    duration: number
    createdAt: string
    updatedAt: string
    actors: ActorRelation[]
    directors: DirectorRelation[]
    staff: StaffRelation[]
    posters: ImageRelation[]
    genres: GenreRelation[]
    files: FileRelation[],
    result_quality: number
};
