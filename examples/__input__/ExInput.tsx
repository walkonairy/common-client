import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Input from "../../originLib/components/input";
import { http } from "../../originLib/helper";

function ExInput() {
  useEffect(() => {
    http.POST_ANY("/api/register/user", { username: "test", password: "123" });
    http.GET_ANY("/api/user/hello");
  }, []);
  return (
    <>
      <Box p="24px">
        <Input />
      </Box>
    </>
  );
}

export default ExInput;
