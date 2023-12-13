export const handleKeyPress = (
  event: React.KeyboardEvent<HTMLInputElement>,
  keyPress: string,
  calledFunction: any
) => {
  if (event.key === keyPress) {
    calledFunction();
  }
};
