import { FacetedFilterOptions } from "@/components/ui/data-table/DataTableFacetedFilter";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { CircleIcon } from "lucide-react";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const gender = [
  {
    value: "female",
    label: "Female",
    icon: CircleIcon,
  },

  {
    value: "male",
    label: "Male",
    icon: QuestionMarkCircledIcon,
  },
];
export const bloodTypeOptions: FacetedFilterOptions[] = [
  {
    label: "O-",
    value: "O-",
  },
  {
    label: "O+",
    value: "O+",
  },
  {
    label: "A-",
    value: "A-",
  },
  {
    label: "A+",
    value: "A+",
  },
  {
    label: "B-",
    value: "B-",
  },
  {
    label: "B+",
    value: "B+",
  },
  {
    label: "AB-",
    value: "AB-",
  },
  {
    label: "AB+",
    value: "AB+",
  },
];
