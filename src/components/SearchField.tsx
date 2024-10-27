import { useEffect, useRef } from 'react';
import './searchField.css'
import { Input } from 'reactstrap';

interface SearchFieldProps {
  onInputHandler: (value: string) => void
}

export function SearchField(props: SearchFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // inputRef.current?.focus();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }, []);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onInputHandler(e.target.value);
  }

  // onInput available and is triggered immediately when the value changes, which can include typing, pasting, or other modifications.
  // onChange for handling changes in input values.

  return (
    <>
      <Input innerRef={inputRef} placeholder="code or country name" onInput={onInput} />
      {/* <div>value: {searchValue}</div> */}
    </>
  )
}
