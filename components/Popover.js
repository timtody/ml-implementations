import { useState } from "react";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";

export default function MyPopover({ buttonText, content }) {
  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-start",
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
        className="z-50"
      >
        <div className="bg-gray-50 rounded p-2 shadow-sm space-y-2 text-gray-400">
          <p className="">All tags:</p>
          <div className="grid grid-cols-3 gap-2">{content}</div>
        </div>
      </Popover.Panel>
    </Popover>
  );
}
