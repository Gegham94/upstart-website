import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'us-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements AfterContentInit {
  @Input()
  public isSteps: boolean = false;

  @Input()
  public isStrict: boolean = true;

  @Input()
  public manuallyControlled: boolean = false;

  @ContentChildren(TabComponent)
  public tabs!: QueryList<TabComponent>;

  public activeTabIndex: number = -1;

  public ngAfterContentInit(): void {
    let activeTabs = this.tabs.filter((tab) => tab.active);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  public selectTab(selectedTab: TabComponent): void {
    this.tabsArray.forEach((tab) => (tab.active = false));
    selectedTab.active = true;
    this.activeTabIndex = this.tabsArray.indexOf(selectedTab);
  }

  public nextTab(): void {
    const tabsArray = this.tabsArray;
    const activeIndex = tabsArray.findIndex((tab) => tab.active);

    if (activeIndex !== this.tabs.toArray().length - 1) {
      this.selectTab(tabsArray[activeIndex + 1]);
    }
  }

  public prevTab(): void {
    const tabsArray = this.tabsArray;
    const activeIndex = tabsArray.findIndex((tab) => tab.active);

    if (activeIndex !== 0) {
      this.selectTab(tabsArray[activeIndex - 1]);
    }
  }

  public get tabsArray(): Array<TabComponent> {
    return this.tabs.toArray();
  }
}
