/**
 * (c) 2021, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
import { BoxProps, HStack, useMediaQuery} from "@chakra-ui/react";
import SendButton from "./SendButton";
import SaveMenuButton from "./SaveMenuButton";
import OpenButton from "./OpenButton";
import { widthXl } from "../common/media-queries";
import React, { ForwardedRef, useState } from "react";
import { LoadProgressBar } from "./LoadProgressBar";
interface ProjectActionBarProps extends BoxProps {
  sendButtonRef: React.RefObject<HTMLButtonElement>;
}

const ProjectActionBar = React.forwardRef(
  (
    { sendButtonRef, ...props }: ProjectActionBarProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const [isWideScreen] = useMediaQuery(widthXl);
    const size = "lg";

    const [loaded, setLoaded] = useState(false);

    return (
      <HStack
        {...props}
        justifyContent="space-between"
        py={5}
        px={isWideScreen ? 10 : 5}
        gap={10}
      >
        {loaded ? <SendButton size={size} ref={ref} sendButtonRef={sendButtonRef} /> : undefined}

        {loaded ? undefined : <LoadProgressBar setLoaded={setLoaded}/>}

        <HStack spacing={2.5}>
          {loaded ? <SaveMenuButton size={size} /> : undefined}
          
          <OpenButton mode="button" size={size} minW="fit-content" />
        </HStack>
      </HStack>
    );
  }
);

export default ProjectActionBar;
