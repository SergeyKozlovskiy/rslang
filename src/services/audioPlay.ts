export const audioPlay = (path: string) => {
  const audioObj = new Audio(path);
  audioObj.play();
};
