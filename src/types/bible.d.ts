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
}

export interface IVerseReference {
    book: string
    chapter: string
    verse: string
}