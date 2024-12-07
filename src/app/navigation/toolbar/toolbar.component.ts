import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbMenuItem, NbMenuService, NbSidebarService, NbThemeService} from "@nebular/theme";
import {EMPTY, map, Observable, Subject, takeUntil} from "rxjs";
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
    link: "treatment-abroad/logout"
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
      title: "Заявления",
      icon: "folder-outline",
      expanded: false,
      children: [
        {
          title: "Заявления",
          link: "/treatment-abroad/orders"
        }
      ]
    },
    {
      title: "Документи",
      icon: "folder-outline",
      expanded: false,
      children: [
        {
          title: 'Входиране на документ',
          link: "/treatment-abroad/documents/documents-order",
        },
      ]
    },
    {
      title: "Финанси/Бюджет",
      icon: "pie-chart-outline",
      link: "/treatment-abroad/finance"
    },
    {
      title: "Счетоводство",
      icon: "pantone-outline",
      link: "/treatment-abroad/accounting"
    },
    {
      title: "Номенклатури",
      expanded: false,
      icon: "bookmark-outline",
      children: [
        {
          title: 'Бланки на документи',
          link: '/treatment-abroad/nomenclatures/templates'
        },
        {
          title: 'Видове медицински услуги',
          children: [
            {
              title: 'Видове медицински услуги за деца в България',
              link: '/treatment-abroad/nomenclatures/med-services-children'
            },
            {
              title: 'Медицински услуги за деца (за чужбина)',
              link: '/treatment-abroad/nomenclatures/med-services-children-abroad',

            },
            {
              title: 'Медицински услуги за възрастни',
              link: '/treatment-abroad/nomenclatures/med-services-adults',
            },
          ]
        },
        {
          title: "Системни",
          children: [
            {
              title: 'Статус на преписка',
              link: '/treatment-abroad/nomenclatures/doc',

            }, {
              title: 'Статус на решение',
              link: '/treatment-abroad/nomenclatures/decision',

            },
            {
              title: 'Видове документи',
              link: "/treatment-abroad/nomenclatures/documents"

            }]
        },
        {
          title: "НЗОК лекарствен списък",
          link: '/treatment-abroad/nomenclatures/medicine-list',
        },
        {
          title: "НЗОК Медицински изделия",
          link: "/treatment-abroad/nomenclatures/implants"
        },
        {
          title: "ATC кодове",
          link: '/treatment-abroad/nomenclatures/atc',
        },
        {
          title: 'МКБ',
          link: "/treatment-abroad/nomenclatures/mcb-codes"
        },
        {
          title: 'Лекарствени продукти по  чл. 266а, ал.2',
          link: "/treatment-abroad/nomenclatures/drug-products"
        },
        {
          title: 'Помощни средства',
          link: '/treatment-abroad/nomenclatures/psmi',
        },
        {
          title: 'Лечебни заведения',
          children: [
            {
              title: 'Лечебни заведения в България',
              link: "/treatment-abroad/nomenclatures/hospitals"

            },
            {
              title: 'Лечебни заведения в чужбина',
              link: "/treatment-abroad/nomenclatures/abroad-hospitals"

            },
            {
              title: 'Лечебни заведения по чл.58 от Наредба 2',
              link: "/treatment-abroad/nomenclatures/hospitals-bulgaria"

            },
            {
              title: 'Експертни центрове за редки заболявания',
              link: "/treatment-abroad/nomenclatures/rare-diseases"

            },
          ]
        },
        {
          title: 'Експерти',
          children: [
            {
              title: 'Външни експерти',
              link: "/treatment-abroad/nomenclatures/external-experts"

            },
            {
              title: 'Експертни съвети',
              link: '/treatment-abroad/nomenclatures/experts',

            }
          ]
        },
        {
          title: 'Комисии',
          children: [
            {
              title: 'Профилирана комисия по трансплантология',
              link: '/treatment-abroad/nomenclatures/transplantology',

            },
            {
              title: 'Комисия за лечение в чужбина за деца',
              link: '/treatment-abroad/nomenclatures/commission-children-abroad',
            },
            {
              title: 'Комисия за лечение в България',
              link: '/treatment-abroad/nomenclatures/commission-bulgaria',
            },
            {
              title: 'Комисия за лица над 18-годишна възраст',
              link: '/treatment-abroad/nomenclatures/commission-adult'
            },
          ]
        },
        {
          title: 'Номенклатури, използвани до сега',
          children: [
            {
              title: 'Апарат/Уред',
              link: '/treatment-abroad/nomenclatures/devices',
            },
            {
              title: 'Диетични храни',
              link: '/treatment-abroad/nomenclatures/diet-foods',

            },
            {
              title: 'Генетични изследвания',
              link: '/treatment-abroad/nomenclatures/genetic-research',

            },
            {
              title: 'Лекарства Наредба 2',
              link: '/treatment-abroad/nomenclatures/medicine-regulation',
            },
            {
              title: 'Медицински изделия по чл.7, ал.1, т.4',
              link: "/treatment-abroad/nomenclatures/medical-supplies"
            }
          ]
        },
      ]
    },
    {
      title: "Справки",
      expanded: false,
      icon: "archive-outline",
      children: [
        {
          title: 'Заявления, деца',
          link: '/treatment-abroad/references/orders-children'
        },
        {
          title: 'Заявления, възрастни',
          link: '/treatment-abroad/references/orders-adults'
        },
        {
          title: 'Издадени заповеди, деца',
          link: '/treatment-abroad/references/precepts-children'
        },
        {
          title: 'Издадени заповеди, възрастни',
          link: '/treatment-abroad/references/precepts-adults'
        },
        {
          title: 'Заявления по заболявания по МКБ група',
          link: '/treatment-abroad/references/diseases'
        },
        {
          title: 'Заявления по заболявания по МКБ код',
          link: '/treatment-abroad/references/medications'
        },
        {
          title: 'Заявления по държава, деца',
          link: '/treatment-abroad/references/country-children'
        },
        {
          title: 'Заявления по държава, възрастни ',
          link: '/treatment-abroad/references/country-adults'
        },
        {
          title: 'Външни експерти, представени доклади',
          link: '/treatment-abroad/references/external-experts'
        },
        {
          title: 'Справка, външен експерт',
          link: '/treatment-abroad/references/external-experts-check'
        },
      ]
    },
    {
      title: "Аналитични справки",
      expanded: false,
      icon: "bar-chart-outline",
      children: [
        {
          title: "Лекарствен продукт с INN по чл. 7, ал. 1, т. 3 - чл. 266Б от ЗЛПХМ",
          link: '/treatment-abroad/references-analytical/266B'
        },
        {
          title: "Лекарствен продукт с INN по чл. 7, ал. 1, т. 3, - чл. 266А от ЗЛПХМ неразрешени",
          link: '/treatment-abroad/references-analytical/266A'
        },
        {
          title: "Лекарствен продукт с INN по чл.7, ал. 1, т.2/Диетични храни за специални медицински цели по чл.7, ал. 1, т.2 и Лекарствен продукт с INN по чл.7, ал. 1, т.2А",
          link: '/treatment-abroad/references-analytical/drug-diet-food',
        },
        {
          title: "Генетични изследвания",
          link: '/treatment-abroad/references-analytical/genetic-research',
        },
        {
          title: "Медицински изделия по чл.7, ал. 1, т.4",
          link: '/treatment-abroad/references-analytical/medical-supplies'
        },
        {
          title: "Апарат/уред за индивидуална употреба по чл.7, ал. 1, т.5",
          link: '/treatment-abroad/references-analytical/device'
        },
        {
          title: "Лечение на деца в лечебни заведения в чужбина",
          link: "/treatment-abroad/references-analytical/children-abroad"
        },
        {
          title: "Лечение на лица над 18 г.",
          link: "/treatment-abroad/references-analytical/adults"
        },
      ]
    },
    {
      title: "Администриране",
      icon: "settings-outline"
    },
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
