import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import styles from './ConsumerOneWebPart.module.scss';
import * as strings from 'ConsumerOneWebPartStrings';

import { ICounterService, CounterService } from "../../services/CounterService";

export interface IConsumerOneWebPartProps {
  description: string;
}

export default class ConsumerOneWebPart extends BaseClientSideWebPart<IConsumerOneWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.consumerOne }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
                <span class="counterValue ${ styles.title }"></span>
            </div>
          </div>
        </div>
      </div>`;

      //const counterServiceInstance: ICounterService = this.context.serviceScope.consume(CounterService.serviceKey);

      const currentWebPartServiceScope = this.context.serviceScope.startNewChild();
      const counterServiceInstance: ICounterService = currentWebPartServiceScope.createDefaultAndProvide(CounterService.serviceKey);
      currentWebPartServiceScope.finish();

      const currentCounterValue : string = `Current counter value: ${counterServiceInstance.increaseAndReturnCount()}`;
      this.domElement.getElementsByClassName("counterValue")[0].textContent = currentCounterValue;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
