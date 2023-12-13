export const modalVariants = {
  initial: {
    y: "-100vh",
    opacity: 0,
  },
  final: {
    y: "200px",
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
  exit: {
    y: "-100vh",
    opacity: 0,
  },
};

export const modalBackDropVariants = {
  initial: {
    opacity: 0,
  },
  final: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
