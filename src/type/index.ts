export interface IPoem {
    id: string;
    title: string;
    author?: string;
    chapter?: string;
    section?: string;
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
    name: string;
    desc: string;
}

export interface IShijing {
    title: string;
    chapter: string;
    section: string;
    content: string[]

}