import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedModule } from './feed/feed.module';
import { PostsContainerComponent } from './feed/posts-container/posts-container.component';
import { PostViewContainerComponent } from './post/post-view-container/post-view-container.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full',
    },
    {
        path: 'feed',
        component: PostsContainerComponent,
    },
    {
        path: 'post/:slug',
        component: PostViewContainerComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        FeedModule
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
