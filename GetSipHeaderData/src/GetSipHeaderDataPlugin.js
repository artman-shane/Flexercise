import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';
import { Heading } from "@twilio-paste/core/heading";
import { Icon, Tab, withTaskContext } from "@twilio/flex-ui";
// import { Icon } from "@twilio-paste/core";
import CustomTaskList from './components/CustomTaskList/CustomTaskList';
import { object } from 'prop-types';

const PLUGIN_NAME = 'GetSipHeaderDataPlugin';
const ConfigIcon = (props) => {
  return (
    <Icon icon="Cogs" />
  );
};

const CreateInfo = ({ attributes, recursive }) => {
  // console.log("CreateInfoTop",attributes)
  return (<div>
    {Object.entries(attributes).map(([key, value]) => (
      <div key={key}>
        {recursive == false && <Heading as="h2" variant="heading10">{key}</Heading>}
        {
          typeof value === "object" && value && value != null ?
            <CreateInfo recursive={true} attributes={value} />
            : <span>{value}</span>
        }

      </div>
    ))}
  </div>
  )
};

const AttributesInfo = (props) => {
  // Object.keys(props.task.attributes).map((key, index) => {
  //   // console.log({ key }, { index });
  // });


  // props.task.attributes.callTrigger.foreach((e)).then(console.log(test));
  return (
    <Tab icon={<ConfigIcon />} iconActive={<ConfigIcon />} key="sip-header-variables">
      <CreateInfo recursive={false} attributes={props.task.attributes} key="CreateInfo" />
    </Tab>);
}

export default class GetSipHeaderDataPlugin extends FlexPlugin {
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

    flex.TaskCanvasTabs.Content.add(
      <AttributesInfo key="anotherComponent" />
    );

  }
}
