export interface IBible {
    [testament: string]: {
      [book: string]: {
        [chapter: string]: IVerse[];
      };
    };
  }

export interface IBibleBook {
    title: string
    normalizedTitle: string
    chaptersCount: number
}

export interface IVerse {
    title: string;
    number: string;
    content: string;
    reference?: string;
    createdAt?: number
}

export interface IVerseReference {
    testament: TTestament
    book: string
    chapter: string
    verse: string
    createdAt: number
}

export type TTestament = 'old-testament'|'new-testament'