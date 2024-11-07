package manifest

// generated by "/var/folders/p1/v6rr29dn5yv4s1n244c1qxcr0000gp/T/go-build2023191746/b001/exe/schematyper -o pkg/plugin/manifest/schema_gen.go --package manifest ./schemas/plugin_manifest.json" -- DO NOT EDIT

type Choice struct {
	Icon  string `json:"icon,omitempty"`
	Key   string `json:"key"`
	Label string `json:"label,omitempty"`
}

type Extendable struct {
	Horizontally *bool `json:"horizontally,omitempty"`
	Vertically   *bool `json:"vertically,omitempty"`
}

type Extension struct {
	Description  *string         `json:"description,omitempty"`
	ID           ID              `json:"id"`
	Icon         *string         `json:"icon,omitempty"`
	Name         string          `json:"name"`
	Schema       *PropertySchema `json:"schema,omitempty"`
	SingleOnly   *bool           `json:"singleOnly,omitempty"`
	Type         string          `json:"type"`
	Visualizer   *string         `json:"visualizer,omitempty"`
	WidgetLayout *WidgetLayout   `json:"widgetLayout,omitempty"`
}

type ID string

type Id string

type Location struct {
	Area    string `json:"area,omitempty"`
	Section string `json:"section,omitempty"`
	Zone    string `json:"zone,omitempty"`
}

type PropertyCondition struct {
	Field string      `json:"field"`
	Type  Valuetype   `json:"type"`
	Value interface{} `json:"value"`
}

type PropertyLinkableFields struct {
	Latlng *PropertyPointer `json:"latlng,omitempty"`
	URL    *PropertyPointer `json:"url,omitempty"`
}

type PropertyPointer struct {
	FieldID       string `json:"fieldId"`
	SchemaGroupID string `json:"schemaGroupId"`
}

type PropertySchema struct {
	Groups   []PropertySchemaGroup   `json:"groups,omitempty"`
	Linkable *PropertyLinkableFields `json:"linkable,omitempty"`
	Version  float64                 `json:"version,omitempty"`
}

type PropertySchemaField struct {
	AvailableIf  *PropertyCondition `json:"availableIf,omitempty"`
	Choices      []Choice           `json:"choices,omitempty"`
	DefaultValue interface{}        `json:"defaultValue,omitempty"`
	Description  *string            `json:"description,omitempty"`
	ID           ID                 `json:"id"`
	Max          *float64           `json:"max,omitempty"`
	Min          *float64           `json:"min,omitempty"`
	Placeholder  *string            `json:"placeholder,omitempty"`
	Prefix       *string            `json:"prefix,omitempty"`
	Suffix       *string            `json:"suffix,omitempty"`
	Title        *string            `json:"title"`
	Type         Valuetype          `json:"type"`
	UI           *string            `json:"ui,omitempty"`
}

type PropertySchemaGroup struct {
	AvailableIf         *PropertyCondition    `json:"availableIf,omitempty"`
	Collection          *string               `json:"collection,omitempty"`
	Description         *string               `json:"description,omitempty"`
	Fields              []PropertySchemaField `json:"fields,omitempty"`
	ID                  ID                    `json:"id"`
	List                bool                  `json:"list,omitempty"`
	RepresentativeField *Id                   `json:"representativeField,omitempty"`
	Title               string                `json:"title"`
}

type Root struct {
	Author      *string         `json:"author,omitempty"`
	Description *string         `json:"description,omitempty"`
	Extensions  []Extension     `json:"extensions,omitempty"`
	ID          ID              `json:"id"`
	Main        *string         `json:"main,omitempty"`
	Name        string          `json:"name"`
	Repository  *string         `json:"repository,omitempty"`
	Schema      *PropertySchema `json:"schema,omitempty"`
	System      bool            `json:"system,omitempty"`
	Version     string          `json:"version,omitempty"`
}

type Valuetype string

type WidgetLayout struct {
	DefaultLocation *Location   `json:"defaultLocation,omitempty"`
	Extendable      *Extendable `json:"extendable,omitempty"`
	Extended        *bool       `json:"extended,omitempty"`
	Floating        bool        `json:"floating,omitempty"`
}
