import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { LangInterface } from 'src/app/shared/interfaces/lang.interface';

@Component({
  selector: 'us-header-language',
  templateUrl: './header-language.component.html',
  styleUrls: ['./header-language.component.scss'],
})
export class HeaderLanguageComponent implements OnInit {
  @Input()
  public isDark: boolean = false;

  public languages = [
    { value: 'en', viewValue: 'ENG', src: 'eng_flag' },
    { value: 'hy', viewValue: 'ARM', src: 'arm_flag' },
  ];

  private readonly destroyed$: Subject<void> = new Subject<void>();

  public selectedLang: string = '';

  public selectedLanguage: LangInterface | undefined;

  constructor(private readonly translateService: TranslateService) {}

  public ngOnInit(): void {
    const lang = localStorage.getItem('lang');
    const language = this.languages.find((languageRes) => languageRes.value === lang);
    if (language) this.selectedLang = language.value;
  }

  public ngDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public changeLanguage(event: MatSelectChange) {
    localStorage.setItem('lang', event.value);
    location.reload();
  }
}
