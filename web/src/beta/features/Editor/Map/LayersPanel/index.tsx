import { FC, useCallback, useState } from "react";

import Icon from "@reearth/beta/components/Icon";
import * as Popover from "@reearth/beta/components/Popover";
import PopoverMenuContent from "@reearth/beta/components/PopoverMenuContent";
import { Panel } from "@reearth/beta/ui/layout";
import { useT } from "@reearth/services/i18n";
import { styled } from "@reearth/services/theme";

import { useMapPage } from "../context";

import LayerItem from "./LayerItem";

const LayersPanel: FC = () => {
  const {
    layers,
    selectedLayerId,
    handleLayerDelete,
    handleLayerNameUpdate,
    handleLayerSelect,
    openDataSourceLayerCreator,
    openSketchLayerCreator,
    handleLayerVisibilityUpdate,
    handleFlyTo,
  } = useMapPage();

  const t = useT();

  const [isAddMenuOpen, setAddMenuOpen] = useState(false);

  const toggleAddMenu = useCallback(() => {
    setAddMenuOpen(prev => !prev);
  }, []);

  const handleZoomToLayer = () => {
    if (selectedLayerId) {
      handleFlyTo?.(selectedLayerId, { duration: 0 });
    }
  };

  // TODO: Refactor with new UI
  return (
    <Panel title={t("Layers")} storageId="editor-map-layers-panel" extend>
      <LayerContainer>
        <ActionWrapper>
          <StyledIcon
            onClick={handleZoomToLayer}
            icon="zoomToLayer"
            size={16}
            disabled={!selectedLayerId}
          />
          <Popover.Provider
            open={isAddMenuOpen}
            onOpenChange={toggleAddMenu}
            placement="bottom-end">
            <Popover.Trigger asChild>
              <AddLayerIcon onClick={toggleAddMenu}>
                <Icon icon="addLayer" />
              </AddLayerIcon>
            </Popover.Trigger>

            <Popover.Content>
              <PopoverMenuContent
                size="sm"
                items={[
                  {
                    name: t("Add Layer from Resource"),
                    icon: "file",
                    onClick: () => {
                      openDataSourceLayerCreator();
                      toggleAddMenu();
                    },
                  },
                  {
                    name: t("Add Sketch Layer"),
                    icon: "pencilSimple",
                    onClick: () => {
                      openSketchLayerCreator();
                      toggleAddMenu();
                    },
                  },
                ]}
              />
            </Popover.Content>
          </Popover.Provider>
        </ActionWrapper>

        {layers.map(layer => (
          <LayerItem
            key={layer.id}
            isSketchLayer={layer?.isSketch}
            id={layer.id}
            layerTitle={layer.title}
            visible={layer.visible}
            isSelected={layer.id === selectedLayerId}
            onDelete={() => handleLayerDelete(layer.id)}
            onSelect={() => handleLayerSelect(layer.id)}
            onLayerNameUpdate={handleLayerNameUpdate}
            onLayerVisibilityUpate={handleLayerVisibilityUpdate}
          />
        ))}
      </LayerContainer>
      <EmptySpace onClick={() => handleLayerSelect(undefined)} />
    </Panel>
  );
};

export default LayersPanel;

const LayerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActionWrapper = styled.div`
  flex: 1;
  display: flex;
  gap: 10px;
  justify-content: right;
`;

const AddLayerIcon = styled.div`
  padding: 2px;
  margin-bottom: 2px;
  align-self: flex-end;
  cursor: pointer;
`;
const StyledIcon = styled(Icon)<{ disabled?: boolean }>`
  padding: 3px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  color: ${({ disabled, theme }) => (disabled ? theme.content.weak : theme.content.strong)};
  border-radius: 5px;
`;

const EmptySpace = styled("div")(() => ({
  flex: 1,
}));