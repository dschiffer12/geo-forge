package dataset

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"

	"github.com/reearth/reearthx/i18n"
	"github.com/reearth/reearthx/rerror"
	"github.com/samber/lo"
)

type Format struct {
	Ext         string
	ContentType string
	export      func(io.Writer, *Schema, func(func(*Dataset) error) error) error
}

var formats = map[string]Format{
	"csv": {
		Ext:         "csv",
		ContentType: "text/csv",
		export:      ExportCSV,
	},
	"json": {
		Ext:         "json",
		ContentType: "application/json",
		export:      ExportJSON,
	},
}

var ErrUnknownFormat = rerror.NewE(i18n.T("unknown format"))

func ExportFormat(f string) (Format, bool) {
	format, ok := formats[f]
	return format, ok
}

func Export(w io.Writer, f string, ds *Schema, cb func(func(*Dataset) error) error) error {
	format, ok := formats[f]
	if !ok {
		return ErrUnknownFormat
	}

	if err := format.export(w, ds, cb); err != nil {
		return err
	}

	return nil
}

func ExportCSV(w io.Writer, ds *Schema, loader func(func(*Dataset) error) error) error {
	csvw := csv.NewWriter(w)
	dsfields := ds.Fields()

	// Write header
	header := lo.FlatMap(dsfields, func(f *SchemaField, _ int) []string {
		return csvHeader(f)
	})
	if err := csvw.Write(header); err != nil {
		return err
	}

	// Write data
	if err := loader(func(d *Dataset) error {
		row := lo.FlatMap(dsfields, func(sf *SchemaField, _ int) []string {
			f := d.Field(sf.ID())
			return csvValue(f)
		})
		return csvw.Write(row)
	}); err != nil {
		return err
	}

	csvw.Flush()
	return csvw.Error()
}

func ExportJSON(w io.Writer, ds *Schema, loader func(func(*Dataset) error) error) error {
	j := json.NewEncoder(w)
	res := []any{}

	if err := loader(func(d *Dataset) error {
		res = append(res, d.Interface(ds))
		return nil
	}); err != nil {
		return err
	}

	return j.Encode(res)
}

func csvHeader(f *SchemaField) []string {
	if f.Type() == ValueTypeLatLng {
		return []string{f.Name() + "_lng", f.Name() + "_lat"}
	}
	if f.Type() == ValueTypeLatLngHeight {
		return []string{f.Name() + "_lng", f.Name() + "_lat", f.Name() + "_height"}
	}
	return []string{f.Name()}
}

func csvValue(f *Field) []string {
	if f == nil {
		return []string{""}
	}

	if f.Type() == ValueTypeLatLng {
		v := f.Value().ValueLatLng()
		if v == nil {
			return []string{"", ""}
		}
		return []string{fmt.Sprintf("%f", v.Lng), fmt.Sprintf("%f", v.Lat)}
	}
	if f.Type() == ValueTypeLatLngHeight {
		v := f.Value().ValueLatLngHeight()
		if v == nil {
			return []string{"", "", ""}
		}
		return []string{fmt.Sprintf("%f", v.Lng), fmt.Sprintf("%f", v.Lat), fmt.Sprintf("%f", v.Height)}
	}
	return []string{f.Value().String()}
}
