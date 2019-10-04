import React from "react";
import { Input } from "semantic-ui-react";

const SearchInput = ({ handleLocation }) => {
  return (
    <Input
      className="form-container"
      placeholder="Where are you looking for?"
      onChange={e => {
        console.log(e.target.value);
        handleLocation(e.target.value.toLowerCase().trim());
      }}
    />
  );
};

export default SearchInput;
