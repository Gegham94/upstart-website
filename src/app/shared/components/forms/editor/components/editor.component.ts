import {
  Component,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { CKEditor4, CKEditorComponent } from 'ckeditor4-angular';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { SettingsService } from '../../../../services/settings/settings.service';

@Component({
  selector: 'us-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi: true,
    },
  ],
})
export class EditorComponent implements OnChanges, ControlValueAccessor {
  private _value: string = '';

  public errors?: ValidationErrors;

  @ViewChild('ckEditor')
  public editor!: CKEditorComponent;

  @Input()
  public disabled?: boolean = false;

  @Input()
  public placeholder?: string = '';

  @Input()
  public label?: string = '';

  @Input()
  public set value(val) {
    this._value = val;
  }

  @Input()
  public requiredPlaceholder: boolean = false;

  @Input()
  public editable?: boolean = false;

  @Input()
  public toggleIcon?: string = '';

  @Input()
  public readonly?: boolean = false;

  @Output()
  public clickIconEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener('getErrors', ['$event'])
  public getErrors(event: ValidationErrors) {
    this.errors = event;
  }

  constructor(private settingsService: SettingsService) {
    this.settingsService.readonly$.subscribe((val) => {
      if (this.editable) {
        this.readonly = val;
      }
    });
  }

  public clickIcon() {
    this.readonly = false;
    this.clickIconEvent.emit(true);
  }

  public editorConfig!: CKEditor4.Config;

  public registerOnChange(fn: () => string): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => string): void {
    this.onTouched = fn;
  }

  public writeValue(obj: string): void {
    this.value = obj;
  }

  private onChange(value: string): string {
    return value;
  }

  public onTouched() {}

  public ngOnChanges(): void {
    this.editorConfig = {
      extraPlugins: 'editorplaceholder,format,autocomplete,emoji,justify,wysiwygarea',
      editorplaceholder: this.placeholder,
      fontSize_defaultLabel: '12px',
      delayIfDetached: true,
      font_style: {
        element: 'p',
        styles: { 'font-size': '#(size)' },
        overrides: [{ element: 'font', attributes: { size: null } }],
      },
      height: 102,
      toolbar: [
        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline'] },
        {
          name: 'justify',
          items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
        },
        { name: 'links', items: [] },
        { name: 'insert', items: ['Link', 'Unlink', 'EmojiPanel'] },
      ],
      contentsCss: [
        'body { font-family: Montserrat, Helvetica, sans-serif; font-size: 14px; color: #333; margin: 20px;' +
          'line-height: 1.6;' +
          'word-wrap: break-word; }',
      ],
      removeButtons:
        'Source,Save,Templates,NewPage,Preview,Print,Cut,Copy,Paste,PasteFromWord,PasteText,Redo,Undo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Strike,Subscript,Superscript,RemoveFormat,CopyFormatting,NumberedList,BulletedList,Outdent,Indent,CreateDiv,Blockquote,BidiLtr,BidiRtl,Language,Anchor,Flash,Table,HorizontalRule,SpecialChar,PageBreak,Iframe,Smiley,Styles,Format,Font,FontSize,BGColor,TextColor,Maximize,ShowBlocks,About',
    };
    this.editorConfig['placeholder'] = `${this.placeholder}${this.requiredPlaceholder ? ' *' : ''}`;
  }

  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  public valueChange(event: CKEditor4.EventInfo): void {
    this.value = String(event);
    this.onChange(this.value);
  }

  public get value() {
    return this._value;
  }
}
