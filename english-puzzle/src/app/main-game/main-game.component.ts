import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { timer } from 'rxjs';
import { WordsService } from '../services/words.service';
import { createCanvasElements } from '../helpers/create-canvas-elements';
import { FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainGameComponent implements OnInit, AfterViewInit {
  hide = false;
  isStartPage = false;
  level = 1;
  page = 1;
  isShowPageList = false;
  isShowLevelList = false;
  isShowUserBlock = false;
  userName = 'mail@mail.ru';
  currentPhrase = '';
  myControl = new FormControl('');
  options = ['one', 'two', 'three'];

  @ViewChild('gameArea') gameArea2: ElementRef;

  constructor(
    private wordService: WordsService,
    private renderer: Renderer2,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService
      .setSettings(
        '5eee6187a78bfd0017023d04',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZWU2MTg3YTc4YmZkMDAxNzAyM2QwNCIsImlhdCI6MTU5MjgwOTc1MiwiZXhwIjoxNTkyODI0MTUyfQ.sTWe6B20Ruc4XnVN3JBzRv2GCW2PcYnxcFsolHZ-mGE',
        {
          wordsPerDay: 5,
          optional: {
            assotiation: false,
            exampleText: false,
            maxWords: 35,
            transcription: false,
            translation: true,
          },
        }
      )
      .subscribe((res) => {
        console.log(res);
      });
    this.authService
      .getSettings(
        '5eee6187a78bfd0017023d04',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZWU2MTg3YTc4YmZkMDAxNzAyM2QwNCIsImlhdCI6MTU5MjgwOTc1MiwiZXhwIjoxNTkyODI0MTUyfQ.sTWe6B20Ruc4XnVN3JBzRv2GCW2PcYnxcFsolHZ-mGE'
      )
      .subscribe((res) => {
        console.log(res);
      });
    this.externalClick();
  }

  ngAfterViewInit() {}

  hideStartPage() {
    this.hide = true;
    timer(350).subscribe(() => {
      this.hide = false;
      this.isStartPage = false;
    });
  }

  changeLevel({ target }) {
    if (target?.closest('.option-item')) {
      this.level = +target.dataset.level;
      this.isShowLevelList = false;
    }
    this.setWord();
  }

  changePage({ target }) {
    if (target?.closest('.option-item')) {
      this.page = +target.dataset.page;
      this.isShowPageList = false;
    }
    this.setWord();
  }

  setWord() {
    this.wordService
      .getWords(this.level - 1, this.page - 1)
      .subscribe((data) => {
        const words = data
          .filter((word) => word.textExample.split(' ').length < 11)
          .slice(0, 10);
        this.currentPhrase = words[0].textExample;
        const wordsList = words.map((el) => el.textExample);
        const options = {
          src: 'https://nexgenua.github.io/images/level1/deerlake.jpg',
          wordsList,
        };
        createCanvasElements(options).then((res: HTMLDivElement[]) => {
          res.forEach((div: HTMLDivElement) => {
            this.renderer.appendChild(this.gameArea2.nativeElement, div);
          });
        });
      });
  }

  externalClick() {
    document.addEventListener('click', ({ target }) => {
      if (!(target as HTMLDivElement).closest('.level')) {
        this.isShowLevelList = false;
      } else if (!(target as HTMLDivElement).closest('.page')) {
        this.isShowPageList = false;
      }
      if (!(target as HTMLDivElement).closest('.user-info-name')) {
        if (!(target as HTMLDivElement).closest('.user-action')) {
          this.isShowUserBlock = false;
        }
      }

      if ((target as HTMLDivElement).closest('.options')) {
        return;
      }

      this.isShowPageList = false;
      this.isShowLevelList = false;
    });
  }

  testCreateCanvas() {
    // createCanvasElements()
  }
}
