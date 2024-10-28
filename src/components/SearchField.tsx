import { useEffect, useRef } from 'react';
import './searchField.css'
import { FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';

interface SearchFieldProps {
  onInputHandler: (value: string) => void
}

export function SearchField(props: SearchFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    // I thought I will need to fix focus/clipboard issue
    // setTimeout(() => {
    //   inputRef.current?.focus();
    // }, 500);
  }, []);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onInputHandler(e.target.value);
  }

  // onInput available and is triggered immediately when the value changes, which can include typing, pasting, or other modifications.
  // onChange for handling changes in input values.

  return (
    <>
      <FormGroup className="col-3">
        <InputGroup>
          <InputGroupText>
            🔎
          </InputGroupText>
          <Input
            id="searchFlagInput"
            name="searchFlag"
            placeholder="type country name"
            type="search"
            innerRef={inputRef}
            onInput={onInput}
            autoComplete="off"
          />
        </InputGroup>
      </FormGroup>
    </>
  )
}
