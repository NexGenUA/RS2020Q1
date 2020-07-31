import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Word {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
  wordsPerExampleSentence: number;
}

const API_URL = 'https://afternoon-falls-25894.herokuapp.com/words';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  constructor(private http: HttpClient) {}

  getWords(level, page): Observable<Word[]> {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('group', level);

    return this.http.get<Word[]>(API_URL, {
      params,
    });
  }
}
