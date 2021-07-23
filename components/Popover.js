import { useState } from "react";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";
import { Tag } from "./tag";

export default function MyPopover({ buttonText, content }) {
  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top",
  });

  return (
    <Popover>
      <Popover.Button className="focus:outline-none" ref={setReferenceElement}>
        {buttonText}
      </Popover.Button>

      <Popover.Panel
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className="grid grid-cols-3 gap-2 bg-gray-50 rounded p-2 z-30 shadow-sm"
      >
        {content}
      </Popover.Panel>
    </Popover>
  );
}
