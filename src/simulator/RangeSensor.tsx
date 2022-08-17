import {
  Box,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from "@chakra-ui/react";
import { ReactNode, useCallback, useState } from "react";
import { useIntl } from "react-intl";
import {
  RangeSensor as RangeSensorType,
  RangeSensorWithThresholds as RangeSensorWithThresholdsType,
} from "./model";

interface RangeSensorProps {
  sensor: RangeSensorType | RangeSensorWithThresholdsType;
  title: string;
  icon: ReactNode;
  onSensorChange: (id: string, value: number) => void;
  minimised?: boolean;
}

const RangeSensor = ({
  icon,
  sensor,
  title,
  onSensorChange,
  minimised = false,
}: RangeSensorProps) => {
  let lowThreshold;
  let highThreshold;
  if (
    sensor.hasOwnProperty("lowThreshold") &&
    sensor.hasOwnProperty("highThreshold")
  ) {
    lowThreshold = (sensor as RangeSensorWithThresholdsType).lowThreshold;
    highThreshold = (sensor as RangeSensorWithThresholdsType).highThreshold;
  }
  const { id, min, max, value, unit } = sensor;
  const handleChange = useCallback(
    (value: number) => {
      onSensorChange(id, value);
    },
    [onSensorChange, id]
  );
  const valueText = unit ? `${value} ${unit}` : value.toString();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const handleFocusTooltip = useCallback((value: boolean) => {
    setIsFocused(value);
    setShowTooltip(value);
  }, []);
  const handleMouseOverTooltip = useCallback(
    (value: boolean) => {
      if (!isFocused) {
        setShowTooltip(value);
      }
    },
    [isFocused]
  );
  return (
    <HStack pb={minimised ? 0 : 2} pt={minimised ? 0 : 1} spacing={3}>
      {icon}
      <Slider
        aria-label={title}
        value={value}
        min={min}
        max={max}
        onChange={handleChange}
        my={5}
        colorScheme="blackAlpha"
        onMouseEnter={() => handleMouseOverTooltip(true)}
        onMouseLeave={() => handleMouseOverTooltip(false)}
      >
        <SliderTrack height={2}>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          placement="top"
          label={valueText}
          isOpen={minimised ? showTooltip : false}
        >
          <SliderThumb
            onFocus={() => handleFocusTooltip(true)}
            onBlur={() => handleFocusTooltip(false)}
          />
        </Tooltip>
        {typeof lowThreshold !== "undefined" && (
          <ThresholdMark
            value={lowThreshold}
            label={getThresholdLabels(id, "low")}
            min={min}
            max={max}
          />
        )}
        {typeof highThreshold !== "undefined" && (
          <ThresholdMark
            value={highThreshold}
            label={getThresholdLabels(id, "high")}
            min={min}
            max={max}
          />
        )}
        {!minimised && (
          <>
            <SliderMark value={min} mt="1" fontSize="xs">
              {min}
            </SliderMark>
            <SliderMark
              value={max}
              mt="1"
              ml={`-${max.toString().length}ch`}
              fontSize="xs"
            >
              {max}
            </SliderMark>
            <SliderMark
              value={value}
              textAlign="center"
              mt="-8"
              ml={-valueText.length / 2 + "ch"}
              fontSize="xs"
            >
              {valueText}
            </SliderMark>
          </>
        )}
      </Slider>
    </HStack>
  );
};

const getThresholdLabels = (id: string, threshold: "low" | "high") => {
  switch (id) {
    case "soundLevel":
      if (threshold === "low") {
        return "simulator-quiet";
      } else {
        return "simulator-loud";
      }
    default:
      return "";
  }
};

interface ThresholdMarkProps {
  value: number;
  label: string;
  min: number;
  max: number;
}

const ThresholdMark = ({ value, label, min, max }: ThresholdMarkProps) => {
  const intl = useIntl();
  const percentLeft = ((value - min) / (max - min)) * 100 + "%";
  return (
    <Tooltip hasArrow placement="top" label={intl.formatMessage({ id: label })}>
      <Box
        position="absolute"
        top="3px"
        left={percentLeft}
        bg="brand.200"
        height={2}
        width={2}
        borderLeft="1px solid"
        borderRight="1px solid"
        borderColor="gray.25"
      />
    </Tooltip>
  );
};

export default RangeSensor;