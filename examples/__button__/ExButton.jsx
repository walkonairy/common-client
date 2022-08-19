import React, { useState } from "react";
import Button from "../../originLib/components/button";
import { Box } from "@chakra-ui/react";

function ExButton() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {/* 隐藏input 的 value */}
      {/*<form name="form">*/}
      {/*  <input name="pwd" type="password" />*/}
      {/*  <button*/}
      {/*    type="submit"*/}
      {/*    onClick={() => {*/}
      {/*      const form = document.forms["form"];*/}
      {/*      form.onsubmit = function (e) {*/}
      {/*        e.preventDefault();*/}
      {/*        const select = document.form["pwd"].value;*/}
      {/*        console.log(select);*/}
      {/*      };*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    submit*/}
      {/*  </button>*/}
      {/*</form>*/}

      <Box p="24px" bg="#000">
        <Button
          id="main"
          loading={loading}
          disabled={loading}
          onClick={() => {
            setLoading(true);
            console.log(123);
          }}
        >
          Create account
        </Button>
      </Box>

      <Button onClick={() => setLoading(true)}>点我开loading</Button>
      <Button id="hidden" onClick={() => setLoading(false)}>
        点我关loading
      </Button>
    </>
  );
}

export default ExButton;
