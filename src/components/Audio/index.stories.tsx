import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Audio } from "./index";

const meta: Meta<typeof Audio> = {
  component: Audio,
};

export default meta;
type Story = StoryObj<typeof Audio>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {};
