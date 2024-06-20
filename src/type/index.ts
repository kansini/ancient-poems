export interface IPoem {
    id: string;
    title: string;
    author: string;
    paragraphs: string[];
}

export interface IAuthor {
    id: string;
    name: string;
    desc: string;
}

export interface IPoetry {
    id: number;
    title: string;
    desc: string;
}