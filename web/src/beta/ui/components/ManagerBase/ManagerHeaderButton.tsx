import { FC } from "react";

import { Button, ButtonProps } from "@reearth/beta/lib/reearth-ui";

export type ManagerHeaderButtonProps = ButtonProps & {
  managerSize?: "medium" | "large";
};

export const ManagerHeaderButton: FC<ManagerHeaderButtonProps> = ({
  managerSize = "medium",
  ...props
}) => {
  return <Button size={managerSize === "medium" ? "small" : "normal"} {...props} />;
};
