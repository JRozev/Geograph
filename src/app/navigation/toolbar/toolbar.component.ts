import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbMenuItem, NbSidebarService, NbThemeService} from "@nebular/theme";
import {map, Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private sidebarService: NbSidebarService,
              private router: Router,
              private themeService: NbThemeService) {
  }

  userMenu = [{
    title: 'Изход',
    link: "/logout"
  }];

  languageMenu = [{title: "Български", data: 'bg'}, {title: "English", data: 'en'}]

  themes = [
    {
      value: 'default',
      name: 'Светъл',
    },
    {
      value: 'dark',
      name: 'Тъмен',
    },
    {
      value: 'cosmic',
      name: 'Космически',
    },
    {
      value: 'corporate',
      name: 'Корпоративен',
    },
  ];

  currentTheme = 'default';
  menuItemsTest: NbMenuItem[] = [
    {
      title: "Всички държави",
      icon: "folder-outline",
      link: "/all-countries" // Replace with the actual route link
    },
    {
      title: "Документи",
      icon: "folder-outline",
      expanded: false,
      children: [
        {
          title: "Входиране на документ",
          link: "/treatment-abroad/documents/documents-order"
        }
      ]
    },
    {
      title: "Номенклатури",
      icon: "bookmark-outline",
      expanded: false,
      children: [
        {
          title: "Бланки на документи",
          link: "/treatment-abroad/nomenclatures/templates"
        },
        {
          title: "Видове медицински услуги",
          children: [
            {
              title: "Видове медицински услуги за деца в България",
              link: "/treatment-abroad/nomenclatures/med-services-children"
            },
            {
              title: "Медицински услуги за деца (за чужбина)",
              link: "/treatment-abroad/nomenclatures/med-services-children-abroad"
            },
            {
              title: "Медицински услуги за възрастни",
              link: "/treatment-abroad/nomenclatures/med-services-adults"
            }
          ]
        }
      ]
    }
  ];

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    this.themeService.onThemeChange()
      .pipe(
        map(({name}) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }



}
