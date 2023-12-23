import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { TankImage } from "./index";

const meta: Meta<typeof TankImage> = {
  component: TankImage,
};

export default meta;
type Story = StoryObj<typeof TankImage>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {};
