import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';

import CustomTaskList from './components/CustomTaskList/CustomTaskList';

const PLUGIN_NAME = 'DuckyCrmEmbeddedPlugin';

export default class DuckyCrmEmbeddedPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
    this.crmRef = React.createRef();
  }

  // Helper function for posting messages to the CRM
  updateCRM(_profileId) {
    this.crmRef.current.contentWindow.postMessage(
      {id: _profileId},
      'https://duckycrm-7409-dev.twil.io'
    );
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    // remove the existing CRMContainer
    flex.AgentDesktopView.Panel2.Content.remove('container');

    // add our new iFrame container with a ref
    flex.AgentDesktopView.Panel2.Content.add(
      <iframe
        key="crmIframe"
        ref={this.crmRef}
        src="https://duckycrm-7409-dev.twil.io/spa.html"
        style={{ height: '100vh' }}
      />
    );

    // post message whenever a new task is selected
    flex.Actions.addListener('beforeSelectTask', (_payload) => {
      if (
        _payload.task &&
        _payload.task.attributes &&
        _payload.task.attributes.account_number
      ) {
        this.updateCRM(_payload.task.attributes.account_number);
      } else {
        this.updateCRM(null);
      }
    });
  }
}
