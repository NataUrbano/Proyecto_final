import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { RegisterComponent } from "./users/auth/register/register.component";
import { LoginComponent } from "./users/auth/login/login.component";
import { BookDetailComponent } from "./users/roles/user/book-detail/book-detail.component";
import { DashboardUsersComponent } from "./users/roles/user/dashboardUsers/DashboardUsers.component";
import { SearchResultsComponent } from "./users/roles/user/search-results/search-results.component";
import { CategoryViewComponent } from "./users/roles/user/category-view/category-view.component";


const routes: Routes = [
    {
        path:'',
        component: LayoutComponent,
        children:[
            {
                path: 'Home',
                component: HomeComponent
            },
            {
                path: 'About',
                component:AboutComponent
            },
            {
                path: 'register',
                component:RegisterComponent
            },
            {    
                path: 'login',
                component:LoginComponent
            },
            {
                path: 'bookdetail',
                component:BookDetailComponent   
            },
            {
                path: "dashboardUser",
                component:DashboardUsersComponent
            },
            {
                path: "searchresults",
                component:SearchResultsComponent
            },
            {
                path: "categoryView",
                component:CategoryViewComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
    })
    export class LayoutsRoutingModule { }

