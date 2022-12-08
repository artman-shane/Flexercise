import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';

import CustomTaskList from './components/CustomTaskList/CustomTaskList';
import { Manager } from '@twilio/flex-ui';

const PLUGIN_NAME = 'DuckyCrmIntegrationPlugin';

export default class DuckyCrmIntegrationPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    manager.strings.TaskHeaderLine = '{{task.attributes.account_data.first_name}}' + ' ' +
      '{{task.attributes.account_data.last_name}}';
    manager.strings.TaskLineCallReserved = '{{task.attributes.account_data.service_level}}';
    // manager.strings.TaskLineSmsReserved = 'SMS 2nd Line';
    // manager.strings.TaskLineChatReserved = 'Chat 2nd Line';
  }
}
