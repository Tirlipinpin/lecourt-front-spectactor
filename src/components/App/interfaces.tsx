export interface Person {
    id: number
    first_name: string
    last_name: string
    birth_date: string
};

export interface Actor {
    person: Person
    role: string
};

export interface Staff {
    person: Person
    job: string
};

export interface Image {
    id: string
    type: string
    path: string
};

export interface Genre {
    id: string
    code: string
}

export interface File {
    name: string
    format: string
    path: string
}

// Movie model relations
export interface ActorRelation {
    person: Person
    role: string
}
export interface StaffRelation {
    person: Person
    job: string
}
export interface DirectorRelation {
    person: Person
}
export interface ImageRelation {
    file: Image
}
export interface GenreRelation {
    genre: Genre
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
