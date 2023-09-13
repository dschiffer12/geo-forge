import { Meta, StoryObj } from "@storybook/react";

import AssetCard from ".";

const meta: Meta<typeof AssetCard> = {
  component: AssetCard,
};

export default meta;

type Story = StoryObj<typeof AssetCard>;

export const Default: Story = {
  args: {
    selected: false,
    url: `/sample.svg`,
    name: "hoge",
  },
};

export const Selected: Story = {
  args: {
    url: `/sample.svg`,
    name: "hoge",
    selected: true,
  },
};