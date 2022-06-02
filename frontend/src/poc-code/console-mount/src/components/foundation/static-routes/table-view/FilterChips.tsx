import { Chip, ChipGroup, Button } from '@patternfly/react-core';
import * as React from 'react';
import './filter-chips.css';

export type FilterChipItem = {
  /** Filter chip item label. */
  label: string;
  /** Filter chip item label ID. */
  id: string;
};

export interface FilterChipsProps {
  /** Optional available filters */
  filters?: FilterChipItem[];
  /** Optional applied filter values. */
  filterValues?: Record<string, string>;
  /** Optional callback for on chip delete. */
  onDelete?: (key?: string) => void;
}

const FilterChips: React.FunctionComponent<FilterChipsProps> = ({ filters = [], filterValues = {}, onDelete = () => undefined }) => {
  const groupedFilters = Object.keys(filterValues).map((key) => (
    <ChipGroup className="dps-filter-chips__chip-group" key={`group-${key}`} categoryName={filters.find((item) => item.id === key)?.label}>
      <Chip
        key={filterValues[key]}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onDelete(key);
        }}
      >
        {filterValues[key]}
      </Chip>
    </ChipGroup>
  ));

  return (
    <>
      {groupedFilters}
      {Object.values(filterValues).some((value) => value?.length > 0) && (
        <Button className="dps-filter-chips__clear-filters" variant="link" onClick={() => onDelete()}>
          Clear filters
        </Button>
      )}
    </>
  );
};

export default FilterChips;
