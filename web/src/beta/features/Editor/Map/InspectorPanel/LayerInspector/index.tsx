import { FC, useMemo } from "react";

import { SelectedLayer } from "@reearth/beta/features/Editor/hooks/useLayers";
import { GeoJsonFeatureUpdateProps } from "@reearth/beta/features/Editor/hooks/useSketch";
import { TabItem, Tabs } from "@reearth/beta/lib/reearth-ui";
import { NLSLayer } from "@reearth/services/api/layersApi/utils";
import { LayerStyle as LayerStyleType } from "@reearth/services/api/layerStyleApi/utils";

import { LayerConfigUpdateProps } from "../../../hooks/useLayers";

import DataSource from "./DataSource";
import FeatureInspector from "./FeatureInspector";
import InfoboxSettings from "./InfoboxSettings";
import LayerStyle from "./LayerStyle";

type Props = {
  layerStyles?: LayerStyleType[];
  layers?: NLSLayer[];
  selectedLayer?: SelectedLayer;
  sceneId?: string;
  onLayerConfigUpdate?: (inp: LayerConfigUpdateProps) => void;
  onGeoJsonFeatureUpdate?: (inp: GeoJsonFeatureUpdateProps) => void;
};

const InspectorTabs: FC<Props> = ({
  layers,
  layerStyles,
  selectedLayer,
  sceneId,
  onLayerConfigUpdate,
  onGeoJsonFeatureUpdate,
}) => {
  const selectedFeature = useMemo(() => {
    if (!selectedLayer?.computedFeature?.id) return;
    const { id, geometry, properties } =
      selectedLayer.layer?.config?.data?.type === "3dtiles" ||
      selectedLayer.layer?.config?.data?.type === "mvt"
        ? selectedLayer.computedFeature
        : selectedLayer.computedLayer?.features?.find(
            f => f.id === selectedLayer.computedFeature?.id,
          ) ?? {};

    if (!id) return;
    return {
      id,
      geometry,
      properties,
    };
  }, [selectedLayer]);

  const selectedSketchFeature = useMemo(() => {
    if (!selectedLayer?.layer?.sketch) return;

    const { sketch } = selectedLayer.layer;
    const features = sketch?.featureCollection?.features;

    if (!selectedFeature?.properties?.id) return;

    const selectedFeatureId = selectedFeature.properties.id;

    return features?.find(feature => feature.properties.id === selectedFeatureId);
  }, [selectedLayer, selectedFeature]);

  const tabItems: TabItem[] = useMemo(
    () => [
      {
        id: "dataSource",
        icon: "data",
        children: selectedLayer?.layer && <DataSource selectedLayer={selectedLayer.layer} />,
      },
      {
        id: "featureInspector",
        icon: "mapPin",
        children: selectedFeature && (
          <FeatureInspector
            selectedFeature={selectedFeature}
            isSketchLayer={selectedLayer?.layer?.isSketch}
            customProperties={selectedLayer?.layer?.sketch?.customPropertySchema}
            layerId={selectedLayer?.layer?.id}
            sketchFeature={selectedSketchFeature}
            onGeoJsonFeatureUpdate={onGeoJsonFeatureUpdate}
          />
        ),
      },
      {
        id: "layerStyle",
        icon: "palette",
        children: selectedLayer?.layer?.id && (
          <LayerStyle
            layerStyles={layerStyles}
            layers={layers}
            sceneId={sceneId}
            selectedLayerId={selectedLayer.layer.id}
            onLayerConfigUpdate={onLayerConfigUpdate}
          />
        ),
      },
      {
        id: "infoboxSettings",
        icon: "article",
        children: selectedLayer?.layer?.id && (
          <InfoboxSettings
            selectedLayerId={selectedLayer.layer.id}
            infobox={selectedLayer.layer?.infobox}
          />
        ),
      },
    ],
    [
      selectedLayer,
      selectedFeature,
      selectedSketchFeature,
      layerStyles,
      layers,
      sceneId,
      onLayerConfigUpdate,
      onGeoJsonFeatureUpdate,
    ],
  );

  return <Tabs tabs={tabItems} position="left" />;
};

export default InspectorTabs;
