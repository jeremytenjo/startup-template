import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `RootPage`.
 */
export type RootPageProps = SliceComponentProps<Content.RootPageSlice>;

/**
 * Component for "RootPage" Slices.
 */
const RootPage = ({ slice }: RootPageProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for root_page (variation: {slice.variation}) Slices
    </section>
  );
};

export default RootPage;
