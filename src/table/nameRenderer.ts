import { UserCategory } from '../enums/user';
import { SlabType } from '../types/slabType';
import { locationRenderer, typeRenderer } from './attributeDefinition';

export const getNameForElementAndUserCategory = (element: SlabType, userCategory: UserCategory): string => {
  switch (userCategory) {
    case UserCategory.Architect:
      return `Slab ${element.dimensions_l.toFixed(0)}x${element.dimensions_w.toFixed(0)}`;
    case UserCategory.Client:
      return `Element ${element.id}`;
    case UserCategory.Contracter:
      return `Element ${element.id} at ${element.planReference}`;
    case UserCategory.Engineer:
      return `Element ${typeRenderer(element)} at ${element.planReference}`;
    case UserCategory.Ubermensch:
      return `Element ${typeRenderer(element)} ${locationRenderer(element)} ${element.id} at ${element.planReference}`;
  }
};
