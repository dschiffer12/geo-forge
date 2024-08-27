import { useCallback, useEffect, useState } from "react";

import { Tab } from "../../Navbar";
import { Device } from "../Widgets/WASToolsPanel/Devices";

import { LayerSelectProps } from "./useLayers";

export type VisualizerProjectType = "default" | "story";

type Props = {
  tab: Tab;
  handleLayerSelect: (props: LayerSelectProps) => void;
  handleCoreLayerSelect: (props: LayerSelectProps) => void;
  handleSceneSettingSelect: (collection?: string) => void;
};

export default ({
  tab,
  handleLayerSelect,
  handleCoreLayerSelect,
  handleSceneSettingSelect,
}: Props) => {
  const [currentProjectType, setCurrentProjectType] =
    useState<VisualizerProjectType>(tab === "story" ? "story" : "default");

  const handleProjectTypeChange = useCallback(
    (projectType: VisualizerProjectType) => setCurrentProjectType(projectType),
    [],
  );

  useEffect(() => {
    switch (tab) {
      case "story":
        if (currentProjectType !== "story") {
          setCurrentProjectType("story");
        }
        break;
      case "map":
      case "widgets":
        if (currentProjectType === "story") {
          setCurrentProjectType("default");
        }
        break;
    }
  }, [tab, currentProjectType, setCurrentProjectType]);

  // ui selections
  const handleLayerSelectFromUI = useCallback(
    (layerId?: string) => {
      handleSceneSettingSelect(undefined);
      handleLayerSelect({ layerId });
    },
    [handleLayerSelect, handleSceneSettingSelect],
  );

  const handleCoreLayerSelectFromUI = useCallback(
    (props: LayerSelectProps) => {
      handleSceneSettingSelect(undefined);
      handleCoreLayerSelect(props);
    },
    [handleCoreLayerSelect, handleSceneSettingSelect],
  );

  const handleSceneSettingSelectFromUI = useCallback(
    (collection?: string) => {
      handleLayerSelect(undefined);
      // change to select layer could effect the scene setting selection
      requestAnimationFrame(() => {
        handleSceneSettingSelect(collection);
      });
    },
    [handleLayerSelect, handleSceneSettingSelect],
  );

  // modals
  const [dataSourceLayerCreatorShown, setDataSourceLayerShown] =
    useState(false);
  const openDataSourceLayerCreator = useCallback(
    () => setDataSourceLayerShown(true),
    [],
  );
  const closeDataSourceLayerCreator = useCallback(
    () => setDataSourceLayerShown(false),
    [],
  );

  const [sketchLayerCreatorShown, setSketchLayerCreatorShown] = useState(false);
  const openSketchLayerCreator = useCallback(
    () => setSketchLayerCreatorShown(true),
    [],
  );
  const closeSketchLayerCreator = useCallback(
    () => setSketchLayerCreatorShown(false),
    [],
  );

  const [customPropertySchemaShown, setCustomPropertySchemaShown] =
    useState(false);
  const openCustomPropertySchema = useCallback(
    () => setCustomPropertySchemaShown(true),
    [],
  );
  const closeCustomPropertySchema = useCallback(
    () => setCustomPropertySchemaShown(false),
    [],
  );

  // devices - not in use
  const [selectedDevice, setDevice] = useState<Device>("desktop");
  const handleDeviceChange = useCallback(
    (newDevice: Device) => setDevice(newDevice),
    [],
  );
  // const visualizerWidth = useMemo(
  //   () => (tab === "widgets" ? devices[selectedDevice] : "100%"),
  //   [tab, selectedDevice],
  // );

  return {
    currentProjectType,
    handleProjectTypeChange,
    handleLayerSelectFromUI,
    handleCoreLayerSelectFromUI,
    handleSceneSettingSelectFromUI,
    dataSourceLayerCreatorShown,
    openDataSourceLayerCreator,
    closeDataSourceLayerCreator,
    sketchLayerCreatorShown,
    openSketchLayerCreator,
    closeSketchLayerCreator,
    selectedDevice,
    handleDeviceChange,
    customPropertySchemaShown,
    openCustomPropertySchema,
    closeCustomPropertySchema,
  };
};
