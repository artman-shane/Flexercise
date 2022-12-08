import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';
import FeatherTheme from './FeatherCorpTheme';

import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'FeatherCorpThemePlugin';

export default class FeatherCorpThemePlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    // set logo
    flex.MainHeader.defaultProps.logoUrl =
      'https://tangerine-toad-5117.twil.io/assets/feathercorp-logo-white.svg';
    manager.updateConfig({ 
      theme: {
        isLight: true,
        componentThemeOverrides: FeatherTheme.overrides 
      }
    });
  }
}