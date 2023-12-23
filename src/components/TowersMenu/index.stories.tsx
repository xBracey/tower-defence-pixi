import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { TowersMenu } from "./index";

const meta: Meta<typeof TowersMenu> = {
  component: TowersMenu,
};

export default meta;
type Story = StoryObj<typeof TowersMenu>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {};
