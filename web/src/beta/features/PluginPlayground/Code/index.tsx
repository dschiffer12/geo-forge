import { Button, CodeInput } from "@reearth/beta/lib/reearth-ui";
import { styled } from "@reearth/services/theme";
import { FC } from "react";

type Props = {
  fileTitle: string;
  sourceCode: string;
  onChangeSourceCode: (value: string | undefined) => void;
  executeCode: () => void;
};

const getLanguageByFileExtension = (fileTitle: string) => {
  const ext = fileTitle.split(".").pop();
  switch (ext) {
    case "js":
      return "javascript";
    case "yml":
    case "yaml":
      return "yaml";
    default:
      return "plaintext";
  }
};

const Code: FC<Props> = ({
  fileTitle,
  sourceCode,
  onChangeSourceCode,
  executeCode
}) => {
  return (
    <Wrapper>
      <Header>
        <Button icon="playRight" iconButton onClick={executeCode} />
        <p>Widget</p>
      </Header>
      <CodeInput
        language={getLanguageByFileExtension(fileTitle)}
        value={sourceCode}
        onChange={onChangeSourceCode}
      />
    </Wrapper>
  );
};

const Header = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
}));

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.small,
  height: "100%"
}));

export default Code;
