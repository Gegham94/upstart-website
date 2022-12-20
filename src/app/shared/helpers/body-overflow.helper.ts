export const hideBodyOverflow = () => {
  if (document) {
    document.body.classList.add('overflow-hidden');
  }
};

export const showBodyOverflow = () => {
  if (document) {
    document.body.classList.remove('overflow-hidden');
  }
};
