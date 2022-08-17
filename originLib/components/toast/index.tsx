import React from "react";
import { Text, Box, Flex } from "@chakra-ui/react";
import { createStandaloneToast } from "@chakra-ui/toast";
import { theme } from "../theme";

type ToastType = "success" | "info" | "warning" | "error";

const { ToastContainer, toast } = createStandaloneToast();

function Toast(
  type?: ToastType,
  message?: string,
  text?: string,
  width?: string
) {
  let borderColor;
  let bgColor;
  let themeColor;
  let Icon;
  switch (type) {
    case "warning":
      borderColor = theme.colors.semantics.warning;
      bgColor = theme.colors.semantics["warning-light"];
      themeColor = theme.colors.semantics.warning;
      // Icon = <IconHelp color={themeColor} />;
      break;
    case "error":
      borderColor = theme.colors.semantics.error;
      bgColor = theme.colors.semantics["error-light"];
      themeColor = theme.colors.semantics.error;
      // Icon = <IconAlertCircle color={themeColor} />;
      break;
    case "success":
      borderColor = theme.colors.semantics.success;
      bgColor = theme.colors.semantics["success-light"];
      themeColor = theme.colors.semantics.success;
      // Icon = <IconCircleCheck color={themeColor} />;
      break;
    default:
      break;
  }

  toast({
    position: "top",
    render: () => (
      <Box
        border="1px solid"
        borderColor={borderColor}
        borderRadius="4px"
        p="20px"
        bg={bgColor}
        w={width}
        color={borderColor}
        wordBreak="break-word"
      >
        <Flex>
          {Icon}
          <Flex ml="12px" flex="1">
            <Text fontWeight="bold">{message}</Text>
          </Flex>
        </Flex>
        {text && (
          <Text
            size="medium"
            color={theme.colors.semantics.default}
            mt="8px"
            ml="36px"
          >
            {text}
          </Text>
        )}
      </Box>
    ),
  });

  return <ToastContainer />;
}
export default Toast;
