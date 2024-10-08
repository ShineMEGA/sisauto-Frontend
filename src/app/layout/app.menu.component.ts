import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Inicio',
                items: [
                    { label: 'Escritorio', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Modulos',
                items: [
                    { label: 'Clientes', icon: 'pi pi-fw pi-user', routerLink: ['/components/clientes'] },
                    { label: 'Servicios', icon: 'pi pi-fw pi-user', routerLink: ['/components/servicios'] },
                    { label: 'Ordenes', icon: 'pi pi-fw pi-user', routerLink: ['/components/ordenes'] },
                ]
            },
        ];
    }
}
