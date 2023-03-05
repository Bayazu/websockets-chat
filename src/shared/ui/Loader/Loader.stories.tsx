import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AppLink } from 'shared/ui/AppLink/AppLink';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Loader } from 'shared/ui/Loader/Loader';

export default {
    title: 'shared/Loader',
    component: AppLink,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [ThemeDecorator(Theme.LIGHT)];
export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
