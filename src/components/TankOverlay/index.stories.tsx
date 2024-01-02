import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { TankOverlay } from "./index";

const meta: Meta<typeof TankOverlay> = {
  component: TankOverlay,
};

export default meta;
type Story = StoryObj<typeof TankOverlay>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {};
