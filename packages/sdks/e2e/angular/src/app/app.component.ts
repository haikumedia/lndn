import { Component } from '@angular/core';
import {
  _processContentResult,
  fetchOneEntry,
  getBuilderSearchParams,
} from '@builder.io/sdk-angular';
import { getProps } from '@sdk/tests';
import { HelloComponent } from './hello.component';

interface BuilderProps {
  apiVersion: string;
  canTrack?: boolean;
  trustedHosts?: undefined;
  apiKey: string;
  model: string;
  content: any;
}

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="content; else notFound">
      <content
        [model]="model"
        [content]="content"
        [apiKey]="apiKey"
        [trustedHosts]="trustedHosts"
        [canTrack]="canTrack"
        [customComponents]="customComponents"
      ></content>
    </ng-container>

    <ng-template #notFound>
      <div>404 - Content not found</div>
    </ng-template>
  `,
})
export class AppComponent {
  title = 'angular';
  apiVersion: BuilderProps['apiVersion'] = 'v3';
  canTrack: BuilderProps['canTrack'];
  trustedHosts: BuilderProps['trustedHosts'];
  apiKey: BuilderProps['apiKey'] = 'abcd';
  model: BuilderProps['model'] = 'page';
  content: BuilderProps['content'];

  customComponents = [
    {
      component: HelloComponent,
      name: 'Hello',
      inputs: [],
    },
  ];

  async ngOnInit() {
    const urlPath = window.location.pathname || '';

    const builderProps = await getProps({
      pathname: urlPath,
      _processContentResult,
      options: getBuilderSearchParams(
        new URLSearchParams(window.location.search)
      ),
      fetchOneEntry,
    });

    if (!builderProps) {
      return;
    }

    this.content = builderProps.content;
    this.canTrack = builderProps.canTrack;
    this.trustedHosts = builderProps.trustedHosts;
    this.apiKey = builderProps.apiKey;
    this.model = builderProps.model;
    this.apiVersion = builderProps.apiVersion;
  }
}
